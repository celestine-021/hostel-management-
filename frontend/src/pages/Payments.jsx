import { useState } from "react";

import {
  FaMoneyBillWave,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes
} from "react-icons/fa";

import "./Payments.css";


export default function Payments() {

  const [payments, setPayments] = useState([
    {
      id: 1,
      student: "John Doe",
      amount: 12000,
      method: "Mpesa",
      status: "Paid"
    },

    {
      id: 2,
      student: "Jane Wanjiku",
      amount: 15000,
      method: "Bank",
      status: "Pending"
    }
  ]);


  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);


  const [newPayment, setNewPayment] = useState({
    student: "",
    amount: "",
    method: "Mpesa",
    status: "Paid"
  });


  const [selectedPayment, setSelectedPayment] = useState(null);


  const filteredPayments = payments.filter((payment)=>
    payment.student
    .toLowerCase()
    .includes(search.toLowerCase())
  );


  // Handle input changes
  const handleChange = (e)=>{

    setNewPayment({
      ...newPayment,
      [e.target.name]: e.target.value
    });

  };


  // Add payment
  const addPayment = (e)=>{

    e.preventDefault();


    const payment = {

      id: payments.length + 1,

      student:newPayment.student,

      amount:Number(newPayment.amount),

      method:newPayment.method,

      status:newPayment.status

    };


    setPayments([
      ...payments,
      payment
    ]);


    setNewPayment({
      student:"",
      amount:"",
      method:"Mpesa",
      status:"Paid"
    });


    setShowForm(false);

  };


  // Delete payment
  const deletePayment=(id)=>{

    setPayments(
      payments.filter(
        payment=>payment.id !== id
      )
    );

  };
  return (

    <div className="payments-container">


      {/* Header */}
      <div className="payments-header">

        <h1>
          <FaMoneyBillWave />
          Payments
        </h1>


        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          <FaPlus />
          Add Payment
        </button>

      </div>



      {/* Search */}
      <div className="search-container">

        <FaSearch />

        <input

          type="text"

          placeholder="Search student..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />

      </div>




      {/* Payments Table */}
      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Student</th>

            <th>Amount</th>

            <th>Method</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>



        <tbody>


          {filteredPayments.map((payment)=>(


            <tr key={payment.id}>


              <td>
                {payment.id}
              </td>


              <td>
                {payment.student}
              </td>


              <td>
                KSh {payment.amount}
              </td>


              <td>
                {payment.method}
              </td>


              <td>

                <span
                  className={
                    payment.status === "Paid"
                    ?
                    "paid-status"
                    :
                    "pending-status"
                  }
                >

                  {payment.status}

                </span>

              </td>



              <td>


                <button

                  className="view-btn"

                  onClick={()=>setSelectedPayment(payment)}

                >

                  <FaEye />

                </button>




                <button

                  className="delete-btn"

                  onClick={()=>deletePayment(payment.id)}

                >

                  <FaTrash />

                </button>


              </td>


            </tr>


          ))}


        </tbody>


      </table>





      {/* Add Payment Modal */}

      {showForm && (

        <div className="modal-overlay">


          <div className="payment-modal">


            <button

              className="close-btn"

              onClick={()=>setShowForm(false)}

            >

              <FaTimes />

            </button>



            <h2>
              Add Payment
            </h2>



            <form onSubmit={addPayment}>


              <label>
                Student Name
              </label>

              <input

                type="text"

                name="student"

                value={newPayment.student}

                onChange={handleChange}

                required

              />



              <label>
                Amount
              </label>

              <input

                type="number"

                name="amount"

                value={newPayment.amount}

                onChange={handleChange}

                required

              />



              <label>
                Payment Method
              </label>


              <select

                name="method"

                value={newPayment.method}

                onChange={handleChange}

              >

                <option>
                  Mpesa
                </option>


                <option>
                  Bank
                </option>


                <option>
                  Cash
                </option>


              </select>




              <label>
                Status
              </label>


              <select

                name="status"

                value={newPayment.status}

                onChange={handleChange}

              >

                <option>
                  Paid
                </option>


                <option>
                  Pending
                </option>


              </select>



              <button

                type="submit"

                className="save-btn"

              >

                Save Payment

              </button>



            </form>


          </div>


        </div>


      )}






      {/* View Payment Modal */}

      {selectedPayment && (

        <div className="modal-overlay">


          <div className="payment-modal">


            <button

              className="close-btn"

              onClick={()=>setSelectedPayment(null)}

            >

              <FaTimes />

            </button>



            <h2>
              Payment Details
            </h2>



            <p>
              <strong>Student:</strong> {selectedPayment.student}
            </p>


            <p>
              <strong>Amount:</strong> KSh {selectedPayment.amount}
            </p>


            <p>
              <strong>Method:</strong> {selectedPayment.method}
            </p>


            <p>
              <strong>Status:</strong> {selectedPayment.status}
            </p>


          </div>


        </div>

      )}


    </div>

  );

}