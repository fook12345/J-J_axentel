# controllers/dashboard_controller.py
from flask import Blueprint, jsonify
from database.connection import get_connection, close_connection

dashboard_bp = Blueprint('dashboard_bp', __name__)

@dashboard_bp.route('/', methods=['GET'])
def get_dashboard_summary():
    """
    GET /api/dashboard
    ดึงข้อมูลสรุปจากตาราง inventory, ticket, warranty ฯลฯ
    return JSON:
    {
      "success": true,
      "data": {
        "partUsed": ...,
        "partReturned": ...,
        "faultyPart": ...,
        "warrantyNear": ...,
        "warrantyExpired": ...
      }
    }
    """
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)

        # 1) partUsed: นับว่าใน inventory มีสถานะ "used" หรือดูใน tickets ว่า part ถูกใช้ไปกี่ชิ้น
        sql_used = """
          SELECT COUNT(*) as count_used
          FROM inventory
          WHERE status='Used'
        """
        cursor.execute(sql_used)
        used_row = cursor.fetchone()
        part_used = used_row["count_used"] if used_row else 0

        # 2) partReturned: นับว่าใน ticket มีการคืน part กี่ชิ้น (หรือเช็กใน inventory status)
        sql_returned = """
          SELECT COUNT(*) as count_returned
          FROM tickets
          WHERE status='Completed' 
          -- สมมติว่า Completed แปลว่าคืนแล้ว
        """
        cursor.execute(sql_returned)
        returned_row = cursor.fetchone()
        part_returned = returned_row["count_returned"] if returned_row else 0

        # 3) faultyPart: นับว่ามี part สถานะ "Faulty" กี่ชิ้น
        sql_faulty = """
          SELECT COUNT(*) as count_faulty
          FROM inventory
          WHERE status='Not Good' 
          -- หรือ column อื่นที่บ่งบอก faulty
        """
        cursor.execute(sql_faulty)
        faulty_row = cursor.fetchone()
        faulty_part = faulty_row["count_faulty"] if faulty_row else 0

        # 4) warrantyNear: นับ part ที่ระยะเวลาประกัน <= 30 วัน
        sql_warranty_near = """
          SELECT COUNT(*) as count_near
          FROM warranties
          WHERE DATEDIFF(end_date, CURDATE()) <= 30
            AND DATEDIFF(end_date, CURDATE()) >= 0
        """
        cursor.execute(sql_warranty_near)
        near_row = cursor.fetchone()
        warranty_near = near_row["count_near"] if near_row else 0

        # 5) warrantyExpired: นับ part ที่ประกันหมดแล้ว (end_date < CURDATE())
        sql_warranty_expired = """
          SELECT COUNT(*) as count_expired
          FROM warranties
          WHERE end_date < CURDATE()
        """
        cursor.execute(sql_warranty_expired)
        expired_row = cursor.fetchone()
        warranty_expired = expired_row["count_expired"] if expired_row else 0

        cursor.close()
        close_connection(conn)

        # ส่งกลับ
        data = {
            "partUsed": part_used,
            "partReturned": part_returned,
            "faultyPart": faulty_part,
            "warrantyNear": warranty_near,
            "warrantyExpired": warranty_expired
        }
        return jsonify({"success": True, "data": data}), 200
    except Exception as e:
        print("Error in get_dashboard_summary:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500
