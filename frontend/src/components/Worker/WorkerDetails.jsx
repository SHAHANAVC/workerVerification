// /src/components/Worker/WorkerDetails.jsx
import React from "react";

export default function WorkerDetails() {
  const worker = {
    name: "Chottah Suren",
    fatherName: "Mohan Suren",
    dob: "1990-05-12",
    gender: "Male",
    maritalStatus: "Married",
    nationality: "Indian",
    state: "Kerala",
    district: "Ernakulam",
    address: "123, Coconut Street, Kochi, Kerala",
    contact: "+91 9876543210",
    email: "suren@example.com",
    aadhaar: "XXXX-XXXX-1234",
    pan: "ABCDE1234F",
    verified: true,
    blockchainHash: "0x8f3a2bc9...12a",

    // Work & Skills
    role: "Skilled Coconut Tree Climber",
    skills: ["Tree Climbing", "Harvesting", "Masonry"],
    experience: "10+ Years",
    languages: ["Malayalam", "Hindi", "English"],

    // Employment History
    jobsCompleted: 120,
    contractorsWorkedWith: 15,
    lastEmployer: "Thomas & Sons Construction",

    // Training & Certificates
    certificates: ["Safety Training Certificate", "PCC Verified"],

    // Emergency Contact
    emergencyContact: {
      name: "Anitha Suren",
      relation: "Wife",
      phone: "+91 9876501234",
    },
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">📄 Worker Complete Bio-Data</h2>

      <div className="card p-4 shadow-sm">
        {/* Personal Info */}
        <h4 className="mb-3">👤 Personal Information</h4>
        <p><strong>Full Name:</strong> {worker.name}</p>
        <p><strong>Father’s Name:</strong> {worker.fatherName}</p>
        <p><strong>Date of Birth:</strong> {worker.dob}</p>
        <p><strong>Gender:</strong> {worker.gender}</p>
        <p><strong>Marital Status:</strong> {worker.maritalStatus}</p>
        <p><strong>Nationality:</strong> {worker.nationality}</p>
        <p><strong>State:</strong> {worker.state}</p>
        <p><strong>District:</strong> {worker.district}</p>
        <p><strong>Address:</strong> {worker.address}</p>

        <hr />

        {/* Contact Info */}
        <h4 className="mb-3">📞 Contact Information</h4>
        <p><strong>Phone:</strong> {worker.contact}</p>
        <p><strong>Email:</strong> {worker.email}</p>

        <hr />

        {/* Documents */}
        <h4 className="mb-3">📑 Identification</h4>
        <p><strong>Aadhaar:</strong> {worker.aadhaar}</p>
        <p><strong>PAN:</strong> {worker.pan}</p>
        <p>
          <strong>Blockchain Verification Hash:</strong>{" "}
          <span className="text-muted">{worker.blockchainHash}</span>
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`badge ${worker.verified ? "bg-success" : "bg-warning text-dark"}`}>
            {worker.verified ? "✅ Verified" : "⏳ Pending"}
          </span>
        </p>

        <hr />

        {/* Skills & Work */}
        <h4 className="mb-3">🛠️ Skills & Work</h4>
        <p><strong>Role:</strong> {worker.role}</p>
        <p><strong>Skills:</strong> {worker.skills.join(", ")}</p>
        <p><strong>Experience:</strong> {worker.experience}</p>
        <p><strong>Languages:</strong> {worker.languages.join(", ")}</p>

        <hr />

        {/* Employment History */}
        <h4 className="mb-3">📊 Employment Summary</h4>
        <p><strong>Jobs Completed:</strong> {worker.jobsCompleted}</p>
        <p><strong>Contractors Worked With:</strong> {worker.contractorsWorkedWith}</p>
        <p><strong>Last Employer:</strong> {worker.lastEmployer}</p>

        <hr />

        {/* Certificates */}
        <h4 className="mb-3">🎓 Training & Certificates</h4>
        <ul>
          {worker.certificates.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>

        <hr />

        {/* Emergency Contact */}
        <h4 className="mb-3">🚨 Emergency Contact</h4>
        <p><strong>Name:</strong> {worker.emergencyContact.name}</p>
        <p><strong>Relation:</strong> {worker.emergencyContact.relation}</p>
        <p><strong>Phone:</strong> {worker.emergencyContact.phone}</p>
      </div>
    </div>
  );
}
