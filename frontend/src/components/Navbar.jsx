import {
    FaBell,
    FaSearch,
    FaUserCircle
} from "react-icons/fa";

import "./Navbar.css";

export default function Navbar() {

    return (

        <div className="navbar">

            <h2>Hostel Management System</h2>

            <div className="navbar-right">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search..."
                    />

                </div>

                <FaBell className="nav-icon" />

                <div className="profile">

                    <FaUserCircle />

                    <span>Administrator</span>

                </div>

            </div>

        </div>

    );

}