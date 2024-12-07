from datetime import datetime, timedelta


from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_ , and_
from app.model.Products_Categories import Product, Category
from app.utils.responses import ResponseHandler
from app.schemas.schema_product import ProductCreate, ProductUpdate


class ProductService:

    # Search products by name or description
    @staticmethod
    def search_products(db: Session, search: str):
        # Tìm kiếm theo từ khóa trong tên hoặc mô tả sản phẩm
        products = db.query(Product).filter(
            or_(Product.name.contains(search), Product.description.contains(search))
        ).order_by(Product.product_id.asc()).all()  #

        if not products:
            # ResponseHandler.not_found_error("Product", search)
            raise HTTPException(status_code=404 , detail="No products found")

        return ResponseHandler.success("found prduct ", products)

    @staticmethod
    def get_discounted_products(db: Session):
        # Giả sử trường `discount` là tỷ lệ giảm giá, có thể là số thập phân (ví dụ 0.2 = 20%)
        discounted_products = db.query(Product).filter(Product.discount > 0).all()  # Lọc sản phẩm có giảm giá

        if not discounted_products:
            # Nếu không có sản phẩm nào có giảm giá, trả về lỗi
            raise HTTPException(status_code=404, detail="No discounted products found")

        # Trả về danh sách sản phẩm đang giảm giá
        return ResponseHandler.success("Found discounted products", discounted_products)
    # GET /products/best-sellers: Lấy danh sách sản phẩm bán chạy nhất
    @staticmethod
    def get_star_product(db:Session):
        star_product = db.query(Product).filter(Product.star_product == True).all()
        if not star_product:
            raise HTTPException(status_code=404, detail="No star products found")
        return ResponseHandler.success("Found star product", star_product)
    # get new arrivals products # như thế nào là mới nhất
    @staticmethod
    def get_new_arrival(db:Session):
        # arg limit :int
        # limit = 7
        current_date = datetime.now()
        one_week_ago = current_date - timedelta(days=7)

        products_new_arrival  = db.query(Product).filter(Product.date_created >=one_week_ago).all()
        if not products_new_arrival:
            raise HTTPException(status_code=404, detail="No new arrival products found")
        return ResponseHandler.success("Found new arrival products", products_new_arrival)
#     GET /products/category/{category_id}: Lấy danh sách sản phẩm theo danh mục
    @staticmethod
    def get_product_by_cateId(cate_id , db:Session):
        products = db.query(Product).filter(Product.category_id == cate_id).all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        return ResponseHandler.success("found product ", products)
    # GET /products/category/{category_id}/subcategory/{subcategory_id}: Lấy danh sách sản phẩm theo danh mục con
    @staticmethod
    def get_product_by_parent_category( parent_category_id :str  , db:Session):
        try:
            products = db.query(Product).join(Category , Product.category_id==Category.category_id).filter(
                and_(
                    # Product.category_id == category_id,
                    Category.parent_category_id == parent_category_id
                )).all()
            if not products:
                raise HTTPException(status_code=404, detail="No products found")
            return products
        except Exception as e:
            raise HTTPException(status_code=404, detail=str(e))
#   # GET /products/{product_id}: Lấy thông tin chi tiết sản phẩm
    @staticmethod
    def get_product_by_id(product_id , db:Session):
        product = db.query(Product).filter(Product.product_id == product_id).all()
        if not product:
            raise HTTPException(status_code=404, detail="No product found")
        return ResponseHandler.success("found product ", product)
    # GET /products/category/{category_id}?min_price={min_price} &max_price={max_price}}: Lọc sản phẩm theo giá
    @staticmethod
    def get_product_by_price(categoy_id :str , minPrice : float , maxPrice : float , db:Session):
        products = db.query(Product).filter(Product.price > minPrice , Product.price < maxPrice , Product.category_id == categoy_id).all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        return ResponseHandler.success("found product ", products)

    @staticmethod
    def creat_product(product : ProductCreate  , db : Session):
        new_product = Product(
            name=product.name,
            name_brand=product.name_brand,
            description=product.description,
            price=product.price,
            old_price=product.old_price,
            discount=product.discount,
            unit=product.unit,
            stock_quantity=product.stock_quantity,
            image=product.image,
            star_product=product.star_product,
            expiration_date=product.expiration_date,
            category_id=product.category_id  # Giả sử có category_id trong ProductCreate
        )

        # Thêm sản phẩm vào cơ sở dữ liệu
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return new_product
    @staticmethod
    def get_all_products(db : Session):
        products = db.query(Product).all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        return products
    @staticmethod
    def update_product(product : ProductUpdate , db : Session):
        pro = db.query(Product).filter(Product.product_id == product.product_id).first()
        if not pro:
            raise HTTPException(status_code=404, detail="No products found")
        pro.name = product.name
        pro.name_brand = product.name_brand
        pro.description = product.description
        pro.price = product.price
        pro.old_price = product.old_price if product.old_price is not None else pro.old_price  # Đảm bảo không ghi đè nếu old_price không được cập nhật
        pro.discount = product.discount
        pro.unit = product.unit
        pro.stock_quantity = product.stock_quantity
        pro.image = product.image
        pro.star_product = product.star_product
        pro.expiration_date = product.expiration_date
        pro.category_id = product.category_id

        # Commit thay đổi vào cơ sở dữ liệu
        db.commit()
        db.refresh(pro)
        return pro
    @staticmethod
    def delete_product(product_id , db : Session):
        pro = db.query(Product).filter(Product.product_id == product_id).first()
        if not pro:
            raise HTTPException(status_code=404, detail="No products found")
        db.delete(pro)
        db.commit()
    @staticmethod
    def get_product_by_sub_category( subcategory_id , db : Session):
        products = db.query(Product).filter(Product.category_id == subcategory_id).all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        return products
    @staticmethod
    def get_product_discount_for_sub_category(subcategory_id , db : Session ):
        products = db.query(Product).filter(Product.category_id == subcategory_id , Product.discount > 0 ).all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        return products
    @staticmethod
    def get_expiring_products(db : Session):
        products = db.query(Product).order_by(Product.expiration_date).all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        return products