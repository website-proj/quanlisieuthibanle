from fastapi import APIRouter, Depends, Query, status, HTTPException
from starlette.status import HTTP_200_OK
from app.utils.responses import ResponseHandler
from app.db.base import  get_db
from app.services.products import ProductService
from sqlalchemy.orm import Session
from app.schemas.products import ProductResponse, ProductsResponse, ProductBase
import logging
from app.model.models import Product
router = APIRouter(tags = ["Products"]  , prefix = "/products")

# search product
# @router.get("/search", response_model=ProductsResponse)
# async def search_product(search: str, db: Session = Depends(get_db)):
#     try:
#         products = ProductService.search_products(db, search)
#
#         if not products:
#             return ResponseHandler.success(f"No products found matching '{search}'", [])
#
#         pydantic_products = [ProductBase.from_orm(product) for product in products]
#
#         return ResponseHandler.success(f"Found {len(pydantic_products)} products matching '{search}'", pydantic_products)
#
#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Internal server error: {str(e)}"
#         )
#
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
    try :
        return ProductService.get_star_product(db)
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
def get_product_by_category(category_id,db: Session = Depends(get_db)):
    try :
        return ProductService.get_product_by_cateId(category_id,db)
    except HTTPException as e:
        raise e
@router.get("/{product_id}")
def get_product_by_id(product_id,db: Session = Depends(get_db)):
    try:
        return ProductService.get_product_by_id(product_id,db)
    except HTTPException as e:
        raise e
@router.get("/category/{category_id}")
def get_product_by_category_and_price(category_id : str , min_price : float , max_price:float ,db: Session = Depends(get_db)):
    product = ProductService.get_product_by_price(category_id,min_price,max_price,db)
    try :
        return product
    except HTTPException as e:
        raise e
