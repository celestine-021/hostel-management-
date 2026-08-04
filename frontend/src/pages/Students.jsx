import React, { useState, useEffect } from "react";

// Point directly to your deployed Render backend
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

function Students() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    registration_number: "",
    course: "",
    year_of_study: 1,
  });

  // Load students list on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (!response.ok) {
        throw new Error("Failed to load students from server.");
      }
      const data = await response.json();
      // Ensure state is always an array to prevent .map() crashes
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Unable to retrieve student records.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.full_name) {
      setError("Please provide at least a full name and email.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error adding student record.");
      }

      // Reset form and hide form area
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        registration_number: "",
        course: "",
        year_of_study: 1,
      });
      setShowForm(false);
      
      // Refresh list from backend
      fetchStudents();
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Failed to add student.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Student Directory</h1>

      <button 
        onClick={() => setShowForm(!showForm)}
        style={{ padding: "8px 16px", marginBottom: "20px", cursor: "pointer" }}
      >
        {showForm ? "Cancel" : "Add Student"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Conditional Add Student Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "30px", background: "#f5f5f5", padding: "15px", borderRadius: "5px" }}>
          <h3>Add New Student</h3>
          <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr" }}>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="registration_number"
              placeholder="Reg Number (e.g. C001-01-1234/2026)"
              value={formData.registration_number}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="year_of_study"
              placeholder="Year of Study"
              value={formData.year_of_study}
              onChange={handleInputChange}
              min="1"
            />
          </div>
          <button type="submit" style={{ marginTop: "15px", padding: "8px 16px" }}>
            Save Student Record
          </button>
        </form>
      )}

      {/* Student List View */}
      {loading ? (
        <p>Loading student records...</p>
      ) : !students || students.length === 0 ? (
        <p>No student records found. Click "Add Student" above to create one.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Reg Number</th>
              <th>Course</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.full_name}</td>
                <td>{student.email}</td>
                <td>{student.phone_number || "N/A"}</td>
                <td>{student.registration_number || "N/A"}</td>
                <td>{student.course || "N/A"}</td>
                <td>{student.year_of_study || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Students;