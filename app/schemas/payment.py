from pydantic import BaseModel


class payment(BaseModel):
    order_id : str
    voucher_id : str
    payment_method : str
    class Config:
        from_attributes = True