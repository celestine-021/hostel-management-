import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  // Extract current location to identify active navigation routes
  const location = useLocation();
  const navigate = useNavigate();
  
  // Track currently hovered item index for amber highlight state
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Clear local session storage and redirect user to login
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Centralized route definitions for navigation items
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
        backgroundColor: "#00B4D8", // Sky blue brand color
        minHeight: "100vh",
        padding: "20px 15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div>
        {/* Brand logo and application context */}
        <h2 style={{ color: "#03045E", margin: "0 0 5px 0" }}>JKUAT</h2>
        <p style={{ color: "#CAF0F8", margin: "0 0 30px 0", fontSize: "14px" }}>
          Hostel Management
        </p>

        {/* Dynamic navigation routing list */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredIndex === index;

            return (
              <Link
                key={item.name}
                to={item.path}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: isActive || isHovered ? "#03045E" : "#FFFFFF",
                  // Transition base color to vibrant amber (#FFB703) on hover or active selection
                  backgroundColor: isActive
                    ? "#FFB703"
                    : isHovered
                    ? "#FFC300"
                    : "transparent",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Account logout action button */}
      <button
        onClick={handleLogout}
        style={{
          padding: "10px",
          backgroundColor: "#F8F9FA",
          border: "none",
          borderRadius: "6px",
          color: "#03045E",
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