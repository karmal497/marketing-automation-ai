import asyncio
from app.core.database import engine, Base
from app.models import *

async def init_db():
    async with engine.begin() as conn:
        # Crear esquema analytics para métricas temporales
        await conn.execute("CREATE SCHEMA IF NOT EXISTS analytics")
        await conn.run_sync(Base.metadata.create_all)
        
        # Habilitar TimescaleDB extension
        await conn.execute("CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE")
        
        # Convertir campaign_performance en hypertable
        await conn.execute("""
            SELECT create_hypertable(
                'analytics.campaign_performance', 
                'timestamp',
                if_not_exists => TRUE
            )
        """)
        
        print("Database initialized successfully!")

if __name__ == "__main__":
    asyncio.run(init_db())