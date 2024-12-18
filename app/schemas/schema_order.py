from pydantic import BaseModel


class BaseConfig(BaseModel):
    from_attributes = True
class OrderItemCreate(BaseModel):
    order_id : str
    product_id : str
    quantity : int
    price : float
    class Config(BaseConfig):
        pass