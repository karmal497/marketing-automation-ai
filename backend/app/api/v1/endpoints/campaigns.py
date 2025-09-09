from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.schemas.campaign import Campaign, CampaignCreate, CampaignUpdate
from app.services.campaign_service import CampaignService
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Campaign)
async def create_campaign(
    campaign: CampaignCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    campaign_service = CampaignService(db)
    return await campaign_service.create_campaign(campaign, current_user.id)

@router.get("/", response_model=List[Campaign])
async def get_campaigns(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    campaign_service = CampaignService(db)
    return await campaign_service.get_campaigns(skip, limit)

@router.get("/{campaign_id}", response_model=Campaign)
async def get_campaign(
    campaign_id: int,
    db: AsyncSession = Depends(get_db)
):
    campaign_service = CampaignService(db)
    campaign = await campaign_service.get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@router.put("/{campaign_id}", response_model=Campaign)
async def update_campaign(
    campaign_id: int,
    campaign: CampaignUpdate,
    db: AsyncSession = Depends(get_db)
):
    campaign_service = CampaignService(db)
    updated_campaign = await campaign_service.update_campaign(campaign_id, campaign)
    if not updated_campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return updated_campaign