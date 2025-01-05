import random
import string
import uuid
from datetime import timedelta, datetime
from enum import Enum

import unicodedata
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
from app.model.voucher_payment import Payment,Voucher

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
    def read_file_address(self):
        result = []
        filepath = r"/database/address_data.sql"
        with (open(filepath , "rt" , encoding = "utf-8") as f) :
            lines = f.readlines()[2:]
            for line in lines:
                line = [str(i) for  i in line.strip().split(",")]
                newline = []

                for i in line :
                    a = ""
                    for j in i :
                        if j == "'"  or j == ")":
                            continue
                        a += j
                    newline.append(a)
                result.append(newline)
        return result
    def create_data_address(self , db : Session):
        # Addresses(address_id, user_id, house_number, street.txt, ward, district, city, state, phone_number)
        addresses = self.read_file_address()
        users = db.query(User).all()
        for user in users:
            # username = user.username
            for address in addresses:
                # if user.user_id == address[1]:
                user_address_id = address[1]
                username = user.username
                address_exist = db.query(Address).filter(Address.user_id == user_address_id).first()
                if address_exist:
                    continue

                address_id = f"address_{uuid.uuid4().hex[:8]}"
                house_number = address[2]
                street = address[3]
                ward = address[4]
                # district = address[5]
                city = address[6]
                state = address[7]
                phone_number = address[8]
                address = Address(
                    address_id=address_id, user_id=user_address_id, user_name=username, house_number=house_number,
                    street=street, ward=ward, city=city, state=state,
                    phone_number=phone_number
                )
                db.add(address)
                db.commit()
                break
    def read_user_data(self):
        file_path = r"/database/hoten.txt"
        sur_name  = []
        middle_name = []
        name  = []
        with open(file_path , 'rt' ,encoding=   "utf-8") as f:
            lines = f.readlines()[1:]
            for line in lines:
                line = [str(i) for i in line.strip().split()]
                sur_name.append(line[0])
                middle_name.append(line[1])
                name.append(line[2])
        return sur_name, middle_name, name

    def name_random(self):
        sur_name, middle_name, name = self.read_user_data()
        sur_name = random.choice(sur_name)
        middle_name = random.choice(middle_name)
        name = random.choice(name)
        full_name = sur_name + middle_name + name
        return full_name
    def remove_vietnamese_accents(self , text ):
        text = unicodedata.normalize('NFD', text)
        text = ''.join(char for char in text if unicodedata.category(char) != 'Mn')
        return text
    def email_random(self , name):
        name_processed = self.remove_vietnamese_accents(name).replace(' ','').lower()
        random_str = "".join(random.choices(string.ascii_lowercase + string.digits, k=5))
        domain  = "gmail.com"
        email = f"{name_processed}.{random_str}.{domain}"
        return email
    def password_random(self ):
        all_characters = string.ascii_letters + string.digits + string.punctuation

        password = [
            random.choice(string.ascii_lowercase),  # Chữ thường
            random.choice(string.ascii_uppercase),  # Chữ in hoa
            random.choice(string.digits),  # Số
            random.choice(string.punctuation)  # Ký tự đặc biệt
        ]
        password += random.choices(all_characters , k = 9)
        random.shuffle(password)
        return ''.join(password)
    def phone_number_random(self):
        valid_prefixes = [
            "032", "033", "034", "035", "036", "037", "038", "039",  # Viettel
            "070", "079", "077", "076", "078",  # Mobifone
            "083", "084", "085", "081", "082",  # Vinaphone
            "056", "058",  # Vietnamobile
            "059"  # Gmobile
        ]

        # Chọn một đầu số ngẫu nhiên
        prefix = random.choice(valid_prefixes)
        suffix = ''.join(random.choices("0123456789", k=7))
        phone_number = prefix + suffix
        return phone_number
    # def create_user_data(self):

    def main(self):
        with next(get_db()) as db :
            # a = self.create_order(db)
            # self.create_data_address(db)
            # data = self.read_file_address()
            # print(data)
            sur_name, middle_name, name = self.read_user_data()
            print(sur_name, middle_name, name)
if __name__ == '__main__':
    data = DataService()
    data.main()