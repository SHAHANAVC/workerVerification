// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   Button,
//   Form,
//   InputGroup,
//   Container,
//   Row,
//   Col,
//   Spinner,
//   Alert,
//   Image,
// } from "react-bootstrap";
// import { ArrowDownUp } from "react-bootstrap-icons";
// import api from "../../api";

// const WorkersTable = () => {
//   const [workers, setWorkers] = useState([]);
//   const [filteredWorkers, setFilteredWorkers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sortField, setSortField] = useState(null);
//   const [sortAsc, setSortAsc] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch workers
//   const fetchWorkers = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/workers");
//       setWorkers(response.data);
//       setFilteredWorkers(response.data);
//     } catch (err) {
//       console.error("Error fetching workers:", err);
//       setError("Failed to load workers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWorkers();
//   }, []);

//   // Approve worker
//   const handleApprove = async (worker) => {
//     try {
//      let res=  await api.patch(`/auth/${worker._id}/approve`);
//      console.log(res);
     
//       fetchWorkers();
//     } catch (err) {
//       console.error("Error approving worker:", err);
//       alert("Failed to approve worker.");
//     }
//   };

//   // Reject worker
//   const handleReject = async (worker) => {
//     try {
//       await api.patch(`/auth/${worker._id}/status`, { status: "rejected" });
//       fetchWorkers();
//     } catch (err) {
//       console.error("Error rejecting worker:", err);
//       alert("Failed to reject worker.");
//     }
//   };

//   // Sorting
//   const handleSort = (field) => {
//     const isAsc = sortField === field ? !sortAsc : true;
//     const sorted = [...filteredWorkers].sort((a, b) => {
//       if (a[field] < b[field]) return isAsc ? -1 : 1;
//       if (a[field] > b[field]) return isAsc ? 1 : -1;
//       return 0;
//     });
//     setSortField(field);
//     setSortAsc(isAsc);
//     setFilteredWorkers(sorted);
//   };

//   // Searching
//   useEffect(() => {
//     const filtered = workers.filter((w) =>
//       [
//         w.name,
//         w.jobTitle,
//         w.skill,
//         w.email,
//         w.phone,
//         w.gender,
//         w.aadhaarNumber,
//         w.permanentAddress,
//         w.temporaryAddress,
//       ]
//         .join(" ")
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//     setFilteredWorkers(filtered);
//   }, [search, workers]);

//   if (loading) {
//     return (
//       <Container className="text-center my-5">
//         <Spinner animation="border" />
//         <p className="mt-3">Loading workers...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="my-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-4">
//       <Row className="mb-3 align-items-center">
//         <Col>
//           <h3 className="fw-semibold">All Workers</h3>
//         </Col>
//         <Col md="4">
//           <InputGroup>
//             <Form.Control
//               placeholder="Search workers..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </InputGroup>
//         </Col>
//       </Row>

//       <Table striped bordered hover responsive>
//         <thead className="table-light">
//           <tr>
//             <th>Photo</th>
//             <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
//               Name <ArrowDownUp size={14} />
//             </th>
//             <th onClick={() => handleSort("jobTitle")} style={{ cursor: "pointer" }}>
//               Job Title <ArrowDownUp size={14} />
//             </th>
//             <th>Skill</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Gender</th>
//             <th>Aadhaar</th>
//             <th>Permanent Address</th>
//             <th>Temporary Address</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredWorkers.length > 0 ? (
//             filteredWorkers.map((worker) => (
//               <tr key={worker._id}>
//                 <td>
//                   {worker.image ? (
//                     <Image
//                       src={worker.image}
//                       alt={worker.name}
//                       roundedCircle
//                       width={45}
//                       height={45}
//                     />
//                   ) : (
//                     <div
//                       className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-circle"
//                       style={{ width: 45, height: 45 }}
//                     >
//                       {worker.name ? worker.name.charAt(0).toUpperCase() : "?"}
//                     </div>
//                   )}
//                 </td>
//                 <td>{worker.name}</td>
//                 <td>{worker.jobTitle}</td>
//                 <td>{worker.skill}</td>
//                 <td>{worker.email}</td>
//                 <td>{worker.phone}</td>
//                 <td>{worker.gender}</td>
//                 <td>{worker.aadhaarNumber}</td>
//                 <td>{worker.permanentAddress}</td>
//                 <td>{worker.temporaryAddress}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       worker.commonKey.status === "approved"
//                         ? "bg-success"
//                         : worker.status === "rejected"
//                         ? "bg-danger"
//                         : "bg-secondary"
//                     }`}
//                   >
//                     {worker.status || "Pending"}
//                   </span>
//                 </td>
//                 <td className="d-flex gap-2">
//                   <Button
//                     size="sm"
//                     variant="success"
//                     onClick={() => handleApprove(worker)}
//                     disabled={worker.status === "approved"}
//                   >
//                     Approve
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="danger"
//                     onClick={() => handleReject(worker)}
//                     disabled={worker.status === "rejected"}
//                   >
//                     Reject
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={12} className="text-center text-muted">
//                 No workers found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default WorkersTable;
// import React, { useEffect, useState } from "react";
// import api from "../../api";
// import {
//   Table,
//   Button,
//   Form,
//   InputGroup,
//   Container,
//   Row,
//   Col,
//   Spinner,
//   Alert,
//   Image,
// } from "react-bootstrap";
// import { ArrowDownUp } from "react-bootstrap-icons";

