from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from starlette import status
from jose import JWTError, jwt
from app.core.security import get_password_hash, verify_password
from app.db.base import get_db
from app.model.users import User
from app.model .model_orders import Orders
from app.schemas.schema_token import TokenPayload
from app.schemas.schema_user import UserRegisterRequest, login
from app.core.config import  settings
class AuthService :

    oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "api/users/login")

    def user_register(request_form  : UserRegisterRequest , db : Session ):
        try :
            user_exist_email = db.query(User).filter(User.email == request_form.email).first()
            user_exist_username = db.query(User).filter(User.username == request_form.username).first()
            if user_exist_email or user_exist_username :
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
        user = db.query(User).filter(User.username == login_form.username).first()
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
        user = db.query(User).filter(User.user_id == token_data.user_id).first()
        if not user:
            raise credential_exception
        return user





