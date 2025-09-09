# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import campaigns_router, ai_router, analytics_router
from app.core.config import settings
from app.core.monitoring import monitor_requests, metrics_endpoint
from app.core.database import engine, Base, create_database_if_not_exists
import asyncio

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware de monitorización
app.middleware("http")(monitor_requests)

# Endpoints
app.include_router(campaigns_router, prefix="/api/v1/campaigns", tags=["campaigns"])
app.include_router(ai_router, prefix="/api/v1/ai", tags=["ai"])
app.include_router(analytics_router, prefix="/api/v1/analytics", tags=["analytics"])

# Endpoint de métricas
app.add_route("/metrics", metrics_endpoint)

@app.on_event("startup")
async def startup_event():
    try:
        # Primero crear la base de datos si no existe
        await create_database_if_not_exists()
        
        # Luego crear las tablas
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
            print("✅ Tablas creadas exitosamente!")
            
    except Exception as e:
        print(f"❌ Error durante el startup: {e}")
        raise

@app.get("/")
async def root():
    return {"message": "Marketing Automation AI API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)