// /src/components/Worker/WorkerFeedback.jsx
import { useState } from "react";

export default function WorkerFeedback() {
  // Sample feedback data (replace later with API data)
  const [feedbackList] = useState([
    {
      id: 1,
      from: "Rajesh Contractor",
      date: "2025-09-20",
      comment: "Excellent work! Very professional and reliable.",
    },
    {
      id: 2,
      from: "Sita Nair",
      date: "2025-09-18",
      comment: "Good work overall, completed the job on time.",
    },
    {
      id: 3,
      from: "Thomas & Sons",
      date: "2025-09-15",
      comment: "Average experience. Needs improvement in punctuality.",
    },
  ]);

  return (
    <div className="container py-4">
      <h3 className="mb-4">📝 Feedback Received</h3>

      {feedbackList.length === 0 ? (
        <div className="alert alert-info">No feedback received yet.</div>
      ) : (
        <div>
          {feedbackList.map((fb) => (
            <div key={fb.id} className="card p-3 mb-3 shadow-sm">
              <p className="mb-2">{fb.comment}</p>
              <small className="text-muted">
                — {fb.from}, {fb.date}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
