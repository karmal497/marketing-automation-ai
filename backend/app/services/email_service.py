import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import json

class EmailService:
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        self.sender_email = "your-email@gmail.com"
        self.sender_password = "your-app-password"

    async def send_email(self, to_email: str, subject: str, content: str, is_html: bool = False):
        try:
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = to_email
            msg['Subject'] = subject

            if is_html:
                msg.attach(MIMEText(content, 'html'))
            else:
                msg.attach(MIMEText(content, 'plain'))

            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)
            
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False

    async def send_marketing_email(self, campaign_data: Dict[str, Any], customer_data: Dict[str, Any]):
        # Personalizar el contenido del email
        subject = campaign_data.get('subject', 'Marketing Campaign')
        template = campaign_data.get('template', '')
        
        # Reemplazar variables en el template
        content = template.format(
            first_name=customer_data.get('first_name', ''),
            last_name=customer_data.get('last_name', ''),
            email=customer_data.get('email', '')
        )
        
        return await self.send_email(
            customer_data['email'],
            subject,
            content,
            is_html=True
        )