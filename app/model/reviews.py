import uuid
from datetime import datetime

from sqlalchemy import Column, String, ForeignKey, Integer, Text, DateTime
from sqlalchemy.orm import relationship

from app.model.model_base import Base


class Reviews(Base):
    __tablename__ = "reviews"
    review_id = Column(String(50) ,   primary_key=True, unique=True, default=lambda: f"review{uuid.uuid4().hex[:8]}")
    product_id = Column(String(50) , ForeignKey('products.product_id',ondelete='CASCADE') , nullable= False)
    user_id = Column(String(50) , ForeignKey('users.user_id',ondelete='CASCADE') , nullable = False)
    order_id = Column(String(50) , ForeignKey('orders.order_id',ondelete='CASCADE') , nullable = False)
    rating = Column(Integer)
    comment = Column(Text)
    review_date = Column(DateTime , default=datetime.utcnow)
    # relationship
    products = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")
    orders = relationship("Orders", back_populates="reviews")
    

