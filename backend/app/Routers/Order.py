from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.helper.login_manager import login_required
from app.services.Order import OrderService
from app.services.auth import AuthService
from app.utils.responses import ResponseHandler


router = APIRouter()
@router.post("/" , dependencies=[Depends(login_required)])
def create_order_from_cart(db : Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)):
    order = OrderService.create_order_from_cart(db , token)
    # return ResponseHandler.success("order created successfully " , order)
    return order
@router.get("/" , dependencies=[Depends(login_required)])
def get_orders(db : Session = Depends(get_db) , token : str = Depends(AuthService.oauth2_scheme)):
    orders = OrderService.get_orders(db , token)
    return ResponseHandler.success("orders " , orders)
@router.get("/{orders_id}" , dependencies=[Depends(login_required)])
def get_detail_order(order_id : str , db : Session = Depends(get_db)):
    detail_order = OrderService.detail_order(order_id, db )
    return detail_order
@router.delete("/{orders_id}" , dependencies=[Depends(login_required)])
def delete_order(order_id : str , db : Session = Depends(get_db)):
    order = OrderService.delete_order(order_id, db)
    return ResponseHandler.success("order delete success " , order)
