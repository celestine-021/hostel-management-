import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        {/* Header */}

        <div className="topbar">

          <div>
            <h1>
              Dashboard
            </h1>

            <p>
              Welcome to the JKUAT Hostel
              Management System.
            </p>
          </div>

          <div className="user-info">
            Administrator
          </div>

        </div>

        {/* Statistics */}

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon">
              👨‍🎓
            </div>

            <div>
              <h3>
                Total Students
              </h3>

              <p>
                0
              </p>
            </div>

          </div>


          <div className="dashboard-card">

            <div className="card-icon">
              🏢
            </div>

            <div>
              <h3>
                Total Hostels
              </h3>

              <p>
                0
              </p>
            </div>

          </div>


          <div className="dashboard-card">

            <div className="card-icon">
              🚪
            </div>

            <div>
              <h3>
                Total Rooms
              </h3>

              <p>
                0
              </p>
            </div>

          </div>


          <div className="dashboard-card">

            <div className="card-icon">
              🛏️
            </div>

            <div>
              <h3>
                Available Rooms
              </h3>

              <p>
                0
              </p>
            </div>

          </div>

        </div>

        {/* Recent Activities */}

        <div className="content-card">

          <h2>
            Recent Activities
          </h2>

          <div className="empty-state">

            <p>
              No recent activities available.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}
export default Dashboard;