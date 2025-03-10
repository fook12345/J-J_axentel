# controllers/user_controller.py
from flask import Blueprint, request, jsonify
from services.user_service import register_user, get_all_users, change_user_role, delete_user_by_id

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

# เพิ่ม Endpoint GET, PUT, DELETE

@user_bp.route('/', methods=['GET'])
def get_users():
    """
    GET /api/user?search=xxx
    ดึงรายชื่อผู้ใช้ทั้งหมด หรือค้นหาด้วยชื่อ (search)
    """
    search = request.args.get('search', '')
    try:
        users = get_all_users(search)  # สมมติว่า service มีฟังก์ชัน get_all_users(search)
        # จัดรูปแบบ response
        user_list = []
        for u in users:
            user_list.append({
                "id": u.id,
                "username": u.username,
                "first_name": u.first_name,
                "last_name": u.last_name,
                "role": u.role,
                "profile_picture": u.profile_picture
            })
        return jsonify({"success": True, "data": user_list}), 200
    except Exception as e:
        print("Error in get_users:", e)
        return jsonify({"success": False, "message": str(e)}), 500

@user_bp.route('/<int:user_id>/role', methods=['PUT'])
def change_role(user_id):
    """
    PUT /api/user/<user_id>/role
    body: { "role": "engineer" }
    เปลี่ยน role ของ user ตาม user_id
    """
    data = request.json
    new_role = data.get('role')
    if not new_role:
        return jsonify({"success": False, "message": "missing role"}), 400

    try:
        updated = change_user_role(user_id, new_role)  # สมมติ service มี change_user_role
        if updated:
            return jsonify({"success": True, "message": "Role updated"}), 200
        else:
            return jsonify({"success": False, "message": "User not found"}), 404
    except Exception as e:
        print("Error in change_role:", e)
        return jsonify({"success": False, "message": str(e)}), 500

@user_bp.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """
    DELETE /api/user/<user_id>
    ลบ user ตาม user_id
    """
    try:
        deleted = delete_user_by_id(user_id)  # สมมติ service มี delete_user_by_id
        if deleted:
            return jsonify({"success": True, "message": "User deleted"}), 200
        else:
            return jsonify({"success": False, "message": "User not found"}), 404
    except Exception as e:
        print("Error in delete_user:", e)
        return jsonify({"success": False, "message": str(e)}), 500


#def get_all_users(search):
    # ค้นใน DB: SELECT * FROM users WHERE first_name LIKE '%search%' OR ...
    # return list ของ user objects

#def change_user_role(user_id, new_role):
    # UPDATE users SET role = new_role WHERE id = user_id
    # return True ถ้าพบ user, False ถ้าไม่พบ

#def delete_user_by_id(user_id):
    # DELETE FROM users WHERE id = user_id
    # return True ถ้าพบ user, False ถ้าไม่พบ
