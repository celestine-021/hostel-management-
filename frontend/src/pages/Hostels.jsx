import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Hostels() {
  const [hostels, setHostels] = useState([]);
  const [form, setForm] = useState({ name: "", location: "", description: "", gender: "mixed" });
  const [message, setMessage] = useState("");

  const loadHostels = async () => {
    const response = await fetch("/hostels");
    const data = await response.json();
    setHostels(data);
  };

  useEffect(() => {
    loadHostels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/hostels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setMessage(data.message || "Hostel created");
    setForm({ name: "", location: "", description: "", gender: "mixed" });
    loadHostels();
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div>
            <h1>Hostels</h1>
            <p>Manage JKUAT hostel buildings.</p>
          </div>
        </div>

        <div className="content-card">
          <h2>Add Hostel</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "500px" }}>
            <input placeholder="Hostel name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option value="mixed">Mixed</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button type="submit" className="primary-button">Save Hostel</button>
          </form>
        </div>

        <div className="content-card">
          <h2>Hostel List</h2>
          <table>
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
              {hostels.length === 0 ? (
                <tr><td colSpan="5">No hostels found.</td></tr>
              ) : hostels.map((hostel) => (
                <tr key={hostel.id}>
                  <td>{hostel.id}</td>
                  <td>{hostel.name}</td>
                  <td>{hostel.gender}</td>
                  <td>{hostel.total_rooms}</td>
                  <td>{hostel.available_rooms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Hostels;