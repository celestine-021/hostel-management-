import Sidebar from "../components/Sidebar";

function Students() {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <div className="topbar">

          <div>
            <h1>
              Students
            </h1>

            <p>
              Manage students registered
              in the hostel system.
            </p>
          </div>

          <button className="primary-button">
            + Add Student
          </button>

        </div>

        <div className="content-card">

          <div className="table-header">

            <h2>
              Student Records
            </h2>

            <input
              type="text"
              placeholder="Search students..."
              className="search-input"
            />

          </div>

          <table>

            <thead>

              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Hostel</th>
                <th>Room</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td colSpan="7">
                  No students found.
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default Students;