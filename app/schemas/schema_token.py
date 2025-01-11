
from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'


class TokenPayload(BaseModel):
    email: Optional[str] = None
