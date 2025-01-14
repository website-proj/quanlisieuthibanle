from fastapi import Depends, HTTPException
from sqlalchemy.orm import  Session


from app.db.base import get_db
from app.model.model_orders import Orders, OrderItems
from app.model.reviews import Reviews
from app.schemas.review import ReviewCreate
from app.services.auth import AuthService


class ReviewsService:
    @staticmethod
    def create_reviews(reviews_form : ReviewCreate , db : Session = Depends(get_db) ,
                       token : str = Depends(AuthService.oauth2_scheme)):
        user = AuthService.get_current_user(db , token)
        product_id = reviews_form.product_id
        order_id = reviews_form.order_id
        order = db.query(Orders).filter(Orders.order_id == order_id).first()
        if not order :
            raise HTTPException(status_code=404, detail="Order not found")
        reviews_exist = db.query(Reviews).filter(Reviews.order_id == order_id, Reviews.product_id == product_id).first()
        if reviews_exist:
            raise HTTPException(status_code=409, detail="Review already exists")
        if order.status == "Delivered":
            review = Reviews(
                product_id = product_id ,
                user_id = user.user_id ,
                order_id = order_id ,
                rating = reviews_form.rating,
                comment = reviews_form.comment
            )
            db.add(review)
            db.commit()
            db.refresh(review)
            return review
        else :
            raise HTTPException(status_code=403, detail="Not Authorized")
    @staticmethod
    def count_reviews_of_product(product_id , db : Session):
        product_count = db.query(Reviews).filter(Reviews.product_id == product_id).count()
        return product_count
    @staticmethod
    def number_of_reviews_product_by_user(product_id : str , db : Session = Depends(get_db) , tonken : str = Depends(AuthService.oauth2_scheme)):
        current_user = AuthService.get_current_user(db , tonken)
        count_product_reviews = db.query(Reviews).filter(Reviews.product_id == product_id , Reviews.user_id == current_user.user_id ).count()
        if not count_product_reviews:
            raise HTTPException(status_code=404, detail="Product reviews not found")
        return count_product_reviews

    @staticmethod
    def get_reviews_of_product(product_id : str , db : Session = Depends(get_db),
                               token : str = Depends(AuthService.oauth2_scheme)):
        current_user = AuthService.get_current_user(db , token)
        reviews = db.query(Reviews).filter(Reviews.product_id == product_id , Reviews.user_id == current_user.user_id).all()

        if not reviews:
            raise HTTPException(status_code=404, detail="Product reviews not found")
        return reviews
