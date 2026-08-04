import React, { useState, useEffect } from "react";
// Import shared sidebar directly from components directory
import Sidebar from "../components/Sidebar";

// Live Render backend URL fallback
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

function Students() {
  // Application state hooks
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Controlled form inputs state matching database schema
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    registration_number: "",
    course: "",
    year_of_study: 1,
  });

  // Fetch student directory when component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Retrieve all student records from Flask API endpoint
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      // Ensure state receives an array to prevent .map() errors
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching student records:", err);
    } finally {
      setLoading(false);
    }
  };

  // POST new student form payload to Flask backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create student");

      // Reset form state and hide modal view after saving
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        registration_number: "",
        course: "",
        year_of_study: 1,
      });
      setShowForm(false);
      
      // Refresh directory list
      fetchStudents();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8F9FA" }}>
      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area Container */}
      <div style={{ flex: 1, padding: "40px", boxSizing: "border-box" }}>
        <h1 style={{ color: "#1D3557", marginBottom: "5px" }}>Student Directory</h1>
        <p style={{ color: "#6C757D", marginBottom: "25px" }}>
          Manage registered JKUAT students.
        </p>

        {/* Action button to toggle registration form */}
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#48CAE4",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          {showForm ? "Cancel" : "Add Student"}
        </button>

        {/* Registration Form Card */}
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
            <h3 style={{ marginTop: 0, color: "#1D3557" }}>Add New Student</h3>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <input
                type="text"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              />
              <input
                type="text"
                placeholder="Reg Number"
                value={formData.registration_number}
                onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              />
              <input
                type="text"
                placeholder="Course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              />
              <input
                type="number"
                placeholder="Year"
                value={formData.year_of_study}
                onChange={(e) => setFormData({ ...formData, year_of_study: e.target.value })}
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #CCC" }}
              />
              <button
                type="submit"
                style={{
                  gridColumn: "span 2",
                  padding: "10px",
                  backgroundColor: "#F4A261",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Save Student Record
              </button>
            </form>
          </div>
        )}

        {/* Directory Table Styled to Match Dashboard Cards */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {loading ? (
            <p>Loading student records...</p>
          ) : students.length === 0 ? (
            <p style={{ color: "#6C757D" }}>No students registered yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#48CAE4", color: "#FFFFFF" }}>
                  <th style={{ padding: "12px" }}>ID</th>
                  <th style={{ padding: "12px" }}>Full Name</th>
                  <th style={{ padding: "12px" }}>Email</th>
                  <th style={{ padding: "12px" }}>Phone Number</th>
                  <th style={{ padding: "12px" }}>Reg Number</th>
                  <th style={{ padding: "12px" }}>Course</th>
                  <th style={{ padding: "12px" }}>Year</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} style={{ borderBottom: "1px solid #E9ECEF" }}>
                    <td style={{ padding: "12px" }}>{student.id}</td>
                    <td style={{ padding: "12px" }}>{student.full_name}</td>
                    <td style={{ padding: "12px" }}>{student.email}</td>
                    <td style={{ padding: "12px" }}>{student.phone_number || "N/A"}</td>
                    <td style={{ padding: "12px" }}>{student.registration_number || "N/A"}</td>
                    <td style={{ padding: "12px" }}>{student.course || "N/A"}</td>
                    <td style={{ padding: "12px" }}>{student.year_of_study || "N/A"}</td>
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

export default Students;