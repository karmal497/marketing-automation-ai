import openai
from app.core.config import settings
from typing import Dict, Any
import json

class AIService:
    def __init__(self):
        openai.api_key = settings.OPENAI_API_KEY
    
    async def generate_content(self, prompt: str, context: Dict[str, Any] = None):
        try:
            full_prompt = self._build_prompt(prompt, context)
            
            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=[{"role": "user", "content": full_prompt}],
                max_tokens=1000,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
        except Exception as e:
            raise Exception(f"AI service error: {str(e)}")
    
    def _build_prompt(self, prompt: str, context: Dict[str, Any]) -> str:
        if context:
            context_str = json.dumps(context, indent=2)
            return f"Context: {context_str}\n\nPrompt: {prompt}"
        return prompt