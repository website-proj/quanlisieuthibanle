from fastapi import APIRouter, Depends, Query, status, HTTPException
from starlette.status import HTTP_200_OK
from app.utils.responses import ResponseHandler
from app.db.base import  get_db
from app.services.products import ProductService
from sqlalchemy.orm import Session
from app.schemas.schema_product import ProductResponse, ProductsResponse, ProductBase
import logging
from app.model.Products_Categories import Product
router = APIRouter()


@router.get("/discount")
def get_discounted_products(db: Session = Depends(get_db)):
    try:
        return ProductService.get_discounted_products(db)
    except HTTPException as e:
        raise e
@router.get("/search")
def get_search_products(search , db: Session = Depends(get_db)):
    try:
        return ProductService.search_products(db , search)
    except HTTPException as e:
        raise e
@router.get("/best_seller")
def get_best_seller_products(db: Session = Depends(get_db)):
    # try :
    #     return ProductService.get_star_product(db)
    # except HTTPException as e:
    #     raise e
    return {"đang cập nhập"}
@router.get("/new_arrivals")
def get_new_arrival_products(db: Session = Depends(get_db)):
    try :
        return ProductService.get_new_arrival(db)
    except HTTPException as e:
        raise e
    except Exception as e :
        raise HTTPException(status_code=500, detail=str(e))
@router.get("/category")
def get_product_by_sub_category(category_id,db: Session = Depends(get_db)):
    try :
        return ProductService.get_product_by_cateId(category_id,db)
    except HTTPException as e:
        raise e
@router.get("/")
def get_product_detail_by_id(product_id,db: Session = Depends(get_db)):
    try:
        return ProductService.get_product_by_id(product_id,db)
    except HTTPException as e:
        raise e

@router.get("/category")
def get_product_by_category_and_price(category_id : str , min_price : float , max_price:float ,db: Session = Depends(get_db)):
    product = ProductService.get_product_by_price(category_id,min_price,max_price,db)
    try :
        return product
    except HTTPException as e:
        raise e
@router.get("/parentCategory")
def get_products_by_parent_category(parent_cat_id : str , db: Session = Depends(get_db)):
    products = ProductService.get_product_by_parent_category(parent_cat_id,db)
    try :
        if not products :
            return HTTPException(status_code=404 , detail = "products not found")
        return ResponseHandler.success("success" , products)
    except Exception as e:
        raise HTTPException(status_code=404 , detail=str(e))
@router.get("/discount/subcategory")
def get_products_discount_for_subcategory(subcategory_id : str , db: Session = Depends(get_db)):
    products = ProductService.get_product_discount_for_sub_category(subcategory_id,db)
    return ResponseHandler.success("success" , products)
@router.get("/bestsellers/subcategory")
def    get_product_bestsellers_for_subcategory(subcategory_id : str , db: Session = Depends(get_db)):
    return {
        "đang cập nhập"
    }