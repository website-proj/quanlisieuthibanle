from typing import Optional

from fastapi import APIRouter, Depends, UploadFile
from fastapi.params import File

from sqlalchemy.orm import Session

from app.db.base import get_db
from app.helper.login_manager import check_admin_role
from app.schemas.Banner import BannerCreate, BannerUpdate
from app.services.Banner import BannerService
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.get("/")
def get_all_banner(db : Session = Depends(get_db)):
    banner = BannerService.get_banner(db)
    return ResponseHandler.success("banner",banner)
@router.get("/main")
def get_main_banner(db:Session=Depends(get_db)):
    banner = BannerService.get_main(db)
    return ResponseHandler.success("banner main",banner)
@router.get("/sidebar")
def get_sidebar_banner(db:Session=Depends(get_db)):
    banner = BannerService.get_sidebar(db)
    return ResponseHandler.success("banner sidebar",banner)
@router.get("/bottom")
def get_bottom_banner(db:Session=Depends(get_db)):
    banner = BannerService.get_bottom(db)
    return ResponseHandler.success("banner bottom",banner)
@router.post("/",dependencies=[Depends(check_admin_role)])
def create_banner(position : str , status : str , priority : int , file: UploadFile = File(...),db : Session = Depends(get_db)):
    banner = BannerService.create_banner(position , status , priority , file ,db)
    return ResponseHandler.success("banner create successfully",banner)
@router.put("/",dependencies=[Depends(check_admin_role)])
def update_banner(banner_id :str  , position : Optional[str] = None  , status : Optional[str] = None  ,
                  priority : Optional[int] = None , file: UploadFile = File(...),db : Session = Depends(get_db)):
    banner = BannerService.update_banner(banner_id , position , status , priority , file ,db)
    return ResponseHandler.success("banner update successfully",banner)
@router.delete("/",dependencies=[Depends(check_admin_role)])
def delete_banner(banner_id : str , db : Session = Depends(get_db)):
    banner = BannerService.delete_banner(banner_id,db)
    return ResponseHandler.success("banner delete successfully",banner)



