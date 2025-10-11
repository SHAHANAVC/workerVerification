import React from "react";
import "./WorkerHistory.css";

export default function WorkerHistory() {
  const WorkerHistory = [
    {
      location: "Kochi, Kerala",
      contractor: "Metro Construction Ltd.",
      date: "2025-05-10",
      duration: "15 days",
      rating: 4.5,
    },
    {
      location: "Thrissur, Kerala",
      contractor: "Green Builders",
      date: "2024-12-01",
      duration: "1 month",
      rating: 4.2,
    },
    {
      location: "Patna, Bihar",
      contractor: "Urban Infra Pvt Ltd.",
      date: "2024-06-15",
      duration: "20 days",
      rating: 4.8,
    },
  ];

  return (
    <div className="profile-container">
      <main className="main-content">
        <h2>Work History</h2>
        <table className="work-history-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Contractor</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {WorkerHistory.map((work, index) => (
              <tr key={index}>
                <td>{work.location}</td>
                <td>{work.contractor}</td>
                <td>{work.date}</td>
                <td>{work.duration}</td>
                <td>{work.rating} ⭐</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
