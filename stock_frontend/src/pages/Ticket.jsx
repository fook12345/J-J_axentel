import { useNavigate } from "react-router-dom";
import "./styles/Ticket.css"; // หรือไฟล์ CSS ที่คุณใช้

function Ticket() {
  const navigate = useNavigate();

  // ปุ่ม nav
  const handleBack = () => {
    // ถ้าต้องการให้ย้อนหน้าเดิม -> navigate(-1)
    // หรือกลับหน้า Home -> navigate("/home")
    navigate(-1);
  };

  const handleForward = () => {
    // navigate(1) ถ้าต้องการเดินหน้าใน history
    // หรือไปหน้าอื่นเช่น navigate("/dashboard")
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
          <h1 className="page-title">TICKET</h1>
          <div className="icon-grid">
            {/* ไอคอน History */}
            <div
              className="icon-item"
              onClick={() => navigate("/ticket/history")}
            >
              <img src="/image/hist.png" alt="history" className="icon-image" />
              <div className="icon-label">History</div>
            </div>
            {/* ไอคอน Create ticket */}
            <div
              className="icon-item"
              onClick={() => navigate("/ticket/Create ticket")}
            >
              <img
                src="/image/create.png"
                alt="create ticket"
                className="icon-image"
              />
              <div className="icon-label">Create ticket</div>
            </div>
            {/* ไอคอน In progress */}
            <div
              className="icon-item"
              onClick={() => navigate("/ticket/inprogress")}
            >
              <img
                src="/image/inpro.png"
                alt="in progress"
                className="icon-image"
              />
              <div className="icon-label">In progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
