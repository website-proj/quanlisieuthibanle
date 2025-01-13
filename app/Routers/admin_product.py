from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, Query, status, HTTPException, Form, UploadFile, File
from starlette.status import HTTP_200_OK

from app.services.categories import CategoryService
from app.utils.responses import ResponseHandler
from app.db.base import  get_db
from app.services.products import ProductService
from sqlalchemy.orm import Session
from app.schemas.schema_product import ProductResponse, ProductsResponse, ProductBase, ProductCreate, ProductUpdate
import logging
from app.model.Products_Categories import Product
from app.helper.login_manager import check_admin_role, login_required

router = APIRouter()

@router.post("/products", dependencies=[Depends(check_admin_role)])
def create_product(
    name: str = Form(...),
    name_brand: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    old_price: Optional[float] = None,
    original_price: float = Form(...),
    discount: float = Form(...),
    unit: int = Form(...),
    stock_quantity: int = Form(...),
    star_product: bool = Form(...),
    expiration_date: datetime = Form(...),
    category_id: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        # Gọi service để xử lý logic tạo sản phẩm
        product = ProductService.create_product(
            name=name,
            name_brand=name_brand,
            description=description,
            price=price,
            old_price=old_price,
            original_price=original_price,
            discount=discount,
            unit=unit,
            stock_quantity=stock_quantity,
            star_product=star_product,
            expiration_date=expiration_date,
            category_id=category_id,
            file=file,
            db=db,
        )
        return ResponseHandler.success("Product created successfully", product)

    except HTTPException as http_err:
        # Trả về lỗi ứng dụng
        raise http_err
    except Exception as e:
        # Ghi log lỗi và trả về lỗi không mong muốn
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")

@router.get("/testdata")
def testdata(db: Session = Depends(get_db)):
    product = db.query(Product).all()
    return product
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
def update_product(
        product_id: str = Form(...),
        name: Optional[str] = None,
        name_brand: Optional[str] = None,
        description: Optional[str] = None,
        price: Optional[float] = None,
        old_price: Optional[float] = None,
        original_price: Optional[float] = None,
        discount: Optional[float] = None,
        unit: Optional[int] = None,
        stock_quantity: Optional[int] = None,
        star_product: Optional[bool] = None,
        expiration_date: Optional[datetime] = None,
        category_id: Optional[str] = None,
        file: Optional[UploadFile] = None,
        db: Session = Depends(get_db)
):
    try:
        # Gọi hàm service để cập nhật sản phẩm
        product = ProductService.update_product(
            product_id=product_id,
            name=name,
            name_brand=name_brand,
            description=description,
            price=price,
            old_price=old_price,
            original_price=original_price,
            discount=discount,
            unit=unit,
            stock_quantity=stock_quantity,
            star_product=star_product,
            expiration_date=expiration_date,
            category_id=category_id,
            file=file,
            db=db,
        )
        return ResponseHandler.success("Product updated successfully", product)

    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")
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
@router.get("/product/detail" , dependencies=[Depends(check_admin_role)])
def get_detail_product(product_id : str, db : Session = Depends(get_db)):
    product = ProductService.get_detail_product_by_admin(product_id , db)
    return ResponseHandler.success("product detail" , product)
@router.get("/count_products" , dependencies=[Depends(check_admin_role)])
def count_products(db : Session = Depends(get_db)):
    product = ProductService.count_all_product(db)
    return {
        "product_count" : product
    }
@router.get("/reviews_of_product" ,dependencies=[Depends(login_required)])
def get_reviews_of_product(product_id : str, db : Session = Depends(get_db)):
    product = ProductService.get_reviews_of_product(product_id , db)
    return product