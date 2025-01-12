from fastapi import HTTPException, Depends, UploadFile
from fastapi.params import File

from sqlalchemy.orm import Session

from app.db.base import get_db
from app.model.Banner_PopUp import Banner
from app.schemas.Banner import BannerCreate, BannerUpdate
from app.services.uploadImage import UploadImage


class BannerService :
    def get_banner(db : Session):
        banner = db.query(Banner).all()
        if not banner :
            raise HTTPException(status_code=404, detail="Banner not found")
        return banner
    def create_banner(position : str , status : str , priority : int , file: UploadFile = File(...),db : Session = Depends(get_db)):
        try :
            image = UploadImage.upload_image(file)
            image_url = image["secure_url"]
            banner = Banner(
                image=image_url,
                position=position,
                status=status,
                priority=priority
            )
            db.add(banner)
            db.commit()
            return banner
        except Exception as e:
            raise e
    def update_banner(banner_id  , position : str , status : str , priority : int , file: UploadFile = File(...),db : Session = Depends(get_db)):
        banner = db.query(Banner).filter(Banner.banner_id == banner_id).first()
        if not banner :
            raise HTTPException(status_code=404, detail="Banner not found")
        try :
            image = UploadImage.upload_image(file)
            image_url = image["secure_url"]
            # update
            banner.image = image_url
            banner.position = position
            banner.status =status
            banner.priority = priority
            db.commit()
            db.refresh(banner)
            return banner
        except Exception as e:
            raise e
    def delete_banner(banner_id : str , db : Session):
        banner = db.query(Banner).filter(Banner.banner_id == banner_id).first()
        if not banner :
            raise HTTPException(status_code=404, detail="Banner not found")
        db.delete(banner)
        db.commit()
        return banner
