from pydantic import BaseModel
from datetime import datetime

class BlogRequest(BaseModel):
    title: str
    content: str
    creator_name: str
    image_url: str

class BlogDisplay(BaseModel):
    id: int
    title: str
    content: str
    creator_name: str
    image: str
    timestamp: datetime
    
    class Config():
        orm_mode = True
