from flask import Blueprint, request, jsonify
from database.connection import get_connection, close_connection

notification_bp = Blueprint('notification_bp', __name__)

@notification_bp.route('/', methods=['GET'])
def get_notifications():
    """
    GET /api/notification?search=xxx
    ดึงรายการ notification ทั้งหมด หรือกรองด้วย search
    """
    search = request.args.get('search', '')
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        if search:
            sql = """
              SELECT id, user_id, message, link, created_at, is_read
              FROM notifications
              WHERE message LIKE %s
              ORDER BY created_at DESC
            """
            like_str = f"%{search}%"
            cursor.execute(sql, (like_str,))
        else:
            sql = """
              SELECT id, user_id, message, link, created_at, is_read
              FROM notifications
              ORDER BY created_at DESC
            """
            cursor.execute(sql)
        rows = cursor.fetchall()
        cursor.close()
        close_connection(conn)
        return jsonify({"success": True, "data": rows}), 200
    except Exception as e:
        print("Error in get_notifications:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500

@notification_bp.route('/', methods=['POST'])
def create_notification():
    """
    POST /api/notification
    body: { "user_id": 1, "message": "...", "link": "/inventory/test" }
    """
    data = request.json
    user_id = data.get('user_id', None)
    message = data.get('message', '')
    link = data.get('link', '')

    if not message:
        return jsonify({"success": False, "message": "message is required"}), 400

    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor()
        sql = """
            INSERT INTO notifications (user_id, message, link)
            VALUES (%s, %s, %s)
        """
        cursor.execute(sql, (user_id, message, link))
        conn.commit()
        new_id = cursor.lastrowid
        cursor.close()
        close_connection(conn)
        return jsonify({"success": True, "message": "Notification created", "id": new_id}), 200
    except Exception as e:
        print("Error in create_notification:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500

@notification_bp.route('/<int:noti_id>', methods=['PUT'])
def mark_notification_read(noti_id):
    """
    PUT /api/notification/<noti_id>
    body: { "is_read": true }  # หรือเปลี่ยนข้อความ ฯลฯ
    """
    data = request.json
    is_read = data.get('is_read', False)

    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor()
        sql = "UPDATE notifications SET is_read = %s WHERE id = %s"
        cursor.execute(sql, (is_read, noti_id))
        conn.commit()
        rowcount = cursor.rowcount
        cursor.close()
        close_connection(conn)
        if rowcount > 0:
            return jsonify({"success": True, "message": "Notification updated"}), 200
        else:
            return jsonify({"success": False, "message": "Not found"}), 404
    except Exception as e:
        print("Error in mark_notification_read:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500

@notification_bp.route('/<int:noti_id>', methods=['DELETE'])
def delete_notification(noti_id):
    """
    DELETE /api/notification/<noti_id>
    """
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor()
        sql = "DELETE FROM notifications WHERE id = %s"
        cursor.execute(sql, (noti_id,))
        conn.commit()
        rowcount = cursor.rowcount
        cursor.close()
        close_connection(conn)
        if rowcount > 0:
            return jsonify({"success": True, "message": "Notification deleted"}), 200
        else:
            return jsonify({"success": False, "message": "Not found"}), 404
    except Exception as e:
        print("Error in delete_notification:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500
