from pydantic import BaseModel
from typing import Optional

class InventoryBase(BaseModel):
    name: str
    quantity: int
    price: float
    status: Optional[str] = "Available"

class InventoryCreate(InventoryBase):
    pass

class InventoryResponse(InventoryBase):
    id: int

    class Config:
        from_attributes = True

