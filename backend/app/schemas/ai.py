from pydantic import BaseModel
from typing import Dict, Any, Optional

class AIContentRequest(BaseModel):
    prompt: str
    context: Optional[Dict[str, Any]] = None
    model: Optional[str] = "gpt-4"
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1000

class AIContentResponse(BaseModel):
    content: str
    model: str
    usage: Optional[Dict[str, int]] = None