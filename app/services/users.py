import jwt
from fastapi import Depends , HTTPException
from fastapi.security import HTTPBearer
import logging
from sqlalchemy.orm import Session
from starlette import status

from app.db.base import get_db
from app.model.users import User
from app.schemas.schema_token import TokenPayload
from app.schemas.schema_user import UserCreateRequest, UserRegisterRequest , login , userUpdateRequest
from app.core.security import get_password_hash, verify_password
from app.core.config import settings
class UserService():
    reusable_oauth2 = HTTPBearer(
        scheme_name='Authorization'
    )
    @staticmethod
    def register_user(data : UserRegisterRequest , db : Session):
        exist_user = db.query(User).filter_by(email=data.email).first()
        if exist_user:
            raise Exception('Email already registered')
        registered_user = User(
            username = data.username,
            password = get_password_hash(data.password),
            email = data.email
        )
        try:
            db.add(registered_user)
            db.commit()
            db.refresh(registered_user)
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code = 500 , detail = "Internal Server Error")
        return registered_user

    # @staticmethod
    # def getUsers(db: Session):
    #     try:
    #         # Truy vấn tất cả người dùng
    #         users = db.query(User).all()
    #         if not users:
    #             # Nếu không tìm thấy người dùng nào, có thể trả về một thông báo khác
    #             raise HTTPException(status_code=404, detail="No users found")
    #         return users
    #     except Exception as e:
    #         # Ghi lại lỗi vào log và thông báo chi tiết hơn
    #         logging.error(f"Error in getUsers: {e}")
    #         # Trả về lỗi với thông báo chi tiết
    #         raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    @staticmethod
    def authenticate(data : login , db : Session ):
        """
        check email and password
        """
        user = db.query(User).filter_by(email=data.email).first()
        if not user:
            return None
        if not verify_password(data.password, user.password):
            return None
        return user
    @staticmethod
    def get_current_user(http_authorization_credentials = Depends(reusable_oauth2) , db : Session = Depends(get_db))->User:
        """
        decode JWT token --> return current user infor from db query
        """
        try :
            payload = jwt.decode(
                http_authorization_credentials,
                settings.SECRET_KEY,
                algorithms=[settings.ALGORITHM]
            )
            token_data = TokenPayload(**payload)
        except (jwt.PyJWTError, jwt.InvalidTokenError):
            raise HTTPException(
                status_code = status.HTTP_403_FORBIDDEN,
                detail = "Could not validate credentials"
            )
        user = db.query(User).get(token_data.user_id)
        if not user :
            raise HTTPException(status_code = 404 , detail = "user not found")
        return user
    @staticmethod
    def get(user_id , db : Session):
        exist_user = db.query(User).filter_by(id=user_id).first()
        if exist_user is None :
            raise Exception('User not found')
        return exist_user
    @staticmethod
    def update_profile(data : userUpdateRequest ,current_user : User ,  db : Session  ):
        if data.email is not None :
            exist_user = db.query(User).filter(
                User.email == data.email , User.user_id != current_user.user_id
            ).first()
            if exist_user :
                raise Exception('Email already registered')
        current_user.name = data.name if data.name is not None else current_user.name
        current_user.email = data.email if data.email is not None else current_user.email
        current_user.phone_number = data.phone_number if data.phone_number is not None else current_user.phone_number
        current_user.address = data.address if data.address is not None else current_user.address
        db.commit()
        return current_user


