from .user import User
from .campaign import Campaign, CampaignPerformance
from .customer import Customer, CustomerSegment
from .email_template import EmailTemplate
from .ai_model import AIModel, ModelTraining

__all__ = [
    'User', 'Campaign', 'CampaignPerformance', 
    'Customer', 'CustomerSegment', 'EmailTemplate',
    'AIModel', 'ModelTraining'
]