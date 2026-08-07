import Layout from "../components/Layout";
import { FaBed, FaClipboardList, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./StudentDashboard.css";


function StudentDashboard(){

    const navigate = useNavigate();


    return(

        <Layout>

            <div className="student-dashboard">

                <h1>
                    Student Portal
                </h1>

                <p>
                    Welcome to JKUAT Hostel Management System
                </p>


                <div className="student-cards">


                    <div 
                    className="student-card"
                    onClick={() => navigate("/available-rooms")}
                    >

                        <FaBed />

                        <h3>
                            Available Rooms
                        </h3>

                        <p>
                            View and request hostel rooms
                        </p>

                    </div>




                    <div 
                    className="student-card"
                    onClick={() => navigate("/my-bookings")}
                    >

                        <FaClipboardList />

                        <h3>
                            My Bookings
                        </h3>

                        <p>
                            Check booking status
                        </p>

                    </div>




                    <div className="student-card">

                        <FaTools />

                        <h3>
                            Maintenance
                        </h3>

                        <p>
                            Report room issues
                        </p>

                    </div>



                </div>


            </div>


        </Layout>

    )

}


export default StudentDashboard;