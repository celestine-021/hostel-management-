import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaBuilding,
  FaDoorOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaTools
} from "react-icons/fa";

import "./Layout.css";


function Layout({children}) {


return (

<div className="layout">


    <aside className="sidebar">


        <h2>
            Hostel MS
        </h2>


        <nav>


            <Link to="/dashboard">
                <FaHome />
                Dashboard
            </Link>


            <Link to="/students">
                <FaUserGraduate />
                Students
            </Link>


            <Link to="/hostels">
                <FaBuilding />
                Hostels
            </Link>


            <Link to="/rooms">
                <FaDoorOpen />
                Rooms
            </Link>


            <Link to="/bookings">
                <FaClipboardList />
                Bookings
            </Link>


            <Link to="/payments">
                <FaMoneyBillWave />
                Payments
            </Link>


            <Link to="/maintenance">
                <FaTools />
                Maintenance
            </Link>


        </nav>


    </aside>



    <main className="main-content">

        {children}

    </main>


</div>

);


}


export default Layout;