// src/pages/Register.jsx
import { useState } from "react";
import "./styles/Register.css"; // ถ้ามีไฟล์ CSS

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameLastname, setNameLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: เรียก API ไป Backend เพื่อ save ข้อมูลลง DB
    alert(
      `Register: ${username}, ${password}, ${nameLastname}, ${email}, ${phone}`
    );
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>

      <form onSubmit={handleRegister} className="register-form">
        <label>User name</label>
        <input
          type="text"
          className="register-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Name - Lastname</label>
        <input
          type="text"
          className="register-input"
          value={nameLastname}
          onChange={(e) => setNameLastname(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone number</label>
        <input
          type="text"
          className="register-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit" className="register-button">
          ลงทะเบียน
        </button>
      </form>
    </div>
  );
}

export default Register;
