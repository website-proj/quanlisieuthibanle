import jwt
from app.core.security import get_password_hash, verify_password
from fastapi import Depends , HTTPException
from fastapi.security import HTTPBearer

from sqlalchemy.orm import Session
from app.model.users import User
from app.schemas.schema_user import UserCreate

class UserService():
    def create_user(user : UserCreate , db : Session):
