import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <h2>JKUAT</h2>
        <p>Hostel Management</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-menu">

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/students">
          Students
        </NavLink>

        <NavLink to="/hostels">
          Hostels
        </NavLink>

        <NavLink to="/rooms">
          Rooms
        </NavLink>

      </nav>

      {/* Logout */}
      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;