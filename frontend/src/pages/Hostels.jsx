import React, { useState, useEffect } from "react";
// Import main navigation sidebar
import Sidebar from "../components/Sidebar";

// Live Render API fallback URL
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

function Hostels() {
  // Page state management
  const [hostels, setHostels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnHover, setBtnHover] = useState(false);

  // Controlled form inputs state matching Hostel schema
  const [formData, setFormData] = useState({
    name: "",
    gender: "Mixed",
    capacity: 100,
  });

  // Fetch registered hostels on render
  useEffect(() => {
    fetchHostels();
  }, []);

  // Retrieve hostel collection from Flask API endpoint
  const fetchHostels = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/hostels`);
      if (!response.ok) throw new Error("Failed to fetch hostels");
      const data = await response.json();
      setHostels(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error retrieving hostels:", err);
    } finally {
      setLoading(false);
    }
  };

  // POST request payload to create a new hostel entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/hostels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add hostel");

      // Reset form and update state list
      setFormData({ name: "", gender: "Mixed", capacity: 100 });
      setShowForm(false);
      fetchHostels();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8F9FA" }}>
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Page Content */}
      <div style={{ flex: 1, padding: "40px", boxSizing: "border-box" }}>
        <h1 style={{ color: "#03045E", marginBottom: "5px" }}>Hostels Directory</h1>
        <p style={{ color: "#6C757D", marginBottom: "25px" }}>
          View and manage all registered campus hostels.
        </p>

        {/* Action button toggles "Add Hostel" form visibility */}
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
          {showForm ? "Cancel" : "Add Hostel"}
        </button>

        {/* Add Hostel Input Form Container */}
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
            <h3 style={{ marginTop: 0, color: "#03045E" }}>Add New Hostel</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input
                type="text"
                placeholder="Hostel Name (e.g. Hall 6)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              />
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Mixed">Mixed</option>
              </select>
              <input
                type="number"
                placeholder="Capacity"
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
                Save Hostel
              </button>
            </form>
          </div>
        )}

        {/* Hostels Data Table Container */}
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
                <tr style={{ backgroundColor: "#00B4D8", color: "#FFFFFF" }}>
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