import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import api from "../../api"; // your axios instance

export default function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch all workers
  const fetchWorkers = async () => {
    try {
      setLoading(true);
      setError("");
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

  // Approve worker and upload certificate
  const handleApprove = async () => {
    if (!selectedFile) {
      alert("Please select a clearance certificate file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await api.put(
        `/workers/${selectedWorker._id}/pcc`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update state for that worker
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

      // Reset modal
      setShowModal(false);
      setSelectedWorker(null);
      setSelectedFile(null);
    } catch (err) {
      console.error("Error approving worker:", err);
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
      <h2 className="text-center mb-4">Worker Clearance Management</h2>

      {/* Display error if exists */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading spinner */}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      {/* Filter Buttons */}
      <Row className="mb-3 justify-content-center">
        <Col xs="auto">
          <Button variant="secondary" onClick={showAll}>All</Button>
        </Col>
        <Col xs="auto">
          <Button variant="warning" onClick={showPending}>Pending</Button>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={showCompleted}>Completed</Button>
        </Col>
      </Row>

      {/* Worker Table */}
      <Table striped bordered hover responsive className="text-center align-middle">
        <thead>
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
                  className={`badge ${
                    worker.clearanceStatus === "Pending" ? "bg-warning text-dark" : "bg-success"
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
                    className="text-decoration-none"
                  >
                    View
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {worker.clearanceStatus === "Pending" ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedWorker(worker);
                      setShowModal(true);
                    }}
                  >
                    Approve
                  </Button>
                ) : (
                  <span>✅ Done</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Certificate Upload */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
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
    </Container>
  );
}
