-- Tạo các kiểu ENUMCREATE TYPE membership_status_type AS ENUM ('Silver', 'Gold', 'Diamond');CREATE TYPE account_type AS ENUM ('Customer', 'Admin');CREATE TYPE order_status_type AS ENUM ('Processing', 'Delivered', 'Canceled');CREATE TYPE payment_status_type AS ENUM ('Successful', 'Failed', 'Pending');CREATE TYPE voucher_status_type AS ENUM ('Active', 'Inactive');CREATE TYPE payment_method AS ENUM ('Credit Card', 'Debit Card', 'Card');CREATE TYPE membership_required_type AS ENUM ('Silver', 'Gold', 'Diamond');-- Tạo bảng UsersCREATE TABLE Users (    user_id VARCHAR(50) PRIMARY KEY ,    username VARCHAR(50) NOT NULL,    password VARCHAR(255) NOT NULL,    email VARCHAR(100) NOT NULL UNIQUE,    phone_number VARCHAR(15),    address VARCHAR(255),    account_type account_type DEFAULT 'Customer',    membership_status membership_status_type DEFAULT 'Silver',    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);-- Tạo bảng CategoriesCREATE TABLE Categories (    category_id VARCHAR(50) PRIMARY KEY ,    category_name VARCHAR(100) NOT NULL,    parent_category_id VARCHAR(50),    star_category BOOLEAN DEFAULT FALSE,    FOREIGN KEY (parent_category_id) REFERENCES Categories(category_id) ON DELETE SET NULL);-- Tạo bảng ProductsCREATE TABLE Products (    product_id VARCHAR(50) PRIMARY KEY ,    name VARCHAR(100) NOT NULL,    name_brand VARCHAR(100),    description TEXT,    price DECIMAL(10, 2) NOT NULL,    old_price DECIMAL(10, 2),    discount DECIMAL(5, 2) CHECK (discount >= 0 AND discount <= 100),    unit VARCHAR(50),    stock_quantity INT DEFAULT 0,    category_id VARCHAR(50),    image VARCHAR(255),    is_active BOOLEAN DEFAULT TRUE,    star_product BOOLEAN DEFAULT FALSE,    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    expiration_date DATE,    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE SET NULL);-- Tạo bảng OrdersCREATE TABLE Orders (    order_id VARCHAR(50) PRIMARY KEY ,    user_id VARCHAR(50),    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    status order_status_type DEFAULT 'Processing',    total_amount DECIMAL(10, 2) NOT NULL,    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE);-- Tạo bảng Order_ItemsCREATE TABLE Order_Items (    order_item_id VARCHAR(50) PRIMARY KEY ,    order_id VARCHAR(50),    product_id VARCHAR(50),    quantity INT NOT NULL,    price DECIMAL(10, 2) NOT NULL,    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE SET NULL);-- Tạo bảng PaymentsCREATE TABLE Payments (    payment_id VARCHAR(50) PRIMARY KEY ,    user_id VARCHAR(50),    order_id VARCHAR(50),    voucher_id VARCHAR(50),    amount DECIMAL(10, 2) NOT NULL,    payment_method payment_method,    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    status payment_status_type DEFAULT 'Pending',    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL,    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE SET NULL,    FOREIGN KEY (voucher_id) REFERENCES Vouchers(voucher_id) ON DELETE SET NULL);-- Tạo bảng VouchersCREATE TABLE Vouchers (    voucher_id VARCHAR(50) PRIMARY KEY ,    code VARCHAR(50) NOT NULL UNIQUE,    discount_rate DECIMAL(5, 2) NOT NULL,    membership_required membership_required_type,    start_date DATE,    expiration_date DATE,    usage_limit INT DEFAULT 1,    times_used INT DEFAULT 0,    status voucher_status_type DEFAULT 'Active');-- Tạo bảng CartCREATE TABLE Cart (    cart_id VARCHAR(50) PRIMARY KEY ,    user_id VARCHAR(50),    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE);-- Tạo bảng Cart_ItemsCREATE TABLE Cart_Items (    cart_item_id varchar(50) primary key ,    cart_id VARCHAR(50),    product_id VARCHAR(50),    quantity INT NOT NULL,    price_at_add DECIMAL(10, 2),    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id) ON DELETE CASCADE,    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE SET NULL);-- Tạo bảng ReviewsCREATE TABLE Reviews (    review_id VARCHAR(50) PRIMARY KEY ,    product_id VARCHAR(50),    user_id VARCHAR(50),    rating INT CHECK (rating BETWEEN 1 AND 5),    comment TEXT,    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL);-- Tạo bảng AddressesCREATE TABLE Addresses (    address_id VARCHAR(50) PRIMARY KEY ,    user_id VARCHAR(50),    house_number VARCHAR(50),    street VARCHAR(255),    ward VARCHAR(100),    district VARCHAR(100),    city VARCHAR(100),    state VARCHAR(100),    phone_number VARCHAR(15),    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE);