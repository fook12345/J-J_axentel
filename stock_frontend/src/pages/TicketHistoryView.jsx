// src/pages/TicketHistoryView.jsx
import { useState, useEffect } from "react";
import { useNavigate /*, useParams*/ } from "react-router-dom";
import "./styles/TicketHistoryView.css";

function TicketHistoryView() {
  const navigate = useNavigate();
  /*const { ticketNumber } = useParams(); // รับพารามิเตอร์จาก URL: /ticket/history/view/:ticketNumber*/

  // State สำหรับเก็บข้อมูล ticket รายการเดียว
  const [ticket, setTicket] = useState([]);

  // ฟังก์ชันปุ่ม Nav
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
  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/ticket/history/${ticketNumber}`
        );
        const result = await response.json();
        if (result.success) {
          setTicket(result.data); // สมมติว่า result.data เป็น object ของ ticket
        } else {
          alert(result.message || "เกิดข้อผิดพลาด");
        }
      } catch (error) {
        console.error(error);
        alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
      }
    };

    if (ticketNumber) {
      fetchTicketDetail();
    }
  }, [ticketNumber]);

  
  if (!ticketNumber) {
    return <div>ไม่พบ ticketNumber ใน URL</div>;
  }

  if (!ticket) {
    return <div>กำลังโหลดข้อมูล Ticket...</div>;
  }
*/
  const handlePrint = () => {
    window.print(); // สั่งพิมพ์หน้า
  };

  useEffect(() => {
    // set dummy data เป็น object เดียว
    setTicket({
      ticket_number: 1,
      part: "Part1",
      serial: "S1234",
      use_location: "Location1",
      start_date: "2025-03-01",
      start_time: "09:00",
      end_date: "2025-03-02",
      end_time: "17:00",
      product: "Dell R370",
      warranty: "2.0",
      type: "HDD",
    });
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
          <div className="ticket-detail-header">
            <h1 className="page-title">TICKET / History / View</h1>
            <button className="print-link" onClick={handlePrint}>
              Print
            </button>
          </div>

          <div className="ticket-detail-box">
            <p>Ticket number : {ticket.ticket_number}</p>
            <p>Part : {ticket.part}</p>
            <p>Serial : {ticket.serial}</p>
            <p>Use location : {ticket.use_location}</p>
            <p>Start date : {ticket.start_date}</p>
            <p>Start time : {ticket.start_time}</p>
            <p>End date : {ticket.end_date}</p>
            <p>End time : {ticket.end_time}</p>
            <p>Product : {ticket.product}</p>
            <p>Warranty : {ticket.warranty}</p>
            <p>Type : {ticket.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketHistoryView;
