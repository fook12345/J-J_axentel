# models/user_repository.py
from database.connection import get_connection

def get_user_by_username(username):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM users WHERE username = %s"
            cursor.execute(sql, (username,))
            return cursor.fetchone()
    finally:
        conn.close()

def create_user(username, password_hash, first_name, last_name, email, phone_number):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
              INSERT INTO users (username, password, first_name, last_name, email, phone_number)
              VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (username, password_hash, first_name, last_name, email, phone_number))
            conn.commit()
            return cursor.lastrowid  # คืนค่า id ที่ถูก insert
    finally:
        conn.close()
