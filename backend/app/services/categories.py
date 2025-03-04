from typing import Optional

from fastapi import HTTPException, UploadFile, File, Depends
from fastapi.params import Form
from sqlalchemy.orm import Session, aliased
from starlette import status

from app.db.base import get_db
from app.model.Products_Categories import Category, Product
from app.schemas.schema_category import CategoryUpdate, SubCategoryCreate
from app.services.uploadImage import UploadImage
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
    def create_category( category_name: str = Form(...), file: UploadFile = File(...), db : Session = Depends(get_db)):
        try:
            # Upload ảnh
            image_url = UploadImage.upload_image(file)
            image_url = image_url["secure_url"]
            # Tạo category mới
            new_category = Category(
                category_name=category_name,
                image=image_url,
                parent_category_id=None
            )

            db.add(new_category)
            db.commit()
            db.refresh(new_category)
            return new_category
        except Exception as e:
            raise e
    @staticmethod
    def create_sub_category(category_name : str = Form() , parent_category_id : str = Form()
            , db : Session = Depends(get_db)):
        try :
            # image_url = UploadImage.upload_image(file)
            # image_url = image_url["secure_url"]
            parent_cat = db.query(Category).filter(Category.category_id== parent_category_id).first()
            if not parent_cat:
                raise HTTPException(status_code = 404 , detail="Parent category not found")
            new_cat = Category(
                category_name = category_name ,
                # image = image_url ,
                parent_category_id = parent_category_id
            )
            if not new_cat :
                raise HTTPException(status_code = 404 , detail="Sub category not found")
            db.add(new_cat)
            db.commit()

            return new_cat
        except Exception as e :
            raise e
    @staticmethod
    def get_parent_category( cat_id, db):
        category = db.query(Category).filter(Category.category_id == cat_id).first()
        parent_category= db.query(Category).filter(Category.category_id == category.parent_category_id).first()
        if not parent_category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return parent_category

    @staticmethod
    def get_sub_categories (cat_id, db):
        sub_categories = db.query(Category).filter(Category.category_id == cat_id).first()
        if not sub_categories:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return sub_categories

    @staticmethod
    def update_category( category_id : str , category_name :Optional[str] , parent_category_id  :  Optional[str]
                         ,   db : Session = Depends(get_db)):
        category = db.query(Category).filter(Category.category_id == category_id).first()
        try :
            if not category:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
            category.category_name = category_name if category_name is not None else category.category_name
            # category.image = img_url
            category.parent_category_id = parent_category_id if parent_category_id is not None else category.parent_category_id
            db.commit()
            db.refresh(category)
            return category
        except Exception as e :
            raise e
    @staticmethod
    def update_parent_category( category_id : str  , category_name :Optional[str] = None,
                                file: Optional[UploadFile] = None, db : Session = Depends(get_db)):
        category = db.query(Category).filter(Category.category_id == category_id).first()
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        if category.parent_category_id != None :
            raise HTTPException(status_code = 404 , detail = "not parent category")
        try :

            if file   :
                image = UploadImage.upload_image(file)
                url_image = image["secure_url"]
            else :
                url_image = None
            #update
            category.category_name = category_name if category_name is not None else category.category_name
            category.image = url_image if url_image is not None else category.image
            db.commit()
            db.refresh(category)
            return category
        except Exception as e :
            raise e
    @staticmethod
    def get_sub_category_of_parent_category( cat_id : str , db : Session):
        cats = db.query(Category).filter(Category.parent_category_id == cat_id).all()
        if not cats:
            raise HTTPException(status_code= 404 , detail="Category not found")
        return cats

    @staticmethod
    def delete_sub_category(sub_category_id: str, db: Session):
        cat = db.query(Category).filter(Category.category_id == sub_category_id).first()
        if not cat:
            raise HTTPException(status_code=404, detail="Category not found")

        try:
            # Xóa toàn bộ sản phẩm liên quan trong một lệnh
            db.query(Product).filter(Product.category_id == sub_category_id).delete()
            db.delete(cat)  # Xóa danh mục con
            db.commit()
            return cat
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=f"Error deleting sub-category: {str(e)}")

    @staticmethod
    def delete_parent_category(parent_category_id: str, db: Session):
        parent_category = db.query(Category).filter(Category.category_id == parent_category_id).first()
        if not parent_category:
            raise HTTPException(status_code=404, detail="Category not found")

        try:
            # Lấy tất cả danh mục con
            sub_categories = db.query(Category).filter(Category.parent_category_id == parent_category_id).all()
            # Xóa danh mục cha
            db.delete(parent_category)
            # Xóa từng danh mục con
            for sub_cat in sub_categories:
                CategoryService.delete_sub_category(sub_cat.category_id, db)
            db.commit()
            return parent_category
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=f"Error deleting parent category: {str(e)}")

    @staticmethod
    def count_category(db : Session):
        return db.query(Category).filter(Category.parent_category_id == None).count()
    @staticmethod
    def count_sub_category( db : Session):
        return db.query(Category).filter(Category.parent_category_id != None).count()
    @staticmethod
    def get_parent_categories(db : Session):
        categories = db.query(Category).filter(Category.parent_category_id == None).all()
        if not categories:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return categories
    @staticmethod
    def get_all_sub_categories(db : Session):
        categories = db.query(Category).filter(Category.parent_category_id != None).all()
        if not categories:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return categories
    @staticmethod
    def get_all_categories(db:Session):
        sub_cat = aliased(Category)
        parent_cat = aliased(Category)
        data = db.query(sub_cat, parent_cat).join(
            parent_cat, parent_cat.category_id == sub_cat.parent_category_id
        )
        result = {}
        if not data :
            raise HTTPException(status_code=404 , detail="Category not found")
        for sub , parent in data :
            parent_name = parent.category_name
            if parent_name not in result:
                result[parent_name] = []
            result[parent_name].append(sub)
        return result