// const WorkersTable = () => {
//   const [workers, setWorkers] = useState([]);
//   const [filteredWorkers, setFilteredWorkers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sortField, setSortField] = useState(null);
//   const [sortAsc, setSortAsc] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch workers
//   const fetchWorkers = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/workers");
//       console.log(response,'llllllll');
      
//       setWorkers(response.data);
//       setFilteredWorkers(response.data);
//     } catch (err) {
//       console.error("Error fetching workers:", err);
//       setError("Failed to load workers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWorkers();
//   }, []);

//   // Approve worker (set verify = true)
//   const handleApprove = async (worker) => {
//     try {
//    let res=   await api.patch(`/auth/${worker._id}/verify`, { verify: true });
//    console.log('res',res);
   
//       fetchWorkers();
//     } catch (err) {
//       console.error("Error approving worker:", err);
//       alert("Failed to approve worker.");
//     }
//   };

//   // Reject worker (set verify = false)
//   const handleReject = async (worker) => {
//     try {
//      let res= await api.patch(`/auth/${worker._id}/verify`, { verify: false });
//    console.log('rej',res);

//       fetchWorkers();
//     } catch (err) {
//       console.error("Error rejecting worker:", err);
//       alert("Failed to reject worker.");
//     }
//   };

//   // Sorting
//   const handleSort = (field) => {
//     const isAsc = sortField === field ? !sortAsc : true;
//     const sorted = [...filteredWorkers].sort((a, b) => {
//       if (a[field] < b[field]) return isAsc ? -1 : 1;
//       if (a[field] > b[field]) return isAsc ? 1 : -1;
//       return 0;
//     });
//     setSortField(field);
//     setSortAsc(isAsc);
//     setFilteredWorkers(sorted);
//   };

//   // Searching
//   useEffect(() => {
//     const filtered = workers.filter((w) =>
//       [
//         w.name,
//         w.jobTitle,
//         w.skill,
//         w.email,
//         w.phone,
//         w.gender,
//         w.aadhaarNumber,
//         w.permanentAddress,
//         w.temporaryAddress,
//       ]
//         .join(" ")
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//     setFilteredWorkers(filtered);
//   }, [search, workers]);

//   if (loading) {
//     return (
//       <Container className="text-center my-5">
//         <Spinner animation="border" />
//         <p className="mt-3">Loading workers...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="my-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-4">
//       <Row className="mb-3 align-items-center">
//         <Col>
//           <h3 className="fw-semibold">All Workers</h3>
//         </Col>
//         <Col md="4">
//           <InputGroup>
//             <Form.Control
//               placeholder="Search workers..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </InputGroup>
//         </Col>
//       </Row>

//       <Table striped bordered hover responsive>
//         <thead className="table-light">
//           <tr>
//             <th>Photo</th>
//             <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
//               Name <ArrowDownUp size={14} />
//             </th>
//             <th onClick={() => handleSort("jobTitle")} style={{ cursor: "pointer" }}>
//               Job Title <ArrowDownUp size={14} />
//             </th>
//             <th>Skill</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Gender</th>
//             <th>Aadhaar</th>
//             <th>Permanent Address</th>
//             <th>Temporary Address</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredWorkers.length > 0 ? (
//             filteredWorkers.map((worker) => (
//               <tr key={worker._id}>
//                 <td>
//                   {worker.image ? (
//                     <Image
//                       src={`http://localhost:8000/uploads/worker.image`}
//                       alt={worker.name}
//                       roundedCircle
//                       width={45}
//                       height={45}
//                     />
//                   ) : (
//                     <div
//                       className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-circle"
//                       style={{ width: 45, height: 45 }}
//                     >
//                       {worker.name ? worker.name.charAt(0).toUpperCase() : "?"}
//                     </div>
//                   )}
//                 </td>
//                 <td>{worker.name}</td>
//                 <td>{worker.jobTitle}</td>
//                 <td>{worker.skill}</td>
//                 <td>{worker.email}</td>
//                 <td>{worker.phone}</td>
//                 <td>{worker.gender}</td>
//                 <td>{worker.aadhaarNumber}</td>
//                 <td>{worker.permanentAddress}</td>
//                 <td>{worker.temporaryAddress}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       worker.commonKey.verify === true
//                         ? "bg-success"
//                         : worker.commonKey.verify === false
//                         ? "bg-danger"
//                         : "bg-secondary"
//                     }`}
//                   >
//                     {worker.commonKey.verify === true
//                       ? "Approved"
//                       : worker.commonKey.verify === false
//                       ? "Rejected"
//                       : "Pending"}
//                   </span>
//                 </td>
//                 <td className="d-flex gap-2">
//                   <Button
//                     size="sm"
//                     variant="success"
//                     onClick={() => handleApprove(worker)}
//                     disabled={worker.commonKey.verify === true}
//                   >
//                     Approve
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="danger"
//                     onClick={() => handleReject(worker)}
//                     disabled={worker.commonKey.verify === false}
//                   >
//                     Reject
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={12} className="text-center text-muted">
//                 No workers found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default WorkersTable;
import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  Table,
  Button,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Image,
} from "react-bootstrap";
import { ArrowDownUp } from "react-bootstrap-icons";

