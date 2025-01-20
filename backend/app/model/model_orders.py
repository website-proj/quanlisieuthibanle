import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum, Float, Integer
from sqlalchemy.orm import relationship
from app.model.model_base import Base

class Orders(Base):
    __tablename__ = "orders"
    order_id = Column(String(50), primary_key=True, unique=True, default=lambda: f"order{uuid.uuid4().hex[:8]}")
    user_id = Column(String(50), ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    order_date = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum("Processing", "Delivered", "Canceled", name="OrderStatus"), default="Processing")
    total_amount = Column(Float, nullable=True)

    # relationship
    user = relationship("User", back_populates="orders")
    order_items = relationship("OrderItems", back_populates="orders")
    reviews = relationship("Reviews", back_populates="orders")
    payments = relationship("Payment", back_populates="orders")
class OrderItems(Base):
    __tablename__ = "order_items"
    order_item_id = Column(String(50), primary_key=True, unique=True, default=lambda: f"order_item{uuid.uuid4().hex[:8]}")
    order_id = Column(String(50), ForeignKey('orders.order_id'), nullable=False)
    product_id = Column(String(50), ForeignKey('products.product_id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

    # relationship
    orders = relationship("Orders", back_populates="order_items")
    products = relationship("Product", back_populates="order_items")
