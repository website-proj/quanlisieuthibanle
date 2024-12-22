from datetime import datetime
from typing import List

from pydantic import BaseModel


class BaseConfig:
    from_attributes = True
class OrderItemCreate(BaseModel):
    order_id : str
    product_id : str
    quantity : int
    price : float
    class Config(BaseConfig):
        pass
class OrderItem(BaseModel):
    order_item_id : str
    order_id : str
    product_id : str
    quantity : int
    price : float
    class Config(BaseConfig):
        pass
class Order(BaseModel):
    order_id : str
    status : str
    order_date : str
    total_amount : float
    items : List[OrderItem]
    class Config(BaseConfig):
        pass
class StatusUpdate(BaseModel):
    order_id : str
    status : str