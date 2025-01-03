import random
import uuid
from datetime import timedelta, datetime
from enum import Enum

from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.model.model_base import Base
from app.model.cart_model import Cart,CartItem
from app.model.Products_Categories import Product
from app.model.model_orders import Orders,OrderItems
from app.model.reviews import Reviews
from app.model.addres_model import Address
from app.model.users import User
from app.schemas.schema_order import Order


class Status(Enum):
    Processing = "Processing"
    Delivery = "Delivery"
    Cancelled = "Cancelled"
class DataService:
    def random_date(self,start_date , end_date):
        delta = end_date - start_date
        random_date = random.randint(0, delta.days)
        return start_date + timedelta(days=random_date)
    def create_order(self , db:Session):
        users = db.query(User).all()
        products = db.query(Product).all()
        list_order = []
        list_order_item = []
        for i in range(10000):
            random_user = random.choice(users)
            user_id = random_user.user_id
            order_id = f"order{uuid.uuid4().hex[:8]}"
            status = random.choice(["Processing","Delivered","Canceled"])
            start_date = datetime(2022 ,1,1)
            end_date = datetime(2024 ,12,31)
            order_date = self.random_date(start_date, end_date)
            order_date = order_date.strftime('%Y-%m-%d')
            total_amount = 0

            for j in range(3):
                order_item_id = f"order_item{uuid.uuid4().hex[:8]}"
                product = random.choice(products)
                product_id = product.product_id
                quantity = random.randint(1,5)
                price = quantity * product.price
                total_amount += price
                order_item = OrderItems(order_item_id = order_item_id ,order_id = order_id ,product_id = product_id ,
                                        quantity = quantity ,price = price )
                db.add(order_item)
                db.commit()
            order = Orders(order_id = order_id ,user_id =user_id , order_date = order_date ,
                          status = status ,total_amount =  total_amount )
            list_order.append(order)
            db.add(order)
            db.commit()

        return 1

    def main(self):
        with next(get_db()) as db :
            a = self.create_order(db)


if __name__ == '__main__':
    data = DataService()
    data.main()