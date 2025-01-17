from pydantic import BaseModel


class payment(BaseModel):
    username: str
    phone_number:str
    state : str
    district : str
    ward : str
    street : str
    house_number : str
    # voucher_id : str
    payment_method : str
    class Config:
        from_attributes = True