// src/components/Sidebar.jsx
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Sidebar ด้านซ้าย */}
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
              alt="dashboard"
              className="menu-icon"
            />
            <span>DASHBOARD</span>
          </li>
          <li className="menu-item">
            <img
              src="/image/noti.png"
              alt="notification"
              className="menu-icon"
            />
            <span>NOTIFICATION</span>
          </li>
          <li className="menu-item">
            <img src="/image/set.png" alt="setting" className="menu-icon" />
            <span>SETTING</span>
          </li>
        </ul>
      </div>

      {/* Header Bar + main-content (ฝั่งขวา) */}
    </div>
  );
}

export default Sidebar;
