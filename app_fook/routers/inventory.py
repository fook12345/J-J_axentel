from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Inventory
from ..schemas import InventoryCreate, InventoryResponse
from openpyxl import Workbook

router = APIRouter()

# สร้างสินค้าใหม่
@router.post("/inventory", response_model=InventoryResponse)
def create_inventory(item: InventoryCreate, db: Session = Depends(get_db)):
    db_item = db.query(Inventory).filter(Inventory.name == item.name).first()
    if db_item:
        raise HTTPException(status_code=400, detail="Item already exists")
    new_item = Inventory(**item.dict())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

# ดึงข้อมูลสินค้าทั้งหมด
@router.get("/inventory", response_model=list[InventoryResponse])
def get_inventory(db: Session = Depends(get_db)):
    items = db.query(Inventory).all()
    return items

# ส่งออกข้อมูลเป็น Excel
@router.get("/export", response_class=bytes)
def export_inventory(db: Session = Depends(get_db)):
    items = db.query(Inventory).all()
    
    wb = Workbook()
    ws = wb.active
    ws.append(["ID", "Name", "Quantity", "Price", "Status"])
    
    for item in items:
        ws.append([item.id, item.name, item.quantity, item.price, item.status])
    
    from io import BytesIO
    output = BytesIO()
    wb.save(output)
    output.seek(0)
    return output.getvalue()
