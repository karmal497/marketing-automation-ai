from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app import schemas, models, services
from app.core.database import get_db

router = APIRouter()

@router.post("/campaigns/", response_model=schemas.Campaign)
async def create_campaign(
    campaign: schemas.CampaignCreate,
    db: AsyncSession = Depends(get_db)
):
    campaign_service = services.CampaignService(db)
    return await campaign_service.create_campaign(campaign)

@router.get("/campaigns/", response_model=List[schemas.Campaign])
async def get_campaigns(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    campaign_service = services.CampaignService(db)
    return await campaign_service.get_campaigns(skip, limit)