from datetime import datetime

from pydantic import BaseModel
class userBase(BaseModel):
    user_id : str
    user_name :str
    password :str
    email : str
    phone_number : str
    account_type : str
    membership_status:str
    created_at : datetime
    updated_at : datetime
    class Config :
        from_attributes = True
class UserCreate(BaseModel):
    user_name :str
    email :str
    password : str
    phone_number :str
