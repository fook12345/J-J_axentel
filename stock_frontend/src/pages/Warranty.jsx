// src/pages/Warranty.jsx
import "./styles/Warranty.css"; // ถ้ามีไฟล์ CSS แยก หรือจะใช้ Home.css รวมกันก็ได้
import { useNavigate } from "react-router-dom";

function Warranty() {
  const navigate = useNavigate();
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

      {/* Header + Content */}
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
          <h1 className="page-title">WARRANTY</h1>
          <div className="icon-grid">
            {/* ไอคอน Dashboard */}
            <div className="icon-item">
              <img
                src="/image/dash war.jpg"
                alt="dashboard"
                className="icon-image"
              />
              <div className="icon-label">Dashboard warranty</div>
            </div>
            {/* ไอคอน ลงทะเบียน */}
            <div
              className="icon-item"
              onClick={() => navigate("/warranty/WarrantyRegister")}
            >
              <img
                src="/image/re war.png"
                alt="register"
                className="icon-image"
              />
              <div className="icon-label">ลงทะเบียน warranty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Warranty;
