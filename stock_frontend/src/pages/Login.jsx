import { Link, useNavigate } from "react-router-dom";
import "./styles/Login.css";

function Login() {
  // ใช้ useNavigate เพื่อเปลี่ยนหน้า
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: เรียก API เพื่อล็อกอินแล้วตรวจสอบ username/password

    // สมมุติว่าตรวจสอบผ่าน ให้เปลี่ยนหน้าไป /home:
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* โลโก้ */}
        <img src="/image/axentel logo.png" alt="logo" className="login-logo" />

        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin} className="login-form">
          <input type="text" className="login-input" placeholder="username" />
          <input
            type="password"
            className="login-input"
            placeholder="password"
          />

          {/* ส่วนลิงก์ "ลืมรหัสผ่าน" */}
          <div className="forgot-container">
            <Link to="/forgot" className="forgot-link">
              ลืมรหัสผ่าน
            </Link>
          </div>

          <button type="submit" className="login-button">
            เข้าสู่ระบบ
          </button>

          <div className="register-link-container">
            <Link to="/register" className="register-link">
              ลงทะเบียน
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
