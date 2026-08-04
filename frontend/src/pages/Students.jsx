import { useState } from "react";

// Use Render backend URL in production, or fall back to localhost during local dev
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

function AddStudent() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    registration_number: "",
    course: "",
    year_of_study: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send student payload directly to live Flask backend on Render
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Catch backend or CORS issues before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Successfully saved student:", data);

      // Reset form after successful creation
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        registration_number: "",
        course: "",
        year_of_study: 1,
      });

      alert("Student added successfully!");
    } catch (err) {
      console.error("Error creating student record:", err);
      setError(err.message || "Failed to add student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields go here */}
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Student"}
      </button>
    </form>
  );
}

export default AddStudent;