const WorkersTable = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch workers
  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/workers");
      setWorkers(response.data);
      setFilteredWorkers(response.data);
    } catch (err) {
      console.error("Error fetching workers:", err);
      setError("Failed to load workers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  // Approve worker (set verify = true)
  const handleApprove = async (worker) => {
    try {
      await api.patch(`/auth/${worker._id}/verify`, { verify: true });
      fetchWorkers();
    } catch (err) {
      console.error("Error approving worker:", err);
      alert("Failed to approve worker.");
    }
  };

  // Reject worker (set verify = false)
  const handleReject = async (worker) => {
    try {
      await api.patch(`/auth/${worker._id}/verify`, { verify: false });
      fetchWorkers();
    } catch (err) {
      console.error("Error rejecting worker:", err);
      alert("Failed to reject worker.");
    }
  };

  // Sorting
  const handleSort = (field) => {
    const isAsc = sortField === field ? !sortAsc : true;
    const sorted = [...filteredWorkers].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });
    setSortField(field);
    setSortAsc(isAsc);
    setFilteredWorkers(sorted);
  };

  // Searching
  useEffect(() => {
    const filtered = workers.filter((w) =>
      [
        w.name,
        w.jobTitle,
        w.skill,
        w.email,
        w.phone,
        w.gender,
        w.aadhaarNumber,
        w.permanentAddress,
        w.temporaryAddress,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredWorkers(filtered);
  }, [search, workers]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading workers...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h3 className="fw-semibold">All Workers</h3>
        </Col>
        <Col md="4">
          <InputGroup>
            <Form.Control
              placeholder="Search workers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>Photo</th>
            <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
              Name <ArrowDownUp size={14} />
            </th>
            <th onClick={() => handleSort("jobTitle")} style={{ cursor: "pointer" }}>
              Job Title <ArrowDownUp size={14} />
            </th>
            {/* <th>Skill</th> */}
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            {/* <th>Aadhaar</th>
            <th>Permanent Address</th>
            <th>Temporary Address</th> */}
            <th>Clearance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <tr key={worker._id}>
                <td>
                  {worker.image ? (
                    <Image
                      src={`http://localhost:8000/uploads/${worker.image}`}
                      alt={worker.name}
                      roundedCircle
                      width={45}
                      height={45}
                    />
                  ) : (
                    <div
                      className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-circle"
                      style={{ width: 45, height: 45 }}
                    >
                      {worker.name ? worker.name.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
                </td>
                <td>{worker.name}</td>
                <td>{worker.jobTitle}</td>
                {/* <td>{worker.skill}</td> */}
                <td>{worker.email}</td>
                <td>{worker.phone}</td>
                <td>{worker.gender}</td>
                {/* <td>{worker.aadhaarNumber}</td>
                <td>{worker.permanentAddress}</td>
                <td>{worker.temporaryAddress}</td> */}

                {/* ✅ New Clearance Certificate Section */}
                <td>
                  {worker.clearanceStatus === "Completed" ? (
                    <a
                      href={`http://localhost:8000/uploads/${worker.clearanceCertificate}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-primary fw-semibold"
                    >
                      View Certificate
                    </a>
                  ) : (
                    <span className="text-muted">{worker.clearanceStatus}</span>
                  )}
                </td>

                <td>
                  <span
                    className={`badge ${
                      worker.commonKey.verify === true
                        ? "bg-success"
                        : worker.commonKey.verify === false
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {worker.commonKey.verify === true
                      ? "Approved"
                      : worker.commonKey.verify === false
                      ? "Rejected"
                      : "Pending"}
                  </span>
                </td>

                <td className="d-flex gap-2">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleApprove(worker)}
                    disabled={worker.commonKey.verify === true}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleReject(worker)}
                    disabled={worker.commonKey.verify === false}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={13} className="text-center text-muted">
                No workers found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default WorkersTable;
