import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

import {
  FaUserGraduate,
  FaBuilding,
  FaDoorOpen,
  FaBed,
  FaClipboardList,
  FaMoneyBillWave,
  FaTools
} from "react-icons/fa";

import "./Dashboard.css";


const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";


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
        `${API_BASE_URL}/hostels`
      );

      const hostelsData =
        await hostelsResponse.json();



      // Fetch rooms

      const roomsResponse = await fetch(
        `${API_BASE_URL}/rooms`
      );

      const roomsData =
        await roomsResponse.json();



      // Fetch students

      const studentsResponse = await fetch(
        `${API_BASE_URL}/students`
      );

      const studentsData =
        await studentsResponse.json();



      setTotalHostels(
        hostelsData.length
      );


      setTotalRooms(
        roomsData.length
      );


      setAvailableRooms(

        roomsData.filter(
          (room) =>
          room.status?.toLowerCase() === "available"
        ).length

      );


      setTotalStudents(
        studentsData.length
      );



    } catch(error) {

      console.error(
        "Error fetching dashboard data:",
        error
      );

    }

  };





  return (

    <Layout>


      <div className="dashboard-container">



        <div className="dashboard-header">

          <h1>
            Hostel Management Dashboard
          </h1>


          <p>
            Manage students, hostels, rooms, bookings and maintenance from one place.
          </p>

        </div>




        <div className="dashboard">


          <StatCard
            icon={<FaUserGraduate />}
            title="Students"
            value={totalStudents}
          />



          <StatCard
            icon={<FaBuilding />}
            title="Hostels"
            value={totalHostels}
          />



          <StatCard
            icon={<FaDoorOpen />}
            title="Rooms"
            value={totalRooms}
          />



          <StatCard
            icon={<FaBed />}
            title="Available Rooms"
            value={availableRooms}
          />



          <StatCard
            icon={<FaClipboardList />}
            title="Bookings"
            value="0"
          />



          <StatCard
            icon={<FaMoneyBillWave />}
            title="Payments"
            value="0"
          />



          <StatCard
            icon={<FaTools />}
            title="Maintenance"
            value="0"
          />


        </div>





        <div className="content-card">


          <h2>
            Recent Activities
          </h2>


          <p>
            No recent activities available.
          </p>


        </div>



      </div>


    </Layout>

  );

}



export default Dashboard;