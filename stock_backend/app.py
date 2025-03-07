from flask import Flask
from flask_cors import CORS
from controllers.warranty_controller import warranty_bp
from controllers.user_controller import user_bp  # ตัวอย่าง controller อื่น ๆ
from controllers.ticket_controller import ticket_bp
from controllers.inventory_controller import inventory_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = "mysecret"

    # ลงทะเบียน Blueprint สำหรับ Warranty
    app.register_blueprint(warranty_bp, url_prefix='/api/warranty')
    # ลงทะเบียน Blueprint สำหรับ User (ตัวอย่าง)
    app.register_blueprint(user_bp, url_prefix='/api/user')

    app.register_blueprint(ticket_bp, url_prefix='/api/ticket')

    app.register_blueprint(inventory_bp, url_prefix='/api/inventory')

    # สามารถกำหนด Route หลักอื่น ๆ ได้ที่นี่ (เช่น /)
    @app.route('/')
    def index():
        return "Hello, This is my API root."

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5000, debug=True)
