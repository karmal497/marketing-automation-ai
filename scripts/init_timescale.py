import asyncio
import asyncpg
from app.core.config import settings
from app.core.database import engine, Base
from app.models import *

async def init_db():
    try:
        # Primero crear la base de datos si no existe
        conn = await asyncpg.connect(
            user=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASSWORD,
            host=settings.POSTGRES_SERVER,
            port=settings.POSTGRES_PORT,
            database='postgres'  # Conectarse a la base de datos por defecto
        )
        
        # Crear la base de datos si no existe
        await conn.execute(f"""
            SELECT 'CREATE DATABASE {settings.POSTGRES_DB}'
            WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '{settings.POSTGRES_DB}')
        """)
        
        await conn.close()
        
        # Ahora conectar a la base de datos específica y crear tablas
        async with engine.begin() as conn:
            # Crear esquema analytics para métricas temporales
            await conn.execute("CREATE SCHEMA IF NOT EXISTS analytics")
            await conn.run_sync(Base.metadata.create_all)
            
            # Habilitar TimescaleDB extension
            await conn.execute("CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE")
            
            print("Database initialized successfully!")
            
    except Exception as e:
        print(f"Error initializing database: {e}")

if __name__ == "__main__":
    asyncio.run(init_db())