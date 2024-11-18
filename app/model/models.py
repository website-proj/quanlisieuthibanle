from sqlalchemy import Column, String, Boolean, ForeignKey
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

class Category(Base):
    __tablename__ = 'Categories'

    category_id = Column(String(50), primary_key=True, unique=True, default=func.concat('cat', func.nextval('category_id_seq')))
    category_name = Column(String(100), nullable=False)
    parent_category_id = Column(String(50), ForeignKey('Categories.category_id'))
    star_category = Column(Boolean, default=False)

    # Sửa lại relationship và thêm primaryjoin
    parent_category = relationship("Category",
                                   backref="subcategories",
                                   remote_side=[category_id],
                                   primaryjoin="Category.parent_category_id == Category.category_id")

    def __repr__(self):
        return f"<Category(category_id={self.category_id}, category_name={self.category_name})>"

class Product(Base):
    __tablename__ = 'products'

    product_id = Column(String(50), primary_key=True, unique=True,
                            default=func.concat('prod', func.nextval('product_id_seq')))
    name = Column(String(100), nullable=False)
    name_brand = Column(String(100))
    description = Column(Text)
    price = Column(Float, nullable=False)
    old_price = Column(Float)
    discount = Column(Float, CheckConstraint('discount >= 0 AND discount <= 100'))
    unit = Column(String(50))
    stock_quantity = Column(Integer, default=0)
    image = Column(String(255))
    is_active = Column(Boolean, default=True)
    star_product = Column(Boolean, default=False)
    date_created = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    expiration_date = Column(Date)
    category_id = Column(String(50), ForeignKey('Categories.category_id'))

    category = relationship("Category", backref="products")

    def __repr__(self):
        return f"<Product(product_id={self.product_id}, name={self.name}, category_id={self.category_id})>"
