import uuid
from datetime import datetime

from pygments.lexer import default
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum, Float, Integer
from sqlalchemy.orm import relationship
from app.model.model_base import Base
class Voucher(Base):
    __tablename__ = 'vouchers'
    voucher_id = Column(Integer, primary_key=True, default = lambda : f"voucher{uuid.uuid4()}")
    code = Column(String , unique=True , nullable=False)
    discount_rate = Column(Float, nullable=False)
    membership_required = Column(Enum("Silver", "Gold", "Diamond" , name = "membership_required"), nullable=False)
    start_date = Column(DateTime, nullable=False)
    expiration_date = Column(DateTime, nullable=False)
    usage_limit = Column(Integer, nullable=False)
    times_used = Column(Integer, nullable=False)
    status = Column(Enum("Active" , "InActive" , name = "status"), nullable=False)

    #relation ship
    payments = relationship("Payment", back_populates="voucher")
class Payment(Base):
    __tablename__ = 'payments'
    payment_id = Column(Integer, primary_key=True, nullable=False,default = lambda :f"payment{uuid.uuid4()}")
    user_id = Column(String(50), ForeignKey('users.user_id'), nullable=False)
    order_id = Column(String(50), ForeignKey('orders.order_id'), nullable=False)
    voucher_id = Column(String(50), ForeignKey('vouchers.voucher_id') , default = None)
    amount = Column(Float, nullable=False)
    payment_method = Column(Enum('Credit Card' , 'Debit Card' , 'Card' , name = "payment method"), nullable=False)
    payment_date = Column(DateTime, nullable=False , default = datetime.utcnow)
    status = Column(Enum('Successful', 'Failed', 'Pending',name = "status") , nullable=False)
    #relationship
    user = relationship('User', back_populates='payments')
    orders = relationship('Orders', back_populates='payments')
    voucher = relationship('Voucher', back_populates='payments')