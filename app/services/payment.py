from datetime import datetime

from alembic.command import current
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.model.model_orders import Orders
from app.model.users import User
from app.model.voucher_payment import Payment,Voucher
from app.schemas.payment import payment
from app.services.auth import AuthService


class PaymentService:
    def payment(form : payment , db :Session = Depends(get_db) ,
                token : str = Depends(AuthService.oauth2_scheme) ):
        current_user = AuthService.get_current_user(db,token)
        user_id = current_user.user_id
        order_id = form.order_id
        voucher_id = form.voucher_id
        order = db.query(Orders).filter(Orders.order_id == order_id)
        amount = order.total_amount
        payment_method = form.payment_method
        payment = Payment(
            user_id = user_id ,
            order_id = order_id,
            voucher_id = voucher_id,
            amount = amount ,
            payment_method = payment_method,
            payment_date = datetime.utcnow(),
            status = "Successful"
        )
        db.add(payment)
        db.commit()
        return payment
