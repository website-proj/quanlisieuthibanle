from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status

from app.core.config import settings
from app.db.base import get_db
from app.model.users import User
from app.schemas.schema_token import TokenPayload
from app.services.auth import AuthService
from app.services.users import UserService

from jose import JWTError, jwt

def login_required(token : str  =  Depends(AuthService.oauth2_scheme) , db : Session  = Depends(get_db)):
    # return AuthService.get_current_user(db , token)
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                         detail="Could not validate credentials",
                                         headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.SECURITY_ALGORITHM])
        token_data = TokenPayload(**payload)
    except JWTError:
        raise credential_exception
def check_admin_role(token : str = Depends(AuthService.oauth2_scheme) , db : Session = Depends(get_db)):
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                         detail="Could not validate credentials",
                                         headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.SECURITY_ALGORITHM])
        # token_data = TokenPayload(**payload)
        role = payload.get('role')
        if role != "Admin" and role != "SuperAdmin":
            raise HTTPException(status_code=403 , detail = "Admin role required")
    except JWTError:
        raise credential_exception
    # current = AuthService.get_current_user(db , token)
    # user = db.query(User).filter(User.user_id == current.user_id).first()
    # if user.account_type != "Admin" and  user.account_type != "SuperAdmin":
    #     raise HTTPException(status_code=403 , detail = "Admin role required")
def check_super_admin_role(token : str =Depends(AuthService.oauth2_scheme), db : Session = Depends(get_db)):
    # current = AuthService.get_current_user(db , token )
    # user = db.query(User).filter(User.user_id == current.user_id).first()
    # if user.account_type != "SuperAdmin":
    #     raise HTTPException(status_code=403 , detail = "SuperAdmin role required")
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                         detail="Could not validate credentials",
                                         headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.SECURITY_ALGORITHM])
        # token_data = TokenPayload(**payload)
        role = payload.get('role')
        if role != "SuperAdmin":
            raise HTTPException(status_code=403, detail="SuperAdmin role required")
    except JWTError:
        raise credential_exception
class PermissionRequired:
    def __init__(self, *args):
        self.user = None
        self.permissions = args

    def __call__(self, user: User = Depends(login_required)):
        self.user = user
        if self.user.role not in self.permissions and self.permissions:
            raise HTTPException(status_code=400,
                                detail=f'User {self.user.email} can not access this api')