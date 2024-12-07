from fastapi import APIRouter, Depends, Query, status, HTTPException
from starlette.status import HTTP_200_OK

from app.schemas.schema_category import CategoryCreate
from app.services.categories import CategoryService
from app.utils.responses import ResponseHandler
from app.db.base import  get_db
from app.services.products import ProductService
from sqlalchemy.orm import Session
from app.schemas.schema_product import ProductResponse, ProductsResponse, ProductBase, ProductCreate, ProductUpdate
import logging
from app.model.Products_Categories import Product
from app.helper.login_manager import check_admin_role
router = APIRouter()

@router.post("/products", dependencies=[Depends(check_admin_role)])
def create_product(product : ProductCreate , db : Session = Depends(get_db) ):
    return ProductService.creat_product(product , db)
@router.get("/products" , dependencies=[Depends(check_admin_role)])
async  def get_all_product(db : Session = Depends(get_db)):
    try :
        products = ProductService.get_all_products(db)
        if not products:
            raise HTTPException(status_code= 404 , detail="No products found")
        return ResponseHandler.success("success query" , products)
    except HTTPException as e:
        raise e
@router.put("/product", dependencies=[Depends(check_admin_role)])
def update_product(product : ProductUpdate , db : Session = Depends(get_db) ):
    try :
        product = ProductService.update_product(product , db)
        return ResponseHandler.success("success update" , product)
    except HTTPException as e:
        raise e
@router.delete("/product" , dependencies = [Depends(check_admin_role)])
def delete_product_by_ID(product_id : str, db : Session = Depends(get_db)):
    try :
        ProductService.delete_product(product_id , db)
        return ResponseHandler.success("success delete",product_id)
    except HTTPException as e:
        raise e
@router.get("/product/parent_category" , dependencies=[Depends(check_admin_role)])
def get_products_by_Parent_Category(parent_category_id : str , db : Session = Depends(get_db)):
    try :
        products = ProductService.get_product_by_parent_category(parent_category_id, db)
        if not products:
            raise HTTPException(status_code= 404 , detail="No products found")
        return ResponseHandler.success("success query" , products)
    except HTTPException as e:
        raise e
@router.get("/product/subCategory" , dependencies=[Depends(check_admin_role)])
def get_products_by_SubCategory(subcategory_id : str, db : Session = Depends(get_db)):
    products = ProductService.get_product_by_sub_category(subcategory_id, db)
    return ResponseHandler.success("success query" , products)
@router.get("/product/discounted" , dependencies=[Depends(check_admin_role)])
def get_discounted_product(db : Session = Depends(get_db)):
    products = ProductService.get_discounted_products(db)
    if not products:
        raise HTTPException(status_code= 404 , detail="No products found")
    return ResponseHandler.success("success query" , products)
@router.get("/product/expiring" , dependencies=[Depends(check_admin_role)])
def get_expiring_product(db : Session = Depends(get_db)):
    products = ProductService.get_expiring_products(db)
    if not products:
        raise HTTPException(status_code= 404 , detail="No products found")
    return ResponseHandler.success("success query" , products)