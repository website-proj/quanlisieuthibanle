from datetime import datetime
from typing import Optional

from fastapi import HTTPException, UploadFile
from fastapi.params import File, Depends

from sqlalchemy.orm import Session

from app.db.base import get_db
from app.model.Banner_PopUp import  Popup

from app.schemas.PopUp import PopUpCreate, PopUpUpdate
from app.services.uploadImage import UploadImage


class PopUpService:
    def get_popup(db: Session):
        popup = db.query(Popup).all()
        if not popup:
            raise HTTPException(status_code=404, detail="popup not found")
        return popup

    def create_popup( status: str, start_date: str, end_date: str,
                     file: UploadFile = File(...), db: Session = Depends(get_db)):
        try:
            # Chuyển đổi start_date và end_date sang datetime
            start_date_obj = datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%S")
            end_date_obj = datetime.strptime(end_date, "%Y-%m-%dT%H:%M:%S")

            # Kiểm tra logic ngày tháng
            if start_date_obj >= end_date_obj:
                raise HTTPException(status_code=400, detail="start_date must be earlier than end_date")

            # Upload ảnh
            image = UploadImage.upload_image(file)
            image_url = image["secure_url"]

            # Tạo Popup
            popup = Popup(
                status=status,
                start_date=start_date_obj,
                end_date=end_date_obj,
                image=image_url
            )
            db.add(popup)
            db.commit()
            db.refresh(popup)  # Refresh để cập nhật dữ liệu mới
            return popup
        except ValueError:
            raise HTTPException(status_code=400, detail="start_date and end_date must be in format YYYY-MM-DDTHH:MM:SS")
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    def update_popup(popup_id : str  , status : Optional[str]  = None , start_date : Optional[datetime]  = None ,
                     end_date : Optional[datetime] = None ,file : Optional[UploadFile] = None ,
        db: Session = Depends(get_db)):
        popup = db.query(Popup).filter(Popup.popup_id == popup_id  ).first()
        if not popup:
            raise HTTPException(status_code=404, detail="popup not found")
        try :
            if file :
                image = UploadImage.upload_image(file)
                image_url = image["secure_url"]
            else :
                image_url = None
            if start_date is not None and end_date is not None:
                start_date_obj = datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%S")
                end_date_obj = datetime.strptime(end_date, "%Y-%m-%dT%H:%M:%S")

                # Kiểm tra logic ngày tháng
                if start_date_obj >= end_date_obj:
                    raise HTTPException(status_code=400, detail="start_date must be earlier than end_date")
            # if start_date is None and end_date is not None :
            #     start_date = popup.start_date if popup.start_date is not None else None
            #     start_date_obj = datetime.strptime(popup.start_date if , "%Y-%m-%dT%H:%M:%S")
            #     end_date_obj = datetime.strptime(end_date, "%Y-%m-%dT%H:%M:%S")

                # Kiểm tra logic ngày tháng
                if start_date_obj >= end_date_obj:
                    raise HTTPException(status_code=400, detail="start_date must be earlier than end_date")
            popup.image = image_url if image_url is not None else popup.image
            popup.status = status if status is not None else popup.status
            popup.start_date = start_date if start_date is not None else popup.start_date
            popup.end_date = end_date if end_date is not None else popup.end_date
            popup.image = image_url
            db.commit()
            db.refresh(popup)
            return popup
        except ValueError:
            raise HTTPException(status_code=400, detail="start_date and end_date must be in format YYYY-MM-DDTHH:MM:SS")
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))





    def delete_popup(popup_id: str, db: Session):
        popup = db.query(Popup).filter(Popup.popup_id == popup_id).first()
        if not popup:
            raise HTTPException(status_code=404, detail="popup not found")
        db.delete(popup)
        db.commit()
        return popup
