from fastapi import Depends, APIRouter, FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy.sql.functions import current_user

from app.core.security import create_access_token
from app.model.users import User
from app.schemas.schema_base import DataResponse
from app.schemas.schema_token import Token
from app.schemas.schema_user import UserCreateRequest, UserOut, UserRegisterRequest , login , userUpdateRequest
from app.services.users import UserService
from app.helper.login_manager import login_required
from sqlalchemy.orm import Session
from app.utils.responses import ResponseHandler
from app.db.base import get_db

router = APIRouter(tags=["users"] , prefix="/users")

# #create newUser
# @router.post("/", response_model= UserOut )
# async def create_user(data : UserCreateRequest , user_service: UserService = Depends() ) :
#     """
#     API Create New User
#     """
#     try :
#         new_user = user_service.create_user()
@router.post("/")
async def register_user(user : UserRegisterRequest  , user_service : UserService = Depends() , db: Session = Depends(get_db) ):
    try :
        register_user = user_service.register_user(user, db)
        return ResponseHandler.success("create_success" ,register_user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
# @router.get("/getUsers")
# async def get_users(db: Session = Depends(get_db)):
#     return UserService.getUsers(db)

@router.post("/login" , response_model = DataResponse[Token])
def login_access_token(data : login , service_user  : UserService = Depends() , db : Session = Depends(get_db) ):
    user = service_user.authenticate(data,db)
    if not user :
        raise (HTTPException(status_code=400, detail="Incorrect username or password"))
    return DataResponse().success_response({
        'access_token': create_access_token(user_id=user.user_id)
    })

@router.put("/profile" , dependencies = [Depends(login_required)], response_model = DataResponse[User])
def update_profile(user_data : userUpdateRequest , current_user = Depends(current_user) ,user_service :UserService = Depends(), db : Session = Depends(get_db) ):
    """"
    API update profile
    """
    try :
        update_profile = user_service.update_profile(data = user_data , current_user= current_user , db =  db )
        return DataResponse().success_response(data = update_profile)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))




