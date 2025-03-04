# services/user_service.py
import hashlib
from models.user_repository import get_user_by_username, create_user

def register_user(username, password, first_name, last_name, email, phone_number):
    # เช็คก่อนว่า username หรือ email หรือเบอร์โทร ซ้ำหรือไม่
    existing_user = get_user_by_username(username)
    if existing_user:
        return None, "Username นี้มีอยู่แล้ว"

    # อาจเช็ค email, phone_number ซ้ำได้เช่นกัน
    # ...

    # hash password
    password_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()

    # สร้าง user
    user_id = create_user(username, password_hash, first_name, last_name, email, phone_number)
    if user_id:
        return user_id, "Success"
    else:
        return None, "ไม่สามารถสร้าง user ได้"
