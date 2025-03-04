from flask import Blueprint, request, jsonify
from database.connection import get_connection, close_connection

inventory_bp = Blueprint('inventory_bp', __name__)

@inventory_bp.route('/add', methods=['POST'])
def add_to_stock():
    data = request.json
    name_product = data.get('nameProduct')
    part = data.get('part')
    serial = data.get('serial')
    type_ = data.get('type')
    location = data.get('location')

    if not name_product or not part or not serial or not type_ or not location:
        return jsonify({"success": False, "message": "ข้อมูลไม่ครบ"}), 400

    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO inventory (name_product, part, serial, type, location)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (name_product, part, serial, type_, location))
            conn.commit()
            new_id = cursor.lastrowid
        close_connection(conn)
        return jsonify({"success": True, "message": "เพิ่มสินค้าเข้าสโตร์เรียบร้อย", "id": new_id}), 200
    except Exception as e:
        print("Error in add_to_stock:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500
