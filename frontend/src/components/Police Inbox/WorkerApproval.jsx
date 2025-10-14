import React, { useEffect, useState } from "react";
// import api from "../api"; // your axios instance (see below)
import "./WorkerApproval.css";
import api from "../../api";

export default function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch all workers from backend
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

  // ✅ Approve Worker (example)
  const handleApprove = async (workerId) => {
    try {
      const response = await api.put(`/workers/${workerId}/approve`);
      setWorkers((prev) =>
        prev.map((w) =>
          w._id === workerId ? { ...w, clearanceStatus: "Completed" } : w
        )
      );
      setFilteredWorkers((prev) =>
        prev.map((w) =>
          w._id === workerId ? { ...w, clearanceStatus: "Completed" } : w
        )
      );
      alert(response.data.message || "Worker approved successfully!");
    } catch (err) {
      console.error("Error approving worker:", err);
      setError("Failed to approve worker");
    }
  };

  // ✅ Filter pending workers
  const showPending = () => {
    setFilteredWorkers(workers.filter((w) => w.clearanceStatus === "Pending"));
  };

  // ✅ Filter completed workers
  const showCompleted = () => {
    setFilteredWorkers(workers.filter((w) => w.clearanceStatus === "Completed"));
  };

  // ✅ Reset filter
  const showAll = () => setFilteredWorkers(workers);

  if (loading) return <p>Loading workers...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="worker-list-container">
      <h2>Worker Clearance Management</h2>

      <div className="filter-buttons">
        <button onClick={showAll}>All</button>
        <button onClick={showPending}>Pending</button>
        <button onClick={showCompleted}>Completed</button>
      </div>

      <table className="worker-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Skill</th>
            <th>Email</th>
            <th>Status</th>
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
              <td>{worker.clearanceStatus}</td>
              <td>
                {worker.clearanceStatus === "Pending" ? (
                  <button
                    onClick={() => handleApprove(worker._id)}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                ) : (
                  "✅ Completed"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
