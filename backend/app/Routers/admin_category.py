from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from starlette.status import HTTP_200_OK

from app.db.base import get_db
from app.model.Products_Categories import Category
from app.services.categories import CategoryService
from app.helper.login_manager import check_admin_role
from app.schemas.schema_category import CategoriesResponse, CategoryUpdate, SubCategoryCreate, parentCategoryCreate
from app.utils.responses import ResponseHandler

router = APIRouter()

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
@router.post("/sub_category" , dependencies=[Depends(check_admin_role)])
def create_subcategory(category_name : str = Form() , parent_category_id : str = Form(), db : Session = Depends(get_db)):
    cat = CategoryService.create_sub_category(category_name , parent_category_id ,  db)
    return ResponseHandler.success("query Success" ,cat)
@router.post("parent_category" , dependencies=[Depends(check_admin_role)])
def create_parent_category(category_name: str = Form(...) , file: UploadFile = File(...),db : Session = Depends(get_db)):
    cat = CategoryService.create_category(category_name,file , db)
    return ResponseHandler.success("query Success" ,cat)
@router.get("/all_subcategories" , dependencies=[Depends(check_admin_role)])
def get_all_subcategories_of_parent_Category(parent_category_id : str , db : Session = Depends(get_db)):
    cats = CategoryService.get_sub_category_of_parent_category(parent_category_id, db)
    if not cats :
        raise HTTPException(status_code= 400  , detail = "not cats found")
    return ResponseHandler.success("query Success" ,cats)
@router.get("/subcategories" , dependencies=[Depends(check_admin_role)])
def get_sub_category(cat_id : str , db : Session = Depends(get_db)):
    sub_cat = CategoryService.get_sub_categories(cat_id, db)
    return ResponseHandler.success("query Success" ,sub_cat)
@router.put("/subcategory" , dependencies=[Depends(check_admin_role)])
def update_subcategory(category_id : str  , category_name : Optional[str] = None,
                       parent_category_id  : Optional[str] = None, db : Session = Depends(get_db) ):
    cat_update = CategoryService.update_category(category_id , category_name , parent_category_id  ,  db)
    return ResponseHandler.success("update Success" ,cat_update)
@router.put("/parent_category" , dependencies=[Depends(check_admin_role)])
def update_parent_category(category_id  , category_name :Optional[str] = None,
                                file: Optional[UploadFile] = None, db : Session = Depends(get_db)):
    cat_update = CategoryService.update_parent_category(category_id , category_name ,file ,  db)
    return ResponseHandler.success("update Success" ,cat_update)
@router.delete("/sub_category" , dependencies= [Depends(check_admin_role)])
def delete_sub_category(sub_category_id : str , db : Session = Depends(get_db)):
    sub_category = CategoryService.delete_sub_category(sub_category_id, db)
    return ResponseHandler.success("delete Success" ,sub_category)
@router.delete("/parent_category" , dependencies=[Depends(check_admin_role)])
def delete_parent_category(parent_category_id : str, db : Session = Depends(get_db)):
    cat = CategoryService.delete_parent_category(parent_category_id, db)
    return ResponseHandler.success("delete Success" ,cat)

@router.get("count_category" , dependencies=[Depends(check_admin_role)])
def count_category(db : Session = Depends(get_db)):
    return CategoryService.count_category(db)
@router.get("sub_category")
def count_sub_category(db : Session = Depends(get_db)):
    return CategoryService.count_sub_category(db)
@router.get("/get_parent_categories" , dependencies=[Depends(check_admin_role)])
def get_parent_categories(db: Session = Depends(get_db)):
    categories = CategoryService.get_parent_categories(db)
    return ResponseHandler.success("query Success" ,categories)