import mysql.connector
from mysql.connector import Error

def get_connection():
    """
    ฟังก์ชันสำหรับเชื่อมต่อ MySQL
    คืนค่า connection object ถ้าสำเร็จ หรือ None ถ้าไม่สำเร็จ
    """
    try:
        connection = mysql.connector.connect(
            host='205.209.119.254',
            user='manpad',
            password='Google2012',
            database='project_pro'
        )
        if connection.is_connected():
            print("เชื่อมต่อกับฐานข้อมูลสำเร็จ!")
            return connection
    except Error as e:
        print(f"เกิดข้อผิดพลาดในการเชื่อมต่อ: {e}")
        return None

def close_connection(connection):
    """
    ฟังก์ชันสำหรับปิดการเชื่อมต่อ MySQL
    """
    if connection is not None and connection.is_connected():
        connection.close()
        print("ปิดการเชื่อมต่อเรียบร้อยแล้ว!")

if __name__ == "__main__":
    db_connection = get_connection()
    if db_connection:
        close_connection(db_connection)
