from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.status import HTTP_200_OK

from app.db.base import get_db
from app.services.categories import CategoryService
from app.schemas.categories import CategoriesResponse

router = APIRouter(tags = ["Category"]  , prefix = "/categories")
@router.get("/top10", status_code= HTTP_200_OK  , response_model= CategoriesResponse)  # Trả về 10 category đầu tiên
def get_top_10_categories(db: Session = Depends(get_db)):
    return CategoryService.get_top_10_categories(db)
