from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn

from app.core.config import settings
from app.db.database import engine, Base
import app.models # Barcha modellarni ro'yxatga olish uchun

# Routers
from app.api.v1.auth import router as auth_router
from app.api.v1.services import router as services_router
from app.api.v1.calendar import router as calendar_router
from app.api.v1.bookings import router as bookings_router
from app.api.v1.budget import router as budget_router
from app.api.v1.invitations import router as invitations_router
from app.api.v1.webhooks import router as webhooks_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# CORS sozlamalari
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Real-Time WebSocket Menejeri
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

ws_manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            # Kelgan ma'lumotni barcha mijozlarga jonli tarqatish (masalan kalendar yangilanishi)
            await ws_manager.broadcast({"type": "EVENT_BROADCAST", "payload": data})
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)

# Routerni ulash
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(services_router, prefix=settings.API_V1_STR)
app.include_router(calendar_router, prefix=settings.API_V1_STR)
app.include_router(bookings_router, prefix=settings.API_V1_STR)
app.include_router(budget_router, prefix=settings.API_V1_STR)
app.include_router(invitations_router, prefix=settings.API_V1_STR)
app.include_router(webhooks_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def on_startup():
    # Jadvallarni avtomat yaratish (agar yaratilmagan bo'lsa)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

from fastapi.responses import HTMLResponse
import os

@app.api_route("/invite/{slug}", methods=["GET", "HEAD"], response_class=HTMLResponse)
async def view_public_invitation(slug: str):
    """
    Mehmonlar Telegram yoki brauzerdan ochadigan hashamatli to'y taklifnomasi sahifasi.
    """
    template_path = os.path.join(os.path.dirname(__file__), "templates", "luxury_invite.html")
    if os.path.exists(template_path):
        with open(template_path, "r", encoding="utf-8") as f:
            html = f.read()
        
        # O'zbek to'ylari uchun namuna ma'lumotlar bilan to'ldirish
        html = html.replace("{{ groom_name }}", "Asilbek")
        html = html.replace("{{ bride_name }}", "Madina")
        html = html.replace("{{ venue_name }}", "Versal Grand Palace")
        html = html.replace("{{ venue_address }}", "Toshkent sh., Shota Rustaveli ko'chasi 45")
        html = html.replace("{{ slug }}", slug)
        return HTMLResponse(content=html, status_code=200)

    return HTMLResponse("<h1>To'y taklifnomasi topilmadi</h1>", status_code=404)

from fastapi.staticfiles import StaticFiles

static_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static")
os.makedirs(static_dir, exist_ok=True)
app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.api_route("/", methods=["GET", "HEAD"], response_class=HTMLResponse)
async def root():
    landing_path = os.path.join(os.path.dirname(__file__), "templates", "index.html")
    if os.path.exists(landing_path):
        with open(landing_path, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read(), status_code=200)
    return HTMLResponse("<h1>TuyBox Platform</h1>")

@app.get("/api/health")
async def health():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs_url": f"{settings.API_V1_STR}/docs",
    }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
