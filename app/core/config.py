import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# Tải các biến môi trường từ file .env
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
load_dotenv(os.path.join(BASE_DIR, '.env'))


class Settings(BaseSettings):
    PROJECT_NAME: str = 'FASTAPI BASE'
    SECRET_KEY: str = ''
    API_PREFIX: str = ''
    BACKEND_CORS_ORIGINS: list[str] = ['*']
    DATABASE_URL: str = ''
    ACCESS_TOKEN_EXPIRE_SECONDS: int = 60 * 60 * 24 * 7  # Token hết hạn sau 7 ngày
    SECURITY_ALGORITHM: str = 'HS256'
    LOGGING_CONFIG_FILE: str = os.path.join(BASE_DIR, 'logging.ini')

    class Config:
        env_file = os.path.join(BASE_DIR, '.env')
        env_file_encoding = 'utf-8'
        extra = 'allow'  # Cho phép các biến môi trường không được định nghĩa

settings = Settings()
