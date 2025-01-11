import os
from pydantic_settings import BaseSettings

from dotenv import load_dotenv

# Nạp biến từ file .env
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
load_dotenv(os.path.join(BASE_DIR, '.env'))


class Settings(BaseSettings):
    PROJECT_NAME: str = "FASTAPI"
    SECRET_KEY: str
    API_PREFIX: str = "/api"
    BACKEND_CORS_ORIGINS: list = ["*"]
    DATABASE_URL: str
    ACCESS_TOKEN_EXPIRE_SECONDS: int = 60 * 60 * 24 * 7  # 7 ngày
    SECURITY_ALGORITHM: str = "HS256"
    LOGGING_CONFIG_FILE: str = os.path.join(BASE_DIR, "logging.ini")
    Client_id :str
    Client_secret :str
    email : str
    password_email : str
    REDIS_HOST : str
    REDIS_PORT : str
    CLOUDINARY_CLOUD_NAME:str
    CLOUDINARY_API_KEY:str
    CLOUDINARY_API_SECRET:str
    class Config:
        env_file = os.path.join(BASE_DIR, ".env")  # Chỉ định file .env
        env_file_encoding = "utf-8"


# Khởi tạo Settings
settings = Settings()
