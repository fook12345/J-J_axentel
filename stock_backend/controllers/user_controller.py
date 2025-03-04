# controllers/user_controller.py
from flask import Blueprint, request, jsonify
from services.user_service import register_user

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')

    if not username or not password or not first_name or not last_name or not email or not phone_number:
        return jsonify({"success": False, "message": "กรอกข้อมูลไม่ครบ"}), 400

    try:
        user_id, msg = register_user(username, password, first_name, last_name, email, phone_number)
        if user_id:
            return jsonify({"success": True, "message": "ลงทะเบียนสำเร็จ", "user_id": user_id})
        else:
            return jsonify({"success": False, "message": msg}), 400
    except Exception as e:
        print("Error in register:", e)
        return jsonify({"success": False, "message": "เกิดข้อผิดพลาด"}), 500
