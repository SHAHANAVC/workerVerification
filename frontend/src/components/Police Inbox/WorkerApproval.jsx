// import React, { useEffect, useState } from "react";
// import { Table, Button, Modal, Form, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
// import api from "../../api"; // your axios instance

// export default function WorkerList() {
//   const [workers, setWorkers] = useState([]);
//   const [filteredWorkers, setFilteredWorkers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedWorker, setSelectedWorker] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Fetch all workers
//   const fetchWorkers = async () => {
//     try {
//       setLoading(true);
//       setError("");
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

//   // Approve worker and upload certificate
//   const handleApprove = async () => {
//     if (!selectedFile) {
//       alert("Please select a clearance certificate file.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       const formData = new FormData();
//       formData.append("image", selectedFile);

//       const response = await api.put(
//         `/workers/${selectedWorker._id}/pcc`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       // Update state for that worker
//       const updateWorkerState = (w) =>
//         w._id === selectedWorker._id
//           ? {
//               ...w,
//               clearanceStatus: "Completed",
//               clearanceCertificate: response.data.clearanceCertificate,
//             }
//           : w;

//       setWorkers((prev) => prev.map(updateWorkerState));
//       setFilteredWorkers((prev) => prev.map(updateWorkerState));

//       // Reset modal
//       setShowModal(false);
//       setSelectedWorker(null);
//       setSelectedFile(null);
//     } catch (err) {
//       console.error("Error approving worker:", err);
//       setError("Failed to approve worker");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filters
//   const showAll = () => setFilteredWorkers(workers);
//   const showPending = () => setFilteredWorkers(workers.filter((w) => w.clearanceStatus === "Pending"));
//   const showCompleted = () => setFilteredWorkers(workers.filter((w) => w.clearanceStatus === "Completed"));

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Worker Clearance Management</h2>

//       {/* Display error if exists */}
//       {error && <Alert variant="danger">{error}</Alert>}

//       {/* Loading spinner */}
//       {loading && (
//         <div className="text-center my-3">
//           <Spinner animation="border" />
//         </div>
//       )}

//       {/* Filter Buttons */}
//       <Row className="mb-3 justify-content-center">
//         <Col xs="auto">
//           <Button variant="secondary" onClick={showAll}>All</Button>
//         </Col>
//         <Col xs="auto">
//           <Button variant="warning" onClick={showPending}>Pending</Button>
//         </Col>
//         <Col xs="auto">
//           <Button variant="success" onClick={showCompleted}>Completed</Button>
//         </Col>
//       </Row>

//       {/* Worker Table */}
//       <Table striped bordered hover responsive className="text-center align-middle">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Job</th>
//             <th>Skill</th>
//             <th>Email</th>
//             <th>Status</th>
//             <th>Certificate</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredWorkers.map((worker) => (
//             <tr key={worker._id}>
//               <td>{worker.name}</td>
//               <td>{worker.jobTitle}</td>
//               <td>{worker.skill}</td>
//               <td>{worker.email}</td>
//               <td>
//                 <span
//                   className={`badge ${
//                     worker.clearanceStatus === "Pending" ? "bg-warning text-dark" : "bg-success"
//                   }`}
//                 >
//                   {worker.clearanceStatus}
//                 </span>
//               </td>
//               <td>
//                 {worker.clearanceCertificate ? (
//                   <a
//                     href={`http://localhost:8000/uploads/${worker.clearanceCertificate}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-decoration-none"
//                   >
//                     View
//                   </a>
//                 ) : (
//                   "-"
//                 )}
//               </td>
//               <td>
//                 {worker.clearanceStatus === "Pending" ? (
//                   <Button
//                     variant="primary"
//                     onClick={() => {
//                       setSelectedWorker(worker);
//                       setShowModal(true);
//                     }}
//                   >
//                     Approve
//                   </Button>
//                 ) : (
//                   <span>✅ Done</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal for Certificate Upload */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Approve Worker</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             Approving <strong>{selectedWorker?.name}</strong> — please upload the clearance certificate.
//           </p>
//           <Form.Group>
//             <Form.Label>Upload Certificate</Form.Label>
//             <Form.Control
//               type="file"
//               accept=".pdf,.jpg,.jpeg,.png"
//               onChange={(e) => setSelectedFile(e.target.files[0])}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleApprove}>
//             Approve & Upload
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }


import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Spinner, Alert, Container, Row, Col, Image } from "react-bootstrap";
import api from "../../api";

