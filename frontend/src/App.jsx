import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Hostels from "./pages/Hostels";
import Rooms from "./pages/Rooms";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Page */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Main Pages */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/hostels"
          element={<Hostels />}
        />

        <Route
          path="/rooms"
          element={<Rooms />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;