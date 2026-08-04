import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  // Grab current URL path to highlight active navigation link
  const location = useLocation();
  const navigate = useNavigate();

  // Clear local auth token and redirect user back to login
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Define navigation routes and display names
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Students", path: "/students" },
    { name: "Hostels", path: "/hostels" },
    { name: "Rooms", path: "/rooms" },
  ];

  return (
    <div
      style={{
        width: "240px",
        backgroundColor: "#48CAE4", // Matching cyan branding
        minHeight: "100vh",
        padding: "20px 15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div>
        {/* App Title Header */}
        <h2 style={{ color: "#1D3557", margin: "0 0 5px 0" }}>JKUAT</h2>
        <p style={{ color: "#457B9D", margin: "0 0 30px 0", fontSize: "14px" }}>
          Hostel Management
        </p>

        {/* Dynamic Navigation Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {navItems.map((item) => {
            // Apply active orange background if current path matches item route
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: isActive ? "#FFFFFF" : "#1D3557",
                  backgroundColor: isActive ? "#F4A261" : "transparent",
                  transition: "all 0.2s ease",
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Action Button */}
      <button
        onClick={handleLogout}
        style={{
          padding: "10px",
          backgroundColor: "#F8F9FA",
          border: "none",
          borderRadius: "6px",
          color: "#6C757D",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;