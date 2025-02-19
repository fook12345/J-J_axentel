import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // นำเข้า CSS Bootstrap
import "../styles/Login.css"; // ใช้ CSS แยกไฟล์

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🔍 กำลังส่งข้อมูลไปยัง API..."); // Debugging
    try {
      const data = await login(username, password);
      console.log("✅ Login success:", data); // Debugging
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login error:", err); // Debugging
      setError(err.message);
    }
  };

  return (
    <Container className="login-container">
      <div className="login-box">
        {/* ✅ ใส่โลโก้ */}
        <img src="/axentel logo.png" alt="Axentel Logo" className="logo" />
        <h2 className="login-title">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="forgot-password">ลืมรหัสผ่าน</div>

          <Button variant="warning" type="submit" className="login-btn">
            เข้าสู่ระบบ
          </Button>

          <div className="register-link" onClick={() => navigate("/register")}>
            ลงทะเบียน
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;
