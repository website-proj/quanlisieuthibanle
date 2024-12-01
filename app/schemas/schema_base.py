from typing import Optional, TypeVar, Generic
from pydantic import BaseModel

T = TypeVar("T")

# Lớp cơ sở chung cho tất cả các phản hồi
class ResponseSchemaBase(BaseModel):
    code: str = '000'
    message: str = 'Thành công'

    def custom_response(self, code: str, message: str):
        self.code = code
        self.message = message
        return self

    def success_response(self):
        self.code = '000'
        self.message = 'Thành công'
        return self


# Lớp Response dùng cho dữ liệu chi tiết, hỗ trợ kiểu dữ liệu linh hoạt
class DataResponse(ResponseSchemaBase, Generic[T]):
    data: Optional[T] = None

    class Config:
        arbitrary_types_allowed = True

    def custom_response(self, code: str, message: str, data: T):
        self.code = code
        self.message = message
        self.data = data
        return self

    def success_response(self, data: T):
        self.code = '000'
        self.message = 'Thành công'
        self.data = data
        return self


# Lớp metadata
class MetadataSchema(BaseModel):
    current_page: int
    page_size: int
    total_items: int
