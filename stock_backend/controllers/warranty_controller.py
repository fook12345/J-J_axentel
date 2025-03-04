from flask import Blueprint, request, jsonify
from database.connection import get_connection

# สร้าง Blueprint สำหรับ warranty โดยใช้ url_prefix ในการจัดกลุ่ม endpoint
warranty_bp = Blueprint('warranty_bp', __name__)

@warranty_bp.route('/', methods=['POST'])
def create_warranty():
    data = request.json
    inventory_id = data.get('inventory_id')
    provider = data.get('provider')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    conditions = data.get('conditions')

    if not (inventory_id and provider and start_date and end_date):
        return jsonify({"success": False, "message": "ข้อมูลไม่ครบ"}), 400

    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO warranties (inventory_id, provider, start_date, end_date, conditions)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (inventory_id, provider, start_date, end_date, conditions))
            conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "บันทึก Warranty สำเร็จ"})
    except Exception as e:
        print("Error in warranty_controller:", e)
        return jsonify({"success": False, "message": "เกิดข้อผิดพลาด"}), 500
