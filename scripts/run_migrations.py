import asyncio
import subprocess
import sys
import os

# Agregar el directorio backend al path de Python
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

async def run_migrations():
    try:
        print("🚀 Iniciando migraciones de la base de datos...")
        
        # Ejecutar el script de inicialización de la base de datos
        from scripts.db.init_database import init_db
        await init_db()
        
        # Ejecutar el script de seeding de datos
        from scripts.db.seed_data import seed_data
        await seed_data()
        
        print("✅ Migraciones completadas exitosamente!")
        
    except Exception as e:
        print(f"❌ Error en las migraciones: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(run_migrations())