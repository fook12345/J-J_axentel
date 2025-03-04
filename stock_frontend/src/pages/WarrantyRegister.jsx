// src/pages/WarrantyRegister.jsx
import { useState } from "react";
import "./styles/WarrantyRegister.css";
import { useNavigate } from "react-router-dom";

function WarrantyRegister() {
  // สร้าง state สำหรับเก็บข้อมูลแต่ละฟิลด์
  const [part, setPart] = useState("");
  const [serial, setSerial] = useState("");
  const [condition, setCondition] = useState("");
  const [provider, setProvider] = useState("");

  const navigate = useNavigate();
  // ปุ่ม nav (back/forward/minimize/close) ตัวอย่าง
  const handleBack = () => {
    // navigate(-1) = ถอยกลับ 1 หน้าใน history
    navigate(-1);
  };

  const handleForward = () => {
    // navigate(1) = ไปข้างหน้า 1 หน้าใน history (ถ้ามี)
    navigate(1);
  };

  const handleMinimize = () => {
    alert("Minimize window");
  };

  const handleMaximize = () => {
    alert("Maximize window");
  };

  const handleClose = () => {
    alert("Close window");
  };

  // ฟังก์ชันกดปุ่ม ADD
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/warranty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          part,
          serial,
          condition,
          provider,
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert("บันทึก Warranty สำเร็จ!");
        // หากต้องการนำทางไปหน้าอื่น เช่น /warranty ก็ทำได้
        // navigate("/warranty");
      } else {
        alert(result.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src="/image/axentel logo.png" alt="logo" />
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item active" onClick={() => navigate("/home")}>
            <img src="/image/hom.png" alt="home icon" className="menu-icon" />
            <span>HOME</span>
          </li>
          <li className="menu-item">
            <img
              src="/image/dashboard.png"
              alt="dashboard icon"
              className="menu-icon"
            />
            <span>DASHBOARD</span>
          </li>
          <li className="menu-item">
            <img
              src="/image/noti.png"
              alt="notification icon"
              className="menu-icon"
            />
            <span>NOTIFICATION</span>
          </li>
          <li className="menu-item">
            <img
              src="/image/set.png"
              alt="setting icon"
              className="menu-icon"
            />
            <span>SETTING</span>
          </li>
        </ul>
      </div>

      <div className="main-content">
        {/* Header bar */}
        <div className="header-bar">
          <div className="nav-buttons">
            <button onClick={handleBack} className="nav-btn">
              ◀
            </button>
            <button onClick={handleForward} className="nav-btn">
              ▶
            </button>
          </div>
          <div className="user-info">
            <span className="username">Mr.somchai (ADMIN)</span>
            <img
              src="/image/knight.jpeg"
              alt="profile"
              className="profile-pic"
            />
            <div className="window-controls">
              <button onClick={handleMinimize} className="window-btn">
                –
              </button>
              <button onClick={handleMaximize} className="window-btn">
                □
              </button>
              <button onClick={handleClose} className="window-btn">
                x
              </button>
            </div>
          </div>
        </div>

        <div className="content-area">
          <h2 className="page-title">WARRANTY / ลงทะเบียน warranty</h2>

          {/* กล่องกรอบฟอร์ม */}
          <div className="register-box">
            <div className="form-row">
              <label>Part :</label>
              <input
                type="text"
                placeholder="637875"
                value={part}
                onChange={(e) => setPart(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label>Serial :</label>
              <input
                type="text"
                placeholder="sty5489"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label>เงื่อนไขการรับประกัน :</label>
              <textarea
                placeholder="ประกัน 1 ปี ครอบคลุมทุกอย่างของ HDD"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label>ผู้ให้บริการรับประกัน :</label>
              <input
                type="text"
                placeholder="Axentel"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              />
            </div>

            <button className="add-button" onClick={handleAdd}>
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarrantyRegister;
