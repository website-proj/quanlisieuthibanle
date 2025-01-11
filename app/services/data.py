import random
import string
import uuid
from datetime import timedelta, datetime
from enum import Enum

import unicodedata
from fastapi import Depends
from sqlalchemy.orm import Session
from app.services.address_data import AddressData
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
from app.core.security import get_password_hash
# from app.
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
        list_orders = []
        list_order_items = []
        try:
            for i in range(10000):
                # Tạo order
                random_user = random.choice(users)
                user_id = random_user.user_id
                order_id = f"order{uuid.uuid4().hex[:8]}"
                status = random.choice(["Processing", "Delivered", "Canceled"])

                start_date = datetime(2022, 1, 1)
                end_date = datetime(2024, 12, 31)
                order_date = self.random_date(start_date, end_date)
                order_date = order_date.strftime('%Y-%m-%d')

                total_amount = 0

                # Tạo order items
                for j in range(3):  # Mỗi order có 3 order_items
                    order_item_id = f"order_item{uuid.uuid4().hex[:8]}"
                    product = random.choice(products)
                    product_id = product.product_id
                    quantity = random.randint(1, 5)
                    price = quantity * product.price
                    total_amount += price

                    order_item = OrderItems(
                        order_item_id=order_item_id,
                        order_id=order_id,
                        product_id=product_id,
                        quantity=quantity,
                        price=price
                    )
                    list_order_items.append(order_item)

                # Thêm order vào danh sách
                order = Orders(
                    order_id=order_id,
                    user_id=user_id,
                    order_date=order_date,
                    status=status,
                    total_amount=total_amount
                )
                list_orders.append(order)

            db.add_all(list_orders)
            db.commit()

            db.add_all(list_order_items)
            db.commit()
        except Exception as e:
            raise e
    def read_user_data(self):
        file_path = r"D:\code\python\fastapi-base\database\hoten.txt"
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
        full_name = sur_name +" " + middle_name +" "+ name
        return full_name
    def remove_vietnamese_accents(self , text ):
        text = unicodedata.normalize('NFD', text)
        text = ''.join(char for char in text if unicodedata.category(char) != 'Mn')
        return text
    def email_random(self, name):
        name_processed = self.remove_vietnamese_accents(name).replace(' ', '').lower()
        random_str = "".join(random.choices(string.ascii_lowercase + string.digits, k=5))
        domain  = "@gmail.com"
        email = f"{name_processed}{random_str}{domain}"  # Loại bỏ dấu chấm
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
    def create_user_data(self , db:Session):
        for i in range(1000):
            user_id = f"user{uuid.uuid4().hex[:8]}"
            user_name = self.name_random()
            password = self.password_random()
            password_hashed = get_password_hash(password)
            email = self.email_random(user_name)
            gender = random.choice(["Male" , "Female" ,"Other"])
            phone_number = self.phone_number_random()
            address = "Hà Nội"
            start_date = datetime(2022 ,1,1)
            end_date = datetime(2024 ,12,31)
            date = self.random_date(start_date, end_date)
            user = User(
                user_id = user_id , username = user_name, password = password_hashed,
                email = email , gender = gender , phone_number = phone_number ,
                address = address , created_at = date
            )
            db.add(user)
            db.commit()
    def create_address_data(self , db:Session):
        users = db.query(User).all()
        for user in users :
            address_id = f"address_{uuid.uuid4().hex[:8]}"
            user_id = user.user_id
            user_name = user.username
            address_obj  = AddressData()
            address = address_obj.random_address()
            house_number = address.house_number
            street = address.street_name
            ward = address.ward_name
            district = address.district_name
            state = "Hà Nội"
            phone_number = self.phone_number_random()
            result = Address(
                address_id = address_id , user_id = user_id , user_name = user_name ,
                house_number = house_number ,
                street = street , ward = ward , district = district , state = state ,
                phone_number = phone_number
            )
            db.add(result)
            db.commit()
    def update_origin_price_of_product(self , db : Session):
        products = db.query(Product).all()
        for product in products:
            price = product.price
            bottom_price = price - price*0.4
            origin_price_random = random.choice([bottom_price, price])

            product.original_price = origin_price_random
            db.commit()
    # def add_cart_data(self , db : Session):
    #
    def add_reviews_data(self , db:Session):
        comments = [
            "Sản phẩm tuyệt vời, rất hài lòng!",
            "Giao hàng nhanh chóng, đóng gói cẩn thận.",
            "Chất lượng vượt xa mong đợi.",
            "Giá cả hợp lý, chất lượng xứng đáng.",
            "Sản phẩm đẹp, dùng rất thích.",
            "Sản phẩm chất lượng tốt, sẽ mua lại.",
            "Đóng gói chắc chắn, không bị hư hỏng.",
            "Màu sắc đẹp như trong hình ảnh.",
            "Chất liệu cao cấp, rất bền.",
            "Dễ sử dụng, tiện lợi cho công việc.",
            "Dịch vụ chăm sóc khách hàng tuyệt vời.",
            "Giao hàng đúng hẹn, rất hài lòng.",
            "Như mong đợi, chắc chắn sẽ giới thiệu cho bạn bè.",
            "Sản phẩm này xứng đáng với số tiền bỏ ra.",
            "Có thể cải thiện thêm về thiết kế, nhưng chất lượng tốt.",
            "Rất ưng ý với sản phẩm, sẽ ủng hộ lâu dài.",
            "Dễ dàng sử dụng và hiệu quả cao.",
            "Không có gì để phàn nàn, sản phẩm tuyệt vời.",
            "Mình đã thử qua nhiều sản phẩm nhưng đây là tốt nhất.",
            "Sản phẩm rất đáng tiền, tôi rất hài lòng."
        ]
        order_items_delivered = db.query(OrderItems ).join(
            Orders , Orders.order_id == OrderItems.order_id
        ).filter(Orders.status=="Delivered").all()
        for order_item in order_items_delivered:
            review_id = f"review{uuid.uuid4().hex[:8]}"
            product_id  = order_item.product_id
            order = db.query(Orders).filter(Orders.order_id == order_item.order_id).first()
            user_id = order.user_id
            rating = random.randint(1, 5)
            comment = random.choice(comments)
            start_date = datetime(2022 ,1,1)
            end_date = datetime(2024 ,12,31)
            review_date = self.random_date(start_date, end_date)
            review = Reviews(
                review_id = review_id , order_id = order.order_id ,
                product_id = product_id , user_id = user_id ,
                rating = rating , comment = comment , review_date = review_date
            )
            if not review :
                print("error")
                break
            db.add(review)
            db.commit()
    def add_voucher_data(self , db : Session):
        for i in range(1000):
            voucher_id = f"voucher{uuid.uuid4().hex[:8]}"
            code = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
            discount_rate = random.randint(0,25)
            membership_required = random.choice(["Silver" , "Gold" , "Diamond"])
            start_date  = self.random_date(datetime(2024 ,1,1), datetime(2024 ,6,29))
            expiration_date = self.random_date(datetime(2025 ,6,6), datetime(2025 ,12,31))
            usage_limit = random.randint(50,100)
            times_used = 0
            status = random.choice(["Active" , "Inactive"])
            voucher = Voucher(
                voucher_id = voucher_id , code = code ,discount_rate  = discount_rate ,
                membership_required = membership_required  , start_date = start_date ,
                expiration_date= expiration_date , usage_limit = usage_limit ,
                times_used = times_used , status = status
            )
            db.add(voucher)
            db.commit()
    def add_payment_data(self , db ):
        orders = db.query(Orders).filter(Orders.status=="Delivered").all()
        for order in orders:
            payment_id = f"payment{uuid.uuid4().hex[:8]}"
            user_id = order.user_id
            order_id = order.order_id
            voucher_id = None
            amount = order.total_amount
            payment_method = "Card"
            payment_date  = self.random_date(datetime(2024 ,1,6), datetime(2025 ,12,31))
            status = "Successful"
            payment = Payment(
                payment_id = payment_id,
                user_id = user_id ,
                order_id = order_id ,
                voucher_id = voucher_id ,
                amount = amount ,
                payment_method = payment_method ,
                payment_date = payment_date ,
                status = status
            )
            db.add(payment)
            db.commit()
    def cart_data(self , db):
        users = db.query(User).all()
        for user in users:
            cart_id = f"cart{uuid.uuid4().hex[:8]}"
            user_id = user.user_id
            cart = Cart(
                user_id = user_id ,
                cart_id = cart_id
            )
            db.add(cart)
            db.commit()
            for i in range(3):
                cart_item_id = f"cart_item{uuid.uuid4().hex[:8]}"
                cart_id = cart_id
                products = db.query(Product).all()
                product = random.choice(products)
                product_id = product.product_id
                quantity = random.randint(1,5)
                price_at_add = product.price * quantity
                added_date  = self.random_date(datetime(2024 ,1,6), datetime(2025 ,12,31))
                cart_item = CartItem(
                    cart_item_id = cart_item_id ,
                    cart_id = cart_id ,
                    product_id = product_id ,
                    quantity = quantity ,
                    price_at_add = price_at_add ,
                    added_date = added_date
                )
                db.add(cart_item)
                db.commit()
    def main(self):
        with next(get_db()) as db :
            # self.create_user_data(db)
            # self.create_address_data(db)
            self.create_order(db)
            # self.update_origin_price_of_product(db)
            # self.add_reviews_data(db)
            # self.add_voucher_data(db)
            # self.add_payment_data(db)
            # self.cart_data(db)
            # print("hello world")
if __name__ == '__main__':
    data = DataService()
    data.main()