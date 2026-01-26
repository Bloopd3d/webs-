from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import hashlib

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

class MenuItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre: str
    descripcion: str
    precio: float
    categoria: str
    imagen_url: str
    destacado: bool = False
    sin_tacc: bool = False

class MenuItemCreate(BaseModel):
    nombre: str
    descripcion: str
    precio: float
    categoria: str
    imagen_url: str
    destacado: bool = False
    sin_tacc: bool = False

class MenuItemUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    precio: Optional[float] = None
    categoria: Optional[str] = None
    imagen_url: Optional[str] = None
    destacado: Optional[bool] = None
    sin_tacc: Optional[bool] = None

class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre_cliente: str
    telefono: str
    fecha: str
    hora: str
    cantidad_personas: int
    estado: str = "pendiente"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ReservationCreate(BaseModel):
    nombre_cliente: str
    telefono: str
    fecha: str
    hora: str
    cantidad_personas: int

class ReservationUpdate(BaseModel):
    estado: str

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminToken(BaseModel):
    token: str
    username: str

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    admin_token = "admin_la_calandria_2024"
    if credentials.credentials != admin_token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return credentials.credentials

@api_router.post("/admin/login", response_model=AdminToken)
async def admin_login(login: AdminLogin):
    if login.username == "admin" and login.password == "calandria2024":
        return AdminToken(token="admin_la_calandria_2024", username="admin")
    raise HTTPException(status_code=401, detail="Invalid credentials")

@api_router.get("/menu", response_model=List[MenuItem])
async def get_menu(categoria: Optional[str] = None):
    query = {}
    if categoria and categoria != "Todos":
        query["categoria"] = categoria
    menu_items = await db.menu.find(query, {"_id": 0}).to_list(1000)
    return menu_items

@api_router.post("/menu", response_model=MenuItem)
async def create_menu_item(item: MenuItemCreate, token: str = Depends(verify_admin_token)):
    menu_item = MenuItem(**item.model_dump())
    doc = menu_item.model_dump()
    await db.menu.insert_one(doc)
    return menu_item

@api_router.put("/menu/{item_id}", response_model=MenuItem)
async def update_menu_item(item_id: str, item: MenuItemUpdate, token: str = Depends(verify_admin_token)):
    update_data = {k: v for k, v in item.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    
    result = await db.menu.find_one_and_update(
        {"id": item_id},
        {"$set": update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    result.pop("_id", None)
    return MenuItem(**result)

@api_router.delete("/menu/{item_id}")
async def delete_menu_item(item_id: str, token: str = Depends(verify_admin_token)):
    result = await db.menu.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return {"message": "Menu item deleted"}

@api_router.get("/reservations", response_model=List[Reservation])
async def get_reservations(token: str = Depends(verify_admin_token)):
    reservations = await db.reservations.find({}, {"_id": 0}).to_list(1000)
    for res in reservations:
        if isinstance(res.get('created_at'), str):
            res['created_at'] = datetime.fromisoformat(res['created_at'])
    return reservations

@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(reservation: ReservationCreate):
    res = Reservation(**reservation.model_dump())
    doc = res.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.reservations.insert_one(doc)
    return res

@api_router.put("/reservations/{reservation_id}", response_model=Reservation)
async def update_reservation(reservation_id: str, update: ReservationUpdate, token: str = Depends(verify_admin_token)):
    result = await db.reservations.find_one_and_update(
        {"id": reservation_id},
        {"$set": {"estado": update.estado}},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    result.pop("_id", None)
    if isinstance(result.get('created_at'), str):
        result['created_at'] = datetime.fromisoformat(result['created_at'])
    return Reservation(**result)

@api_router.post("/seed")
async def seed_data():
    existing = await db.menu.count_documents({})
    if existing > 0:
        return {"message": "Database already seeded"}
    
    seed_menu = [
        {
            "id": str(uuid.uuid4()),
            "nombre": "Risotto de Calabaza",
            "descripcion": "Cremoso risotto con calabaza asada, parmesano y aceite de trufa",
            "precio": 4500,
            "categoria": "Parrilla",
            "imagen_url": "https://images.pexels.com/photos/34759470/pexels-photo-34759470.jpeg",
            "destacado": True,
            "sin_tacc": True
        },
        {
            "id": str(uuid.uuid4()),
            "nombre": "Sushi Rolls Especiales",
            "descripcion": "Selección de 12 piezas con salmón, atún y aguacate",
            "precio": 5200,
            "categoria": "Sushi",
            "imagen_url": "https://images.pexels.com/photos/14188066/pexels-photo-14188066.jpeg",
            "destacado": True,
            "sin_tacc": False
        },
        {
            "id": str(uuid.uuid4()),
            "nombre": "Brunch Gratitud",
            "descripcion": "Tostadas artesanales, huevos pochados, aguacate y salmón ahumado",
            "precio": 3800,
            "categoria": "Brunch",
            "imagen_url": "https://images.pexels.com/photos/7936963/pexels-photo-7936963.jpeg",
            "destacado": True,
            "sin_tacc": False
        },
        {
            "id": str(uuid.uuid4()),
            "nombre": "Roll de Canela",
            "descripcion": "Roll casero con glaseado de queso crema y canela",
            "precio": 1800,
            "categoria": "Cafetería",
            "imagen_url": "https://images.pexels.com/photos/351962/pexels-photo-351962.jpeg",
            "destacado": True,
            "sin_tacc": False
        },
        {
            "id": str(uuid.uuid4()),
            "nombre": "Bife de Chorizo",
            "descripcion": "350g de carne premium con guarnición de papas rústicas",
            "precio": 6200,
            "categoria": "Parrilla",
            "imagen_url": "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg",
            "destacado": False,
            "sin_tacc": True
        },
        {
            "id": str(uuid.uuid4()),
            "nombre": "Café Especialidad",
            "descripcion": "Café de origen con método V60",
            "precio": 1200,
            "categoria": "Cafetería",
            "imagen_url": "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
            "destacado": False,
            "sin_tacc": True
        },
        {
            "id": str(uuid.uuid4()),
            "nombre": "Ensalada César Sin TACC",
            "descripcion": "Lechuga romana, pollo grillado, crotones sin gluten y aderezo césar",
            "precio": 3200,
            "categoria": "Sin TACC",
            "imagen_url": "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg",
            "destacado": False,
            "sin_tacc": True
        },
        {
            "id": str(uuid.uuid4()),
            "nombre": "Panqueques con Frutas",
            "descripcion": "Stack de panqueques esponjosos con frutas frescas y miel",
            "precio": 2500,
            "categoria": "Brunch",
            "imagen_url": "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
            "destacado": False,
            "sin_tacc": False
        }
    ]
    
    await db.menu.insert_many(seed_menu)
    return {"message": "Database seeded successfully", "items": len(seed_menu)}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()