export default function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // 👈 new modal for viewing details

  // Fetch workers
  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/workers");
      setWorkers(response.data);
      setFilteredWorkers(response.data);
    } catch (err) {
      setError("Failed to load workers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  // Approve worker
  const handleApprove = async () => {
    if (!selectedFile) {
      alert("Please select a clearance certificate file.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await api.put(
        `/workers/${selectedWorker._id}/pcc`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const updateWorkerState = (w) =>
        w._id === selectedWorker._id
          ? {
              ...w,
              clearanceStatus: "Completed",
              clearanceCertificate: response.data.clearanceCertificate,
            }
          : w;

      setWorkers((prev) => prev.map(updateWorkerState));
      setFilteredWorkers((prev) => prev.map(updateWorkerState));
      setShowModal(false);
      setSelectedWorker(null);
      setSelectedFile(null);
    } catch {
      setError("Failed to approve worker");
    } finally {
      setLoading(false);
    }
  };

  // Filters
  const showAll = () => setFilteredWorkers(workers);
  const showPending = () => setFilteredWorkers(workers.filter((w) => w.clearanceStatus === "Pending"));
  const showCompleted = () => setFilteredWorkers(workers.filter((w) => w.clearanceStatus === "Completed"));

  return (
    <Container className="mt-4">
      <h3 className="text-center fw-bold mb-4 text-primary">Worker Clearance Management</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <Button variant="secondary" onClick={showAll}>All</Button>
        <Button variant="warning" onClick={showPending}>Pending</Button>
        <Button variant="success" onClick={showCompleted}>Completed</Button>
      </div>

      {/* Worker Table */}
      <div className="table-responsive shadow-sm rounded">
        <Table bordered hover className="text-center align-middle bg-white">
          <thead className="table-primary text-dark">
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Skill</th>
              <th>Email</th>
              <th>Status</th>
              <th>Certificate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.map((worker) => (
              <tr key={worker._id}>
                <td>{worker.name}</td>
                <td>{worker.jobTitle}</td>
                <td>{worker.skill}</td>
                <td>{worker.email}</td>
                <td>
                  <span
                    className={`badge rounded-pill px-3 py-2 ${
                      worker.clearanceStatus === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {worker.clearanceStatus}
                  </span>
                </td>
                <td>
                  {worker.clearanceCertificate ? (
                    <a
                      href={`http://localhost:8000/uploads/${worker.clearanceCertificate}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none fw-semibold text-primary"
                    >
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => {
                        setSelectedWorker(worker);
                        setShowDetails(true);
                      }}
                    >
                      View
                    </Button>

                    {worker.clearanceStatus === "Pending" ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedWorker(worker);
                          setShowModal(true);
                        }}
                      >
                        Approve
                      </Button>
                    ) : (
                      <span className="text-success fw-bold">✅ Done</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Approve Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Approve Worker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Approving <strong>{selectedWorker?.name}</strong> — please upload the clearance certificate.
          </p>
          <Form.Group>
            <Form.Label>Upload Certificate</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleApprove}>
            Approve & Upload
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Details Modal */}
      <Modal
        show={showDetails}
        onHide={() => setShowDetails(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Worker Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedWorker && (
            <Container>
              <Row className="align-items-center">
                <Col md={4} className="text-center">
                  {selectedWorker.image ? (
                    <Image
                      src={`http://localhost:8000/uploads/${selectedWorker.image}`}
                      roundedCircle
                      fluid
                      alt="Worker"
                      className="border border-3 border-primary p-1"
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center bg-light border rounded-circle mx-auto"
                      style={{ width: "150px", height: "150px" }}
                    >
                      <span className="text-secondary">No Image</span>
                    </div>
                  )}
                </Col>
                <Col md={8}>
                  <h5 className="fw-bold mb-3">{selectedWorker.name}</h5>
                  <p className="mb-1"><strong>Job Title:</strong> {selectedWorker.jobTitle}</p>
                  <p className="mb-1"><strong>Skill:</strong> {selectedWorker.skill}</p>
                  <p className="mb-1"><strong>Gender:</strong> {selectedWorker.gender}</p>
                  <p className="mb-1"><strong>Email:</strong> {selectedWorker.email}</p>
                  <p className="mb-1"><strong>Phone:</strong> {selectedWorker.phone}</p>
                  <p className="mb-1"><strong>Aadhaar Number:</strong> {selectedWorker.aadhaarNumber}</p>
                  <p className="mb-1"><strong>Permanent Address:</strong> {selectedWorker.permanentAddress}</p>
                  <p className="mb-1"><strong>Temporary Address:</strong> {selectedWorker.temporaryAddress}</p>
                  <p className="mb-1"><strong>Status:</strong>{" "}
                    <span className={`badge ${
                      selectedWorker.clearanceStatus === "Completed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}>
                      {selectedWorker.clearanceStatus}
                    </span>
                  </p>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
