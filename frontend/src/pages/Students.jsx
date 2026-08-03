import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ full_name: "", email: "", password: "", phone_number: "", registration_number: "", course: "", year_of_study: "" });
  const [message, setMessage] = useState("");

  const loadStudents = async () => {
    const response = await fetch("/students");
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, year_of_study: Number(form.year_of_study) }),
    });
    const data = await response.json();
    setMessage(data.message || "Student created");
    setForm({ full_name: "", email: "", password: "", phone_number: "", registration_number: "", course: "", year_of_study: "" });
    loadStudents();
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div>
            <h1>Students</h1>
            <p>Manage students registered in the hostel system.</p>
          </div>
        </div>

        <div className="content-card">
          <h2>Add Student</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "600px" }}>
            <input placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <input placeholder="Phone number" value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
            <input placeholder="Registration number" value={form.registration_number} onChange={(e) => setForm({ ...form, registration_number: e.target.value })} />
            <input placeholder="Course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
            <input type="number" placeholder="Year of study" value={form.year_of_study} onChange={(e) => setForm({ ...form, year_of_study: e.target.value })} />
            <button type="submit" className="primary-button">Save Student</button>
          </form>
        </div>

        <div className="content-card">
          <div className="table-header">
            <h2>Student Records</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Registration</th>
                <th>Course</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan="6">No students found.</td></tr>
              ) : students.map((student) => (
                <tr key={student.id}>
                  <td>{student.full_name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone_number}</td>
                  <td>{student.registration_number}</td>
                  <td>{student.course}</td>
                  <td>{student.year_of_study}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Students;