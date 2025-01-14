import uuid
from datetime import datetime

from sqlalchemy import Column, String, Enum, Integer, DateTime, Text, func

from app.model.model_base import Base


class Banner(Base):
    __tablename__ = 'banner'
    banner_id = Column(String(50) ,  primary_key=True, unique=True, default=lambda: f"banner{uuid.uuid4().hex[:8]}")
    image = Column(String(50) , nullable= True)
    status = Column(Enum("Active" , "Inactive", name = "banner_status") , nullable = False)
    position = Column(Enum("main" , "sidebar" , "bottom" , name  = "banner_position") )
    priority = Column(Integer)
    date_created = Column(DateTime , default=datetime.utcnow)
    date_updated = Column(DateTime , default=datetime.utcnow)

class Popup(Base):
    __tablename__ = 'popup'
    popup_id = Column(String(50) ,  primary_key=True, unique=True, default=lambda: f"popup{uuid.uuid4().hex[:8]}")
    image = Column(String(50) , nullable= False)
    content = Column(Text  )
    status = Column(Enum("Active" , "Inactive", name = "popup_status") , nullable = False)
    start_date = Column(DateTime , default=datetime.utcnow)
    end_date = Column(DateTime )
    date_created =  Column(DateTime,server_default=func.now())
    date_updated= Column(DateTime, server_default=func.now(),onupdate=func.now())


