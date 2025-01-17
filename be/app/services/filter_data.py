from app.db.base import get_db
from app.model.Products_Categories import Product
from app.model.model_base import Base
from app.model.cart_model import Cart,CartItem
from app.model.Products_Categories import Product
from app.model.model_orders import Orders,OrderItems
from app.model.reviews import Reviews
from app.model.addres_model import Address
from app.model.users import User
class User:
    def __init__(self , user_id ,username , password , email , phone_number ,
                 address  , account_type , membership_status ,
                 create_at , updated_at):
        self.user_id = user_id
        self.username = username
        self.password = password
        self.email = email
        self.phone_number = phone_number
        self.address = address
        self.gender = "male"
        self.account_type = account_type
        self.membership_status = membership_status
        self.create_at = create_at
        self.updated_at = updated_at
class main :
    def filter(self):
        data = dict()
        result = []
        filename = r"D:\code\python\fastapi-base\database\user_add_data.sql"
        with open(filename , "rt" , encoding = "utf-8") as f :
            lines = f.readlines()[1:]
            for line in lines :
                line = [str(i) for i in line.strip().split(",")]
                user_id = line[0]
                username = line[1]
                password = line[2]
                email = line[3]
                phone_number = line[4]
                address = line[5]
                # gender = line[6]
                account_type = line[6]
                membership_status = line[7]
                create_at = line[8]
                updated_at = line[9]
                user = User(user_id ,username , password , email , phone_number ,
                 address  , account_type , membership_status ,
                 create_at , updated_at)
                if email in data:
                    result.append(user)
                    continue
                data[email] = user

        return result
    def product(self):
        filepath = r"D:\code\python\fastapi-base\database\product_add_data.sql"
        with (open(filepath , "rt" , encoding = "utf-8") as f) :
            lines = f.readlines()[4:]
            for line in lines :
                line = [str(i) for i in line.strip().split(",")]
                product_id=line[0]
                name = line[1]
                name_brand = line[2]
                description = line[3]
                price  = line[4]
                old_price =line[5]
                discount = line[6]
                unit =line[7]
                stock_quantity = line[8]
                category_id = line[9]
                image = line[10]
                is_active = line[11]
                star_product = line[12]
                date_created =line[13]
                updated_at  = line[14]
                expiration_date = line[15]
                product = Product( product_id = product_id, name =  name, name_brand= name_brand, description =description, price =price,old_price = old_price, discount = discount,
    unit =unit,stock_quantity= stock_quantity,category_id= category_id,image= image,star_product= star_product,date_created= date_created,updated_at= updated_at,expiration_date= expiration_date)
                with next(get_db()) as db:
                    db.add(product)
                    db.commit()
                    continue
                # print(product)
    def main(self):
        # self.filter()
        # user_exist = self.filter()
        # if not user_exist :
        #     print("not found")
        # for user in user_exist :
        #     print(user.email)
        self.product()
if __name__ == '__main__':
    app = main()
    app.main()