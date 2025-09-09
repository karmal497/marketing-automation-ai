# app/models/__init__.py
from .user import User
from .campaign import Campaign, CampaignPerformance
from .customer import Customer, CustomerSegment
from .ai_model import AIModel, ModelTraining

__all__ = [
    'User', 'Campaign', 'CampaignPerformance', 
    'Customer', 'CustomerSegment', 
    'AIModel', 'ModelTraining'
]