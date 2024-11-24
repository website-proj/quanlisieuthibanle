from sqlalchemy import Column, String, Boolean, ForeignKey, Enum, Sequence
from sqlalchemy.dialects.mssql import TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import func
from sqlalchemy import Column, String, Integer, Float, Text, DateTime, Date, Boolean, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import func
from datetime import datetime

Base = declarative_base()

class account_type(str , Enum):
    Customer = "Customer"
    Admin = "Admin"
class membership_status(str, Enum):
    Gold = "Gold"
    Silver = "Silver"
    Bronze = "Bronze"
class User(Base):
    __tablename__ = 'users'

    user_id = Column(String(50) , primary_key=True , unique=True, nullable=False , default =
                     func.concat('user' , func.nextval(Sequence('user_id_seq'))))
    user_name = Column(String(50) , nullable = False)
    password = Column(String(50) , nullable = False)
    email = Column(String(50) , nullable = False)
    phone_number = Column(String(50) , nullable = False)
    address = Column(String(50) , nullable = False)
    account_type = Column(Enum(account_type) , default = account_type.Customer)
    membership_status = Column(Enum(membership_status) , default = membership_status.Gold)
    created_at = Column(TIMESTAMP, server_default= func.current_timestamp())
    updated_at = Column(TIMESTAMP, server_default= func.current_timestamp())



