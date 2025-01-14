from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import current_user

from app.db.base import get_db
from app.helper.login_manager import login_required
from app.services.auth import AuthService
from app.services.cart import CartService
from app.utils.responses import ResponseHandler
from app.schemas.schema_cart import CartItemCreate, CartItemUpdate

router = APIRouter()
# @router.post("/create_cart" , dependencies=[Depends(login_required)])
# def create_cart(token : str = Depends(AuthService.oauth2_scheme) , db : Session = Depends(get_db)):
#     """"
#     create a new cart
#     """
#     new_cart = CartService.create_cart(token , db )
#     return ResponseHandler.success("created cart" , new_cart)

@router.post("/" , dependencies=[Depends(login_required )])
def add_product_to_cart(cart_item : CartItemCreate , db : Session = Depends(get_db) , token :str = Depends(AuthService.oauth2_scheme)):

    cart_item = CartService.add_product_to_cart(cart_item , db , token)
    return ResponseHandler.success("added product to cart" , cart_item)
@router.get("/carts" , dependencies=[Depends(login_required )])
def get_all_cart_items(token : str = Depends(AuthService.oauth2_scheme),db  : Session = Depends(get_db)):
    """
    get all cart items
    """
    cart_items = CartService.get_all_cart_items(token , db)
    return ResponseHandler.success("success" , cart_items)
@router.put("/" , dependencies=[Depends(login_required )])
def update_product_quantity(  cart_update: CartItemUpdate,
    db: Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)):
    cart_item = CartService.update_product_quantity(cart_update, db , token)
    return ResponseHandler.success("updated cart item" , cart_item)
@router.delete("/cart_item" , dependencies=[Depends(login_required )])
def delete_cart_item( product_id , db : Session = Depends(get_db) , token  :str = Depends(AuthService.oauth2_scheme)):
    """
    xóa sản phẩm khỏi giỏ hàng
    """
    cart_item = CartService.delete_cart_item( product_id , db , token )
    return ResponseHandler.success("deleted cart item" , cart_item)
@router.delete("/cart" , dependencies=[Depends(login_required)])
def delete_cart( db : Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)):
    cart = CartService.deletet_all_items(db , token)
    return ResponseHandler.success("deleted cart" , cart)
@router.get("/totalPrice" , dependencies=[Depends(login_required )])
def get_total_price( db : Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)):
    total = CartService.total_price( db , token )
    return ResponseHandler.success("total price" , total)

@router.get("/count_product" ,dependencies=[Depends(login_required )])
def count_products_in_cart(db : Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)):
    count = CartService.count_product_in_cart(db , token)
    return ResponseHandler.success("count products" , count)
@router.get("/get_membership_status" , dependencies=[Depends(login_required )])
def get_membership_status(db : Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)):
    user = AuthService.get_current_user(db , token)
    member_ship = user.membership_status
    return member_ship


