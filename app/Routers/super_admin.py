from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.model.users import User
from app.core.security import get_password_hash
from app.db.base import get_db
from app.helper.login_manager import check_super_admin_role
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.post("/" , dependencies=[Depends(check_super_admin_role)])
def create_admin(admin_name : str , password : str , db : Session = Depends(get_db)):
    hashed_password = get_password_hash(password)
    user = User(username=admin_name, email = "admin@gmail.com" , password = hashed_password )
    db.add(user)
    db.commit()
    db.refresh(user)
    return ResponseHandler.success("create success" , user)