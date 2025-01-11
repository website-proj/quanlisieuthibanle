from typing import List, Optional
from pydantic import BaseModel, Field


# Cơ sở dữ liệu Category
class CategoryBase(BaseModel):
    category_id: int  # Giả sử category_id là số nguyên
    category_name: str
    parent_category_id: Optional[str] = None

    class Config:
        from_attribute = True  # Nếu sử dụng ORM, giúp chuyển đổi dữ liệu từ database về model dễ dàng


# Schema tạo mới category
class SubCategoryCreate(BaseModel):
    image : str
    category_name: str
    parent_category_id: Optional[str] = None
class parentCategoryCreate(BaseModel):
    image : str
    category_name: str

# Schema cập nhật category
class CategoryUpdate(BaseModel):
    category_id: str
    image: str
    category_name: Optional[str] = None
    parent_category_id: Optional[str] = None


# Schema trả về category sau khi xử lý
class CategoryResponse(BaseModel):
    message: str
    data: CategoryBase


# Schema trả về nhiều category
class CategoriesResponse(BaseModel):
    message: str
    data: List[CategoryBase]


# Schema để xóa category
class CategoryDelete(BaseModel):
    category_id: int  # Thường sẽ là id kiểu int
    category_name: str
