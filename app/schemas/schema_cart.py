from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CartItemCreate(BaseModel):
    cart_id: str
    product_id: str
    quantity: int

    class Config:
        from_attributes = True

class CartItemUpdate(BaseModel):
    cart_id: str
    product_id: str
    quantity: int

    class Config:
        from_attributes = True


