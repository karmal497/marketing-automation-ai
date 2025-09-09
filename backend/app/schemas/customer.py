from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CustomerBase(BaseModel):
    email: str
    first_name: str
    last_name: str

class CustomerCreate(CustomerBase):
    segment: str

class Customer(CustomerBase):
    id: int
    segment: str
    created_at: datetime

    class Config:
        from_attributes = True

class CustomerSegment(BaseModel):
    name: str
    description: Optional[str] = None
    customer_count: int

    class Config:
        from_attributes = True