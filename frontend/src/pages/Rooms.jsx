import { useEffect, useState } from "react";
import {
  FaDoorOpen,
  FaPlus,
  FaSearch,
  FaTimes
} from "react-icons/fa";

import "./Rooms.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newRoom, setNewRoom] = useState({
    hostel_id: "",
    room_number: "",
    capacity: 1,
    occupied_spaces: 0,
    price: "",
    status: "available",
  });

  useEffect(() => {
    fetchRooms();
    fetchHostels();
  }, []);

  async function fetchRooms() {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchHostels() {
    try {
      const response = await fetch(`${API_BASE_URL}/hostels`);
      const data = await response.json();
      setHostels(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setNewRoom({
      ...newRoom,
      [e.target.name]: e.target.value,
    });
  }

  async function addRoom(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newRoom,
          hostel_id: Number(newRoom.hostel_id),
          capacity: Number(newRoom.capacity),
          occupied_spaces: Number(newRoom.occupied_spaces),
          price: Number(newRoom.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Room added successfully!");

      setShowForm(false);

      setNewRoom({
        hostel_id: "",
        room_number: "",
        capacity: 1,
        occupied_spaces: 0,
        price: "",
        status: "available",
      });

      fetchRooms();
    } catch (error) {
      console.error(error);
      alert("Unable to add room.");
    }
  }

  const filteredRooms = rooms.filter((room) =>
    room.room_number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rooms-container">

      <div className="rooms-header">
        <h1>
          <FaDoorOpen /> Rooms
        </h1>

        <button
  className="add-btn"
  onClick={() => {
    console.log("Add room clicked");
    setShowForm(true);
  }}
>
  <FaPlus /> Add Room
</button>
      </div>

      <div className="search-container">
        <FaSearch />

        <input
          type="text"
          placeholder="Search room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Hostel</th>
            <th>Capacity</th>
            <th>Occupied</th>
            <th>Available Beds</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredRooms.map((room) => (
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

      {showForm && (
        <div className="modal-overlay">
          <div className="student-modal">

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              <FaTimes />
            </button>

            <h2>Add Room</h2>

            <form onSubmit={addRoom}>

              <select
                name="hostel_id"
                value={newRoom.hostel_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Hostel</option>

                {hostels.map((hostel) => (
                  <option
                    key={hostel.id}
                    value={hostel.id}
                  >
                    {hostel.name}
                  </option>
                ))}

              </select>

              <input
                type="text"
                name="room_number"
                placeholder="Room Number"
                value={newRoom.room_number}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={newRoom.capacity}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="occupied_spaces"
                placeholder="Occupied Spaces"
                value={newRoom.occupied_spaces}
                onChange={handleChange}
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newRoom.price}
                onChange={handleChange}
                required
              />

              <select
                name="status"
                value={newRoom.status}
                onChange={handleChange}
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>

              <button
                type="submit"
                className="save-btn"
              >
                Save Room
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}