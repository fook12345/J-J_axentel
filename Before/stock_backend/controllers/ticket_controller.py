from flask import Blueprint, request, jsonify
from database.connection import get_connection, close_connection

ticket_bp = Blueprint('ticket_bp', __name__)

@ticket_bp.route('/', methods=['POST'])
def create_ticket():
    data = request.json
    part = data.get('part')
    serial = data.get('serial')
    use_location = data.get('use_location')
    use_date = data.get('use_date')
    use_time = data.get('use_time')
    product = data.get('product')
    warranty = data.get('warranty')

    if not part or not serial or not use_location or not use_date or not use_time:
        return jsonify({"success": False, "message": "กรอกข้อมูลไม่ครบ"}), 400

    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO tickets
                (part, serial, use_location, use_date, use_time, product, warranty)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (part, serial, use_location, use_date, use_time, product, warranty))
            conn.commit()
            ticket_id = cursor.lastrowid
        close_connection(conn)
        return jsonify({
            "success": True,
            "message": "สร้าง Ticket สำเร็จ",
            "ticket_id": ticket_id
        })
    except Exception as e:
        print("Error in create_ticket:", e)
        return jsonify({"success": False, "message": "เกิดข้อผิดพลาด"}), 500


@ticket_bp.route('/history', methods=['GET'])
def get_ticket_history():
    """
    GET /api/ticket/history?search=xxx
    แสดงรายการ ticket ทั้งหมด หรือค้นหาโดย part หรือ serial
    """
    search = request.args.get('search', '')
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        if search:
            sql = """
              SELECT ticket_number, part, serial, use_location,
                     DATE_FORMAT(use_date, '%%Y-%%m-%%d') AS use_date,
                     TIME_FORMAT(use_time, '%%H:%%i') AS use_time,
                     DATE_FORMAT(end_date, '%%Y-%%m-%%d') AS end_date,
                     TIME_FORMAT(end_time, '%%H:%%i') AS end_time
              FROM tickets
              WHERE part LIKE %s OR serial LIKE %s
            """
            like_str = f"%{search}%"
            cursor.execute(sql, (like_str, like_str))
        else:
            sql = """
              SELECT ticket_number, part, serial, use_location,
                     DATE_FORMAT(use_date, '%%Y-%%m-%%d') AS use_date,
                     TIME_FORMAT(use_time, '%%H:%%i') AS use_time,
                     DATE_FORMAT(end_date, '%%Y-%%m-%%d') AS end_date,
                     TIME_FORMAT(end_time, '%%H:%%i') AS end_time
              FROM tickets
            """
            cursor.execute(sql)
        rows = cursor.fetchall()
        cursor.close()
        close_connection(conn)
        return jsonify({"success": True, "data": rows}), 200
    except Exception as e:
        print("Error in get_ticket_history:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500


@ticket_bp.route('/history/<string:ticketNumber>', methods=['GET'])
def get_ticket_detail(ticketNumber):
    """
    GET /api/ticket/history/<ticketNumber>
    แสดงรายละเอียด ticket ตาม ticketNumber
    """
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        sql = """
            SELECT 
                ticket_number, part, serial, use_location,
                DATE_FORMAT(use_date, '%%Y-%%m-%%d') AS use_date,
                TIME_FORMAT(use_time, '%%H:%%i') AS use_time,
                DATE_FORMAT(end_date, '%%Y-%%m-%%d') AS end_date,
                TIME_FORMAT(end_time, '%%H:%%i') AS end_time,
                product, warranty, type
            FROM tickets
            WHERE ticket_number = %s
        """
        cursor.execute(sql, (ticketNumber,))
        row = cursor.fetchone()
        cursor.close()
        close_connection(conn)
        if row:
            return jsonify({"success": True, "data": row}), 200
        else:
            return jsonify({"success": False, "message": "ไม่พบ ticket นี้"}), 404
    except Exception as e:
        print("Error in get_ticket_detail:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500


@ticket_bp.route('/inprogress', methods=['GET'])
def get_inprogress_tickets():
    """
    GET /api/ticket/inprogress?search=xxx
    ดึงรายการ ticket ที่อยู่ในสถานะ 'in_progress'
    หากมีพารามิเตอร์ search ให้กรองด้วย part หรือ serial
    """
    search = request.args.get('search', '')
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        if search:
            sql = """
              SELECT ticket_number, part, serial, use_location,
                     DATE_FORMAT(use_date, '%%Y-%%m-%%d') AS use_date,
                     TIME_FORMAT(use_time, '%%H:%%i') AS use_time,
                     DATE_FORMAT(end_date, '%%Y-%%m-%%d') AS end_date,
                     TIME_FORMAT(end_time, '%%H:%%i') AS end_time,
                     product, warranty, status
              FROM tickets
              WHERE status='in_progress'
                AND (part LIKE %s OR serial LIKE %s)
            """
            like_str = f"%{search}%"
            cursor.execute(sql, (like_str, like_str))
        else:
            sql = """
              SELECT ticket_number, part, serial, use_location,
                     DATE_FORMAT(use_date, '%%Y-%%m-%%d') AS use_date,
                     TIME_FORMAT(use_time, '%%H:%%i') AS use_time,
                     DATE_FORMAT(end_date, '%%Y-%%m-%%d') AS end_date,
                     TIME_FORMAT(end_time, '%%H:%%i') AS end_time,
                     product, warranty, status
              FROM tickets
              WHERE status='in_progress'
            """
            cursor.execute(sql)
        rows = cursor.fetchall()
        cursor.close()
        close_connection(conn)
        return jsonify({"success": True, "data": rows}), 200
    except Exception as e:
        print("Error in get_inprogress_tickets:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500

@ticket_bp.route('/completed/<string:ticketNumber>', methods=['GET'])
def get_completed_ticket_detail(ticketNumber):
    """
    GET /api/ticket/completed/<ticketNumber>
    ดึงรายละเอียด Ticket ที่ status='completed'
    """
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        sql = """
            SELECT 
                ticket_number, part, serial, use_location,
                DATE_FORMAT(use_date, '%%Y-%%m-%%d') AS use_date,
                TIME_FORMAT(use_time, '%%H:%%i') AS use_time,
                DATE_FORMAT(end_date, '%%Y-%%m-%%d') AS end_date,
                TIME_FORMAT(end_time, '%%H:%%i') AS end_time,
                product, warranty, type, status, file_path
            FROM tickets
            WHERE ticket_number = %s AND status='completed'
        """
        cursor.execute(sql, (ticketNumber,))
        row = cursor.fetchone()
        cursor.close()
        close_connection(conn)

        if not row:
            return jsonify({"success": False, "message": "ไม่พบ ticket หรือยังไม่ completed"}), 404

        return jsonify({"success": True, "data": row}), 200
    except Exception as e:
        print("Error in get_completed_ticket_detail:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500


@ticket_bp.route('/complete/<string:ticketNumber>', methods=['POST'])
def complete_ticket(ticketNumber):
    """
    POST /api/ticket/complete/<ticketNumber>
    เปลี่ยนสถานะ ticket เป็น 'completed', อัปเดต end_date, end_time, file_path (ถ้ามี)
    ตัวอย่าง JSON ส่ง:
    {
      "file_path": "/uploads/test.png"
    }
    """
    data = request.json or {}
    file_path = data.get('file_path', '')

    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor()
        sql = """
          UPDATE tickets
          SET status='completed',
              end_date=CURDATE(),
              end_time=CURTIME(),
              file_path=%s
          WHERE ticket_number=%s AND status='in_progress'
        """
        cursor.execute(sql, (file_path, ticketNumber))
        if cursor.rowcount == 0:
            cursor.close()
            close_connection(conn)
            return jsonify({"success": False, "message": "ไม่พบ ticket หรือ ticket ไม่ได้อยู่ในสถานะ in_progress"}), 404

        conn.commit()
        cursor.close()
        close_connection(conn)
        return jsonify({"success": True, "message": "Ticket เสร็จสิ้นแล้ว"}), 200
    except Exception as e:
        print("Error in complete_ticket:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500

