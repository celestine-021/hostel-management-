import Sidebar from "../components/Sidebar";

function Rooms() {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <div className="topbar">

          <div>
            <h1>
              Rooms
            </h1>

            <p>
              Manage hostel rooms
              and room availability.
            </p>
          </div>

          <button className="primary-button">
            + Add Room
          </button>

        </div>

        <div className="content-card">

          <h2>
            Room List
          </h2>

          <table>

            <thead>

              <tr>
                <th>Room Number</th>
                <th>Hostel</th>
                <th>Capacity</th>
                <th>Occupied</th>
                <th>Available Beds</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td colSpan="6">
                  No rooms found.
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default Rooms;