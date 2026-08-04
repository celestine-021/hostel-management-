import React, { useState, useEffect } from "react";
// Import navigation sidebar component
import Sidebar from "../components/Sidebar";

// Live Render backend URL fallback
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load room directory on mount
  useEffect(() => {
    fetchRooms();
  }, []);

  // Fetch rooms list from Render API
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`);
      if (!response.ok) throw new Error("Failed to fetch rooms");
      const data = await response.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8F9FA" }}>
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Page Area */}
      <div style={{ flex: 1, padding: "40px", boxSizing: "border-box" }}>
        <h1 style={{ color: "#1D3557", marginBottom: "5px" }}>Rooms Directory</h1>
        <p style={{ color: "#6C757D", marginBottom: "25px" }}>
          View room allocations and current occupancy levels.
        </p>

        {/* Directory Table Card */}
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
                <tr style={{ backgroundColor: "#48CAE4", color: "#FFFFFF" }}>
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