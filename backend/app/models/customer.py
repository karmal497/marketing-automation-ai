from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    segment = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class CustomerSegment(Base):
    __tablename__ = "customer_segments"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String)
    customer_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())