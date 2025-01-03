from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.helper.login_manager import check_admin_role
from app.schemas.Banner import BannerCreate, BannerUpdate
from app.services.Banner import BannerService
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.get("/",dependencies=[Depends(check_admin_role)])
def get_all_banner(db : Session = Depends(get_db)):
    banner = BannerService.get_banner(db)
    return ResponseHandler.success("banner",banner)
@router.post("/",dependencies=[Depends(check_admin_role)])
def create_banner(banner: BannerCreate , db : Session = Depends(get_db)):
    banner = BannerService.create_banner(banner,db)
    # return banner
    return ResponseHandler.success("banner create successfully",banner)
@router.put("/",dependencies=[Depends(check_admin_role)])
def update_banner(banner: BannerUpdate , db : Session = Depends(get_db)):
    banner = BannerService.update_banner(banner,db)
    return ResponseHandler.success("banner update successfully",banner)
@router.delete("/",dependencies=[Depends(check_admin_role)])
def delete_banner(banner_id : str , db : Session = Depends(get_db)):
    banner = BannerService.delete_banner(banner_id,db)
    return ResponseHandler.success("banner delete successfully",banner)



