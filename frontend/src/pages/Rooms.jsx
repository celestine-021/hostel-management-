import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [form, setForm] = useState({ hostel_id: "", room_number: "", capacity: "", occupied_spaces: "0", price: "", status: "available" });
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const [roomsResponse, hostelsResponse] = await Promise.all([fetch("/rooms"), fetch("/hostels")]);
    const roomsData = await roomsResponse.json();
    const hostelsData = await hostelsResponse.json();
    setRooms(roomsData);
    setHostels(hostelsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, hostel_id: Number(form.hostel_id), capacity: Number(form.capacity), occupied_spaces: Number(form.occupied_spaces), price: Number(form.price) }),
    });
    const data = await response.json();
    setMessage(data.message || "Room created");
    setForm({ hostel_id: "", room_number: "", capacity: "", occupied_spaces: "0", price: "", status: "available" });
    loadData();
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div>
            <h1>Rooms</h1>
            <p>Manage hostel rooms and room availability.</p>
          </div>
        </div>

        <div className="content-card">
          <h2>Add Room</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "500px" }}>
            <select value={form.hostel_id} onChange={(e) => setForm({ ...form, hostel_id: e.target.value })} required>
              <option value="">Select hostel</option>
              {hostels.map((hostel) => <option key={hostel.id} value={hostel.id}>{hostel.name}</option>)}
            </select>
            <input placeholder="Room number" value={form.room_number} onChange={(e) => setForm({ ...form, room_number: e.target.value })} required />
            <input type="number" placeholder="Capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} required />
            <input type="number" placeholder="Occupied spaces" value={form.occupied_spaces} onChange={(e) => setForm({ ...form, occupied_spaces: e.target.value })} />
            <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <button type="submit" className="primary-button">Save Room</button>
          </form>
        </div>

        <div className="content-card">
          <h2>Room List</h2>
          <table>
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Hostel</th>
                <th>Capacity</th>
                <th>Occupied</th>
                <th>Available Beds</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr><td colSpan="6">No rooms found.</td></tr>
              ) : rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.room_number}</td>
                  <td>{room.hostel}</td>
                  <td>{room.capacity}</td>
                  <td>{room.occupied_spaces}</td>
                  <td>{room.available_beds}</td>
                  <td>{room.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Rooms;