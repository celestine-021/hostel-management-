import React, { useState, useEffect } from "react";

// Use live Render backend endpoint with fallback to local development
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

function Hostels() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    gender: "mixed",
  });

  // Fetch hostels on page mount
  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      // Send GET request to live Render backend
      const response = await fetch(`${API_BASE_URL}/hostels`);
      if (response.ok) {
        const data = await response.json();
        setHostels(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching hostels:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST new hostel data directly to Render API
      const response = await fetch(`${API_BASE_URL}/hostels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to create hostel.");
      }

      // Reset form input values after saving
      setFormData({
        name: "",
        location: "",
        description: "",
        gender: "mixed",
      });

      // Reload list to display newly created hostel
      fetchHostels();
    } catch (err) {
      console.error("Error creating hostel:", err);
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hostels</h2>
      <p>Manage JKUAT hostel buildings.</p>

      {/* Form to submit a new hostel */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <h3>Add Hostel</h3>
        <input
          type="text"
          name="name"
          placeholder="Hostel Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="mixed">Mixed</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">Save Hostel</button>
      </form>

      {/* Hostel list view */}
      <h3>Hostel List</h3>
      {loading ? (
        <p>Loading hostels...</p>
      ) : hostels.length === 0 ? (
        <p>No hostels found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hostel Name</th>
              <th>Gender</th>
              <th>Total Rooms</th>
              <th>Available Rooms</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.name}</td>
                <td>{h.gender}</td>
                <td>{h.total_rooms}</td>
                <td>{h.available_rooms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Hostels;