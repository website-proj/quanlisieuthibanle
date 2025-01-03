from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.model.Banner_PopUp import Banner
from app.schemas.Banner import BannerCreate, BannerUpdate


class BannerService :
    def get_banner(db : Session):
        banner = db.query(Banner).all()
        if not banner :
            raise HTTPException(status_code=404, detail="Banner not found")
        return banner
    def create_banner(banner_form : BannerCreate, db : Session):
        banner = Banner(
            image = banner_form.image ,
            position = banner_form.position,
            status = banner_form.status,
            priority = banner_form.priority
        )
        db.add(banner)
        db.commit()
        return banner
    def update_banner(update_form : BannerUpdate, db : Session):
        banner = db.query(Banner).filter(Banner.banner_id == update_form.banner_id).first()
        if not banner :
            raise HTTPException(status_code=404, detail="Banner not found")
        banner.image = update_form.image
        banner.position = update_form.position
        banner.status = update_form.status
        banner.priority = update_form.priority
        banner.date_update= update_form.date_update
        db.commit()
        db.refresh(banner)
        return banner
    def delete_banner(banner_id : str , db : Session):
        banner = db.query(Banner).filter(Banner.banner_id == banner_id).first()
        if not banner :
            raise HTTPException(status_code=404, detail="Banner not found")
        db.delete(banner)
        db.commit()
        return banner
