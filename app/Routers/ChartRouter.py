from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.helper.login_manager import  check_admin_role
from app.services.chart import Chart
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.get("/count_child" , dependencies=[Depends(check_admin_role)])
def Count_child_category_of_parent_category(db:Session = Depends(get_db)):
    cat = Chart.Count_child_category_of_parent_category(db)
    return ResponseHandler.success("success" , cat)
@router.get("/revenue_category" , dependencies=[Depends(check_admin_role)])
def Revenue_category(db:Session = Depends(get_db)):
    income = Chart.sum_revenue_of_child_category(db)
    return ResponseHandler.success("success" , income )
@router.get("/count_products_of_category" , dependencies=[Depends(check_admin_role)])
def Count_products_of_category(db:Session = Depends(get_db)):
    cat = Chart.count_product_by_category(db)
    return ResponseHandler.success("success" , cat)
