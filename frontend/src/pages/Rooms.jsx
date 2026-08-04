import React, { useState, useEffect } from "react";
// Import main navigation sidebar
import Sidebar from "../components/Sidebar";

// Live Render API fallback URL
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

function Rooms() {
  // Page state variables for handling rooms data, add form visibility, and load status
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnHover, setBtnHover] = useState(false);

  // Controlled form input state for new room records
  const [formData, setFormData] = useState({
    room_number: "",
    hostel_id: 1,
    capacity: 2,
  });

  // Fetch room directory on component initialization
  useEffect(() => {
    fetchRooms();
  }, []);

  // Fetch rooms list from Flask API
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`);
      if (!response.ok) throw new Error("Failed to fetch rooms");
      const data = await response.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error retrieving room data:", err);
    } finally {
      setLoading(false);
    }
  };

  // POST new room payload to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add room");

      // Reset form controls and reload directory
      setFormData({ room_number: "", hostel_id: 1, capacity: 2 });
      setShowForm(false);
      fetchRooms();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8F9FA" }}>
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Page Area */}
      <div style={{ flex: 1, padding: "40px", boxSizing: "border-box" }}>
        <h1 style={{ color: "#03045E", marginBottom: "5px" }}>Rooms Directory</h1>
        <p style={{ color: "#6C757D", marginBottom: "25px" }}>
          View room allocations and current occupancy levels.
        </p>

        {/* Action button toggles "Add Room" form modal */}
        <button
          onClick={() => setShowForm(!showForm)}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            padding: "10px 20px",
            backgroundColor: btnHover ? "#FFB703" : "#00B4D8", // Sky blue base, Amber hover
            color: btnHover ? "#03045E" : "#FFFFFF",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px",
            transition: "all 0.2s ease-in-out",
          }}
        >
          {showForm ? "Cancel" : "Add Room"}
        </button>

        {/* Collapsible New Room Creation Form */}
        {showForm && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              marginBottom: "25px",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#03045E" }}>Add New Room</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input
                type="text"
                placeholder="Room Number (e.g. A101)"
                value={formData.room_number}
                onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                required
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              />
              <input
                type="number"
                placeholder="Hostel ID"
                value={formData.hostel_id}
                onChange={(e) => setFormData({ ...formData, hostel_id: e.target.value })}
                required
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              />
              <input
                type="number"
                placeholder="Room Capacity"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px",
                  backgroundColor: "#FFB703", // Amber submit button
                  color: "#03045E",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Save Room
              </button>
            </form>
          </div>
        )}

        {/* Directory Data Display Table Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {loading ? (
            <p>Loading room data...</p>
          ) : rooms.length === 0 ? (
            <p style={{ color: "#6C757D" }}>No rooms registered.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#00B4D8", color: "#FFFFFF" }}>
                  <th style={{ padding: "12px" }}>ID</th>
                  <th style={{ padding: "12px" }}>Room Number</th>
                  <th style={{ padding: "12px" }}>Hostel ID</th>
                  <th style={{ padding: "12px" }}>Occupancy</th>
                  <th style={{ padding: "12px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} style={{ borderBottom: "1px solid #E9ECEF" }}>
                    <td style={{ padding: "12px" }}>{room.id}</td>
                    <td style={{ padding: "12px" }}>{room.room_number}</td>
                    <td style={{ padding: "12px" }}>{room.hostel_id}</td>
                    <td style={{ padding: "12px" }}>{room.capacity || "N/A"}</td>
                    <td style={{ padding: "12px" }}>{room.status || "Available"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rooms;