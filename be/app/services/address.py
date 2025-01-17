from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import current_user

from app.db.base import get_db
from app.model.addres_model import Address
from app.schemas.address import AddressCreate
from app.services.auth import AuthService


class AddressService:
    def create_address(address_form : AddressCreate , db : Session = Depends(get_db) ,token : str = Depends(AuthService.oauth2_scheme) ):
        current_user = AuthService.get_current_user(db , token)
        adress = Address(user_id = current_user.user_id , user_name = current_user.user_name,
                         house_number = address_form.house_number , street = address_form.street,
                         ward = address_form.ward , city = address_form.city ,
                         state = address_form.state , phone_number = address_form.phone_number)
        db.add(adress)
        db.commit()
        db.refresh(adress)
        return adress
    def update_address(address_form : AddressCreate , db : Session = Depends(get_db) , token : str= Depends(AuthService.oauth2_scheme) ):
        current_user = AuthService.get_current_user(db , token)
        address = db.query(Address).filter(Address.user_id == current_user.user_id).first()
        address.house_number = address_form.house_number
        address.street = address_form.street
        address.ward = address_form.ward
        address.city = address_form.city
        address.state = address_form.state
        address.phone_number = address_form.phone_number
        db.commit()
        db.refresh(address)
        return address



