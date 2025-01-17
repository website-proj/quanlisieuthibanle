import smtplib
import string
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random

import redis
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from starlette import status
from jose import JWTError, jwt

from app.core.security import get_password_hash, verify_password
from app.db.base import get_db
from app.model.users import User
from app.schemas.schema_token import TokenPayload
from app.schemas.schema_user import UserRegisterRequest, login
from app.core.config import  settings

redis_client = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0, decode_responses=True)


class AuthService :

    oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "api/users/login")

    def user_register(request_form  : UserRegisterRequest , db : Session ):
        try :
            user_exist_email = db.query(User).filter(User.email == request_form.email).first()
            if user_exist_email :
                raise HTTPException(status_code = 400 , detail = "Email or username already registered")
            hashed_password = get_password_hash(request_form.password)
            request_form.password = hashed_password
            user = User(
                email = request_form.email,
                username = request_form.username,
                password=request_form.password
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            return user
        except Exception as e:
            raise e
    def authenticate_user(login_form : login , db : Session ):
        """"
        check username and password
        """
        user = db.query(User).filter(User.email == login_form.email).first()
        if not user:
            return None
        check_password = verify_password(login_form.password, user.password)
        if not check_password :
            return None
        return user
    def get_current_user(db : Session = Depends(get_db),token: str = Depends(oauth2_scheme)  ):
        credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                             detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
        try :
            payload = jwt.decode(token , settings.SECRET_KEY, algorithms=[settings.SECURITY_ALGORITHM] )
            token_data = TokenPayload(**payload)
        except JWTError:
            raise credential_exception
        user = db.query(User).filter(User.email == token_data.email).first()
        if not user:
            raise credential_exception
        return user
    def generate_verification_code(self , length = 6):
        characters = string.ascii_letters + string.digits
        return ''.join(random.choice(characters) for _ in range(length))

    def send_verification_email(self , user_email : str):
        sender_email = settings.email
        sender_password = settings.password_email
        receiver_email = user_email
        verification_code = self.generate_verification_code()
        try :
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            server.login(sender_email, sender_password)

            message = MIMEMultipart()
            message['From'] = sender_email
            message['To'] = receiver_email
            message['Subject'] = 'Email Verification Code'
            body = f'Your email verification code is: {verification_code}'
            message.attach(MIMEText(body, 'plain'))

            server.sendmail(sender_email, receiver_email, message.as_string())
            server.quit()
            redis_client.setex(f"verification_code_{user_email}", 300, verification_code)
            return verification_code
        except Exception as e:
            raise HTTPException(status_code=500 , detail=f"Failed to send verification code: {str(e)}")

    def verify_code(self , user_email : str , code : str):
        saved_code = redis_client.get(f"verification_code_{user_email}")
        if not saved_code:
            raise HTTPException(status_code = 400 , detail= "verification code expired not found")
        if saved_code != code:
            raise HTTPException(status_code = 400 , detail= "verification code is not valid")
        return True
    def authenticate_user_with_code(self , login_form : login , db : Session , verification_code : str):
        user = db.query(User).filter(User.email == login_form.email).first()
        if not user:
            return None
        self.verify_code(login_form.email , verification_code)
        check_password = verify_password(login_form.password, user.password)
        if not check_password :
            return None
        return user