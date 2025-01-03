from datetime import datetime

from pydantic import BaseModel


class BannerCreate(BaseModel):
    image : str
    status : str
    position : str
    priority : int
    class Config :
        from_attributes = True
class BannerUpdate(BaseModel):
    banner_id : str
    image: str
    status: str
    position: str
    priority: int
    date_update : datetime
    class Config :
        from_attributes = True