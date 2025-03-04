// src/pages/TicketReturn.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/TicketReturn.css";

function TicketReturn() {
  const navigate = useNavigate();
  const { ticketNumber } = useParams(); // /ticket/inprogress/return/:ticketNumber

  // State เก็บข้อมูล Ticket (ตัวที่กำลัง Return)
  const [ticket, setTicket] = useState(null);

  // State เก็บข้อมูล Part/SN ที่นำมาคืน
  const [returnPart, setReturnPart] = useState("");
  const [returnSerial, setReturnSerial] = useState("");

  // State เก็บสถานะ part ที่นำมาคืน (good/faulty)
  const [partCondition, setPartCondition] = useState("good");

  const [showPopup, setShowPopup] = useState(false);

  // ข้อมูลที่จะโชว์ใน popup (Name product, Part, S/N, Type, Location)
  const [popupData, setPopupData] = useState({
    nameProduct: "",
    part: "",
    serial: "",
    type: "",
    location: "",
  });

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

  // ดึงข้อมูล Ticket หรือใช้ dummy
  useEffect(() => {
    // สมมติ fetch จาก backend
    // หรือใช้ dummy data
    const dummyTicket = {
      ticket_number: "A0001",
      part: "5569888",
      serial: "KBN2123",
    };
    setTicket(dummyTicket);
  }, [ticketNumber]);

  // ฟังก์ชันกดปุ่ม Next
  // เมื่อกดปุ่ม "ถัดไป"
  const handleNext = () => {
    // สมมติ Name product, Type ดึงจาก DB
    const nameProductFromDB = "Dell R770";
    const typeFromDB = "Server";

    if (partCondition === "faulty") {
      // Faulty part -> location = "1st (Faulty)"
      setPopupData({
        nameProduct: nameProductFromDB,
        part: returnPart,
        serial: returnSerial,
        type: typeFromDB,
        location: "1st (Faulty)",
      });
      setShowPopup(true);
    } else {
      // Good part -> location = "1st (C1)"
      setPopupData({
        nameProduct: nameProductFromDB,
        part: returnPart,
        serial: returnSerial,
        type: typeFromDB,
        location: "1st (C1)",
      });
      setShowPopup(true);
    }
  };

  // เมื่อกดปุ่ม "Add to stock" ใน popup
  const handleAddToStock = () => {
    // TODO: เรียก API เพื่อ add to stock, หรือ logic อื่น ๆ
    alert(`
      Add to stock:
      Name product: ${popupData.nameProduct}
      Part: ${popupData.part}
      S/N: ${popupData.serial}
      Type: ${popupData.type}
      Location: ${popupData.location}
    `);

    // ปิด popup
    setShowPopup(false);
  };

  if (!ticket) {
    return <div>Loading ticket data...</div>;
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
          <h1 className="page-title">TICKET / In progress / Return</h1>

          <div className="return-box">
            <div className="ticket-info-row">
              <span>Ticket number : {ticket.ticket_number}</span>
              <span>Part : {ticket.part}</span>
              <span>S/N : {ticket.serial}</span>
            </div>

            {/* ฟอร์มใส่ข้อมูล part/s/n ที่นำมาคืน */}
            <div className="return-form">
              <label>Part :</label>
              <textarea
                value={returnPart}
                onChange={(e) => setReturnPart(e.target.value)}
                className="resizable-textarea"
              />

              <label>S/N :</label>
              <textarea
                value={returnSerial}
                onChange={(e) => setReturnSerial(e.target.value)}
                className="resizable-textarea"
              />

              <div className="condition-bar">
                <label>
                  <input
                    type="radio"
                    name="partCondition"
                    value="good"
                    checked={partCondition === "good"}
                    onChange={(e) => setPartCondition(e.target.value)}
                  />
                  Good part
                </label>
                <label>
                  <input
                    type="radio"
                    name="partCondition"
                    value="faulty"
                    checked={partCondition === "faulty"}
                    onChange={(e) => setPartCondition(e.target.value)}
                  />
                  Faulty part
                </label>
              </div>
            </div>

            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
        {/* Popup (ถ้า showPopup=true จะโชว์) */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Confirm parts addition</h2>
              <p>Name Product : {popupData.nameProduct}</p>
              <p>Part : {popupData.part}</p>
              <p>S/N : {popupData.serial}</p>
              <p>Type : {popupData.type}</p>
              <p>Location : {popupData.location}</p>

              <button className="add-button" onClick={handleAddToStock}>
                Add to stock
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketReturn;
