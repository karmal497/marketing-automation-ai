# scripts/init_database.py
import asyncio
import sys
import os

# Agregar el directorio backend al path de Python
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

async def init_db():
    try:
        from app.core.database import engine, Base, create_database_if_not_exists
        # Importar todos los modelos explícitamente
        from app.models.user import User
        from app.models.campaign import Campaign, CampaignPerformance
        from app.models.customer import Customer, CustomerSegment
        from app.models.ai_model import AIModel, ModelTraining
        
        print("🔧 Inicializando base de datos...")
        
        # Crear base de datos si no existe
        await create_database_if_not_exists()
        
        # Crear tablas
        async with engine.begin() as conn:
            print("📊 Creando tablas...")
            await conn.run_sync(Base.metadata.create_all)
            print("✅ Tablas creadas exitosamente!")
            
    except Exception as e:
        print(f"❌ Error inicializando base de datos: {e}")
        import traceback
        traceback.print_exc()
        raise

if __name__ == "__main__":
    asyncio.run(init_db())