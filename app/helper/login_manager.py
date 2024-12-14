from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.model.users import User
from app.services.auth import AuthService
from app.services.users import UserService


def login_required(token : str  =  Depends(AuthService.oauth2_scheme) , db : Session  = Depends(get_db)):
    return AuthService.get_current_user(token  , db)
def check_admin_role(token : str = Depends(AuthService.oauth2_scheme) , db : Session = Depends(get_db)):
    current = AuthService.get_current_user(token , db)
    user = db.query(User).filter(User.user_id == current.user_id).first()
    if user.account_type != "Admin":
        raise HTTPException(status_code=403 , detail = "Admin role required")
def check_super_admin_role(token : str =Depends(AuthService.oauth2_scheme), db : Session = Depends(get_db)):
    current = AuthService.get_current_user(token , db)
    user = db.query(User).filter(User.user_id == current.user_id).first()
    if user.account_type != "SuperAdmin":
        raise HTTPException(status_code=403 , detail = "SuperAdmin role required")

class PermissionRequired:
    def __init__(self, *args):
        self.user = None
        self.permissions = args

    def __call__(self, user: User = Depends(login_required)):
        self.user = user
        if self.user.role not in self.permissions and self.permissions:
            raise HTTPException(status_code=400,
                                detail=f'User {self.user.email} can not access this api')