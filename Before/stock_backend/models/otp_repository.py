from database.connection import get_connection

def save_otp(user_id, otp_code, expired_at):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
              INSERT INTO reset_tokens (user_id, otp_code, expired_at)
              VALUES (%s, %s, %s)
            """
            cursor.execute(sql, (user_id, otp_code, expired_at))
            conn.commit()
    finally:
        conn.close()

def get_otp_by_code(otp_code):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
              SELECT * FROM reset_tokens
              WHERE otp_code = %s
              ORDER BY id DESC
              LIMIT 1
            """
            cursor.execute(sql, (otp_code,))
            return cursor.fetchone()
    finally:
        conn.close()

def invalidate_otp(otp_code):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
              DELETE FROM reset_tokens
              WHERE otp_code = %s
            """
            cursor.execute(sql, (otp_code,))
            conn.commit()
    finally:
        conn.close()
