import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [totalHostels, setTotalHostels] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch hostels
      const hostelsResponse = await fetch(
        "http://localhost:5000/api/hostels"
      );

      const hostelsData = await hostelsResponse.json();

      setTotalHostels(hostelsData.length);

      // Fetch rooms
      const roomsResponse = await fetch(
        "http://localhost:5000/api/rooms"
      );

      const roomsData = await roomsResponse.json();

      setTotalRooms(roomsData.length);

      // Count available rooms
      const available = roomsData.filter(
        (room) => room.status === "Available"
      );

      setAvailableRooms(available.length);

      // Fetch students
      const studentsResponse = await fetch(
        "http://localhost:5000/api/students"
      );

      const studentsData = await studentsResponse.json();

      setTotalStudents(studentsData.length);

    } catch (error) {
      console.error(
        "Error fetching dashboard data:",
        error
      );
    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        {/* Header */}
        <div className="topbar">

          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome to the JKUAT Hostel
              Management System.
            </p>
          </div>

          <div className="user-info">
            Administrator
          </div>

        </div>

        {/* Statistics */}
        <div className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon">
              👨‍🎓
            </div>

            <div>
              <h3>Total Students</h3>

              <p>{totalStudents}</p>
            </div>

          </div>

          <div className="dashboard-card">

            <div className="card-icon">
              🏢
            </div>

            <div>
              <h3>Total Hostels</h3>

              <p>{totalHostels}</p>
            </div>

          </div>

          <div className="dashboard-card">

            <div className="card-icon">
              🚪
            </div>

            <div>
              <h3>Total Rooms</h3>

              <p>{totalRooms}</p>
            </div>

          </div>

          <div className="dashboard-card">

            <div className="card-icon">
              🛏️
            </div>

            <div>
              <h3>Available Rooms</h3>

              <p>{availableRooms}</p>
            </div>

          </div>

        </div>

        {/* Recent Activities */}
        <div className="content-card">

          <h2>
            Recent Activities
          </h2>

          <div className="empty-state">

            <p>
              No recent activities available.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;