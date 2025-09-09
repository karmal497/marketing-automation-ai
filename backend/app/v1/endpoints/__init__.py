from .campaigns import router as campaigns_router
from .ai import router as ai_router
from .analytics import router as analytics_router

__all__ = ['campaigns_router', 'ai_router', 'analytics_router']