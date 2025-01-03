from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.helper.login_manager import login_required, check_admin_role
from app.schemas.review import ReviewCreate
from app.schemas.schema_user import login
from app.services.auth import AuthService
from app.services.reviews import ReviewsService
from app.utils.responses import ResponseHandler

router = APIRouter()
@router.post("/",dependencies=[Depends(login_required)])
def Create_review(reviews_form : ReviewCreate , db : Session = Depends(get_db) ,
                       token : str = Depends(AuthService.oauth2_scheme) ):
    review = ReviewsService.create_reviews(reviews_form, db , token)
    return ResponseHandler.success("successfully created review" , review)
@router.get("/get_all_number_of_product_reviews"  , dependencies=[Depends(check_admin_role)])
def get_product_reviews(product_id : str , db : Session = Depends(get_db) ):
    product_reviews = ReviewsService.count_reviews_of_product(product_id , db)
    return ResponseHandler.success("product reviews" , product_reviews)
@router.get("/get_number_product_reviews_by_reviewer" , dependencies=[Depends(check_admin_role)])
def get_product_reviews_by_reviewer(product_id : str, db : Session = Depends(get_db) ):
    """
    return number of product reviewed by user
    """
    reviews = ReviewsService.count_reviews_of_product(product_id, db)
    return ResponseHandler.success("product reviews" , reviews)

@router.get("/get_product_reviews_by_reviewer" , dependencies=[Depends(login_required)])
def get_product_reviews_by_reviewer(product_id : str , db : Session = Depends(get_db) ,
                                    token : str = Depends(AuthService.oauth2_scheme) ):
    """
    lấy những review của của product đã mua , nếu đã review
    """
    reviews = ReviewsService.get_reviews_of_product(product_id , db , token)
    return ResponseHandler.success("product reviews" , reviews)