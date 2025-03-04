// src/pages/TicketCreate.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/TicketCreate.css";

function TicketCreate() {
  const navigate = useNavigate();

  // State สำหรับเก็บข้อมูลฟอร์ม
  const [part, setPart] = useState("");
  const [serial, setSerial] = useState("");
  const [use_location, setUseLocation] = useState("");
  const [use_date, setUseDate] = useState("");
  const [use_time, setUseTime] = useState("");

  // ฟังก์ชัน Nav ปุ่ม Back/Forward
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
    // TODO: ฟังก์ชันย่อหน้าต่าง (ถ้าเป็น Desktop App อาจเรียก Electron API ฯลฯ)
  };

  const handleMaximize = () => {
    alert("Maximize window");
    // TODO: ฟังก์ชันขยายหน้าต่าง
  };

  const handleClose = () => {
    alert("Close window");
    // TODO: ฟังก์ชันปิดแอป
  };

  // ฟังก์ชันกดปุ่ม Next
  const handleNext = async (e) => {
    e.preventDefault();
    try {
      // เรียก API ดึงข้อมูล product, warranty จาก DB
      const response = await fetch(
        `http://localhost:5000/api/inventory/info?part=${part}&serial=${serial}`
      );
      const result = await response.json();
      if (result.success) {
        const { product, warranty } = result.data;
        // product, warranty ที่ได้จาก DB

        // ส่งข้อมูลทั้งหมดไป Step 2
        navigate("/ticket/create/step2", {
          state: {
            part,
            serial,
            use_location,
            use_date,
            use_time,
            product,
            warranty,
          },
        });
      } else {
        alert(result.message || "ไม่พบข้อมูลใน DB");
      }
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar ซ้าย */}
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

      {/* Header + Content ส่วนขวา */}
      <div className="main-content">
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
          <h1 className="page-title">TICKET / Create ticket</h1>

          <div className="ticket-box">
            <h3>กรอกรายละเอียด ticket</h3>

            <div className="form-row">
              <label>Part :</label>
              <input
                type="text"
                placeholder="Part"
                value={part}
                onChange={(e) => setPart(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label>Serial :</label>
              <input
                type="text"
                placeholder="Serial"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label>สถานที่ใช้งาน :</label>
              <input
                type="text"
                placeholder="Use location"
                value={use_location}
                onChange={(e) => setUseLocation(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label>วันที่ใช้งาน :</label>
              <input
                type="date"
                value={use_date}
                onChange={(e) => setUseDate(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label>เวลา :</label>
              <input
                type="time"
                value={use_time}
                onChange={(e) => setUseTime(e.target.value)}
              />
            </div>

            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCreate;
