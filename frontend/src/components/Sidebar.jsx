import {
  FaHome,
  FaUserGraduate,
  FaBuilding,
  FaDoorOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaTools,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";


export default function Sidebar() {

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    navigate("/login");

  };


  return (

    <aside className="sidebar">


      <div className="sidebar-logo">

        <h2>
          JKUAT
        </h2>

        <p>
          Hostel System
        </p>

      </div>



      <nav>


        <NavLink to="/dashboard">

          <FaHome />

          <span>
            Dashboard
          </span>

        </NavLink>



        <NavLink to="/students">

          <FaUserGraduate />

          <span>
            Students
          </span>

        </NavLink>




        <NavLink to="/hostels">

          <FaBuilding />

          <span>
            Hostels
          </span>

        </NavLink>




        <NavLink to="/rooms">

          <FaDoorOpen />

          <span>
            Rooms
          </span>

        </NavLink>




        <NavLink to="/bookings">

          <FaClipboardList />

          <span>
            Bookings
          </span>

        </NavLink>




        <NavLink to="/payments">

          <FaMoneyBillWave />

          <span>
            Payments
          </span>

        </NavLink>




        <NavLink to="/maintenance">

          <FaTools />

          <span>
            Maintenance
          </span>

        </NavLink>



      </nav>



      <button
        className="logout-btn"
        onClick={handleLogout}
      >

        <FaSignOutAlt />

        Logout

      </button>


    </aside>

  );

}