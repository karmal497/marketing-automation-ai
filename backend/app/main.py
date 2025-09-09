from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import campaigns, ai, analytics
from app.core.config import settings
from app.core.monitoring import monitor_requests, metrics_endpoint
from app.core.database import engine, Base
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
app.include_router(campaigns.router, prefix="/api/v1/campaigns", tags=["campaigns"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["ai"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["analytics"])

# Endpoint de métricas
app.add_route("/metrics", metrics_endpoint)

@app.on_event("startup")
async def startup_event():
    # Inicializar base de datos
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
async def root():
    return {"message": "Marketing Automation AI API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)