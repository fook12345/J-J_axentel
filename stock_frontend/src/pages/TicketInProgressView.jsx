import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/TicketInProgressView.css";

function TicketInProgressView() {
  const navigate = useNavigate();
  const { ticketNumber } = useParams(); // /ticket/inprogress/view/:ticketNumber (ถ้าใช้ param)

  // เก็บข้อมูล Ticket
  const [ticket, setTicket] = useState(null);

  // เก็บสถานะการแนบไฟล์ (ถ้าแนบแล้ว, ถือว่าเสร็จ)
  const [isCompleted, setIsCompleted] = useState(false);

  // เก็บเวลาเริ่มต้น (startDateTime) และเวลาปัจจุบัน (currentDateTime) สำหรับแสดงการนับไปเรื่อย ๆ
  const [startDateTime, setStartDateTime] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

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

  // ดึงข้อมูล Ticket (หรือใช้ Dummy ถ้าต้องการดู UI)
  useEffect(() => {
    // ตัวอย่าง: fetch จาก backend
    // หรือใช้ Dummy Data
    const dummyTicket = {
      ticket_number: "A0001",
      part: "5569888",
      serial: "KBN2123",
      product: "Dell R370",
      use_location: "UTAC",
      warranty: "2.0",
      start_date: "01/05/2025",
      start_time: "14:00",
      // สมมติว่าเรารวม date+time เป็น Date object
      // แต่ในตัวอย่าง จะเก็บเป็น string แล้ว parse เอง
    };
    setTicket(dummyTicket);

    // สมมติ startDateTime เป็น 2025-05-01 14:00
    // สร้าง Date object สำหรับ start
    const start = new Date("2025-05-01T14:00:00");
    setStartDateTime(start);
  }, [ticketNumber]);

  // ใช้ interval เพื่ออัปเดต currentDateTime ทุก 1 วินาที (ถ้ายังไม่เสร็จ)
  useEffect(() => {
    if (!isCompleted && startDateTime) {
      const timer = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCompleted, startDateTime]);

  // ฟังก์ชันแนบไฟล์ (เมื่อแนบแล้วถือว่าเสร็จ -> หยุดนับเวลา)
  const handleAttachFile = () => {
    // ในระบบจริง อาจมีการ upload file
    // ที่นี่เราจำลองว่าแนบแล้ว -> ticket เสร็จ
    alert("แนบไฟล์แล้ว -> Ticket เสร็จสิ้น");
    setIsCompleted(true);
  };

  if (!ticket) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  // แปลง startDateTime และ currentDateTime เป็น string โชว์
  // หรือจะแสดงเฉพาะเวลาปัจจุบัน (currently in use)
  // ตัวอย่างแสดง currentDateTime (ถ้ายังไม่ completed)
  let currentlyInUseDate = "";
  let currentlyInUseTime = "";

  if (!isCompleted && startDateTime) {
    // currentDateTime
    // อาจจะแสดงแบบ Date.toLocaleString() หรือ format อื่น
    currentlyInUseDate = currentDateTime.toLocaleDateString("en-CA"); // yyyy-mm-dd
    currentlyInUseTime = currentDateTime.toLocaleTimeString("en-GB"); // HH:mm:ss
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
          <h1 className="page-title">TICKET / In progress / View</h1>

          <div className="ticket-inprogress-box">
            <p>Ticket number : {ticket.ticket_number}</p>
            <p>Part : {ticket.part}</p>
            <p>Serial : {ticket.serial}</p>
            <p>Product : {ticket.product}</p>
            <p>Use location : {ticket.use_location}</p>
            <p>Warranty : {ticket.warranty}</p>
            <hr />
            <div className="ticket-row-container">
              <div className="start-info">
                <p>Start date : {ticket.start_date}</p>
                <p>Start time : {ticket.start_time}</p>
              </div>

              {!isCompleted ? (
                <div className="current-info">
                  <p>Currently in use :</p>
                  <p>Date : {currentlyInUseDate}</p>
                  <p>Time : {currentlyInUseTime}</p>
                  <button
                    onClick={handleAttachFile}
                    style={{ marginTop: "10px" }}
                  >
                    แนบไฟล์
                  </button>
                </div>
              ) : (
                <div className="current-info">
                  <p>Ticket นี้เสร็จสิ้นแล้ว</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketInProgressView;
