from fastapi import Depends, APIRouter, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel


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


@router.post("/")
async def register_user(user : UserRegisterRequest  , user_service : UserService = Depends() , db: Session = Depends(get_db) ):
    try :
        register_user = AuthService.user_register(user , db)
        return ResponseHandler.success("create_success" ,register_user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login" )
def login_access_token(data : OAuth2PasswordRequestForm =Depends() , db : Session = Depends(get_db) ):
    login_form = login(email=data.username, password=data.password)
    user = AuthService.authenticate_user( login_form , db)
    if not user :
        raise (HTTPException(status_code=400, detail="Incorrect email or password"))
    return {
        'access_token': create_access_token(user_id=user.user_id) , "token_type": "bearer"
    }

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

@router.put("changePassword" , dependencies = [Depends(login_required)])
def change_password(pass_word_form : passwordChangeRequest , current_user = Depends(AuthService.get_current_user), db : Session = Depends(get_db) ):
    user =  UserService.change_password(pass_word_form,current_user, db)
    return ResponseHandler.success("change_password_success" ,user)
@router.get("/profile", dependencies = [Depends(login_required)])
def get_profile( current_user = Depends(AuthService.get_current_user) , db : Session = Depends(get_db) ):
    user = UserService.get_infor( current_user , db)
    return ResponseHandler.success("user profile" ,user)

