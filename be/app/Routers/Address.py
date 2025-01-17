
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.helper.login_manager import login_required
from app.schemas.address import AddressCreate
from app.services.address import AddressService
from app.services.auth import AuthService
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.post('/' , dependencies=[Depends(login_required)])
def Create_address(address_form : AddressCreate , db : Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)):
    address = AddressService.create_address(address_form, db , token)
    if not address :
        raise HTTPException(status_code = 404 , detail = 'Not Found address' )
    return ResponseHandler.success( "success create" , address )

