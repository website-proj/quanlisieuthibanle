from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.helper.login_manager import login_required
from app.model.voucher_payment import Payment
from app.services.auth import AuthService
from app.services.payment import PaymentService
from app.schemas.payment import payment
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.post("/",dependencies=[Depends(login_required)])
def create_payment(payment_form: payment ,db : Session = Depends(get_db),token : str = Depends(AuthService.oauth2_scheme)):
    payment = PaymentService.payment(payment_form,db,token)
    return ResponseHandler.success("successful",payment)
