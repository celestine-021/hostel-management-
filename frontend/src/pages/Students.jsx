import { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaPlus,
  FaSearch,
  FaTrash,
  FaTimes
} from "react-icons/fa";

import "./Students.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://hostel-management-backend-355h.onrender.com";

export default function Students() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newStudent, setNewStudent] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    registration_number: "",
    course: "",
    year_of_study: 1,
    password: "student123"
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {

    try {

      const response = await fetch(`${API_BASE_URL}/students`);

      const data = await response.json();

      setStudents(data);

    } catch (error) {

      console.error(error);

    }

  }

  function handleChange(e) {

    setNewStudent({

      ...newStudent,

      [e.target.name]: e.target.value

    });

  }

  async function addStudent(e) {

    e.preventDefault();

    try {

      const response = await fetch(`${API_BASE_URL}/students`, {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(newStudent)

      });

      const data = await response.json();

      if (!response.ok) {

        alert(data.message);

        return;

      }

      alert("Student added successfully!");

      setShowForm(false);

      setNewStudent({

        full_name: "",

        email: "",

        phone_number: "",

        registration_number: "",

        course: "",

        year_of_study: 1,

        password: "student123"

      });

      fetchStudents();

    } catch (error) {

      console.error(error);

      alert("Unable to add student.");

    }

  }

  function deleteStudent(id) {

    const updated = students.filter((student) => student.id !== id);

    setStudents(updated);

  }

  const filteredStudents = students.filter((student) =>

    student.full_name.toLowerCase().includes(search.toLowerCase()) ||

    student.registration_number.toLowerCase().includes(search.toLowerCase()) ||

    student.email.toLowerCase().includes(search.toLowerCase())

  );

  return (

    <div className="students-container">

      <div className="students-header">

        <h1>

          <FaUserGraduate />

          Students

        </h1>

        <button

          className="add-btn"

          onClick={() => setShowForm(true)}

        >

          <FaPlus />

          Add Student

        </button>

      </div>

      <div className="search-container">

        <FaSearch />

        <input

          type="text"

          placeholder="Search students..."

          value={search}

          onChange={(e) => setSearch(e.target.value)}

        />

      </div>

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Registration No.</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Course</th>

            <th>Year</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredStudents.map((student) => (

            <tr key={student.id}>

              <td>{student.full_name}</td>

              <td>{student.registration_number}</td>

              <td>{student.email}</td>

              <td>{student.phone_number}</td>

              <td>{student.course}</td>

              <td>{student.year_of_study}</td>

              <td>

                <button

                  className="delete-btn"

                  onClick={() => deleteStudent(student.id)}

                >

                  <FaTrash />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {showForm && (

        <div className="modal-overlay">

          <div className="student-modal">

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              <FaTimes />
            </button>

            <h2>Add Student</h2>

            <form onSubmit={addStudent}>

              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={newStudent.full_name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={newStudent.phone_number}
                onChange={handleChange}
              />

              <input
                type="text"
                name="registration_number"
                placeholder="Registration Number"
                value={newStudent.registration_number}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="course"
                placeholder="Course"
                value={newStudent.course}
                onChange={handleChange}
              />

              <input
                type="number"
                name="year_of_study"
                placeholder="Year of Study"
                value={newStudent.year_of_study}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="save-btn"
              >
                Save Student
              </button>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}