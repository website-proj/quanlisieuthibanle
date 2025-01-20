from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.helper.login_manager import login_required, check_admin_role
from app.services.Order import OrderService
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.get("/get_all_order" , dependencies= [Depends(check_admin_role)])
def get_orders(db : Session = Depends(get_db)):
    order = OrderService.admin_get_all_order(db)

    return ResponseHandler.success("order response" , order)
@router.put("/update_order" , dependencies= [Depends(check_admin_role)])
def update_order(order_id : str , status : str , db : Session = Depends(get_db)):
    """
    'Processing', 'Delivered', 'Canceled'
    """
    order = OrderService.update_order_satatus(order_id, status, db)
    return ResponseHandler.success("order response" , order)
@router.get("/count" , dependencies= [Depends(check_admin_role)])
def count_orders(db : Session = Depends(get_db)):
    orders_count = OrderService.count_all_order(db)
    return {
        "orders_count": orders_count
    }