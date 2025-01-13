from datetime import datetime
from typing import Optional

from pydantic import BaseModel, validator


# from app.model.users import account_type , membership_status
class BaseConfig:
    from_attributes = True
class userBase(BaseModel):
    user_id : str
    username :str
    password :str
    email : str
    # phone_number : str
    account_type : str
    membership_status: str
    created_at : datetime
    updated_at : datetime
    class Config :
        from_attributes = True
class admin_update(BaseModel):
    user_id : str
    username : str
    email : str
    phone_number : str
    membership_status : str
    address : str
    gender : str
    class Config(BaseConfig) :
        pass
class UserCreateRequest(BaseModel):
    username :str
    gender : str
    phone_number: str
    email :str
    password : str
    address: str
    # account_type : account_type = account_type.Customer
class UserRegisterRequest(BaseModel):
    username : str
    email : str
    password : str
    class Config(BaseConfig):
        pass
    # add phone , address
    # phone_number : str
    # address : str
class UserOut(BaseModel):
    # message :str
    user_id : str
    username : str
    email : str
    phone_number : str
    address : str
    membership_status : str
    class Config(BaseConfig):
        pass
class login(BaseModel):
    email : str
    password: str
    class Config(BaseConfig):
        pass
class userUpdateRequest(BaseModel):
    username : Optional[str] = None
    email : Optional[str] = None
    phone_number : Optional[str]=None
    address : Optional[str]=None
    gender : Optional[str]=None

    @validator('*', pre=True)
    def empty_string_to_none(cls, value):
        if value == "":
            return None
        return value
    class Config(BaseConfig):
        pass
class passwordChangeRequest(BaseModel):
    old_password : str
    new_password : str