import json

import redis
from fastapi import Depends, APIRouter, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from app.core.config import settings
from app.core.security import create_access_token
from app.model.users import User
# from app.schemas.schema_base import DataResponse
from app.schemas.schema_token import Token
from app.schemas.schema_user import UserCreateRequest, UserOut, UserRegisterRequest, login, userUpdateRequest, \
    passwordChangeRequest
from app.services.auth import AuthService
from app.services.users import UserService
from app.helper.login_manager import login_required
from sqlalchemy.orm import Session
from app.utils.responses import ResponseHandler
from app.db.base import get_db

router = APIRouter()
redis_client = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0, decode_responses=True)
@router.post("/")
def register_user(user : UserRegisterRequest  , db: Session = Depends(get_db) ):
    try :
        email = user.email
        exist_user = db.query(User).filter(User.email == email).first()
        if exist_user :
            raise HTTPException(status_code = 400 , detail = "Email already registered")
        auth = AuthService()
        user_data = {
            "username": user.username,
            "email": user.email,
            "password" : user.password,
        }
        redis_client.setex(f"pending_user:{email}", 300, json.dumps(user_data))
        auth.send_verification_email(email)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
@router.post("/register/check_code")
def check_code_email(email : str ,code : str , db: Session = Depends(get_db) ):
    try :
        auth = AuthService()
        check = auth.verify_code(email, code)
        user_data = redis_client.get(f"pending_user:{email}")
        if not user_data :
            raise HTTPException(status_code=400, detail="data error")
        user_data = json.loads(user_data)
        user = UserRegisterRequest(
            username=user_data["username"],
            email=email,
            password=user_data["password"],
        )
        if check:
            user = AuthService.user_register(user, db)
            if not user:
                raise HTTPException(status_code=401, detail="error")
            return ResponseHandler.success("success register", user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
@router.post("/login")
async def login_access_token(data : OAuth2PasswordRequestForm =Depends() , db : Session = Depends(get_db) ):
    """
    check email and password
    """
    login_form = login(email=data.username, password=data.password)
    user = AuthService.authenticate_user( login_form , db)
    if not user :
        raise (HTTPException(status_code=400, detail="Incorrect email or password"))
    token = create_access_token(data.username , db )
    return {"access_token": token, "token_type": "bearer"}


@router.put("/profile" , dependencies = [Depends(login_required)])
def update_profile(user_data : userUpdateRequest , current_user = Depends(AuthService.get_current_user) ,user_service :UserService = Depends(), db : Session = Depends(get_db) ):
    """"
    API update profile
    """
    try :
        update_profile = user_service.update_profile(data = user_data , current_user= current_user , db =  db )
        return ResponseHandler.success("update_profile" ,update_profile)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/changePassword" , dependencies = [Depends(login_required)])
def change_password(pass_word_form : passwordChangeRequest ,db : Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme) ):
    user =  UserService.change_password(pass_word_form, db , token)
    return ResponseHandler.success("change_password_success" ,user)
@router.put("/get_code_forgotPassword"  )
def send_email_code(email : str ):
    try :
        auth = AuthService()
        auth.send_verification_email(email)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
@router.put("/check_code")
def check_code(email : str , code : str  ):
    try :
        auth = AuthService()
        check = auth.verify_code(email, code)
        return check
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
@router.put("/resetPassword")
def reset_password(email : str ,code : str , password : str , db : Session = Depends(get_db) ):
    try :
        auth = AuthService()
        check = auth.verify_code(email, code)
        if check:
            user = UserService.reset_password(email, password, db)
            return ResponseHandler.success("reset_password success", user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))