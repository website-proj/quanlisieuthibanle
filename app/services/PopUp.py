from datetime import datetime
from typing import Optional

from fastapi import HTTPException, UploadFile, Form
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

    def create_popup(status: str, start_date: str, end_date: str,
                     file: UploadFile = File(...), db: Session = Depends(get_db)):
        try:
            # Chuyển đổi start_date và end_date sang datetime chỉ có ngày
            start_date_obj = datetime.strptime(start_date, "%Y-%m-%d").date()
            end_date_obj = datetime.strptime(end_date, "%Y-%m-%d").date()

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

    def update_popup(popup_id: str = Form(...),
                     status: Optional[str]  =None ,
                     start_date: Optional[str] = None ,
                     end_date: Optional[str] = None ,
                     file: Optional[UploadFile] = None , db: Session = Depends(get_db)):
        # Lấy popup từ cơ sở dữ liệu
        popup = db.query(Popup).filter(Popup.popup_id == popup_id).first()

        if not popup:
            raise HTTPException(status_code=404, detail="Popup not found")

        try:
            # Xử lý file nếu có
            if file:
                image = UploadImage.upload_image(file)
                image_url = image["secure_url"]
            else:
                image_url = popup.image  # Nếu không có file, sử dụng ảnh cũ trong cơ sở dữ liệu

            # Xử lý ngày tháng nếu có
            if start_date and end_date:
                start_date_obj = datetime.strptime(start_date, "%Y-%m-%d")
                end_date_obj = datetime.strptime(end_date, "%Y-%m-%d")
                if start_date_obj >= end_date_obj:
                    raise HTTPException(status_code=400, detail="start_date must be earlier than end_date")
            else:
                start_date_obj = popup.start_date if not start_date else datetime.strptime(start_date, "%Y-%m-%d")
                end_date_obj = popup.end_date if not end_date else datetime.strptime(end_date, "%Y-%m-%d")

            # Cập nhật dữ liệu
            popup.status = status if status is not None else popup.status
            popup.start_date = start_date_obj if start_date is not None  else popup.start_date
            popup.end_date = end_date_obj if end_date is not None  else popup.end_date
            popup.image = image_url

            # Cập nhật cơ sở dữ liệu
            db.commit()
            db.refresh(popup)

            return popup

        except ValueError:
            raise HTTPException(status_code=400, detail="start_date and end_date must be in format YYYY-MM-DD")
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    def delete_popup(popup_id: str, db: Session):
        popup = db.query(Popup).filter(Popup.popup_id == popup_id).first()
        if not popup:
            raise HTTPException(status_code=404, detail="popup not found")
        db.delete(popup)
        db.commit()
        return popup
