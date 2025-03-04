// src/pages/Home.jsx
import "./styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
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
          {/* โซนบน */}
          <div className="top-section">
            <h1 className="page-title">HOME</h1>
          </div>

          {/* โซนล่าง */}
          <div className="bottom-section">
            <div className="icon-grid">
              <div className="icon-item" onClick={() => navigate("/Inventory")}>
                <img
                  src="/image/inv.png"
                  alt="inventory"
                  className="icon-image"
                />
                <div className="icon-label">INVENTORY</div>
              </div>
              <div className="icon-item" onClick={() => navigate("/ticket")}>
                <img src="/image/tic.png" alt="ticket" className="icon-image" />
                <div className="icon-label">TICKET</div>
              </div>
              <div className="icon-item">
                <img src="/image/user.png" alt="user" className="icon-image" />
                <div className="icon-label">USER</div>
              </div>
              <div className="icon-item" onClick={() => navigate("/warranty")}>
                <img
                  src="/image/war.png"
                  alt="warranty"
                  className="icon-image"
                />
                <div className="icon-label">WARRANTY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
