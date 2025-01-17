from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.helper.login_manager import check_admin_role
from app.schemas.schema_user import UserCreateRequest, admin_update
from app.services.users import UserService
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.get('/users' , dependencies=[Depends(check_admin_role)])
def get_all_users(db : Session = Depends(get_db)):
    users = UserService.get_all_user(db)
    return ResponseHandler.success("query success", users)
@router.get("/user" , dependencies=[Depends(check_admin_role)])
def get_detail_user_by_id(user_id : str , db : Session = Depends(get_db)):
    user = UserService.get_user_by_id(user_id , db)
    return ResponseHandler.success("query success", user)
@router.post("/user", dependencies=[Depends(check_admin_role)])
def create_new_user(user_form : UserCreateRequest , db : Session = Depends(get_db)):
    user = UserService.create_user(user_form, db)
    return ResponseHandler.success("create user success", user)
@router.put("/user" , dependencies=[Depends(check_admin_role)])
def edit_profile_user(dataform : admin_update, db : Session =Depends(get_db)):
    user = UserService.admin_update_profile_user(dataform, db)
    return ResponseHandler.success("update user success", user)
@router.delete("/user" , dependencies=[Depends(check_admin_role)])
def delete_user(user_id : str , db : Session = Depends(get_db)):
    user = UserService.delete_user(user_id , db)
    return ResponseHandler.success("delete user success", user)
@router.get("/user/count" , dependencies=[Depends(check_admin_role)])
def count_all_users(db : Session = Depends(get_db)):
    users = UserService.count_all_users(db)
    return {
        "users": users
    }


