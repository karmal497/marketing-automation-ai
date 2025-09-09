import asyncio
from app.core.database import AsyncSessionLocal
from app.models.user import User
from app.models.campaign import Campaign
from app.core.security import get_password_hash

async def seed_data():
    async with AsyncSessionLocal() as session:
        # Crear usuario admin
        admin_user = User(
            email="admin@marketing.com",
            hashed_password=get_password_hash("admin123"),
            full_name="Administrator",
            is_superuser=True
        )
        session.add(admin_user)
        
        # Crear campaña de ejemplo
        campaign = Campaign(
            name="Welcome Campaign",
            description="Welcome email series for new users",
            target_segment="new_users",
            created_by=1
        )
        session.add(campaign)
        
        await session.commit()
        print("Seed data created successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())