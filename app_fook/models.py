from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    quantity = Column(Integer)
    price = Column(Float)
    status = Column(String, default="Available")  # สถานะ เช่น Available, Out of stock
