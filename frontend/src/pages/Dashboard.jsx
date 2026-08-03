import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [stats, setStats] = useState({ students: 0, hostels: 0, rooms: 0, availableRooms: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [studentsResponse, hostelsResponse, roomsResponse] = await Promise.all([
          fetch("/students"),
          fetch("/hostels"),
          fetch("/rooms"),
        ]);

        const students = await studentsResponse.json();
        const hostels = await hostelsResponse.json();
        const rooms = await roomsResponse.json();

        setStats({
          students: students.length,
          hostels: hostels.length,
          rooms: rooms.length,
          availableRooms: rooms.filter((room) => room.status === "available").length,
        });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <div className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to the JKUAT Hostel Management System.</p>
          </div>
          <div className="user-info">Administrator</div>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="card-icon">👨‍🎓</div>
            <div>
              <h3>Total Students</h3>
              <p>{stats.students}</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🏢</div>
            <div>
              <h3>Total Hostels</h3>
              <p>{stats.hostels}</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🚪</div>
            <div>
              <h3>Total Rooms</h3>
              <p>{stats.rooms}</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🛏️</div>
            <div>
              <h3>Available Rooms</h3>
              <p>{stats.availableRooms}</p>
            </div>
          </div>
        </div>

        <div className="content-card">
          <h2>Recent Activities</h2>
          <div className="empty-state">
            <p>Records you add will appear here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;