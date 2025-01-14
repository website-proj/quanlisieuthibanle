

from fastapi import Depends, HTTPException
from redis.commands.search.reducers import quantile
from sqlalchemy.orm import Session
from starlette import status

from app.db.base import get_db
from app.model.Products_Categories import Product
from app.model.users import User
from app.schemas.schema_cart import CartItemCreate, CartItemUpdate
from app.model.cart_model import CartItem, Cart
from app.services.auth import AuthService


class CartService:
    @staticmethod
    def create_cart( token : str = Depends(AuthService.oauth2_scheme) , db : Session = Depends(get_db) ) :
        user = AuthService.get_current_user(db , token  )
        cart = Cart(user_id=user.user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
        return cart
    @staticmethod
    def add_product_to_cart(cart_item : CartItemCreate ,  db : Session , token : str = Depends(AuthService.oauth2_scheme)) :
        current_user = AuthService.get_current_user(db , token )
        exist_cart = db.query(Cart).filter(Cart.user_id == current_user.user_id).first()
        if not exist_cart:
            exist_cart = CartService.create_cart( token , db )
        exist_cart_item= db.query(CartItem).filter(CartItem.cart_id == exist_cart.cart_id , CartItem.product_id == cart_item.product_id).first()
        # if  exist_cart_item:
        #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='CartItem not found')
        product = db.query(Product).filter(Product.product_id == cart_item.product_id).first()
        if not product:
            raise HTTPException(status_code = 400 , detail = 'Product not found')
        product_price = product.price
        if exist_cart_item:
            exist_cart_item.quantity += cart_item.quantity
            exist_cart_item.price_at_add = product_price + exist_cart_item.price_at_add
            db.commit()
            db.refresh(exist_cart_item)
            return exist_cart_item
        cart_item = CartItem(cart_id = exist_cart.cart_id, product_id = cart_item.product_id
                             , quantity = cart_item.quantity , price_at_add = product_price  )
        db.add(cart_item)
        db.commit()
        db.refresh(cart_item)
        return cart_item
    @staticmethod
    def get_all_cart_items(  token : str = Depends(AuthService.oauth2_scheme) ,db : Session = Depends(get_db) ) :
        current_user =  AuthService.get_current_user(db , token)
        cart_items  = (db.query(CartItem ,Cart , Product).join(
            Cart , Cart.cart_id == CartItem.cart_id).join(
            Product , CartItem.product_id == Product.product_id
        ).filter(Cart.user_id == current_user.user_id).all())

        if not cart_items:
            raise HTTPException(status_code=404 , detail = "no products found")
        data = {}
        for cart_item , cart , product in cart_items:
            # cart_id = cart.cart_id
            product_id = product.product_id
            if product_id not in data:
                data[product_id] = {
                    "quantity" : 0,
                    "product" : []
                }
            data[product_id]["quantity"] += cart_item.quantity
            data[product_id]["product"].append(product)


        return data

    @staticmethod
    def update_product_quantity(cart_update : CartItemUpdate, db : Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme) ) :
        current_user = AuthService.get_current_user(db , token )
        exist_cart = db.query(Cart).filter(Cart.user_id == current_user.user_id).first()
        if not exist_cart:
            raise HTTPException(status_code=404 , detail = "no cart found")
        cart_item = db.query(CartItem).filter(CartItem.cart_id == exist_cart.cart_id , CartItem.product_id == cart_update.product_id).first()
        product = db.query(Product).filter(Product.product_id == cart_update.product_id).first()
        price = product.price
        if not cart_item:
            raise HTTPException(status_code=404, detail="No products found")
        cart_item.quantity = cart_update.quantity
        cart_item.price_at_add = price
        db.commit()
        db.refresh(cart_item)
        return cart_item
    @staticmethod
    def delete_cart_item(product_id : str , db : Session , token : str = Depends(AuthService.oauth2_scheme)) :
        cur_user = AuthService.get_current_user(db , token)
        cart_exist = db.query(Cart).filter(Cart.user_id == cur_user.user_id).first()
        if not cart_exist:
            raise HTTPException(status_code=404 , detail="no cart found")
        cart_item = db.query(CartItem).filter(CartItem.product_id == product_id , CartItem.cart_id == cart_exist.cart_id ).first()
        if not cart_item:
            raise HTTPException(status_code = 404 , detail = "No product found ")
        db.delete(cart_item)
        db.commit()
        return cart_item
    @staticmethod
    def deletet_all_items( db : Session  , token : str = Depends(AuthService.oauth2_scheme)) :
        cur_user = AuthService.get_current_user(db , token)
        cart_exist = db.query(Cart).filter(Cart.user_id == cur_user.user_id).first()
        cart_items = db.query(CartItem).filter(CartItem.cart_id == cart_exist.cart_id).all()
        if not cart_items:
            raise HTTPException(status_code = 404 , detail = "No products found")
        for cart_item in cart_items:
            db.delete(cart_item)
            db.commit()
        return cart_items
    @staticmethod
    def total_price( db: Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)) :
        current_user = AuthService.get_current_user(db , token )
        cart = db.query(Cart).filter(Cart.user_id == current_user.user_id).first()
        if not cart :
            raise HTTPException(status_code=404 , detail = "no cart found")
        cart_items = db.query(CartItem).filter(CartItem.cart_id == cart.cart_id ).all()
        if not cart_items:
            raise HTTPException(status_code = 404 , detail = "No cart_item found")
        total_price = 0
        for cart_item in cart_items:
            total_price += cart_item.price_at_add * cart_item.quantity
        return total_price
    @staticmethod
    def count_product_in_cart(db: Session , token : str = Depends(AuthService.oauth2_scheme)) :
        current_user = AuthService.get_current_user(db , token)
        data = db.query(CartItem , Cart).join(
            Cart , Cart.cart_id == CartItem.cart_id
        ).filter(Cart.user_id == current_user.user_id).all()
        result = {}
        if not data :
            raise HTTPException(status_code = 400 , detail = "no cart found")
        for cart_item  , cart in data :
            if not cart_item or not cart:
                continue
            cart_id = cart.cart_id
            if cart_id not in result :
                result[cart_id] = {
                    "quantity" : 0,
                }
            result[cart_id]["quantity"] += cart_item.quantity
        return result



    @staticmethod
    def get_bill(db:Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)) :
        user = AuthService.get_current_user(db , token)
        data = db.query(CartItem , Cart , User , Product ).join(
            Cart , Cart.cart_id == CartItem.cart_id
        ).join(
            User , User.user_id == Cart.user_id
        ).join(
            Product , Product.product_id == CartItem.product_id
        ).filter(User.user_id == user.user_id).all()
        if not data:
            raise HTTPException(status_code=404 , detail = "no cart found")
        result = {}
        for cart_item  , cart , user , product in data :
            cart_id = cart.cart_id
            quantity = cart_item.quantity
            old_price = product.old_price*quantity
            price = cart_item.price_at_add*quantity
            money_save =  old_price -price
            membership_discount = {"Gold" :0.1, "Diamond" :0.15 , "Silver":0.05}
            user_membership = user.membership_status
            discount = price*membership_discount[user_membership]
            actually_paid = price - discount
            if cart_id not in result :
                result[cart_id]={
                    "total" : 0,
                    "money saved" : 0 ,
                    "discount" : 0 ,
                    "actually paid" : 0
                }
            result[cart_id]["total"] += price
            result[cart_id]["money saved"] += money_save
            result[cart_id]["discount"] += discount
            result[cart_id]["actually paid"] += actually_paid
        return result




