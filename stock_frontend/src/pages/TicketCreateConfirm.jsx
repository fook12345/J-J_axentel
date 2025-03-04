import { useLocation, useNavigate } from "react-router-dom";
import "./styles/TicketCreate.css";

function TicketCreateConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation();

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

  const { part, serial, use_location, use_date, use_time, product, warranty } =
    state || {};

  if (!state) {
    return <div>ไม่มีข้อมูล (กรุณากรอกขั้นตอนแรกก่อน)</div>;
  }

  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          part,
          serial,
          use_location,
          use_date,
          use_time,
          product,
          warranty,
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert("สร้าง Ticket สำเร็จ!");
        // navigate กลับหน้า /ticket หรืออื่นๆ
        navigate("/ticket");
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
            <p>Part : {part}</p>
            <p>S/N : {serial}</p>
            <p>สถานที่ใช้งาน : {use_location}</p>
            <p>วันที่ใช้งาน : {use_date}</p>
            <p>เวลา : {use_time}</p>
            <p>Product : {product}</p>
            <p>Warranty : {warranty}</p>

            <button onClick={handleCreate}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCreateConfirm;
