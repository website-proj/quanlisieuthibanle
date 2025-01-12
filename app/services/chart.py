from sqlalchemy import func
from sqlalchemy.orm import Session

from app.model.Products_Categories import Category, Product
from app.model.model_orders import Orders, OrderItems


class Chart:
    @staticmethod
    def Count_child_category_of_parent_category(db : Session):
        "số lượng danh mục con theo danh mục"
        parent_cat = db.query(Category).filter(Category.parent_category_id == None).all()
        categories = db.query(Category).all()
        result = {}
        for cat in parent_cat:
            for child_category in categories:
                if cat.category_id not in result:
                    result[cat.category_id] = {
                        cat.category_name: 0
                    }
                if cat.category_id == child_category.parent_category_id:
                     result[cat.category_id][cat.category_name] += 1
        return result
    @staticmethod
    def sum_revenue_of_child_category(db: Session):
        data = db.query(
            Category.parent_category_id,
            Category.category_id,
            Category.category_name,
            func.sum(Orders.total_amount).label("total_amount")
        ).outerjoin(
            OrderItems, OrderItems.order_id == Orders.order_id
        ).outerjoin(
            Product, Product.product_id == OrderItems.product_id
        ).outerjoin(
            Category, Category.category_id == Product.category_id
        ).group_by(
            Category.parent_category_id,
            Category.category_id,
            Category.category_name
        ).all()

        result = {}

        for parent_id, cat_id, cat_name, total_amount in data:
            if parent_id not in result:
                result[parent_id] = {
                    "parent_category_name" : db.query(Category).filter(Category.category_id == parent_id).first().category_name,
                    "child_categories": {}
                }
            result[parent_id]["child_categories"][cat_id] = {
                "category_name": cat_name,
                "category_amount": total_amount or 0
            }

        return result

    def count_product_by_category(db: Session):
        cats = db.query(Category).filter(Category.parent_category_id == None).all()
        data = db.query(Category, Product).outerjoin(
            Product, Product.category_id == Category.category_id
        ).all()

        result = {}
        for cat in cats:
            result[cat.category_id] = {
                "category_name": cat.category_name,
                "product_count": 0
            }

        for category, product in data:
            if category.parent_category_id in result:
                result[category.parent_category_id]["product_count"] += 1

        return result

    @staticmethod
    def revenue_12_month(db:Session):
        """"
        tính doanh thu theo tháng của của hàng
        """
        orders = db.query(Orders).all()
        data = {}
        for order in orders:
            month = order.order_date.strftime("%Y-%m")
            if month not in data:
                data[month] = 0
            data[month] += order.total_amount or 0
        return data




