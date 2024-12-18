from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CartItemCreate(BaseModel):
    product_id: str
    quantity: int

    class Config:
        from_attributes = True

class CartItemUpdate(BaseModel):
    product_id: str
    quantity: int

    class Config:
        from_attributes = True


