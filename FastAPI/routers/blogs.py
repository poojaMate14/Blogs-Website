import shutil
import string
import random
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm.session import Session
from typing import List

from schemas import BlogDisplay, BlogRequest
from db.database import get_db
from db.models import DbBlogs

router = APIRouter(
    prefix='/blogs',
    tags=['blogs']
)

# Upload Image
@router.post('/image')
def upload_image(image: UploadFile = File(...)):
    return {
        'msg': 'Image uploaded succesfully!',
        'image_url': get_image_url(image)
    }

# Create Blog
@router.post('/', response_model=BlogDisplay)
def create_new_blog(req_body: BlogRequest, db: Session = Depends(get_db)):
    new_blog = DbBlogs(
        title = req_body.title,
        content = req_body.content,
        creator_name = req_body.creator_name,
        image = req_body.image_url,
        timestamp = datetime.now()
    )
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

# Get All Blogs
@router.get('/', response_model=List[BlogDisplay])
def get_all_blogs(db: Session = Depends(get_db)):
    all_blogs = db.query(DbBlogs).all()
    return all_blogs

# Delete blog by id
@router.delete('/{id}')
def delete_blog_by_id(id: int, db: Session = Depends(get_db)):
    blog = db.query(DbBlogs).filter(DbBlogs.id == id).first()
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Blog {id} not found!'
        )
    db.delete(blog)
    db.commit()
    return {'msg': f'Blog {id} deleted successfully!'}

def get_image_url(image_file: UploadFile = File(...)):
    rand_str = ''.join(random.choice(string.ascii_letters) for i in range(6))
    rand_str = f'_{rand_str}.'
    image_rand_filename = rand_str.join(image_file.filename.rsplit('.', 1))
    path = f'images/{image_rand_filename}'
    with open(path, 'w+b') as write_file:
        shutil.copyfileobj(image_file.file, write_file)
    return path
