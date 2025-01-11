from fastapi import APIRouter

from app.Routers import admin_user, admin_category, admin_product, categories, products, users, super_admin, Cart, \
    Order, Order_admin, ReviewRouter, BannerRouter, PopUpRouter, PaymentRouter, login_google , upload_image , ChartRouter


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
router.include_router(ReviewRouter.router, tags=["ReviewRouter"], prefix="/review")
router.include_router(BannerRouter.router, tags=["BannerRouter"], prefix="/banner")
router.include_router(PopUpRouter.router, tags=["PopUpRouter"], prefix="/popup")
router.include_router(PaymentRouter.router , tags=["PaymentRouter"], prefix="/payment")
router.include_router(login_google.router , tags=["login_google"], prefix="/login")
router.include_router(upload_image.router , tags=["upload_image"], prefix="/upload_image")
router.include_router(ChartRouter.router , tags=["CharRouter"], prefix="/char")