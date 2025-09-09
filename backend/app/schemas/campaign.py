from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

class CampaignStatus(str, Enum):
    DRAFT = "draft"
    SCHEDULED = "scheduled"
    RUNNING = "running"
    COMPLETED = "completed"
    PAUSED = "paused"

class CampaignBase(BaseModel):
    name: str
    description: Optional[str] = None
    target_segment: str

class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[CampaignStatus] = None
    target_segment: Optional[str] = None

class Campaign(CampaignBase):
    id: int
    status: CampaignStatus
    created_by: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class CampaignPerformance(BaseModel):
    id: int
    campaign_id: int
    timestamp: datetime
    opens: int
    clicks: int
    conversions: int
    revenue: float

    class Config:
        from_attributes = True