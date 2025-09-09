from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from datetime import datetime, timedelta
from typing import List
from app.core.database import get_db
from app.models.campaign import CampaignPerformance

router = APIRouter()

@router.get("/campaign-performance/{campaign_id}")
async def get_campaign_performance(
    campaign_id: int,
    start_date: datetime = None,
    end_date: datetime = None,
    db: AsyncSession = Depends(get_db)
):
    if not start_date:
        start_date = datetime.utcnow() - timedelta(days=30)
    if not end_date:
        end_date = datetime.utcnow()

    result = await self.db.execute(
        select(CampaignPerformance)
        .where(CampaignPerformance.campaign_id == campaign_id)
        .where(CampaignPerformance.timestamp >= start_date)
        .where(CampaignPerformance.timestamp <= end_date)
    )
    
    performances = result.scalars().all()
    return performances

@router.get("/metrics/summary")
async def get_metrics_summary(db: AsyncSession = Depends(get_db)):
    # Métricas agregadas
    result = await db.execute(
        select(
            func.count(CampaignPerformance.id).label("total_events"),
            func.sum(CampaignPerformance.opens).label("total_opens"),
            func.sum(CampaignPerformance.clicks).label("total_clicks"),
            func.sum(CampaignPerformance.conversions).label("total_conversions"),
            func.sum(CampaignPerformance.revenue).label("total_revenue")
        )
    )
    
    summary = result.first()
    return {
        "total_events": summary.total_events,
        "total_opens": summary.total_opens,
        "total_clicks": summary.total_clicks,
        "total_conversions": summary.total_conversions,
        "total_revenue": summary.total_revenue
    }