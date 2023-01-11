from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from routers import blogs
from db import models
from db.database import engine

app = FastAPI()
app.include_router(blogs.router)

models.Base.metadata.create_all(engine)

app.mount(path='/images', app=StaticFiles(directory='images'), name='images')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
