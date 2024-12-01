import uuid

from sqlalchemy import Column, String, DateTime , Boolean, ForeignKey, Enum, Sequence
# from sqlalchemy.dialects.mssql import TIMESTAMP
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import func
from datetime import datetime

Base = declarative_base()

# Định nghĩa Sequence cho user_id
user_id_seq = Sequence('user_id_seq', metadata=Base.metadata)

class account_type(str, Enum):
    Customer = "Customer"
    Admin = "Admin"

class membership_status(str, Enum):
    Gold = "Gold"
    Diamond = "Diamond"
    Silver = "Silver"


class User(Base):
    __tablename__ = 'users'

    # Sử dụng func.concat để kết hợp tiền tố "user" với giá trị tự động tăng
    user_id = Column(String(50), primary_key=True, unique=True, default=lambda: f"user{uuid.uuid4().hex[:8]}")
    username = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False)
    phone_number = Column(String(50), nullable = True)
    address = Column(String(50) , nullable = True)
    account_type = Column(Enum(account_type.Customer , account_type.Admin ), default=account_type.Customer)
    membership_status = Column(Enum(membership_status.Silver,membership_status.Gold,membership_status.Diamond), default=membership_status.Silver)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at =  Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
