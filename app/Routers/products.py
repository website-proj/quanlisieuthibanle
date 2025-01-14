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
@router.get("/flash_sale")
def get_flash_sale_products(db: Session = Depends(get_db)):
    products = ProductService.get_flash_sale(db)
    return ResponseHandler.success("flashSale products" , products )
@router.get("/search")
def get_search_products(search , db: Session = Depends(get_db)):
    try:
        return ProductService.search_products(db , search)
    except HTTPException as e:
        raise e

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

@router.get("/count_product")
def get_product_count(db: Session = Depends(get_db)):
    number_of_products = ProductService.count_product(db)
    return ResponseHandler.success("Products", number_of_products)
@router.get("/relevant_products")
def get_relevant_products(product_id : str , db: Session = Depends(get_db)):
    products = ProductService.relevant_products(product_id,db)
    return products
@router.get("/get_product_filter_by_price")
def get_product_of_sub_category_filter_by_price(category_id : str , bottom_price : float ,
                                                up_price : float , db: Session = Depends(get_db)):
    products = ProductService.filter_product_of_category_by_price(category_id,bottom_price,up_price,db)
    return ResponseHandler.success("products filtered", products)
@router.get("best_sellers")
def get_best_seller_products(db: Session = Depends(get_db)):
    product = ProductService.get_best_seller_v1(db)
    return ResponseHandler.success("products best seller", product)
@router.get("best_sellers_for_sub_category")
def get_best_sellers_for_sub_category(subcategory_id : str , db: Session = Depends(get_db)):
    product = ProductService.get_best_seller_for_sub_category(subcategory_id,db)
    return ResponseHandler.success("best seller for category", product)
