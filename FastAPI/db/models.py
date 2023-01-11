from sqlalchemy import Column
from sqlalchemy.sql.sqltypes import Integer, String, DateTime

from db.database import Base

class DbBlogs(Base):
    __tablename__ = 'blogs'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    creator_name = Column(String)
    image = Column(String)
    timestamp = Column(DateTime)
