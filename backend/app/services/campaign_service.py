from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from app.models.campaign import Campaign, CampaignPerformance
from app.schemas.campaign import CampaignCreate, CampaignUpdate
from datetime import datetime

class CampaignService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_campaign(self, campaign: CampaignCreate, user_id: int):
        db_campaign = Campaign(
            name=campaign.name,
            description=campaign.description,
            target_segment=campaign.target_segment,
            created_by=user_id
        )
        self.db.add(db_campaign)
        await self.db.commit()
        await self.db.refresh(db_campaign)
        return db_campaign

    async def get_campaigns(self, skip: int = 0, limit: int = 100):
        result = await self.db.execute(
            select(Campaign)
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

    async def get_campaign(self, campaign_id: int):
        result = await self.db.execute(
            select(Campaign).where(Campaign.id == campaign_id)
        )
        return result.scalar_one_or_none()

    async def update_campaign(self, campaign_id: int, campaign: CampaignUpdate):
        db_campaign = await self.get_campaign(campaign_id)
        if not db_campaign:
            return None

        update_data = campaign.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_campaign, field, value)

        db_campaign.updated_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(db_campaign)
        return db_campaign

    async def record_performance(self, campaign_id: int, metrics: dict):
        performance = CampaignPerformance(
            campaign_id=campaign_id,
            opens=metrics.get('opens', 0),
            clicks=metrics.get('clicks', 0),
            conversions=metrics.get('conversions', 0),
            revenue=metrics.get('revenue', 0.0)
        )
        self.db.add(performance)
        await self.db.commit()
        await self.db.refresh(performance)
        return performance