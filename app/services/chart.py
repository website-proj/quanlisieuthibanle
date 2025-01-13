from datetime import datetime, timedelta

from dateutil.relativedelta import relativedelta
from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from starlette import status

from app.model.Products_Categories import Category, Product
from app.model.model_orders import Orders, OrderItems
from app.model.users import User


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
            func.coalesce(func.sum(Orders.total_amount), 0).label("total_amount")  # Dùng coalesce để tránh giá trị None
        ).outerjoin(
            Product, Product.category_id == Category.category_id
        ).outerjoin(
            OrderItems, OrderItems.product_id == Product.product_id
        ).outerjoin(
            Orders, Orders.order_id == OrderItems.order_id
        ).group_by(
            Category.parent_category_id,
            Category.category_id,
            Category.category_name
        ).all()

        all_parent_categories = db.query(Category).filter(Category.parent_category_id == None).all()

        result = {}

        for parent in all_parent_categories:
            result[parent.category_id] = {
                "parent_category_name": parent.category_name,
                "child_categories": {}
            }

        # Thêm dữ liệu của các danh mục con
        for parent_id, cat_id, cat_name, total_amount in data:
            if parent_id in result:
                result[parent_id]["child_categories"][cat_id] = {
                    "category_name": cat_name,
                    "category_amount": total_amount
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

    def revenue_last_12_months(self, db: Session):
        """
        Tính doanh thu trong 12 tháng gần nhất (%m/%y), nếu tháng không có sản phẩm bán sẽ trả về 0.
        """
        now = datetime.now()
        start_date = now - relativedelta(years=1)

        orders = db.query(Orders).filter(Orders.order_date >= start_date).all()
        data = {}
        for order in orders:
            month = order.order_date.strftime("%m/%Y")
            if month not in data:
                data[month] = 0
            data[month] += order.total_amount or 0
        months_in_range = []
        for i in range(12):
            month = (now - relativedelta(months=i)).strftime("%m/%Y")
            months_in_range.append(month)
        for month in months_in_range:
            if month not in data:
                data[month] = 0

        return data
    # @staticmethod
    def cost_last_12_months(self, db: Session):
        """
        Tính chi phí của các đơn hàng trong 12 tháng gần nhất (%m/%y).
        Nếu tháng đó không có sản phẩm nào được bán, sẽ hiển thị chi phí là 0.
        """
        now = datetime.now()
        start_date = now - relativedelta(years=1)  # 12 tháng trước

        data = db.query(Orders, OrderItems, Product).outerjoin(
            OrderItems, OrderItems.order_id == Orders.order_id
        ).outerjoin(
            Product, Product.product_id == OrderItems.product_id
        ).filter(Orders.order_date >= start_date).all()

        result = {}

        for order, order_item, product in data:
            month = order.order_date.strftime("%m/%Y")
            if month not in result:
                result[month] = 0
            original_price = product.original_price
            quantity = order_item.quantity
            cost = int(original_price) * quantity
            result[month] += cost

        months_in_range = []
        for i in range(12):
            month = (now - relativedelta(months=i)).strftime("%m/%Y")
            months_in_range.append(month)

        for month in months_in_range:
            if month not in result:
                result[month] = 0

        return result
    # @staticmethod
    def profit_12_month(self , db:Session):
        cost = self.cost_last_12_months(db)
        revenue = self.revenue_last_12_months(db)
        result = {}
        for i , j in zip(revenue, cost) :
            result[i] = revenue[i] - cost[i]
        return result

    def revenue_last_14_days(self, db: Session):
        """
        Tính doanh thu trong 14 ngày gần nhất (%d/%m/%y).
        Nếu ngày nào không có đơn hàng, sẽ hiển thị doanh thu là 0.
        """
        now = datetime.now()
        start_date = now - timedelta(days=14)  # 14 ngày trước

        orders = db.query(Orders).filter(Orders.order_date >= start_date).all()

        result = {}

        for order in orders:
            day = order.order_date.strftime("%d/%m/%Y")
            if day not in result:
                result[day] = 0  # Nếu chưa có ngày này, khởi tạo với 0
            result[day] += order.total_amount or 0  # Cộng doanh thu cho ngày đó

        days_in_range = []
        for i in range(14):
            day = (now - timedelta(days=i)).strftime("%d/%m/%Y")
            days_in_range.append(day)

        for day in days_in_range:
            if day not in result:
                result[day] = 0

        return result

    def cost_last_14_days(self, db: Session):
        """
        Tính chi phí của các đơn hàng trong 14 ngày gần nhất.
        """
        now = datetime.now()
        start_date = now - timedelta(days=14)

        data = db.query(Orders, OrderItems, Product).outerjoin(
            OrderItems, OrderItems.order_id == Orders.order_id
        ).outerjoin(
            Product, Product.product_id == OrderItems.product_id
        ).filter(Orders.order_date >= start_date).all()

        result = {}

        for order, order_item, product in data:
            day = order.order_date.strftime("%d/%m/%Y")
            if day not in result:
                result[day] = 0
            original_price = product.original_price
            quantity = order_item.quantity
            cost = original_price * quantity
            result[day] += cost

        all_days = [(now - timedelta(days=i)).strftime("%d/%m/%Y") for i in range(14)]
        for day in all_days:
            if day not in result:
                result[day] = 0

        return result

    def profit_14_days(self , db:Session):
        cost = self.cost_last_14_days(db)
        revenue = self.revenue_last_14_days(db)
        result = {}
        for i , j in zip(revenue, cost) :
            result[i] = revenue[i] - cost[i]
        return result

    def cost_last_3_years(self, db: Session):
        """
        Tính chi phí của các đơn hàng trong 3 năm gần nhất (theo năm).
        Nếu năm không có sản phẩm nào được bán, sẽ hiển thị chi phí là 0.
        """
        now = datetime.now()
        start_date = now - relativedelta(years=3)  # 3 năm trước

        data = db.query(Orders, OrderItems, Product).outerjoin(
            OrderItems, OrderItems.order_id == Orders.order_id
        ).outerjoin(
            Product, Product.product_id == OrderItems.product_id
        ).filter(Orders.order_date >= start_date).all()

        result = {}

        for order, order_item, product in data:
            year = order.order_date.strftime("%Y")
            if year not in result:
                result[year] = 0
            original_price = product.original_price if product else 0
            quantity = order_item.quantity if order_item else 0
            cost = original_price * quantity
            result[year] += cost

        years_in_range = [str(now.year - i) for i in range(3)]

        filtered_result = {year: result.get(year, 0) for year in years_in_range}

        sorted_result = {year: filtered_result[year] for year in sorted(filtered_result.keys(), reverse=True)}

        return sorted_result

    def revenue_last_3_years(self, db: Session):
        """
        Tính doanh thu trong 3 năm gần nhất (theo năm), nếu năm không có sản phẩm bán sẽ trả về 0.
        """
        now = datetime.now()
        start_date = now - relativedelta(years=3)

        # Truy vấn dữ liệu từ cơ sở dữ liệu
        orders = db.query(Orders).filter(Orders.order_date >= start_date).all()

        data = {}

        # Tính doanh thu theo từng năm
        for order in orders:
            year = order.order_date.strftime("%Y")
            if year not in data:
                data[year] = 0
            data[year] += order.total_amount or 0

        # Tạo danh sách các năm trong phạm vi 3 năm gần nhất
        years_in_range = [str(now.year - i) for i in range(3)]

        # Chỉ giữ lại các năm trong phạm vi 3 năm
        filtered_data = {year: data.get(year, 0) for year in years_in_range}

        # Sắp xếp kết quả theo thứ tự năm giảm dần
        sorted_data = {year: filtered_data[year] for year in sorted(filtered_data.keys(), reverse=True)}

        return sorted_data
    @staticmethod
    def user_create_in_14_day(db : Session):
        now = datetime.now()
        start_date = now - timedelta(days=14)  # 14 ngày trước

        users = db.query(User).filter(User.created_at >= start_date).all()
        if not users :
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        result = {}
        for user in users:
            date = user.created_at.strftime("%d/%m/%Y")
            if date not in result:
                result[date] = 0
            result[date] +=1
        days_in_range = []
        for i in range(14):
            day = (now - timedelta(days=i)).strftime("%d/%m/%Y")
            days_in_range.append(day)
        for day in days_in_range:
            if day not in result:
                result[day] = 0
        return result
    @staticmethod
    def user_create_in_12_month(db:Session):
        now = datetime.now()
        start_date = now - relativedelta(years=1)

        users = db.query(User).filter(User.created_at >= start_date).all()
        data = {}
        for user in users:
            month = user.created_at.strftime("%m/%Y")
            if month not in data:
                data[month] = 0
            data[month] += 1
        months_in_range = []
        for i in range(12):
            month = (now - relativedelta(months=i)).strftime("%m/%Y")
            months_in_range.append(month)
        for month in months_in_range:
            if month not in data:
                data[month] = 0
        return data
    @staticmethod
    def user_create_in_3_years(db:Session):
        now = datetime.now()
        start_date = now - relativedelta(years=3)

        # Truy vấn dữ liệu từ cơ sở dữ liệu
        users = db.query(User).filter(User.created_at >= start_date).all()

        data = {}

        # Tính doanh thu theo từng năm
        for user in users:
            year = user.created_at.strftime("%Y")
            if year not in data:
                data[year] = 0
            data[year] += 1

        years_in_range = [str(now.year - i) for i in range(3)]

        filtered_data = {year: data.get(year, 0) for year in years_in_range}

        sorted_data = {year: filtered_data[year] for year in sorted(filtered_data.keys(), reverse=True)}

        return sorted_data





