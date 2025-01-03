from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.model.Banner_PopUp import  Popup

from app.schemas.PopUp import PopUpCreate, PopUpUpdate


class PopUpService:
    def get_popup(db: Session):
        popup = db.query(Popup).all()
        if not popup:
            raise HTTPException(status_code=404, detail="popup not found")
        return popup

    def create_popup(popup_form: PopUpCreate, db: Session):
        popup = Popup(
            image=popup_form.image,
            content = popup_form.content,
            status = popup_form.status,
            start_date =  popup_form.start_date,
            end_date = popup_form.end_date
        )
        db.add(popup)
        db.commit()
        return popup

    def update_popup(update_form: PopUpUpdate, db: Session):
        popup = db.query(Popup).filter(Popup.popup_id == update_form.popup_id).first()
        if not popup:
            raise HTTPException(status_code=404, detail="popup not found")
        popup.image = update_form.image
        popup.content = update_form.content
        popup.status = update_form.status
        popup.start_date = update_form.start_date
        popup.end_date = update_form.end_date
        popup.date = update_form.date
        db.commit()
        return popup

    def delete_popup(popup_id: str, db: Session):
        popup = db.query(Popup).filter(Popup.popup_id == popup_id).first()
        if not popup:
            raise HTTPException(status_code=404, detail="popup not found")
        db.delete(popup)
        db.commit()
        return popup
