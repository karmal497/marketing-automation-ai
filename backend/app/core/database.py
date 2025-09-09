# app/core/database.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.ext.asyncio import AsyncEngine
from .config import settings
import asyncpg
import asyncio

engine: AsyncEngine = create_async_engine(settings.DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def create_database_if_not_exists():
    """Crear la base de datos si no existe"""
    try:
        # Conectar a la base de datos postgres por defecto
        conn = await asyncpg.connect(
            user=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASSWORD,
            host=settings.POSTGRES_SERVER,
            port=settings.POSTGRES_PORT,
            database='postgres'
        )
        
        # Verificar si la base de datos existe
        db_exists = await conn.fetchval(
            "SELECT 1 FROM pg_database WHERE datname = $1", 
            settings.POSTGRES_DB
        )
        
        if not db_exists:
            print(f"📦 Creando base de datos: {settings.POSTGRES_DB}")
            await conn.execute(f'CREATE DATABASE "{settings.POSTGRES_DB}"')
            print("✅ Base de datos creada exitosamente!")
        else:
            print(f"✅ La base de datos {settings.POSTGRES_DB} ya existe")
        
        await conn.close()
        
    except Exception as e:
        print(f"❌ Error creando base de datos: {e}")
        import traceback
        traceback.print_exc()
        raise