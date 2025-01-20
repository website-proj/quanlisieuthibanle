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
@router.get("/revenue_12_month" , dependencies=[Depends(check_admin_role)])
def Revenue_12_month(db:Session = Depends(get_db)):
    chart = Chart()
    revenue =chart.revenue_last_12_months(db)
    return ResponseHandler.success("success" , revenue)
@router.get("/cost_12_month" , dependencies=[Depends(check_admin_role)])
def Cost_12_month(db:Session = Depends(get_db)):
    chart = Chart()
    cost = chart.cost_last_12_months(db)
    return ResponseHandler.success("success" , cost)
@router.get("/profit_12_month" , dependencies=[Depends(check_admin_role)])
def Profit_12_month(db:Session = Depends(get_db)):
    chart = Chart()
    profit = chart.profit_12_month(db)
    return ResponseHandler.success("success" , profit)
@router.get("/revenue_14_day" , dependencies=[Depends(check_admin_role)])
def Revenue_14_day(db:Session = Depends(get_db)):
    chart = Chart()
    revenue =chart.revenue_last_14_days(db)
    return ResponseHandler.success("success" , revenue)
@router.get("/cost_14_day" , dependencies=[Depends(check_admin_role)])
def Cost_14_day_last(db:Session = Depends(get_db)):
    chart = Chart()
    cost = chart.cost_last_14_days(db)
    return ResponseHandler.success("success" , cost)
@router.get("/profit_14_day" , dependencies=[Depends(check_admin_role)])
def Profit_14_day_last(db:Session = Depends(get_db)):
    chart = Chart()
    profit = chart.profit_14_days(db)
    return ResponseHandler.success("success" , profit)
@router.get("/Revenue_3_years",dependencies=[Depends(check_admin_role)])
def Revenue_3_years(db:Session = Depends(get_db)):
    chart = Chart()
    revenue  = chart.revenue_last_3_years(db)
    return ResponseHandler.success("success" , revenue)
@router.get("/cost_3_years" , dependencies=[Depends(check_admin_role)])
def Cost_3_years(db:Session = Depends(get_db)):
    chart = Chart()
    cost = chart.cost_last_3_years(db)
    return ResponseHandler.success("success" , cost)
@router.get("/profit_3_years" , dependencies=[Depends(check_admin_role)])
def Profit_3_years(db:Session = Depends(get_db)):
    chart = Chart()
    profit = chart.profit_3_years(db)
    return ResponseHandler.success("success" , profit)
@router.get("/user_create_14_day" , dependencies=[Depends(check_admin_role)])
def User_create_14_day(db:Session = Depends(get_db)):
    chart = Chart()
    user = chart.user_create_in_14_day(db)
    return ResponseHandler.success("success" , user)
@router.get("/user_create_12_month", dependencies=[Depends(check_admin_role)])
def User_create_12_month(db:Session = Depends(get_db)):
    chart = Chart()
    user = chart.user_create_in_12_month(db)
    return ResponseHandler.success("success" , user)
@router.get("/user_create_3_years", dependencies=[Depends(check_admin_role)])
def User_create_3_years(db:Session = Depends(get_db)):
    chart = Chart()
    user = chart.user_create_in_3_years(db)
    return ResponseHandler.success("success" , user)

