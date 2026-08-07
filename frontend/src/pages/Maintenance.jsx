import { useState } from "react";

import {
  FaTools,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaTimes
} from "react-icons/fa";

import "./Maintenance.css";


export default function Maintenance() {


  const [requests, setRequests] = useState([
    {
      id: 1,
      student: "John Doe",
      room: "A101",
      issue: "Broken Window",
      status: "Pending"
    },
    {
      id: 2,
      student: "Jane Wanjiku",
      room: "B203",
      issue: "Leaking Tap",
      status: "Resolved"
    }
  ]);


  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);


  const [newRequest, setNewRequest] = useState({
    student:"",
    room:"",
    issue:"",
    status:"Pending"
  });


  const [selectedRequest, setSelectedRequest] = useState(null);


  const filteredRequests = requests.filter((request)=>
    request.student.toLowerCase().includes(search.toLowerCase()) ||
    request.issue.toLowerCase().includes(search.toLowerCase())
  );



  // CREATE REQUEST

  const handleAddRequest = (e)=>{

    e.preventDefault();


    const request = {

      id: requests.length + 1,

      student:newRequest.student,

      room:newRequest.room,

      issue:newRequest.issue,

      status:"Pending"

    };


    setRequests([...requests,request]);


    setNewRequest({
      student:"",
      room:"",
      issue:"",
      status:"Pending"
    });


    setShowForm(false);

  };




  // DELETE REQUEST

  const deleteRequest=(id)=>{

    setRequests(
      requests.filter(
        (request)=>request.id !== id
      )
    );

  };




  // CHANGE STATUS

  const resolveRequest=(id)=>{


    setRequests(
      requests.map((request)=>

        request.id === id

        ?

        {...request,status:"Resolved"}

        :

        request

      )
    );

  };




  return (

<div className="maintenance-container">


<div className="maintenance-header">


<h1>
<FaTools/> Maintenance Requests
</h1>



<button

className="add-btn"

onClick={()=>setShowForm(true)}

>

<FaPlus/> New Request

</button>


</div>





<div className="search-container">


<FaSearch className="search-icon"/>


<input

type="text"

placeholder="Search student or issue..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


</div>





<table>


<thead>

<tr>

<th>ID</th>

<th>Student</th>

<th>Room</th>

<th>Issue</th>

<th>Status</th>

<th>Actions</th>


</tr>


</thead>



<tbody>


{
filteredRequests.map((request)=>(


<tr key={request.id}>


<td>{request.id}</td>


<td>{request.student}</td>


<td>{request.room}</td>


<td>{request.issue}</td>



<td>


{
request.status==="Resolved"

?

<span className="resolved">

<FaCheckCircle/> Resolved

</span>


:

<span className="pending">

<FaClock/> Pending

</span>

}


</td>



<td>


<button

className="view-btn"

onClick={()=>setSelectedRequest(request)}

>

<FaEye/>

</button>




<button

className="edit-btn"

onClick={()=>resolveRequest(request.id)}

>

<FaEdit/>

</button>



<button

className="delete-btn"

onClick={()=>deleteRequest(request.id)}

>

<FaTrash/>

</button>



</td>



</tr>


))


}


</tbody>


</table>






{
showForm &&


<div className="modal">


<div className="form-box">


<button

className="close"

onClick={()=>setShowForm(false)}

>

<FaTimes/>

</button>



<h2>Create Maintenance Request</h2>




<form onSubmit={handleAddRequest}>


<input

type="text"

placeholder="Student Name"

value={newRequest.student}

onChange={(e)=>

setNewRequest({

...newRequest,

student:e.target.value

})

}

/>




<input

type="text"

placeholder="Room Number"

value={newRequest.room}

onChange={(e)=>

setNewRequest({

...newRequest,

room:e.target.value

})

}

/>




<input

type="text"

placeholder="Issue"

value={newRequest.issue}

onChange={(e)=>

setNewRequest({

...newRequest,

issue:e.target.value

})

}

/>



<button className="save-btn">

Submit Request

</button>



</form>



</div>


</div>


}






{
selectedRequest &&


<div className="modal">


<div className="form-box">


<button

className="close"

onClick={()=>setSelectedRequest(null)}

>

<FaTimes/>

</button>



<h2>Request Details</h2>


<p>
Student: {selectedRequest.student}
</p>


<p>
Room: {selectedRequest.room}
</p>


<p>
Issue: {selectedRequest.issue}
</p>


<p>
Status: {selectedRequest.status}
</p>



</div>


</div>


}



</div>


);

}