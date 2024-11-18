from sqlalchemy.orm import Session
from app.model.models import Category
from app.utils.responses import ResponseHandler

class CategoryService:

    # Lấy 10 category đầu tiên
    @staticmethod
    def get_top_10_categories(db: Session):
        categories = db.query(Category).order_by(Category.category_id.asc()).limit(10).all()  # Lấy 10 category đầu tiên

        if not categories:
            return ResponseHandler.not_found_error("Category", "top 10")

        return ResponseHandler.success("Top 10 categories fetched successfully", categories)
