from fastapi import HTTPException, APIRouter, Request, Depends
from authlib.integrations.base_client import OAuthError
from authlib.integrations.starlette_client import OAuth
from sqlalchemy.orm import Session
from starlette import status
from starlette.responses import JSONResponse
from app.core.security import create_access_token , get_password_hash
from app.core.config import settings
from app.db.base import get_db
from app.model.users import User
from starlette.responses import RedirectResponse

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

FRONTEND_URL = 'http://localhost:8000/api/login/token'


@router.get('/')
async def login(request: Request):
    """
    Redirect người dùng đến trang đăng nhập Google.
    """
    redirect_uri = FRONTEND_URL  # URL backend xử lý callback từ Google
    try:
        return await oauth.google.authorize_redirect(request, redirect_uri=redirect_uri)
    except Exception as e:
        # Xử lý lỗi khi gửi yêu cầu OAuth đến Google
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to redirect to Google login: {str(e)}"
        )


@router.get('/token')
async def auth(request: Request, db: Session = Depends(get_db)):
    """
    Xử lý callback từ Google và nhận thông tin người dùng.
    """
    try:
        # Lấy access token từ Google
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get('userinfo')

        if not user_info:
            raise OAuthError("Invalid token or userinfo missing.")
    except OAuthError as e:
        # Xử lý lỗi OAuth
        raise HTTPException(status_code=400, detail=f"OAuth error: {str(e)}")
    except Exception as e:
        # Xử lý lỗi chung khi nhận token
        raise HTTPException(status_code=400, detail=f"Token error: {str(e)}")

    # Kiểm tra email trong cơ sở dữ liệu
    user = db.query(User).filter(User.email == user_info['email']).first()
    hash_password = get_password_hash(user_info["sub"])
    if not user :
        new_user = User(
            username = user_info["name"],
            email = user_info["email"],
            password = hash_password
        )
        db.add(new_user)
        db.commit()

        token = create_access_token(new_user.email , db)
    # return token
    frontend_url = "http://localhost:5173/home"  # Your frontend URL
    redirect_url = f"{frontend_url}?access_token={token}&token_type=Bearer"
    return RedirectResponse(url=redirect_url)