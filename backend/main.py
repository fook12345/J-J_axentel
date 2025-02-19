from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth

# สร้าง FastAPI instance
app = FastAPI()

# ตั้งค่า CORS Middleware เพื่อให้ frontend ที่รันบน http://localhost:3000 เรียก API ได้
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # อนุญาตให้ frontend เรียก API ได้
    allow_credentials=True,
    allow_methods=["*"],  # อนุญาตทุก HTTP Method เช่น GET, POST, PUT, DELETE
    allow_headers=["*"],  # อนุญาตทุก Header
)

# รวม router ของ auth เข้ากับ FastAPI
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

# Route สำหรับตรวจสอบว่า Backend ทำงานอยู่
@app.get("/")
def root():
    return {"message": "Backend is running!"}
