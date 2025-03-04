// src/pages/TicketInProgress.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/TicketInProgress.css";
import { Link } from "react-router-dom";

function TicketInProgress() {
  // เก็บรายการ ticket
  const [tickets, setTickets] = useState([]);
  // เก็บข้อความค้นหา
  const [searchText, setSearchText] = useState("");

  // ปุ่ม nav
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

  // สมมติว่าจะ fetch จาก backend หรือใช้ dummy data
  useEffect(() => {
    // ตัวอย่าง dummy data
    // status: "in_progress" หรือ "completed"
    setTickets([
      {
        ticket_number: "A0001",
        part: "5569888",
        serial: "KBN2123",
        use_location: "UTAC",
        start_date: "01/05/2025",
        start_time: "14:00",
        status: "in_progress", // กำลังดำเนินการ
      },
      {
        ticket_number: "A0002",
        part: "5569888",
        serial: "KBN2123",
        use_location: "UTAC",
        start_date: "01/02/2025",
        start_time: "15:00",
        status: "completed", // เสร็จแล้ว
      },
      // ... เพิ่มได้ตามต้องการ ...
    ]);
  }, []);

  // ฟังก์ชัน Search
  const handleSearch = () => {
    // ถ้าเชื่อม backend จริง ก็ fetch ด้วย search param
    // ตัวอย่างการกรองแบบใน memory (dummy)
    // กรองเฉพาะ Part หรือ Serial
    const filtered = tickets.filter((t) => {
      const partMatch = t.part.toLowerCase().includes(searchText.toLowerCase());
      const serialMatch = t.serial
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return partMatch || serialMatch;
    });
    setTickets(filtered);
  };
  /*
  // ฟังก์ชันกด View
  const handleView = (ticketNumber) => {
    // navigate ไปหน้า /ticket/inprogress/view/xxx
    // หรือ alert ทดสอบ
    alert(`View detail of Ticket: ${ticketNumber}`);
  };*/
  /*
  // ฟังก์ชันกด Return
  const handleReturn = (ticketNumber) => {
    alert(`Return ticket: ${ticketNumber}`);
    // ถ้าเชื่อม backend จริง อาจเรียก API ส่งคืน part แล้ว refresh list
  };*/

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
          <h1 className="page-title">TICKET / In progress</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Part, Serial"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <table className="ticket-table">
            <thead>
              <tr>
                <th></th> {/* สำหรับสัญลักษณ์ in-progress */}
                <th>Ticket number</th>
                <th>Part</th>
                <th>S/N</th>
                <th>Use location</th>
                <th>Start date</th>
                <th>Start time</th>
                <th>View</th>
                <th></th> {/* สำหรับ Return (ถ้ามี) */}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.ticket_number}>
                  <td>
                    {ticket.status === "in_progress" && (
                      <img
                        src="/image/inpro2.png"
                        alt="in progress"
                        style={{ width: "20px", height: "20px" }}
                      />
                    )}
                  </td>
                  <td>{ticket.ticket_number}</td>
                  <td>{ticket.part}</td>
                  <td>{ticket.serial}</td>
                  <td>{ticket.use_location}</td>
                  <td>{ticket.start_date}</td>
                  <td>{ticket.start_time}</td>
                  <td>
                    {ticket.status === "in_progress" ? (
                      // ถ้า in_progress -> ไปหน้า /ticket/inprogress/view/:ticketNumber
                      <Link
                        to={`/ticket/inprogress/view/${ticket.ticket_number}`}
                        className="link-action"
                      >
                        View
                      </Link>
                    ) : (
                      // ถ้า completed -> ไปหน้า /ticket/completed/view/:ticketNumber
                      <Link
                        to={`/ticket/completed/view/${ticket.ticket_number}`}
                        className="link-action"
                      >
                        View
                      </Link>
                    )}
                  </td>
                  <td>
                    {ticket.status === "completed" && (
                      <Link
                        to={`/ticket/inprogress/return/${ticket.ticket_number}`}
                        className="link-action"
                      >
                        Return
                      </Link>
                    )}
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

export default TicketInProgress;
