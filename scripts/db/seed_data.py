import asyncio
from app.core.database import AsyncSessionLocal
from app.models.user import User
from app.models.campaign import Campaign, CampaignPerformance
from app.models.customer import Customer
from app.core.security import get_password_hash
from datetime import datetime, timedelta
import random

async def seed_data():
    try:
        async with AsyncSessionLocal() as session:
            # Crear usuario admin
            admin_user = User(
                email="admin@marketing.com",
                hashed_password=get_password_hash("admin123"),
                full_name="Administrator",
                is_superuser=True
            )
            session.add(admin_user)
            
            # Crear campañas de ejemplo
            campaigns = [
                Campaign(
                    name="Welcome Campaign",
                    description="Welcome email series for new users",
                    target_segment="new_users",
                    created_by=1
                ),
                Campaign(
                    name="Promo Summer Sale",
                    description="Summer promotion campaign",
                    target_segment="all_customers", 
                    created_by=1
                ),
                Campaign(
                    name="Abandoned Cart",
                    description="Recover abandoned carts",
                    target_segment="abandoned_carts",
                    created_by=1
                )
            ]
            
            for campaign in campaigns:
                session.add(campaign)
            
            # Crear datos de performance para las campañas
            for campaign_id in range(1, 4):
                for day in range(30):  # 30 días de datos
                    performance = CampaignPerformance(
                        campaign_id=campaign_id,
                        timestamp=datetime.utcnow() - timedelta(days=day),
                        opens=random.randint(50, 200),
                        clicks=random.randint(10, 80),
                        conversions=random.randint(5, 30),
                        revenue=random.uniform(100.0, 2000.0)
                    )
                    session.add(performance)
            
            # Crear algunos clientes de ejemplo
            customers = [
                Customer(
                    email="cliente1@example.com",
                    first_name="Juan",
                    last_name="Pérez",
                    segment="new_users"
                ),
                Customer(
                    email="cliente2@example.com", 
                    first_name="María",
                    last_name="Gómez",
                    segment="loyal_customers"
                ),
                Customer(
                    email="cliente3@example.com",
                    first_name="Carlos",
                    last_name="Rodríguez",
                    segment="abandoned_carts"
                )
            ]
            
            for customer in customers:
                session.add(customer)
            
            await session.commit()
            print("✅ Datos de ejemplo creados exitosamente!")
            
    except Exception as e:
        print(f"❌ Error creando datos de ejemplo: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(seed_data())