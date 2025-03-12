from flask import Blueprint, request, jsonify
from database.connection import get_connection, close_connection

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

@warranty_bp.route('/dashboard', methods=['GET'])
def get_warranty_dashboard():
    """
    GET /api/warranty/dashboard?search=xxx
    ดึงรายการ warranty ทั้งหมด หรือค้นหาตาม part, serial
    """
    search = request.args.get('search', '')
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        if search:
            sql = """
              SELECT id, part, serial,
                     DATE_FORMAT(start_date, '%%d/%%m/%%Y') AS start_date,
                     DATE_FORMAT(end_date, '%%d/%%m/%%Y') AS end_date,
                     conditions, provider, status
              FROM warranties
              WHERE part LIKE %s OR serial LIKE %s
              ORDER BY id DESC
            """
            like_str = f"%{search}%"
            cursor.execute(sql, (like_str, like_str))
        else:
            sql = """
              SELECT id, part, serial,
                     DATE_FORMAT(start_date, '%%d/%%m/%%Y') AS start_date,
                     DATE_FORMAT(end_date, '%%d/%%m/%%Y') AS end_date,
                     conditions, provider, status
              FROM warranties
              ORDER BY id DESC
            """
            cursor.execute(sql)

        rows = cursor.fetchall()
        cursor.close()
        close_connection(conn)

        return jsonify({"success": True, "data": rows}), 200
    except Exception as e:
        print("Error in get_warranty_dashboard:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500


@warranty_bp.route('/dashboard', methods=['POST'])
def create_warranty():
    """
    POST /api/warranty/dashboard
    body: {
      "part": "sty5489",
      "serial": "sty5489",
      "start_date": "2025-07-15",
      "end_date": "2026-07-15",
      "conditions": "ประกัน 1 ปี",
      "provider": "Axentel",
      "status": "Active"
    }
    """
    data = request.json
    part = data.get('part')
    serial = data.get('serial')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    conditions = data.get('conditions', '')
    provider = data.get('provider', '')
    status = data.get('status', 'Active')

    if not part or not serial or not start_date or not end_date:
        return jsonify({"success": False, "message": "missing required fields"}), 400

    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor()
        sql = """
            INSERT INTO warranties (part, serial, start_date, end_date, conditions, provider, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (part, serial, start_date, end_date, conditions, provider, status))
        conn.commit()
        new_id = cursor.lastrowid
        cursor.close()
        close_connection(conn)

        return jsonify({"success": True, "message": "Warranty created", "id": new_id}), 200
    except Exception as e:
        print("Error in create_warranty:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500