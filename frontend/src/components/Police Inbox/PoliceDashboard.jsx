import React from "react";
import { useNavigate } from "react-router-dom";
import "./PoliceDashboard.css";

export default function PoliceDashboard() {
  const navigate = useNavigate();

  return (
    <div className="police-dashboard-container">
      <h2>Police Module</h2>
      <div className="options-container">
        <div
          className="option-card"
          onClick={() => navigate("/police/verification")}
        >
          <h3>Verification of Worker</h3>
          <p>View and verify pending worker requests</p>
        </div>
        <div
          className="option-card"
          onClick={() => navigate("/police/search")}
        >
          <h3>Search Worker</h3>
          <p>Look up a worker manually by ID or name</p>
        </div>
      </div>
    </div>
  );
}
