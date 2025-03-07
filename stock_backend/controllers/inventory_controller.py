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

@inventory_bp.route('/location/<string:loc>', methods=['GET'])
def get_inventory_by_location(loc):
    """
    GET /api/inventory/location/<loc>
    ดึงรายการ part ตาม location เช่น loc = "1st", "3rd", "faulty"
    รองรับการค้นหา (search) ถ้าต้องการด้วย query param
    """
    search = request.args.get('search', '')  # ถ้ามี ?search=xxx

    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        if search:
            # ถ้าต้องการกรองด้วย search
            sql = """
              SELECT id, type, name_product, product_id, serial_number AS serial,
                     health, location
              FROM inventory
              WHERE location = %s
                AND (
                  type LIKE %s OR
                  name_product LIKE %s OR
                  product_id LIKE %s OR
                  serial_number LIKE %s OR
                  health LIKE %s OR
                  location LIKE %s
                )
            """
            like_str = f"%{search}%"
            cursor.execute(sql, (loc, like_str, like_str, like_str, like_str, like_str, like_str))
        else:
            # ถ้าไม่มีการค้นหา
            sql = """
              SELECT id, type, name_product, product_id, serial_number AS serial,
                     health, location
              FROM inventory
              WHERE location = %s
            """
            cursor.execute(sql, (loc,))

        rows = cursor.fetchall()
        cursor.close()
        close_connection(conn)

        return jsonify({"success": True, "data": rows}), 200
    except Exception as e:
        print("Error in get_inventory_by_location:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500
    
@inventory_bp.route('/test', methods=['GET'])
def get_items_for_test():
    """
    GET /api/inventory/test?search=xxx
    ดึงรายการ Part ที่สถานะ Pending test หรือทั้งหมดที่ต้อง test
    """
    search = request.args.get('search', '')
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        if search:
            # สมมติว่าต้องการค้นหาใน type, name_product, product_id, serial_number
            sql = """
              SELECT id, type, name_product, product_id, serial_number AS serial,
                     status
              FROM inventory
              WHERE status='Pending test'
                AND (
                  type LIKE %s OR
                  name_product LIKE %s OR
                  product_id LIKE %s OR
                  serial_number LIKE %s
                )
            """
            like_str = f"%{search}%"
            cursor.execute(sql, (like_str, like_str, like_str, like_str))
        else:
            sql = """
              SELECT id, type, name_product, product_id, serial_number AS serial,
                     status
              FROM inventory
              WHERE status='Pending test'
            """
            cursor.execute(sql)
        rows = cursor.fetchall()
        cursor.close()
        close_connection(conn)

        return jsonify({"success": True, "data": rows}), 200
    except Exception as e:
        print("Error in get_items_for_test:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500
    
@inventory_bp.route('/status', methods=['GET'])
def get_inventory_status():
    search = request.args.get('search', '')
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        if search:
            sql = """
              SELECT id, type, name_product, product_id, serial_number AS serial,
                     status
              FROM inventory
              WHERE type LIKE %s OR
                    name_product LIKE %s OR
                    product_id LIKE %s OR
                    serial_number LIKE %s
            """
            like_str = f"%{search}%"
            cursor.execute(sql, (like_str, like_str, like_str, like_str))
        else:
            sql = """
              SELECT id, type, name_product, product_id, serial_number AS serial,
                     status
              FROM inventory
            """
            cursor.execute(sql)
        rows = cursor.fetchall()
        cursor.close()
        close_connection(conn)

        return jsonify({"success": True, "data": rows}), 200
    except Exception as e:
        print("Error in get_inventory_status:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500

@inventory_bp.route('/status/add', methods=['POST'])
def add_inventory_status():
    data = request.json
    type_ = data.get('type')
    name_product = data.get('name_product')
    product_id = data.get('product_id')
    serial_number = data.get('serial_number')
    status = data.get('status')

    if not type_ or not name_product or not product_id or not serial_number or not status:
        return jsonify({"success": False, "message": "ข้อมูลไม่ครบ"}), 400

    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO inventory (type, name_product, product_id, serial_number, status)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (type_, name_product, product_id, serial_number, status))
            conn.commit()
            new_id = cursor.lastrowid
        close_connection(conn)
        return jsonify({"success": True, "message": "เพิ่มสถานะสินค้าเรียบร้อย", "id": new_id}), 200
    except Exception as e:
        print("Error in add_inventory_status:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500

@inventory_bp.route('/status/<int:item_id>', methods=['DELETE'])
def delete_inventory_status(item_id):
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        with conn.cursor() as cursor:
            sql = "DELETE FROM inventory WHERE id = %s"
            cursor.execute(sql, (item_id,))
            conn.commit()
        close_connection(conn)
        return jsonify({"success": True, "message": "ลบสถานะสินค้าเรียบร้อย"}), 200
    except Exception as e:
        print("Error in delete_inventory_status:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500

@inventory_bp.route('/status/<int:item_id>', methods=['GET'])
def get_inventory_status_detail(item_id):
    conn = get_connection()
    if not conn:
        return jsonify({"success": False, "message": "DB connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        sql = "SELECT * FROM inventory WHERE id = %s"
        cursor.execute(sql, (item_id,))
        row = cursor.fetchone()
        cursor.close()
        close_connection(conn)

        if row:
            return jsonify({"success": True, "data": row}), 200
        else:
            return jsonify({"success": False, "message": "Item not found"}), 404
    except Exception as e:
        print("Error in get_inventory_status_detail:", e)
        close_connection(conn)
        return jsonify({"success": False, "message": str(e)}), 500

