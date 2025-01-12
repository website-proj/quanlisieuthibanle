from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.helper.login_manager import check_admin_role
from app.schemas.PopUp import PopUpCreate, PopUpUpdate
from app.services.PopUp import PopUpService
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.get("/")
def get_pop_up(db:Session=Depends(get_db)):
    popup = PopUpService.get_popup(db)
    return ResponseHandler.success("PopUp" , popup)

@router.post("/" , dependencies=[Depends(check_admin_role)])
def create_pop_up(form : PopUpCreate , db : Session = Depends(get_db)):
    popup = PopUpService.create_popup(form,db)
    return ResponseHandler.success("PopUp create successfully" , popup)
@router.delete("/" , dependencies=[Depends(check_admin_role)])
def delete_pop_up(popup_id : str ,db : Session=Depends(get_db)):
    popup = PopUpService.delete_popup(popup_id , db)
    return ResponseHandler.success("PopUp delete successfully" , popup)
@router.put("/" , dependencies=[Depends(check_admin_role)])
def update_pop_up(form : PopUpUpdate , db : Session = Depends(get_db)):
    popup = PopUpService.update_popup(form , db)
    return ResponseHandler.success("PopUp update successfully" , popup)
