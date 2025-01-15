from datetime import datetime

from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import current_user
from starlette.responses import JSONResponse

from app.db.base import get_db
from app.model.Products_Categories import Product
from app.model.addres_model import Address
from app.model.cart_model import CartItem, Cart
from app.model.model_orders import Orders, OrderItems
from app.model.voucher_payment import Payment
from app.schemas.schema_order import OrderItemCreate, Order, OrderItem
from app.services.auth import AuthService
class OrderService:
    @staticmethod
    def create_order(db:Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)):
        current_user = AuthService.get_current_user(db , token)
        order = Orders(
            user_id = current_user.user_id
            # total = total
        )
        db.add(order)
        db.commit()
        db.refresh(order)
        return order
    def create_order_items(order_item_form : OrderItemCreate , db : Session = Depends(get_db) , token : str = AuthService.oauth2_scheme ):
        order = OrderItems(
            order_id = order_item_form.order_id,
            product_id = order_item_form.product_id,
            quantity = order_item_form.quantity,
            price = order_item_form.price
        )
        db.add(order)
        db.commit()
        db.refresh(order)
        return order
    @staticmethod
    def create_order_from_cart(db:Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)):
        curUser = AuthService.get_current_user(db , token)
        exist_cart = db.query(Cart).filter(Cart.user_id == curUser.user_id  ).first()
        if not exist_cart:
            raise HTTPException(status_code = 404 , detail = 'Cart not found')
        exist_cart_items = db.query(CartItem).filter(CartItem.cart_id == exist_cart.cart_id  ).all()
        if not exist_cart_items:
            raise HTTPException(status_code = 404 , detail = 'Cart item not found')
        order = OrderService.create_order(db , token)
        total = 0
        for cart_item in exist_cart_items:
            cart_item_form_create = OrderItemCreate(
                order_id = order.order_id,
                product_id = cart_item.product_id,
                quantity = cart_item.quantity,
                price = cart_item.price_at_add
            )
            cartItemCreate = OrderService.create_order_items(cart_item_form_create, db , token)
            total += cart_item.quantity * cart_item.price_at_add
            db.commit()
            db.refresh(cartItemCreate)
        update_order = db.query(Orders).filter(Orders.order_id == order.order_id).first()
        if update_order:
            update_order.total_amount = total
            db.commit()
            db.refresh(update_order)
        else:
            raise HTTPException(status_code=404, detail='Order not found for updating total amount')

        # Xóa giỏ hàng sau khi tạo đơn hàng
        db.delete(exist_cart)
        db.commit()

        return JSONResponse(
            status_code=200,
            content={
                "message": "Order created successfully",
                "data": {
                    "order_id": update_order.order_id,
                    "user_id": update_order.user_id,
                    "order_date": update_order.order_date.isoformat() if update_order.order_date else None,
                    "status": update_order.status,
                    "total_amount": update_order.total_amount
                }
            }
        )

    def get_orders(db: Session = Depends(get_db), token: str = Depends(AuthService.oauth2_scheme)):
        # Xác thực người dùng
        current_user = AuthService.get_current_user(db, token)

        # Truy vấn cơ sở dữ liệu
        data = db.query(OrderItems, Orders, Product).join(
            Orders, Orders.order_id == OrderItems.order_id
        ).join(
            Product, Product.product_id == OrderItems.product_id
        ).filter(
            Orders.user_id == current_user.user_id
        ).all()

        # Kiểm tra nếu không có dữ liệu
        if not data:
            raise HTTPException(status_code=404, detail="No orders found for this user.")

        # Xử lý dữ liệu
        result = {}
        for item, order, product in data:
            order_id = order.order_id
            if order_id not in result:
                result[order_id] = {
                    "order_status" : order.status,
                    "product": []
                }
            if product :
                result[order_id]["product"].append({
                    "quantity" : item.quantity,
                    "product_name" : product.name,
                    "image" : product.image,
                    "price" : product.price
                })
        return result

    @staticmethod
    def detail_order(order_id , db : Session) :
        order_items = db.query(OrderItems).filter(OrderItems.order_id == order_id).all()
        order = db.query(Orders).filter(Orders.order_id == order_id ).first()
        if not order :
            raise HTTPException(status_code=404, detail='Order not found')
        def datetime_to_String(dt):
            if isinstance(dt, datetime):
                return dt.isoformat()
            return dt
        order_data = Order(
            order_id = order.order_id,
            status = order.status,
            order_date = datetime_to_String(order.order_date),
            total_amount = order.total_amount,
            items = [OrderItem(order_item_id = order_item.order_item_id , order_id = order_item.order_id ,
                               product_id = order_item.product_id , price = order_item.price ,
                               quantity = order_item.quantity)
                     for order_item in order_items ]
        )
        # return order_item
        return JSONResponse(
            status_code = 200,
            content = order_data.dict()
        )
    @staticmethod
    def delete_order(order_id : str , db : Session = Depends(get_db) ):
        order = db.query(Orders).filter(Orders.order_id == order_id).first()
        status = order.status
        if status == "Delivered":
            raise HTTPException(status_code=404, detail="order delivered")
        if not order:
            raise HTTPException(status_code=404, detail='Order not found')
        order.status = "Canceled"
        db.commit()
        db.refresh(order)
        return order

    @staticmethod
    def admin_get_all_order(db: Session):
        # Truy vấn dữ liệu
        order_data = (
            db.query(Orders, OrderItems, Product, Address, Payment)
            .outerjoin(OrderItems, Orders.order_id == OrderItems.order_id)
            .outerjoin(Product, Product.product_id == OrderItems.product_id)
            .outerjoin(Address, Address.user_id == Orders.user_id)
            .outerjoin(Payment, Payment.order_id == Orders.order_id)
            .all()
        )

        # Tạo dictionary chứa dữ liệu đơn hàng
        result = {}
        for order, order_items, product, address, payment in order_data:
            order_id = order.order_id

            # Nếu chưa có order_id trong result, thêm mới
            if order_id not in result:
                result[order_id] = {
                    "order": {k: v for k, v in order.__dict__.items() if k != "_sa_instance_state"},
                    "products": [],
                    "address": (
                        {k: v for k, v in address.__dict__.items() if k != "_sa_instance_state"}
                        if address else None
                    ),
                    "payment": {
                        "payment_method": payment.payment_method if payment else None
                    },
                }

            # Thêm thông tin sản phẩm nếu tồn tại
            if product and order_items:
                result[order_id]["products"].append({
                    "product_id": product.product_id,
                    "product_name": product.name,
                    "quantity": order_items.quantity,
                    "price": product.price,
                    "total_amount": order_items.price,
                })

        return result

    @staticmethod
    def update_order_satatus(order_id : str , Status : str , db : Session):
        if Status != "Processing" and  Status != "Canceled" and Status != "Delivered":
            raise HTTPException(status_code=404, detail='incorect status')
        order = db.query(Orders).filter(Orders.order_id == order_id).first()
        order.status = Status
        db.commit()
        db.refresh(order)
        return order
    @staticmethod
    def count_all_order(db:Session):
        orders_count = db.query(Orders).count()
        if not orders_count:
            raise HTTPException(status_code=400 , detail= "order count not found")
        return orders_count
