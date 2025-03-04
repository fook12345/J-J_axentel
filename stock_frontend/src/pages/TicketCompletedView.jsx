// src/pages/TicketCompletedView.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/TicketCompletedView.css";

function TicketCompletedView() {
  const navigate = useNavigate();
  const { ticketNumber } = useParams(); // /ticket/inprogress/view/:ticketNumber หรือ /ticket/completed/view/:ticketNumber

  // State สำหรับเก็บข้อมูล Ticket
  const [ticket, setTicket] = useState(null);

  // ปุ่ม Nav
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

  // ฟังก์ชัน Print
  const handlePrint = () => {
    window.print(); // สั่งพิมพ์หน้า
  };

  // สมมติว่า fetch จาก backend หรือใช้ dummy data
  useEffect(() => {
    // ตัวอย่าง dummy data สำหรับ Ticket ที่เสร็จแล้ว
    const dummyTicket = {
      ticket_number: "A0001",
      part: "5569888",
      serial: "KBN2123",
      product: "Dell R370",
      use_location: "UTAC",
      warranty: "2.0",
      type: "HDD",
      start_date: "01/05/2025",
      start_time: "14:00",
      end_date: "15/05/2025",
      end_time: "17:00",
      file_path: "/uploads/testfile.png", // สมมติว่ามีไฟล์แนบ
      status: "completed",
    };
    setTicket(dummyTicket);

    // ถ้าเชื่อมต่อ backend จริง:
    // fetch(`http://localhost:5000/api/ticket/completed/${ticketNumber}`)
    //   .then(res => res.json())
    //   .then(result => setTicket(result.data))
    //   ...
  }, [ticketNumber]);

  if (!ticket) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

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
            <h1 className="page-title">TICKET / In progress / View</h1>
            <button className="print-link" onClick={handlePrint}>
              Print
            </button>
          </div>
          {/* กล่องใหญ่ครอบทั้งหมด */}
          <div className="ticket-box">
            {/* คอนเทนต์ 2 คอลัมน์ */}
            <div className="ticket-box-content">
              {/* คอลัมน์ซ้าย: รายละเอียด Ticket */}
              <div className="detail-left">
                <p>Ticket number : {ticket.ticket_number}</p>
                <p>Part : {ticket.part}</p>
                <p>S/N : {ticket.serial}</p>
                <p>Product : {ticket.product}</p>
                <p>Use location : {ticket.use_location}</p>
                <p>Warranty : {ticket.warranty}</p>
                <p>Type : {ticket.type}</p>
                <hr />
                <p>Start date : {ticket.start_date}</p>
                <p>Start time : {ticket.start_time}</p>
                <p>End date : {ticket.end_date}</p>
                <p>End time : {ticket.end_time}</p>
              </div>

              {/* คอลัมน์ขวา: ไฟล์แนบ */}
              <div className="detail-right">
                <p>ไฟล์ที่แนบ:</p>
                {ticket.file_path ? (
                  <div className="file-preview">
                    {/* ถ้าต้องการโชว์เป็นรูป: 
                      <img src={ticket.file_path} alt="attached" style={{ maxWidth: "100%" }} /> 
                    */}
                    <p>{ticket.file_path}</p>
                  </div>
                ) : (
                  <p>ไม่มีไฟล์แนบ</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCompletedView;
