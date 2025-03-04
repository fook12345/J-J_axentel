# controllers/forgot_controller.py
import random
import string
import datetime
from flask import Blueprint, request, jsonify
from services.user_service import get_user_by_email_or_phone, update_password
from services.otp_service import create_otp_for_user, verify_otp_code

forgot_bp = Blueprint('forgot_bp', __name__)

@forgot_bp.route('/request', methods=['POST'])
def request_reset():
    data = request.json
    email_or_phone = data.get('emailOrPhone')
    if not email_or_phone:
        return jsonify({"success": False, "message": "กรุณากรอก Email หรือ Phone"}), 400
    
    # 1) หา user ในระบบ
    user = get_user_by_email_or_phone(email_or_phone)
    if not user:
        return jsonify({"success": False, "message": "ไม่พบบัญชีนี้"}), 404
    
    # 2) สร้าง OTP และเซฟลง DB, ส่งไปให้ user
    #    (services.otp_service.create_otp_for_user)
    otp_code = create_otp_for_user(user['id'])
    # 3) ส่ง SMS หรือ Email จริง (ซึ่งเป็นอีกเรื่อง เช่นผ่าน Twilio หรือ SMTP)
    #    ตัวอย่าง placeholders
    print("Sending OTP to user:", otp_code)
    
    return jsonify({"success": True, "message": "ส่ง OTP สำเร็จ"})

@forgot_bp.route('/verify', methods=['POST'])
def verify_otp():
    data = request.json
    otp_code = data.get('otp')
    if not otp_code:
        return jsonify({"success": False, "message": "กรุณากรอก OTP"}), 400
    
    # 1) check otp
    user_id = verify_otp_code(otp_code)
    if not user_id:
        return jsonify({"success": False, "message": "OTP ไม่ถูกต้องหรือหมดอายุ"}), 400
    
    # สร้าง token (หรือ session) ให้ user ใช้ตอน reset password
    # ในตัวอย่าง สมมติใช้ otp_code เป็น token ไปเลย (ไม่ปลอดภัยนัก)
    
    return jsonify({"success": True, "message": "OTP ถูกต้อง", "token": otp_code})

@forgot_bp.route('/reset', methods=['POST'])
def reset_password():
    data = request.json
    token = data.get('token')
    new_password = data.get('newPassword')
    
    if not token or not new_password:
        return jsonify({"success": False, "message": "ข้อมูลไม่ครบ"}), 400
    
    # 1) verify token -> if valid, get user_id
    user_id = verify_otp_code(token)  # สมมติใช้วิธีเดียวกับ verify otp
    if not user_id:
        return jsonify({"success": False, "message": "Token ไม่ถูกต้อง"}), 400
    
    # 2) update password
    update_password(user_id, new_password)
    
    # 3) ลบ otp/ token
    # ...
    
    return jsonify({"success": True, "message": "รีเซ็ตรหัสผ่านสำเร็จ"})
