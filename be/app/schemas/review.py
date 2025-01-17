from pydantic import BaseModel


class ReviewCreate(BaseModel):
    order_id : str
    product_id : str
    rating : int
    comment : str
    class Config:
        from_attributes = True