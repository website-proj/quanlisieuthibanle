import jwt

from typing import Any, Union

from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.core.config import settings
from datetime import datetime, timedelta
from passlib.context import CryptContext

from app.db.base import get_db
from app.model.users import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(email: Union[str, Any] , db : Session = Depends(get_db)) -> str:
    expire = datetime.utcnow() + timedelta(
        seconds=settings.ACCESS_TOKEN_EXPIRE_SECONDS
    )
    user = db.query(User).filter(User.email == email).first()
    role = user.account_type
    to_encode = {

        "exp": expire, "email": str(email)  , "role" : role
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.SECURITY_ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
