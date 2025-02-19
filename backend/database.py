import mysql.connector
from mysql.connector import Error
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# โหลดค่าตัวแปรจาก .env
load_dotenv()

# ตั้งค่าการเชื่อมต่อฐานข้อมูลสำหรับ SQLAlchemy
DATABASE_URL = f"mysql+mysqlconnector://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"

# สร้าง Engine สำหรับ SQLAlchemy
engine = create_engine(DATABASE_URL)

# ตั้งค่าการสร้าง Session สำหรับ Database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# กำหนด Base สำหรับสร้าง Models
Base = declarative_base()

# ===== ฟังก์ชันสำหรับเชื่อมต่อฐานข้อมูลด้วย mysql.connector =====
def connect_to_database():
    try:
        print("🟡 กำลังเชื่อมต่อฐานข้อมูล...")  # Debugging log
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )
        if connection.is_connected():
            print("✅ เชื่อมต่อกับฐานข้อมูลสำเร็จ!")
            return connection
    except Error as e:
        print(f"❌ เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล: {e}")
        return None

# ฟังก์ชันปิดการเชื่อมต่อ
def close_connection(connection):
    if connection and connection.is_connected():
        connection.close()
        print("✅ ปิดการเชื่อมต่อฐานข้อมูลเรียบร้อยแล้ว!")

# Dependency สำหรับ FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ===== ทดสอบการเชื่อมต่อฐานข้อมูล =====
if __name__ == "__main__":
    db = connect_to_database()
    if db:
        print("✅ สามารถเชื่อมต่อฐานข้อมูลได้สำเร็จ!")
        close_connection(db)
    else:
        print("❌ ไม่สามารถเชื่อมต่อฐานข้อมูลได้! ตรวจสอบค่า .env และ MySQL Server")
