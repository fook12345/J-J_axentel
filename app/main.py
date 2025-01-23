from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from .database import Base, engine
from .routers import inventory

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(inventory.router, prefix="/inventory", tags=["Inventory"])

@app.get("/", response_class=HTMLResponse)
def root():
    return """
    <html>
        <head>
            <title>Welcome</title>
        </head>
        <body>
            <h1>Welcome to the Inventory</h1>
            <p>This is the inventory management system flow.</p>
            <p>This is the inventory management on token.</p>
        </body>
    </html>
    """