import uuid

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
    user_id = f"admin{uuid.uuid4().hex[:8]}"
    user = User(username=admin_name, email = "Admin" , password = hashed_password )
    db.add(user)
    db.commit()
    db.refresh(user)
    return ResponseHandler.success("create success" )
@router.put("/" , dependencies=[Depends(check_super_admin_role)])
def update_admin(Admin_id : str , password , db : Session = Depends(get_db)):
    hashed_password = get_password_hash(password)
    admin = db.query(User).filter(User.username == Admin_id).first()
    admin.password = hashed_password
    db.commit()
    db.refresh(admin)
    return ResponseHandler.success("update success" , admin)
@router.delete("/" , dependencies=[Depends(check_super_admin_role)])
def delete_admin(Admin_id : str , db : Session=Depends(get_db)):
    admin = db.query(User).filter(User.username == Admin_id).first()
    db.delete(admin)

