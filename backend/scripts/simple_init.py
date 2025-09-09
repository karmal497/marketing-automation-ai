# scripts/simple_init.py
import asyncio
import asyncpg
from app.core.config import settings

async def create_database_if_not_exists():
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
        raise

async def main():
    print("🔧 Inicializando base de datos...")
    await create_database_if_not_exists()
    
    # Ahora inicializar las tablas
    from app.core.database import engine, Base
    # Importar modelos explícitamente
    from app.models.user import User
    from app.models.campaign import Campaign, CampaignPerformance
    from app.models.customer import Customer, CustomerSegment
    from app.models.ai_model import AIModel, ModelTraining
    
    try:
        async with engine.begin() as conn:
            print("📊 Creando tablas...")
            await conn.run_sync(Base.metadata.create_all)
            print("✅ Tablas creadas exitosamente!")
            
    except Exception as e:
        print(f"❌ Error creando tablas: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())