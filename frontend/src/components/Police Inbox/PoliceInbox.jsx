import React, { useState } from "react";
import "./PoliceInbox.css";

export default function PoliceVerification() {
  const [searchId, setSearchId] = useState("");
  const [worker, setWorker] = useState(null);

  const handleSearch = () => {
    const foundWorker = dummyWorkers.find((w) => w.id === searchId);
    setWorker(foundWorker || null);
  };

  return (
    <div className="police-verification-container">
      <h2>Verify Worker Profile</h2>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter Worker ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {worker ? (
        <div className="worker-card">
          <h3>{worker.name}</h3>
          <p><strong>Worker ID:</strong> {worker.id}</p>
          <p><strong>Role:</strong> {worker.role}</p>
          <p><strong>Location:</strong> {worker.location}</p>
          <p><strong>Contact:</strong> {worker.contact}</p>
          <p><strong>Status:</strong> {worker.status}</p>
          <div className="verification-buttons">
            <button className="accept-btn">Accept</button>
            <button className="decline-btn">Decline</button>
          </div>
        </div>
      ) : searchId ? (
        <p className="no-worker">No worker found with this ID.</p>
      ) : null}
    </div>
  );
}
