from pydantic import BaseModel , validator , Field
from datetime import datetime
from typing import List , Optional , ClassVar
from app.schemas.schema_category import CategoryBase

# base model
class BaseConfig:
    from_attributes = True
class ProductBase(BaseModel ):
    product_id :str
    name : str
    name_brand :str
    description :str
    price : float
    old_price : Optional[float] = None
    discount : float
    unit :str
    stock_quantity : int = Field(0)
    image : str
    star_product : bool = Field(False)
    # date_create :datetime
    # update_at : datetime
    expiration_date : datetime
    category_id : str
    # category : CategoryBase

    @validator('discount', pre=True)
    def validate_discount(cls, v):
        if v < 0 or v > 100:
            raise ValueError('Discount must be between 0 and 100')
        return v
    class Config:
        # orm_mode = True
        from_attributes = True
class ProductCreate(BaseModel):
    name: str
    name_brand: str
    description: str
    price: float
    old_price: Optional[float] = None
    discount: float
    unit: str
    stock_quantity: int = Field(0)
    image: str
    star_product: bool = Field(False)
    expiration_date: datetime
    category_id: str
class ProductResponse(BaseModel):
    message:str
    data : ProductBase
class ProductsResponse(BaseModel):
    message:str
    data: List[ProductBase]

    class Config:
        from_attributes = True
class ProductUpdate(BaseModel):
    product_id: str
    name: str
    name_brand: str
    description: str
    price: float
    old_price: Optional[float] = None
    discount: float
    unit: str
    stock_quantity: int = Field(0)
    image: str
    star_product: bool = Field(False)
    expiration_date: datetime
    category_id: str