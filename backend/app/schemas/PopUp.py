from datetime import datetime

from pydantic import BaseModel


class PopUpCreate(BaseModel):
    image : str

    status : str
    start_date : datetime
    end_date : datetime

    class Config :
        from_attributes = True
class PopUpUpdate(BaseModel):
    popup_id : str
    image: str

    status: str
    start_date : datetime
    end_date : datetime
    date_update : datetime