// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./PoliceDashboard.css";
// import WorkerList from "./WorkerApproval";

// export default function PoliceDashboard() {
//   const navigate = useNavigate();

//   return (
//     <div className="police-dashboard-container">
//       <h2>Police Module</h2>
//       {/* <div className="options-container">
//         <div
//           className="option-card"
//           onClick={() => navigate("/Workeraprove")}
//         >
//           <h3>Verification of Worker</h3>
//           <p>View and verify pending worker requests</p>
//         </div>
//         <div
//           className="option-card"
//           onClick={() => navigate("/police/search")}
//         >
//           <h3>Search Worker</h3>
//           <p>Look up a worker manually by ID or name</p>
//         </div>
//       </div> */}
//       <WorkerList/>
//     </div>
//   );
// }
import React from "react";
import "./PoliceDashboard.css";
import WorkerList from "./WorkerApproval";

export default function PoliceDashboard() {
  return (
    <div className="police-dashboard">
      {/* Header */}
      <div className="dashboard-header text-center py-4 mb-4 text-white">
        <h2 className="fw-bold">Police Module</h2>
        <p className="mb-0">Worker Clearance Management System</p>
      </div>

      {/* Worker Management Section */}
      <div className="container">
        <div className="card shadow-lg border-0 rounded-4 mb-5">
          <div className="card-body p-4">
            <WorkerList />
          </div>
        </div>
      </div>
    </div>
  );
}
