from datetime import datetime
import uuid
import pytz
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.model.Products_Categories import Product
from app.model.addres_model import Address
from app.model.cart_model import Cart, CartItem
from app.model.model_orders import Orders, OrderItems
from app.model.users import User
from app.model.voucher_payment import Payment, Voucher
from app.schemas.payment import payment
from app.services.auth import AuthService
from app.services.cart import CartService

class PaymentService:
    @staticmethod
    def payment(
            form: payment,
            db: Session = Depends(get_db),
            token: str = Depends(AuthService.oauth2_scheme)
    ):
        current_user = AuthService.get_current_user(db, token)

        cart_items = (
            db.query(CartItem)
            .join(Cart, CartItem.cart_id == Cart.cart_id)
            .filter(Cart.user_id == current_user.user_id)
            .all()
        )

        if not cart_items:
            raise HTTPException(status_code=400, detail="Cart is empty.")

        address = Address(
            user_id=current_user.user_id,
            user_name=form.username,
            phone_number=form.phone_number,
            state=form.state,
            district=form.district,
            ward=form.ward,
            street=form.street,
            house_number=form.house_number
        )
        db.add(address)

        membership_discounts = {"Gold": 0.1, "Diamond": 0.15, "Silver": 0.05}
        discount_rate = membership_discounts.get(current_user.membership_status, 0)
        total_amount = sum(item.price_at_add * item.quantity for item in cart_items)
        discount_amount = total_amount * discount_rate
        total_amount -= discount_amount

        order = Orders(
            order_id=f"order{uuid.uuid4().hex[:8]}",
            user_id=current_user.user_id,
            total_amount=total_amount,
        )
        db.add(order)

        for item in cart_items:
            order_item = OrderItems(
                order_id=order.order_id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.price_at_add,
            )
            db.add(order_item)

        payment_record = Payment(
            user_id=current_user.user_id,
            order_id=order.order_id,
            amount=total_amount,
            payment_method=form.payment_method,
            status="Successful",  # Có thể thêm trạng thái khác nếu cần
        )
        db.add(payment_record)

        data = (db.query(CartItem , Product , Cart)
                .join(Product , Product.product_id == CartItem.product_id)
                .join(Cart , Cart.cart_id == CartItem.cart_id)
                .filter(Cart.user_id == current_user.user_id)
                .all())

        if not data:
            raise HTTPException(status_code=404, detail="No products found")

        result = {}
        local_timezone = pytz.timezone("Asia/Ho_Chi_Minh")
        local_time = datetime.now(local_timezone)

        result[order.order_id] = {
            "amount": total_amount,
            "date": local_time.isoformat(),  # Định dạng ISO với múi giờ
            "payment_method": payment_record.payment_method,
            "product": []
        }

        for item, product, cart in data:
            if not product:
                raise HTTPException(status_code=404, detail="Product not found or invalid.")
            result[order.order_id]["product"].append({
                "name": product.name,
                "image": product.image,
                "price": product.price,
                "quantity": item.quantity
            })

        CartService.delete_cart(db, token)
        db.commit()

        return result
