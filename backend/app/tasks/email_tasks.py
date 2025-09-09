from .celery_app import celery_app
from app.services.email_service import EmailService
from app.services.ai_service import AIService

@celery_app.task
def send_marketing_email_task(campaign_id, customer_data):
    # Lógica para enviar email
    email_service = EmailService()
    return email_service.send_email(campaign_id, customer_data)

@celery_app.task
def generate_ai_content_task(prompt, context):
    ai_service = AIService()
    return ai_service.generate_content(prompt, context)