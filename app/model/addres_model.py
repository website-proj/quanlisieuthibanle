import uuid
from typing import Optional

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

from app.model.model_base import Base


class Address(Base):
    __tablename__ = 'address'
    address_id = Column(String(50) ,   primary_key=True, unique=True, default=lambda: f"address{uuid.uuid4().hex[:8]}")
    user_id  = Column(String(50) , ForeignKey('users.user_id'), nullable=False)
    user_name = Column(String(50) , nullable=False)
    house_number = Column(String(50) , nullable=False)
    street = Column(String(50) , nullable=False)
    ward : Optional[str] = Column(String(50) , nullable=False)
    district = Column(String(50) , nullable=False)
    state = Column(String(50) , nullable=False)
    phone_number = Column(String(50) , nullable=False)

    #relation ship

    user = relationship('User', back_populates='addresses')

