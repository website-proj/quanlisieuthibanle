from pydantic import BaseModel


class AddressCreate(BaseModel):
    house_number: str
    street: str
    ward: str
    city: str
    state: str
    phone_number: str
    class Config:
        from_attributes = True

