import uuid
from sqlalchemy import Column, String, Float, Text, DateTime, Date, Boolean, Integer, Enum, Sequence, CheckConstraint, \
    ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy import func

from app.model.model_base import Base





class Category(Base):
    __tablename__ = 'categories'

    # Sử dụng UUID cho category_id
    category_id = Column(String(50), primary_key=True, unique=True, default=lambda: f"cat{uuid.uuid4().hex[:8]}")
    category_name = Column(String(100), nullable=False)
    parent_category_id = Column(String(50), ForeignKey('categories.category_id'))
    star_category = Column(Boolean, default=False)

    # Sửa lại relationship và thêm primaryjoin
    products = relationship("Product" , back_populates= "category")
    def __repr__(self):
        return f"<Category(category_id={self.category_id}, category_name={self.category_name})>"

class Product(Base):
    __tablename__ = 'products'

    # Sử dụng UUID cho product_id
    product_id = Column(String(50), primary_key=True, unique=True, default=lambda: f"prod{uuid.uuid4().hex[:8]}")
    name = Column(String(100), nullable=False)
    name_brand = Column(String(100))
    description = Column(Text)
    price = Column(Float, nullable=False)
    old_price = Column(Float)
    discount = Column(Float, CheckConstraint('discount >= 0 AND discount <= 100'))
    unit = Column(String(50))
    stock_quantity = Column(Integer, default=0)
    image = Column(String(255))
    date_created = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    expiration_date = Column(Date)
    star_product = Column(Boolean , default=False)
    category_id = Column(String(50), ForeignKey('categories.category_id'))

    #relationship
    category = relationship("Category", back_populates="products")
    cart_items  =  relationship("CartItem", back_populates="products")
    order_items = relationship("OrderItems", back_populates="products")
    def __repr__(self):
        return f"<Product(product_id={self.product_id}, name={self.name}, category_id={self.category_id})>"

