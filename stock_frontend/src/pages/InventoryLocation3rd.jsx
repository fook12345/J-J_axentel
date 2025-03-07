// src/pages/InventoryLocation1st.jsx
import { useState, useEffect } from "react";
import {} from "react-router-dom";
import "./styles/InventoryLocationDetail.css";
import Sidebar from "./components/Sidebar";
import Headerbar from "./components/Headerbar";

function InventoryLocation3rd() {
  // State สำหรับข้อมูล Part ที่อยู่ใน 1st floor
  const [parts, setParts] = useState([]);
  // State สำหรับค้นหา
  const [searchText, setSearchText] = useState("");

  // ดึงข้อมูล Part หรือใช้ dummy data
  useEffect(() => {
    // สมมติ fetch จาก backend หรือใช้ dummy
    const dummyData = [
      {
        id: 1,
        type: "Server",
        nameProduct: "Dell R370",
        productId: "556988",
        serial: "KBN2123",
        health: "OK",
        location: "SERVER (C5)",
      },
      {
        id: 2,
        type: "Switch",
        nameProduct: "Cisco 2960",
        productId: "SW-001",
        serial: "CS2960-1234",
        health: "Unknown",
        location: "SWITCH (A9)",
      },
      // เพิ่มได้ตามต้องการ ...
    ];
    setParts(dummyData);
  }, []);

  // ฟังก์ชันค้นหา
  const handleSearch = () => {
    // ถ้าต้องการเชื่อม backend จริง ก็ fetch พร้อม query search
    // ที่นี่สมมติกรองใน memory
    const filtered = parts.filter((p) => {
      const text = searchText.toLowerCase();
      return (
        p.type.toLowerCase().includes(text) ||
        p.nameProduct.toLowerCase().includes(text) ||
        p.productId.toLowerCase().includes(text) ||
        p.serial.toLowerCase().includes(text) ||
        p.health.toLowerCase().includes(text) ||
        p.location.toLowerCase().includes(text)
      );
    });
    setParts(filtered);
  };

  // ควบคุมการเปิด/ปิด Popup
  const [showAddPartPopup, setShowAddPartPopup] = useState(false);

  // เก็บข้อมูลในฟอร์ม Add Part
  const [addPartData, setAddPartData] = useState({
    nameProduct: "",
    part: "",
    serial: "",
    type: "",
    location: "",
  });

  // ออปชันสำหรับ Dropdown "Type"
  const typeOptions = [
    "Hdd",
    "Ram",
    "Switch",
    "Server",
    "Storage",
    "Blade server",
    "Firewall",
    "Router",
    "Mainboard",
    "Other Module",
  ];

  // ออปชันสำหรับ Dropdown "Location"
  const locationOptions = [
    "1st(A1)",
    "1st(A2)",
    "1st(A3)",
    "1st(C1)",
    "1st(C2)",
    "1st(E1)",
    "1st(E2)",
    "1st(B)",
    "1st(D1)",
    "1st(D2)",
    "1st(D3)",
    "1st(F1)",
    "1st(F2)",
    "1st(F3)",
    "1st(L)",
    "1st(J)",
    "1st(H)",
    "1st(S001-1)",
    "1st(S001-2G)",
    "1st(S001-3G)",
    "1st(S001-4)",
    "1st(S002-1)",
    "1st(S002-2)",
    "1st(S002-3)",
    "1st(S002-4)",
    "1st(Asus)",
    "1st(Faulty-G)",
    "3rd(Rack24)",
    "3rd(Rack23)",
    "faulty",
  ];

  // ฟังก์ชันเปิด Popup
  const handleOpenAddPart = () => {
    // รีเซ็ตฟอร์มหรือจะตั้งค่าเริ่มต้นก็ได้
    setAddPartData({
      nameProduct: "",
      part: "",
      serial: "",
      type: "",
      location: "",
    });
    setShowAddPartPopup(true);
  };

  // ฟังก์ชันปิด Popup
  const handleCloseAddPart = () => {
    setShowAddPartPopup(false);
  };

  // ฟังก์ชันเปลี่ยนค่าในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddPartData((prev) => ({ ...prev, [name]: value }));
  };

  // กดปุ่ม Engineer test
  const handleEngineerTest = () => {
    alert("Engineer test with data: " + JSON.stringify(addPartData, null, 2));
    // TODO: เรียก API หรือทำ logic อื่น
    setShowAddPartPopup(false);
  };

  // กดปุ่ม Add to stock
  const handleAddToStock = () => {
    alert("Add to stock with data: " + JSON.stringify(addPartData, null, 2));
    // TODO: เรียก API หรือทำ logic อื่น
    setShowAddPartPopup(false);
  };

  // ฟังก์ชัน Use Part
  const handleUsePart = (partId) => {
    alert(`Use part with id = ${partId}`);
    // หรือเรียก API หรือ navigate ไปหน้าอื่น
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Headerbar />
        <div className="content-area">
          <h1 className="page-title">INVENTORY / LOCATION / 1st floor</h1>

          <div className="top-bar">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <button className="add-part-btn" onClick={handleOpenAddPart}>
              ADD PART
            </button>
          </div>

          <table className="parts-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name Product</th>
                <th>Product id</th>
                <th>S/N</th>
                <th>Health</th>
                <th>Location</th>
                <th></th> {/* สำหรับปุ่ม use part */}
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => (
                <tr key={p.id}>
                  <td>{p.type}</td>
                  <td>{p.nameProduct}</td>
                  <td>{p.productId}</td>
                  <td>{p.serial}</td>
                  <td>{p.health}</td>
                  <td>{p.location}</td>
                  <td>
                    <button onClick={() => handleUsePart(p.id)}>
                      USE PART
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Popup ADD PART */}
          {showAddPartPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h2>ADD PART</h2>

                <div className="form-row">
                  <label>Name Product:</label>
                  <input
                    type="text"
                    name="nameProduct"
                    value={addPartData.nameProduct}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>Part:</label>
                  <input
                    type="text"
                    name="part"
                    value={addPartData.part}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>Serial:</label>
                  <input
                    type="text"
                    name="serial"
                    value={addPartData.serial}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label>Type:</label>
                  <select
                    name="type"
                    value={addPartData.type}
                    onChange={handleChange}
                  >
                    <option value="">--Select Type--</option>
                    {typeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <label>Location:</label>
                  <select
                    name="location"
                    value={addPartData.location}
                    onChange={handleChange}
                  >
                    <option value="">--Select Location--</option>
                    {locationOptions.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="button-row">
                  <button onClick={handleEngineerTest}>Engineer test</button>
                  <button onClick={handleAddToStock}>Add to stock</button>
                </div>

                {/* ปุ่ม/เครื่องหมาย X มุมขวาบน */}
                <span className="close-icon" onClick={handleCloseAddPart}>
                  ×
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InventoryLocation3rd;

/*const handleSearch = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/inventory/location/1st?search=${searchText}`);
    const result = await res.json();
    if (result.success) {
      setParts(result.data);
    } else {
      alert(result.message || "Error fetching data");
    }
  } catch (error) {
    console.error(error);
    alert("Cannot connect to server");
  }
};*/
