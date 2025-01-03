import uuid
from sqlalchemy import Column, String, DateTime ,  Enum
from datetime import datetime
from sqlalchemy.orm import relationship
from app.model.model_base import Base

class User(Base):
    __tablename__ = "users"

    # Sử dụng func.concat để kết hợp tiền tố "user" với giá trị tự động tăng
    user_id = Column(String(50), primary_key=True, unique=True, default=lambda: f"user{uuid.uuid4().hex[:8]}")
    username = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False)
    phone_number = Column(String(50), nullable = True)
    address = Column(String(50) , nullable = True)
    gender = Column(String(50) , nullable = True)
    account_type = Column(Enum("Admin" , "Customer" , name = "account_type"), default="Customer")
    membership_status = Column(Enum("Gold" , "Diamond" , "Silver", name="membership_status_enum"), default="Silver")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at =  Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    #relationship
    cart = relationship("Cart" , back_populates="user")
    orders = relationship("Orders" , back_populates="user")
    addresses = relationship("Address" , back_populates="user")
    reviews = relationship("Reviews" , back_populates="user")
    payments = relationship("Payment" , back_populates="user")