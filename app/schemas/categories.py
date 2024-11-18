from typing import List, Optional
from pydantic import BaseModel, Field


# Cơ sở dữ liệu Category
class CategoryBase(BaseModel):
    category_id: int  # Giả sử category_id là số nguyên
    category_name: str
    start_category: Optional[bool] = False
    parent_category: Optional[str] = None

    class Config:
        from_attribute = True  # Nếu sử dụng ORM, giúp chuyển đổi dữ liệu từ database về model dễ dàng


# Schema tạo mới category
class CategoryCreate(BaseModel):
    category_name: str
    start_category: Optional[bool] = False
    parent_category: Optional[str] = None


# Schema cập nhật category
class CategoryUpdate(BaseModel):
    category_name: Optional[str] = None
    start_category: Optional[bool] = False
    parent_category: Optional[str] = None


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
