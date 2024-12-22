import uuid
from sqlalchemy import Column, String, Integer, Float, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship
from app.model.model_base import Base

# Base = model_base.Base
class Cart(Base):
    __tablename__ = "cart"
    cart_id = Column(String(50) , primary_key = True , unique = True , default=lambda: f"cart{uuid.uuid4().hex[:8]}")
    user_id  = Column(String(50) ,  ForeignKey("users.user_id" , ondelete= "CASCADE") , nullable = False)

    user = relationship("User" , back_populates = "cart" )

    cart_items = relationship("CartItem" , back_populates = "cart")
class CartItem(Base):
    __tablename__ = "cart_items"
    cart_item_id  = Column(String(50) , primary_key = True , unique = True , default=lambda: f"cart_item{uuid.uuid4().hex[:8]}")
    cart_id = Column(String(50) , ForeignKey("cart.cart_id" , ondelete= "CASCADE"),  nullable = False)
    product_id = Column(String(50) , ForeignKey("products.product_id" , ondelete = "CASCADE") , nullable= False)
    quantity = Column(Integer, nullable = True)
    price_at_add = Column(Float, nullable = True)
    added_date = Column(DateTime, default=func.now())

    cart = relationship("Cart", back_populates = "cart_items")
    products = relationship("Product", back_populates = "cart_items")