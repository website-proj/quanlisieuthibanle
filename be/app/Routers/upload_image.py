import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from fastapi import APIRouter, UploadFile, File, HTTPException
from starlette.responses import JSONResponse

# Configuration
cloudinary.config(
    cloud_name = "do1uf5lkr",
    api_key = "872274488261572",
    api_secret = "EiAuZLAZ-0sZBb83jz8oVdUtygs", # Click 'View API Keys' above to copy your API secret
    secure=True
)
router = APIRouter()
@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    try:
        upload_result = cloudinary.uploader.upload(
            file.file,
            upload_preset="bacjdbvn"
        )
        return {
            "message": "Upload successful",
            "url": upload_result.get("url"),
            "secure_url": upload_result.get("secure_url")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {e}")
