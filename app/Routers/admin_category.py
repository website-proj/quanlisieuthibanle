from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.status import HTTP_200_OK

from app.db.base import get_db
from app.services.categories import CategoryService
from app.helper.login_manager import check_admin_role
from app.schemas.schema_category import CategoriesResponse, CategoryCreate, CategoryUpdate
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.post("/category",  dependencies=[Depends(check_admin_role)])
def create_category(category : CategoryCreate , db : Session = Depends(get_db) ):
    return CategoryService.create_category(category, db)
@router.get("/category" , dependencies=[Depends(check_admin_role)])
def get_parent_category(cat_id : str , db : Session = Depends(get_db)):
    """
    return parent category
    """
    try :
        parent_category = CategoryService.get_parent_category(cat_id, db)
        return ResponseHandler.success("query Success" ,parent_category)
    except Exception as e:
        raise e
@router.get("/subcategories" , dependencies=[Depends(check_admin_role)])
def get_sub_category(cat_id : str , db : Session = Depends(get_db)):
    sub_cat = CategoryService.get_sub_categories(cat_id, db)
    return ResponseHandler.success("query Success" ,sub_cat)
@router.put("/category" , dependencies=[Depends(check_admin_role)])
def update_category(cat_form_update : CategoryUpdate , db : Session = Depends(get_db) ):
    cat_update = CategoryService.update_category(cat_form_update, db)
    return ResponseHandler.success("update Success" ,cat_update)