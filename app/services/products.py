from datetime import datetime, timedelta
from typing import Optional

from IPython.terminal.shortcuts.auto_match import single_quote
from fastapi import HTTPException, Form, UploadFile, File, Depends
from sqlalchemy.orm import Session, aliased
from sqlalchemy import or_, and_, func, desc, Float

from app import db
from app.db.base import get_db
from app.model.Products_Categories import Product, Category
from app.model.model_orders import Orders, OrderItems
from app.model.reviews import Reviews
from app.schemas.schema_order import OrderItem
from app.services.uploadImage import UploadImage
from app.utils.responses import ResponseHandler
from app.schemas.schema_product import ProductCreate, ProductUpdate


class ProductService:

    # Search products by name or description
    @staticmethod
    def search_products(db: Session, search: str):
        # Tìm kiếm theo từ khóa trong tên hoặc mô tả sản phẩm
        search_lower = search.lower()

        # Thực hiện tìm kiếm không phân biệt hoa thường
        products = db.query(Product).filter(
            or_(
                func.lower(Product.name).contains(search_lower),
                func.lower(Product.description).contains(search_lower)
            )
        ).order_by(Product.product_id.asc()).all()

        if not products:
            # ResponseHandler.not_found_error("Product", search)
            raise HTTPException(status_code=404 , detail="No products found")

        return ResponseHandler.success("found prduct ", products)

    @staticmethod
    def get_discounted_products(db: Session):
        # Giả sử trường `discount` là tỷ lệ giảm giá, có thể là số thập phân (ví dụ 0.2 = 20%)
        discounted_products = db.query(Product).filter(Product.discount > 0 ,
                                                       Product.discount < 50).all()  # Lọc sản phẩm có giảm giá

        if not discounted_products:
            # Nếu không có sản phẩm nào có giảm giá, trả về lỗi
            raise HTTPException(status_code=404, detail="No discounted products found")

        # Trả về danh sách sản phẩm đang giảm giá
        return ResponseHandler.success("Found discounted products", discounted_products)
    # GET /products/best-sellers: Lấy danh sách sản phẩm bán chạy nhất
    @staticmethod
    def get_flash_sale(db : Session):
        discounted_products = db.query(Product).filter(Product.discount >= 50).all()
        if not discounted_products:
            raise HTTPException(status_code=404, detail="No flash sale products found")
        return discounted_products
    @staticmethod
    def get_star_product(db:Session):
        star_product = db.query(Product).filter(Product.star_product == True).all()
        if not star_product:
            raise HTTPException(status_code=404, detail="No star products found")
        return ResponseHandler.success("Found star product", star_product)
    # get new arrivals products # như thế nào là mới nhất
    @staticmethod
    def get_new_arrival(db:Session):
        products = db.query(Product).order_by(desc(Product.date_created)).all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        result = []
        i = 0
        for product in products:
            if i > 20 :
                break
            result.append(product)
        return result
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
    def create_product(
            name: str = Form(...),
            name_brand: str = Form(...),
            description: str = Form(...),
            price: float = Form(...),
            original_price: float = Form(...),
            discount: float = Form(...),
            unit: str = Form(...),
            stock_quantity: int = Form(...),
            star_product: bool = Form(...),
            expiration_date: datetime = Form(...),
            category_id: str = Form(...),
            file: UploadFile = File(...),
            db : Session = Depends(get_db)
    ):
        try:
            if not file:
                raise HTTPException(status_code=400, detail="File upload is required")

            image = UploadImage.upload_image(file)
            image_url = image.get("secure_url", None)
            if not image_url:
                raise HTTPException(status_code=500, detail="Failed to upload image")

            product = Product(
                name=name,
                name_brand=name_brand,
                description=description,
                price=price,
                old_price = None ,
                original_price=original_price,
                discount=discount,
                unit=unit,
                stock_quantity=stock_quantity,
                image=image_url,
                star_product=star_product,
                expiration_date=expiration_date,
                category_id=category_id,
            )

            # Lưu vào cơ sở dữ liệu
            db.add(product)
            db.commit()
            db.refresh(product)

            return {
                "message": "Product created successfully",
                "product": product
            }
        except HTTPException as http_err:
            db.rollback()  # Hoàn tác nếu có lỗi từ phía ứng dụng
            raise http_err
        except Exception as e:
            db.rollback()  # Hoàn tác nếu có lỗi không mong muốn
            raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

    @staticmethod
    def get_all_products(db: Session):
        sub = aliased(Category)
        parent = aliased(Category)
        data = db.query(Product, sub, parent).outerjoin(
            sub, sub.category_id == Product.category_id
        ).outerjoin(
            parent, parent.category_id == sub.parent_category_id
        ).all()

        result = {}

        data_no = db.query(sub, parent).join(
            parent, sub.parent_category_id == parent.category_id
        ).all()

        if not data:
            raise HTTPException(status_code=404, detail="No products found")

        for product, sub, parent in data:
            parent_name = parent.category_name
            sub_name = sub.category_name
            if parent_name not in result:
                result[parent_name] = {}
            if sub_name not in result[parent_name]:
                result[parent_name][sub_name] = []
            result[parent_name][sub_name].append(product)

        for cat_no, parent_no in data_no:
            parent_name = parent_no.category_name
            sub_name = cat_no.category_name

            if parent_name not in result:
                result[parent_name] = {}
            if sub_name not in result[parent_name]:
                result[parent_name][sub_name] = []
        parent_cat = db.query(Category).filter(Category.parent_category_id == None).all()
        for cat in parent_cat:
            cat_name = cat.category_name
            if cat_name not in result:
                result[cat_name] = {}
        return result

    @staticmethod
    def update_product(
        product_id: str = Form(...),
        name: Optional[str] = None,
        name_brand: Optional[str] = None,
        description: Optional[str] = None,
        price: Optional[float] = None,
        old_price: Optional[float] = None,
        original_price: Optional[float] = None,
        discount: Optional[float] = None,
        unit: Optional[str] = None,
        stock_quantity:  Optional[int] = None,
        star_product: Optional[bool] = None,
        expiration_date: Optional[datetime] = None,
        category_id: Optional[str] = None,
        file: Optional[UploadFile] = None,
        db: Session = Depends(get_db)
    ):
        pro = db.query(Product).filter(Product.product_id == product_id).first()
        if not pro:
            raise HTTPException(status_code=404, detail="No products found")
        try :
            if file :
                image = UploadImage.upload_image(file)
                image_url = image["secure_url"]
            else :
                image_url = None
            # update
            pro.name = name if name is not None else pro.name
            pro.name_brand = name_brand if name_brand is not None else pro.name_brand
            pro.description = description if description is not None else pro.description
            pro.price = price if price is not None else pro.price
            pro.old_price = old_price if old_price is not None else pro.old_price  # Đảm bảo không ghi đè nếu old_price không được cập nhật
            pro.discount = discount if discount is not None else pro.discount
            pro.original_price = original_price if not original_price else pro.original_price
            pro.unit = unit if unit is not None else pro.unit
            pro.stock_quantity = stock_quantity if stock_quantity is not None else pro.stock_quantity
            pro.image = image_url if image_url is not None else pro.image
            pro.star_product = star_product if star_product is not None else pro.star_product
            pro.expiration_date = expiration_date if expiration_date is not None else pro.expiration_date
            pro.category_id = category_id if category_id is not None else pro.category_id

            # Commit thay đổi vào cơ sở dữ liệu
            db.commit()
            db.refresh(pro)
            return pro
        except HTTPException as e :
            raise e
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
    @staticmethod
    def count_product(db : Session):
        products = db.query(Product).all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        number_of_products = len(products)
        return number_of_products
    @staticmethod
    def relevant_products(product_id : str , db : Session):
        category_id = db.query(Product).filter(Product.product_id == product_id).first().category_id
        product = db.query(Product).filter(Product.category_id == category_id).all()
        if not product:
            raise HTTPException(status_code=404, detail="No products found")
        data = []
        for product in product:
            if product.product_id == product_id:
                continue
            data.append(product)
        return data
    @staticmethod
    def filter_product_of_category_by_price(category_id , bottom_price : float ,
                                            up_price : float , db : Session):
        products = db.query(Product).filter(Product.category_id == category_id , Product.price < up_price , Product.price > bottom_price ).all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        return products
    @staticmethod
    def get_detail_product_by_admin(product_id : str , db : Session):
        product = db.query(Product).filter(Product.product_id == product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="No products found")
        reviews = db.query(Reviews).filter(Reviews.product_id == product_id).all()
        # if not reviews:
        #     raise HTTPException(status_code=404, detail="No reviews found")
        number_of_reviews = len(reviews)
        data = [{
            "product" : product.__dict__ if product else None ,
            "number_of_reviews" : number_of_reviews,
            "reviews" : reviews.__dict__ if reviews else None ,
        }]
        return data
    @staticmethod
    def get_best_seller_v0(db:Session):
        orders_pass = db.query(Orders).filter(Orders.status == "Delivered").all()
        order_items_pass = []
        if not orders_pass:
            raise HTTPException(status_code = 404 , detail = "no orders found")
        for order in orders_pass:
            order_items = db.query(OrderItems).filter(OrderItems.order_id == order.order_id).all()
            for order_item in order_items:
                order_items_pass.append(order_item)
        result = dict()
        if not order_items_pass:
            raise HTTPException(status_code=404, detail="No order_items found")
        for order_item in order_items_pass:
            quantity = order_item.quantity
            product_id = order_item.product_id
            if product_id not in result:
                result[product_id] = quantity
            else :
                result[product_id] += quantity
        datas = []
        result = sorted(result.items(), key=lambda item: item[1], reverse=True)
        result = dict(result)
        for product_id in result:
            product = db.query(Product).filter(Product.product_id == product_id).first()
            category = db.query(Category).filter(Category.category_id == product.category_id).first()
            parent_cat = db.query(Category).filter(Category.category_id == category.parent_category_id).first()
            data = {
                "sold": result[product_id],
                "product": product.__dict__ if product else None,
                "Category of product" : category.__dict__ if category else None,
                "Parent Category of Product" : parent_cat.__dict__ if parent_cat else None,
            }
            datas.append(data)
        if not datas :
            raise HTTPException(status_code=404, detail="No products found")
        return datas

    def get_best_seller_v1(db : Session):
        # Truy vấn các OrderItems liên kết với Orders đã được giao
        order_items_pass = db.query(OrderItems, Orders).join(
            Orders, Orders.order_id == OrderItems.order_id
        ).filter(
            Orders.status == "Delivered"
        ).all()

        if not order_items_pass:
            raise HTTPException(status_code=404, detail="No order_items_pass found")

        # Tính số lượng sản phẩm bán được
        products = {}
        for order_item, _ in order_items_pass:
            product_id = order_item.product_id
            quantity = order_item.quantity
            products[product_id] = products.get(product_id, 0) + quantity

        if not products:
            raise HTTPException(status_code=404, detail="No products found")

        products = sorted(products.items(), key=lambda item: item[1], reverse=True)

        alias_product = aliased(Product)
        alias_category = aliased(Category)
        parent_category = aliased(Category)

        data = []

        for product_id, sold_quantity in products:
            result = db.query(
                alias_product, alias_category, parent_category
            ).join(
                alias_category, alias_product.category_id == alias_category.category_id
            ).join(
                parent_category, alias_category.parent_category_id == parent_category.category_id, isouter=True
            ).filter(
                alias_product.product_id == product_id
            ).first()

            if not result:
                continue

            product, category, parent_cat = result

            detail_product = {
                "sold": sold_quantity,
                "product": product.__dict__ if product else None,
                "Category of product": category.__dict__ if category else None,
                "Parent Category of Product": parent_cat.__dict__ if parent_cat else None,
            }
            data.append(detail_product)

        if not data:
            raise HTTPException(status_code=404, detail="No detailed product data found")

        return data
    @staticmethod
    def get_best_seller_for_sub_category(sub_category_id : str , db:Session):
        order_items_pass = (db.query(OrderItems, Orders ,Product)
                            .join(Orders, Orders.order_id == OrderItems.order_id)
                            .join(Product , Product.product_id == OrderItems.product_id)
                            .filter(Orders.status == "Delivered" , Product.category_id == sub_category_id).all())
        if not order_items_pass:
            raise HTTPException(status_code=404, detail="no order_items_pass found")
        products = dict()
        for order_item, _ , _ in order_items_pass:
            product_id = order_item.product_id
            quantity = order_item.quantity
            if product_id not in products:
                products[product_id] = quantity
            else:
                products[product_id] += quantity
        data = []
        products = sorted(products.items(), key=lambda item: item[1], reverse=True)
        products = dict(products)
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        for product_id in products:
            product = db.query(Product).filter(Product.product_id == product_id).first()
            category = db.query(Category).filter(Category.category_id == product.category_id).first()
            parent_cat = db.query(Category).filter(Category.category_id == category.parent_category_id).first()
            detail_product = {
                "sold": products[product_id],
                "product": product.__dict__ if product else None,
                "Category of product": category.__dict__ if category else None,
                "Parent Category of Product": parent_cat.__dict__ if parent_cat else None,
            }
            data.append(detail_product)
        return data
    @staticmethod
    def count_all_product(db:Session):
        product = db.query(Product).count()
        if not product :
            raise HTTPException(status_code= 400 , detail = "not product found")
        return product
    @staticmethod
    def get_reviews_of_product(product_id : str , db : Session ):
        data = db.query(Reviews , Product).join(
            Product , Product.product_id == Reviews.product_id
        ).filter(Product.product_id == product_id).all()
        result  = {}
        try:
            for review , product in data :
                if product.product_id not in result :
                    result[product.product_id] = {
                        "product" : product.__dict__ if product else None,
                        "review" : []
                    }
                result[product.product_id]["review"].append(review)
            new_product = db.query(Product).filter(Product.product_id == product_id).first()
            if not new_product:
                raise HTTPException(status_code=404, detail="no products found")
            if new_product.product_id not in result:
                result[new_product.product_id] = {
                    "product": new_product.__dict__ if new_product else None,
                    "review" : []
                }
            return result
        except Exception as e :
            raise e
    @staticmethod
    def get_discount_product_for_parent_category(category_id :str , db:Session):
        # sub_cat = aliased(Category)
        # parent_cat = aliased(Category)
        # data = db.query(Product , ).outerjoin(
        #     sub_cat , sub_cat.category_id == Product.category_id
        # ).outerjoin(
        #     parent_cat, parent_cat.category_id == sub_cat.parent_category_id
        # ).filter(sub_cat.category_id == category_id).all()
        #
        data = db.query(Product , Category).join(
            Category, Product.category_id == Category.category_id
        ).filter(Category.parent_category_id == category_id).all()
        result = []
        for product , category in data :
            if not product or not category:
                continue
            discount = product.discount
            if discount > 0 :
                result.append(product)
        return result

    @staticmethod
    def get_best_seller_for_parent_category(parent_category_id: str, db: Session):
        sub_categories = db.query(Category).filter(Category.parent_category_id == parent_category_id).all()

        if not sub_categories:
            raise HTTPException(status_code=404, detail="No subcategories found for the parent category")

        sub_category_ids = [sub_cat.category_id for sub_cat in sub_categories]

        order_items_pass = (
            db.query(OrderItems, Orders, Product)
            .join(Orders, Orders.order_id == OrderItems.order_id)
            .join(Product, Product.product_id == OrderItems.product_id)
            .filter(
                Orders.status == "Delivered",
                Product.category_id.in_(sub_category_ids)  # Lọc theo danh mục con
            )
            .all()
        )

        if not order_items_pass:
            raise HTTPException(status_code=404, detail="No order_items_pass found")

        products = dict()
        for order_item, _, _ in order_items_pass:
            product_id = order_item.product_id
            quantity = order_item.quantity
            if product_id not in products:
                products[product_id] = quantity
            else:
                products[product_id] += quantity

        if not products:
            raise HTTPException(status_code=404, detail="No products found")

        products = sorted(products.items(), key=lambda item: item[1], reverse=True)
        products = dict(products)

        data = []
        for product_id in products:
            product = db.query(Product).filter(Product.product_id == product_id).first()
            category = db.query(Category).filter(Category.category_id == product.category_id).first()
            parent_cat = db.query(Category).filter(Category.category_id == category.parent_category_id).first()
            detail_product = {
                "sold": products[product_id],
                "product": product.__dict__ if product else None,
                "Category of product": category.__dict__ if category else None,
                "Parent Category of Product": parent_cat.__dict__ if parent_cat else None,
            }
            data.append(detail_product)

        return data
