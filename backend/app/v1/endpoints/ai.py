from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.ai import AIContentRequest, AIContentResponse
from app.services.ai_service import AIService

router = APIRouter()

@router.post("/generate-content", response_model=AIContentResponse)
async def generate_ai_content(
    request: AIContentRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        ai_service = AIService()
        content = await ai_service.generate_content(
            request.prompt, 
            request.context,
            request.model,
            request.temperature,
            request.max_tokens
        )
        
        return AIContentResponse(
            content=content,
            model=request.model
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-email")
async def generate_email_content(
    request: AIContentRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        ai_service = AIService()
        prompt = f"""
        Genera un email de marketing efectivo con el siguiente contexto:
        {request.context}
        
        El email debe ser persuasivo, profesional y tener un call-to-action claro.
        """
        
        content = await ai_service.generate_content(prompt)
        return {"email_content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))