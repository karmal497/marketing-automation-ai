from sqlalchemy import Column, Integer, String, DateTime, JSON, Float
from sqlalchemy.sql import func
from app.core.database import Base

class AIModel(Base):
    __tablename__ = "ai_models"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    model_type = Column(String, nullable=False)  # gpt-4, custom, etc.
    version = Column(String, nullable=False)
    parameters = Column(JSON)  # Hyperparameters
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ModelTraining(Base):
    __tablename__ = "model_trainings"
    
    id = Column(Integer, primary_key=True, index=True)
    model_id = Column(Integer, nullable=False)
    training_data = Column(JSON)
    metrics = Column(JSON)  # Training metrics
    accuracy = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())