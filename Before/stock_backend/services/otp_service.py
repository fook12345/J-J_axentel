import hashlib
import random
import string
import datetime
from models.otp_repository import save_otp, get_otp_by_code, invalidate_otp
from services.user_service import hash_password

def create_otp_for_user(user_id):
    # สร้างโค้ด OTP แบบตัวเลข 6 หลัก
    otp_code = ''.join([str(random.randint(0,9)) for _ in range(6)])
    # หรือใช้ random.choices(string.digits, k=6)
    
    expired_at = datetime.datetime.now() + datetime.timedelta(minutes=5)
    save_otp(user_id, otp_code, expired_at)
    return otp_code

def verify_otp_code(otp_code):
    # ดึงจาก DB
    otp_record = get_otp_by_code(otp_code)
    if not otp_record:
        return None
    if otp_record['expired_at'] < datetime.datetime.now():
        return None
    
    # ถ้ายังไม่หมดอายุ, คืน user_id
    return otp_record['user_id']
