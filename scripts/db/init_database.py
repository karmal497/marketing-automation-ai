import asyncio
from app.core.database import engine, Base
from app.models import *

async def init_db():
    try:
        async with engine.begin() as conn:
            # Crear todas las tablas
            await conn.run_sync(Base.metadata.create_all)
            print("✅ Tablas creadas exitosamente!")
            
    except Exception as e:
        print(f"❌ Error creando tablas: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(init_db())