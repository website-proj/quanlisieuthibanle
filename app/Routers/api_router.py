from fastapi import APIRouter

from app.Routers import admin_user, admin_category, admin_product, categories, products, users, super_admin, Cart, \
    Order, Order_admin

router = APIRouter()

router.include_router(admin_user.router, tags=["admin/user"], prefix="/admin")
router.include_router(admin_product.router, tags=["admin/product"], prefix="/admin")
router.include_router(admin_category.router, tags=["admin/category"], prefix="/admin")
router.include_router(products.router, tags=["Product"], prefix="/product")
router.include_router(users.router, tags=["users"], prefix="/users")
router.include_router(super_admin.router, tags=["super_admin"], prefix="/super_admin")
router.include_router(Cart.router , tags=["Cart"], prefix="/cart")
router.include_router(Order.router , tags=["Order"], prefix="/order")
router.include_router(Order_admin.router, tags=["Order_admin"], prefix="/order_admin")