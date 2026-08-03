import Sidebar from "../components/Sidebar";

function Hostels() {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <div className="topbar">

          <div>
            <h1>
              Hostels
            </h1>

            <p>
              Manage JKUAT hostel buildings.
            </p>
          </div>

          <button className="primary-button">
            + Add Hostel
          </button>

        </div>

        <div className="content-card">

          <h2>
            Hostel List
          </h2>

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Hostel Name</th>
                <th>Gender</th>
                <th>Total Rooms</th>
                <th>Available Rooms</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td colSpan="6">
                  No hostels found.
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default Hostels;