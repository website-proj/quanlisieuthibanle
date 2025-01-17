import psycopg2
from faker import Faker
import random

# Kết nối đến PostgreSQL
conn = psycopg2.connect(
    host="127.0.0.1",
    database="db1",
    user="postgres",
    password="1"
)

cursor = conn.cursor()

fake = Faker()


# Hàm để tạo dữ liệu ngẫu nhiên cho bảng users
def insert_users(num):
    for _ in range(num):
        username = fake.user_name()
        email = fake.email()
        password = fake.password()
        phone_number = fake.phone_number()[:20]  # Cắt chuỗi để đảm bảo chiều dài không vượt quá 20 ký tự
        account_type = fake.random_element(['Basic', 'Premium', 'Admin'])
        membership_status = fake.random_element(['Silver', 'Gold', 'Diamond'])

        query = """
            INSERT INTO users (username, email, password, phone_number, account_type, membership_status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (username, email, password, phone_number, account_type, membership_status))


# Hàm để tạo dữ liệu ngẫu nhiên cho bảng addresses
def insert_addresses(n):
    for _ in range(n):
        user_id = random.randint(1, 1000)  # giả định user_id từ 1 đến 1000 đã có
        contact_method = 'phone'
        address_line_1 = fake.address()
        address_line_2 = fake.secondary_address()
        city = fake.city()
        state = fake.state()
        postal_code = fake.zipcode()
        country = fake.country()

        query = """INSERT INTO addresses (user_id, contact_method, address_line_1, address_line_2, city, state, postal_code, country)
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""
        cursor.execute(query,
                       (user_id, contact_method, address_line_1, address_line_2, city, state, postal_code, country))


# Hàm để tạo dữ liệu ngẫu nhiên cho bảng products
def insert_products(n):
    for _ in range(n):
        name = fake.word()
        description = fake.text()
        category_id = random.randint(1, 50)  # giả định category_id từ 1 đến 50 đã có
        stock_quantity = random.randint(1, 1000)
        image_url = fake.image_url()

        query = """INSERT INTO products (name, description, category_id, stock_quantity, image_url)
                   VALUES (%s, %s, %s, %s, %s)"""
        cursor.execute(query, (name, description, category_id, stock_quantity, image_url))


# Hàm để tạo dữ liệu ngẫu nhiên cho bảng orders
def insert_orders(n):
    for _ in range(n):
        user_id = random.randint(1, 1000)
        shipping_address_id = random.randint(1, 1000)
        status = random.choice(['Processing', 'Shipped', 'Delivered', 'Canceled'])
        total_amount = round(random.uniform(10, 1000), 2)
        discount_amount = round(random.uniform(0, total_amount), 2)

        query = """INSERT INTO orders (user_id, shipping_address_id, status, total_amount, discount_amount)
                   VALUES (%s, %s, %s, %s, %s)"""
        cursor.execute(query, (user_id, shipping_address_id, status, total_amount, discount_amount))


# Hàm để tạo dữ liệu ngẫu nhiên cho bảng payments
def insert_payments(n):
    for _ in range(n):
        user_id = random.randint(1, 1000)
        order_id = random.randint(1, 1000)
        amount = round(random.uniform(10, 1000), 2)
        payment_method = random.choice(['Credit Card', 'Debit Card', 'Paypal', 'Cash'])
        status = random.choice(['Completed', 'Pending', 'Failed'])

        query = """INSERT INTO payments (user_id, order_id, amount, payment_method, status)
                   VALUES (%s, %s, %s, %s, %s)"""
        cursor.execute(query, (user_id, order_id, amount, payment_method, status))


# Hàm để tạo dữ liệu ngẫu nhiên cho bảng carts
def insert_carts(n):
    for _ in range(n):
        user_id = random.randint(1, 1000)

        query = """INSERT INTO carts (user_id)
                   VALUES (%s)"""
        cursor.execute(query, (user_id,))


# Hàm để tạo dữ liệu ngẫu nhiên cho bảng cart_items
def insert_cart_items(n):
    for _ in range(n):
        cart_id = random.randint(1, 1000)
        product_id = random.randint(1, 1000)
        quantity = random.randint(1, 10)
        price = round(random.uniform(1, 100), 2)

        query = """INSERT INTO cart_items (cart_id, product_id, quantity, price)
                   VALUES (%s, %s, %s, %s)"""
        cursor.execute(query, (cart_id, product_id, quantity, price))


# Thực thi tất cả các hàm để tạo 1000 dòng cho mỗi bảng
def populate_database():
    insert_users(1000)
    insert_addresses(1000)
    insert_products(1000)
    insert_orders(1000)
    insert_payments(1000)
    insert_carts(1000)
    insert_cart_items(1000)
    conn.commit()  # Lưu các thay đổi vào cơ sở dữ liệu


# Gọi hàm để bắt đầu quá trình chèn dữ liệu
populate_database()

# Đóng kết nối
cursor.close()
conn.close()
