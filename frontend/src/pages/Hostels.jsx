import React, { useState, useEffect } from "react";
// Import navigation sidebar component
import Sidebar from "../components/Sidebar";

// Live Render backend URL fallback
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

function Hostels() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load hostels on component load
  useEffect(() => {
    fetchHostels();
  }, []);

  // Fetch hostel records from Render API
  const fetchHostels = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/hostels`);
      if (!response.ok) throw new Error("Failed to fetch hostels");
      const data = await response.json();
      setHostels(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching hostels:", err);
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
        <h1 style={{ color: "#1D3557", marginBottom: "5px" }}>Hostels Directory</h1>
        <p style={{ color: "#6C757D", marginBottom: "25px" }}>
          View and manage all registered campus hostels.
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
            <p>Loading hostels...</p>
          ) : hostels.length === 0 ? (
            <p style={{ color: "#6C757D" }}>No hostels recorded.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#48CAE4", color: "#FFFFFF" }}>
                  <th style={{ padding: "12px" }}>ID</th>
                  <th style={{ padding: "12px" }}>Name</th>
                  <th style={{ padding: "12px" }}>Gender Designation</th>
                  <th style={{ padding: "12px" }}>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {hostels.map((hostel) => (
                  <tr key={hostel.id} style={{ borderBottom: "1px solid #E9ECEF" }}>
                    <td style={{ padding: "12px" }}>{hostel.id}</td>
                    <td style={{ padding: "12px" }}>{hostel.name}</td>
                    <td style={{ padding: "12px" }}>{hostel.gender || "Mixed"}</td>
                    <td style={{ padding: "12px" }}>{hostel.capacity || "N/A"}</td>
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

export default Hostels;