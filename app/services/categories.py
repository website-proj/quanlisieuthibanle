from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from app.model.Products_Categories import Category
from app.schemas.schema_category import CategoryCreate, CategoryUpdate
from app.utils.responses import ResponseHandler

class CategoryService:

    # Lấy 10 category đầu tiên
    @staticmethod
    def get_top_10_categories(db: Session):
        categories = db.query(Category).order_by(Category.category_id.asc()).limit(10).all()  # Lấy 10 category đầu tiên

        if not categories:
            return ResponseHandler.not_found_error("Category", "top 10")

        return ResponseHandler.success("Top 10 categories fetched successfully", categories)
    @staticmethod
    def create_category(category : CategoryCreate , db : Session):
        category = Category(category_name=category.category_name , star_category= category.star_category , parent_category_id= category.parent_category_id)
        db.add(category)
        db.commit()
        db.refresh(category)
        return category

    @staticmethod
    def get_parent_category( cat_id, db):
        category = db.query(Category).filter(Category.category_id == cat_id).first()
        parent_category= db.query(Category).filter(Category.category_id == category.parent_category_id).first()
        if not parent_category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return parent_category

    @staticmethod
    def get_sub_categories (cat_id, db):
        sub_categories = db.query(Category).filter(Category.parent_category_id == cat_id).all()
        if not sub_categories:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return sub_categories

    @staticmethod
    def update_category( cat_form_update : CategoryUpdate, db):
        category = db.query(Category).filter(Category.category_id == cat_form_update.category_id).first()
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        category.category_id = cat_form_update.category_id
        category.category_name = cat_form_update.category_name
        category.star_category = cat_form_update.star_category
        category.parent_category_id = cat_form_update.parent_category_id
        db.commit()
        db.refresh(category)
        return category



