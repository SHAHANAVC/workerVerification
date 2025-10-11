import React, { useState } from "react";
import "./WorkerApproval.css";

const dummyWorker = {
  id: "W12345",
  name: "Chottah Suren",
  role: "Skilled Coconut Tree Climber",
  location: "Kochi, Kerala",
  contact: "+91 9876543210",
  aadhaar: "1234-5678-9012",
  dob: "1990-05-12",
  gender: "Male",
  workHistory: [
    { company: "Coconut Farms Pvt Ltd", duration: "6 months", rating: "Excellent" },
    { company: "Kerala Tree Services", duration: "1 year", rating: "Good" },
  ],
  status: "Pending",
};

export default function WorkerDetail() {
  const [status, setStatus] = useState(dummyWorker.status);
  const [pccFile, setPccFile] = useState(null);

  const handleApprove = () => {
    setStatus("Approved");
  };

  const handleDecline = () => {
    setStatus("Declined");
  };

  const handleFileChange = (e) => {
    setPccFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (pccFile) {
      alert(`Police Clearance Certificate uploaded: ${pccFile.name}`);
      // Here you can integrate blockchain/storage logic
    }
  };

  return (
    <div className="worker-detail-container">
      <h2>Worker Profile Verification</h2>

      <div className="worker-card">
        <h3>{dummyWorker.name}</h3>
        <p><strong>Worker ID:</strong> {dummyWorker.id}</p>
        <p><strong>Role:</strong> {dummyWorker.role}</p>
        <p><strong>Location:</strong> {dummyWorker.location}</p>
        <p><strong>Contact:</strong> {dummyWorker.contact}</p>
        <p><strong>Aadhaar:</strong> {dummyWorker.aadhaar}</p>
        <p><strong>DOB:</strong> {dummyWorker.dob}</p>
        <p><strong>Gender:</strong> {dummyWorker.gender}</p>
        <p><strong>Status:</strong> {status}</p>

        <div className="work-history">
          <h4>Work History</h4>
          {dummyWorker.workHistory.map((job, index) => (
            <div key={index} className="job">
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Duration:</strong> {job.duration}</p>
              <p><strong>Rating:</strong> {job.rating}</p>
            </div>
          ))}
        </div>

        <div className="verification-buttons">
          {status === "Pending" && (
            <>
              <button className="approve-btn" onClick={handleApprove}>Approve</button>
              <button className="decline-btn" onClick={handleDecline}>Decline</button>
            </>
          )}
        </div>

        {status === "Approved" && (
          <div className="pcc-upload">
            <h4>Upload Police Clearance Certificate</h4>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} className="upload-btn">Upload PCC</button>
          </div>
        )}
      </div>
    </div>
  );
}
