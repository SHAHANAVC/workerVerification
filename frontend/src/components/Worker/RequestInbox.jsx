import { useState } from "react";

export default function RequestInbox() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      from: "Rajesh Contractor",
      role: "Building Contractor",
      date: "2025-09-29",
      location: "Ernakulam, Kerala",
    },
    {
      id: 2,
      from: "Sita Nair",
      role: "Farm Owner",
      date: "2025-09-28",
      location: "Alappuzha, Kerala",
    },
    {
      id: 3,
      from: "Thomas & Sons",
      role: "Construction Firm",
      date: "2025-09-27",
      location: "Kollam, Kerala",
    },
  ]);

  // Handle Accept / Decline
  const handleAction = (id, action) => {
    alert(`Request ${id} has been ${action}`);
    setRequests((prev) => prev.filter((req) => req.id !== id)); // remove after action
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">📥 Request Inbox</h3>

      {requests.length === 0 ? (
        <div className="alert alert-info">No new hiring requests.</div>
      ) : (
        <div className="list-group">
          {requests.map((req) => (
            <div
              key={req.id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center flex-wrap mb-2 shadow-sm"
            >
              <div className="me-3">
                <h5 className="mb-1">{req.from}</h5>
                <p className="mb-1 text-muted">{req.role}</p>
                <small className="text-secondary">
                  📅 {req.date} | 📍 {req.location}
                </small>
              </div>
              <div>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleAction(req.id, "accepted")}
                >
                  ✅ Accept
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleAction(req.id, "declined")}
                >
                  ❌ Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
