from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.status import HTTP_200_OK

from app.db.base import get_db
from app.services.categories import CategoryService
from app.schemas.schema_category import CategoriesResponse

router = APIRouter()
# @router.get("/top10", status_code= HTTP_200_OK  , response_model= CategoriesResponse)  # Trả về 10 category đầu tiên
# def get_top_10_categories(db: Session = Depends(get_db)):
#     return CategoryService.get_top_10_categories(db)
@router.get("/sub_category")
def get_sub_categories(db: Session = Depends(get_db)):
    cat = CategoryService.get_all_sub_categories(db)
    return cat
@router.get("/parent_category")
def get_parent_category(db: Session = Depends(get_db)):
    cat = CategoryService.get_parent_categories(db)
    return cat
@router.get("/all_category")
def get_all_categories(db: Session = Depends(get_db)):
    cat = CategoryService.get_all_categories(db)
    return cat