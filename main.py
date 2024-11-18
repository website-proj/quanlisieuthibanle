from fastapi import FastAPI
from app.Routers.products import router as products_router
from app.Routers.categories import router as categories_router
app = FastAPI()
app.include_router(products_router)
# app.include_router()
