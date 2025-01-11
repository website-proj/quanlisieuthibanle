from fastapi import HTTPException

from authlib.integrations.base_client import OAuthError
from authlib.integrations.starlette_client import OAuth
from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from starlette import status
from starlette.responses import JSONResponse
from app.core.security import create_access_token
from app.core.config import settings
from app.db.base import get_db
from app.model.users import User

router = APIRouter()

# Exception cho lỗi xác thực
CREDENTIALS_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Could not validate credentials',
    headers={'WWW-Authenticate': 'Bearer'},
)

# Load Google client ID và secret từ cấu hình
client_id = settings.Client_id
client_secret = settings.Client_secret
if not client_id or not client_secret:
    raise ValueError("Missing Google client_id or client_secret")

# Cấu hình OAuth
oauth = OAuth()
oauth.register(
    name='google',
    client_id=client_id,
    client_secret=client_secret,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)


FRONTEND_URL = 'http://127.0.0.1:8000/api/login/token'


@router.get('/')
async def login(request: Request):
    """
    Redirect người dùng đến trang đăng nhập Google.
    """
    redirect_uri = FRONTEND_URL  # URL backend xử lý callback từ Google
    return await oauth.google.authorize_redirect(request, redirect_uri=redirect_uri)


@router.get('/token')
async def auth(request: Request, db: Session = Depends(get_db)):
    """
    Xử lý callback từ Google và nhận thông tin người dùng.
    """
    try:
        # Lấy access token từ Google
        token = await oauth.google.authorize_access_token(request  , db)
        print(token)
        user_info = token.get('userinfo')
        if not user_info:
            raise OAuthError("Invalid token or userinfo missing.")
    except OAuthError:
        raise HTTPException(status_code= 400 , detail = "token error")

    # Kiểm tra email trong cơ sở dữ liệu
    email = db.query(User).filter(User.email == user_info['email']).first()
    if email:
        # Trả về access token
        return JSONResponse({
            'result': True,
            'access_token': create_access_token(user_info['email']),
        })

    # Nếu email không tồn tại, trả về lỗi xác thực
    raise CREDENTIALS_EXCEPTION
