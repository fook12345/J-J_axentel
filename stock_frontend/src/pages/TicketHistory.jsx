// src/pages/TicketHistory.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/TicketHistory.css";
import { Link } from "react-router-dom";

function TicketHistory() {
  const navigate = useNavigate();

  // สถานะเก็บรายการ ticket
  const [tickets, setTickets] = useState([]);
  // สถานะเก็บค่าค้นหา
  const [searchText, setSearchText] = useState("");

  // ปุ่ม nav (back/forward/minimize/close)
  const handleBack = () => {
    navigate(-1);
  };
  const handleForward = () => {
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
  /*
  // ฟังก์ชันดึงข้อมูล ticket ทั้งหมดจาก backend
  const fetchTickets = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/ticket/history`);
      const result = await response.json();
      if (result.success) {
        setTickets(result.data); // สมมติว่า result.data เป็น array ของ ticket
      } else {
        alert(result.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
    }
  };

  // เรียกใช้เมื่อ component mount
  useEffect(() => {
    fetchTickets();
  }, []);
*/
  // ฟังก์ชันกดปุ่ม Search
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/ticket/history?search=${searchText}`
      );
      const result = await response.json();
      if (result.success) {
        setTickets(result.data);
      } else {
        alert(result.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
    }
  };

  // ฟังก์ชันกด View

  useEffect(() => {
    // set dummy data for testing UI
    setTickets([
      {
        ticket_number: 1,
        part: "Part1",
        serial: "S1234",
        use_location: "Location1",
        start_date: "2025-03-01",
        start_time: "09:00",
        end_date: "2025-03-02",
        end_time: "17:00",
      },
      // สามารถเพิ่ม dummy ticket เพิ่มเติมได้
    ]);
  }, []);

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
          <h1 className="page-title">TICKET / History</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Part, Serial"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <table className="ticket-table">
            <thead>
              <tr>
                <th>Ticket number</th>
                <th>Part</th>
                <th>S/N</th>
                <th>Use location</th>
                <th>Start date</th>
                <th>Start time</th>
                <th>End date</th>
                <th>End time</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.ticket_number}>
                  <td>{ticket.ticket_number}</td>
                  <td>{ticket.part}</td>
                  <td>{ticket.serial}</td>
                  <td>{ticket.use_location}</td>
                  <td>{ticket.start_date}</td>
                  <td>{ticket.start_time}</td>
                  <td>{ticket.end_date}</td>
                  <td>{ticket.end_time}</td>
                  <td>
                    <Link to="/ticket/history/view">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TicketHistory;
