import jwt
from fastapi import Depends , HTTPException
from fastapi.security import HTTPBearer
import logging
from sqlalchemy.orm import Session
from starlette import status

from app.db.base import get_db
from app.model.users import User
from app.schemas.schema_token import TokenPayload
from app.schemas.schema_user import UserCreateRequest, UserRegisterRequest, login, userUpdateRequest, \
    passwordChangeRequest, admin_update
from app.core.security import get_password_hash, verify_password
from app.core.config import settings
from app.services.auth import AuthService
from app.schemas.schema_user import UserOut

class UserService():
    @staticmethod
    def get_user_by_id(user_id , db : Session):
        exist_user = db.query(User).filter(User.user_id==user_id).first()
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
        current_user.username = data.username if data.username is not None else current_user.username
        current_user.email = data.email if data.email is not None else current_user.email
        current_user.phone_number = data.phone_number if data.phone_number is not None else current_user.phone_number
        current_user.address = data.address if data.address is not None else current_user.address
        db.commit()
        return current_user
    @staticmethod
    def change_password(password : passwordChangeRequest , current_user : User,db : Session):
        user = db.query(User).filter( User.user_id == current_user.user_id).first()
        hashed_password = get_password_hash(password.old_password)
        try :
            if user.password == hashed_password :
                user.password = get_password_hash(password.new_password)
                db.commit()
        except:
            raise HTTPException(status_code = 400 , detail = 'Incorrect password' )
    @staticmethod
    def reset_password(email : str , password :str , db : Session):
        user = db.query(User).filter(User.email == email).first()
        user.password = get_password_hash(password)
        db.commit()
        return user
    @staticmethod
    def get_infor(current_user : User,db : Session):
        user = db.query(User).filter( User.user_id == current_user.user_id).first()
        user_out = UserOut(
            user_id=user.user_id,
            username=user.username,
            email=user.email,
            phone_number=user.phone_number,
            address=user.address,
            membership_status=user.membership_status
        )

        return user_out
    @staticmethod
    def get_all_user(db : Session):
        users = db.query(User).all()
        if not users:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND)
        return users
    @staticmethod
    def create_user(data_form : UserCreateRequest , db : Session):
        hashed_password = get_password_hash(data_form.password)
        user = User(username = data_form.username
                    , email = data_form.email
                    , phone_number = data_form.phone_number
                    , address = data_form.address
                    , password = hashed_password)
        db.add(user)
        db.commit()
        return user
    @staticmethod
    def admin_update_profile_user(dataform : admin_update , db : Session):
        user = db.query(User).filter( User.user_id == dataform.user_id ).first()
        if not user:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND)
        user.username = dataform.username
        user.email = dataform.email
        user.phone_number = dataform.phone_number
        user.address = dataform.address
        user.membership_status = dataform.membership_status
        db.commit()
        db.refresh(user)
        return user
    @staticmethod
    def delete_user( user_id , db : Session):
        user = db.query(User).filter( User.user_id == user_id).first()
        if not user:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND)
        db.delete(user)
        db.commit()
        return user




