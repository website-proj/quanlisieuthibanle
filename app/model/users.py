import uuid
from sqlalchemy import Column, String, DateTime , Boolean, ForeignKey, Enum, Sequence
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.orm import relationship

from app.model.model_base import Base

# Base = model_base.Base


# class account_type(str, Enum):
#     Customer = "Customer"
#     Admin = "Admin"
#
# class membership_status(str, Enum):
#     Gold = "Gold"
#     Diamond = "Diamond"
#     Silver = "Silver"


class User(Base):
    __tablename__ = 'users'

    # Sử dụng func.concat để kết hợp tiền tố "user" với giá trị tự động tăng
    user_id = Column(String(50), primary_key=True, unique=True, default=lambda: f"user{uuid.uuid4().hex[:8]}")
    username = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False)
    phone_number = Column(String(50), nullable = True)
    address = Column(String(50) , nullable = True)
    account_type = Column(Enum("Admin" , "Customer" , name = "account_type"), default="Customer")
    membership_status = Column(Enum("Gold" , "Diamond" , "Silver", name="membership_status_enum"), default="Silver")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at =  Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    cart = relationship("Cart" , back_populates="user")