// import './WorkerProfile.css';

// export default function WorkerProfile() {
//   const worker = {
//     name: "Chottah Suren",
//     role: "Skilled Coconut Tree Climber",
//     location: "Kochi, Kerala",
//     contact: "+91 9876543210",
//     aadhaar: "XXXX-XXXX-1234",
//     verified: true,
//     blockchainHash: "0x8f3a2bc9...12a",
//     skills: ["Tree Climbing", "Harvesting", "Masonry"]
//   };

//   return (
//     <div className="container py-4 ">
//       <div className="main-body">
//         {/* Breadcrumb */}
//         <nav aria-label="breadcrumb" className="main-breadcrumb mb-3">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item"><a href="/">Home</a></li>
//             <li className="breadcrumb-item">Worker</li>
//             <li className="breadcrumb-item active" aria-current="page">Profile</li>
//           </ol>
//         </nav>

//         <div className="row gutters-sm">
//           {/* Left Card */}
//           <div className="col-md-4 mb-3">
//             <div className="card">
//               <div className="card-body text-center">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   alt="Worker"
//                   className="rounded-circle"
//                   width="150"
//                 />
//                 <div className="mt-3">
//                   <h4>{worker.name}</h4>
//                   <p className="text-secondary mb-1">{worker.role}</p>
//                   <p className="text-muted font-size-sm">{worker.location}</p>
//                   <span
//                     className={`badge px-3 py-2 ${
//                       worker.verified ? "bg-success" : "bg-warning text-dark"
//                     }`}
//                   >
//                     {worker.verified ? "✅ Verified" : "⏳ Pending"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Info List */}
//             <div className="card mt-3">
//               <ul className="list-group list-group-flush">
//                 <li className="list-group-item d-flex justify-content-between align-items-center">
//                   <h6 className="mb-0">Contact</h6>
//                   <span className="text-secondary">{worker.contact}</span>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center">
//                   <h6 className="mb-0">Aadhaar</h6>
//                   <span className="text-secondary">{worker.aadhaar}</span>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center">
//                   <h6 className="mb-0">Blockchain Hash</h6>
//                   <span className="text-secondary small">
//                     {worker.blockchainHash}
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Right Card */}
//           <div className="col-md-8">
//             <div className="card mb-3">
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-sm-3"><h6 className="mb-0">Full Name</h6></div>
//                   <div className="col-sm-9 text-secondary">{worker.name}</div>
//                 </div>
//                 <hr />
//                 <div className="row">
//                   <div className="col-sm-3"><h6 className="mb-0">Skills</h6></div>
//                   <div className="col-sm-9 text-secondary">
//                     {worker.skills.join(", ")}
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="row">
//                   <div className="col-sm-3"><h6 className="mb-0">Location</h6></div>
//                   <div className="col-sm-9 text-secondary">{worker.location}</div>
//                 </div>
//                 <hr />
//                 <div className="row">
//                   <div className="col-sm-12">
//                     <button className="btn btn-info">Edit Profile</button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons Instead of Progress */}
//             <div className="row gutters-sm">
//               {[
//                 { title: "Work History", link: "/WH", color: "primary" },
//                 { title: "Payment History", link: "/WPH", color: "success" },
//                 { title: "Feedback", link: "/WF", color: "danger" },
//                 { title: "All Details", link: "/WD", color: "warning" },
//                 { title: "Verify Worker", link: "/worker/verify", color: "info" },
//                 { title: "Request Inbox", link: "/RI", color: "primary" }
//               ].map((item) => (
//                 <div className="col-sm-6 mb-3" key={item.title}>
//                   <div className="card h-100 text-center">
//                     <div className="card-body d-flex flex-column justify-content-center">
//                       <h6 className="mb-3">{item.title}</h6>
//                       <a href={item.link} className={`btn btn-${item.color}`}>
//                         Go to {item.title}
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
// import api from "../api"; // Your configured axios instance
import './WorkerProfile.css';
import api from "../../api";

export default function WorkerProfile() {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
let wId= localStorage.getItem('worker_logId')
console.log(wId);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      // const token = localStorage.getItem("authToken");
      // if (!token) {
      //   setError("User not authenticated. Please login.");
      //   setLoading(false);
      //   return;
      // }
console.log('oooooooooooo');

      try {
        const { data } = await api.get(`/workers/home/${wId}`)
        console.log(data);
        
        setWorker(data); // assuming API returns worker data directly
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!worker) return null;

  return (
    <div className="container py-4">
      <div className="main-body">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="main-breadcrumb mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Worker</li>
            <li className="breadcrumb-item active" aria-current="page">Profile</li>
          </ol>
        </nav>

        <div className="row gutters-sm">
          {/* Left Card */}
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body text-center">
                <img
                  src={`http://localhost:5000/uploads/${worker.image}` || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="Worker"
                  className="rounded-circle"
                  width="150"
                />
                <div className="mt-3">
                  <h4>{worker.name}</h4>
                  <p className="text-secondary mb-1">{worker.commonKey.role}</p>
                  <p className="text-muted font-size-sm">{worker.location}</p>
                  <span
                    className={`badge px-3 py-2 ${
                      worker.commonKey.verify ? "bg-success" : "bg-warning text-dark"
                    }`}
                  >
                    {worker.commonKey.verify ? "✅ Verified" : "⏳ Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* Info List */}
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Contact</h6>
                  <span className="text-secondary">{worker.phone}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Aadhaar</h6>
                  <span className="text-secondary">{worker.aadhaarNumber}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Blockchain Hash</h6>
                  <span className="text-secondary small">{worker.blockchainHash}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Card */}
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3"><h6 className="mb-0">Full Name</h6></div>
                  <div className="col-sm-9 text-secondary">{worker.name}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3"><h6 className="mb-0">Skills</h6></div>
                  <div className="col-sm-9 text-secondary">{worker.skill}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3"><h6 className="mb-0">Location</h6></div>
                  <div className="col-sm-9 text-secondary">{worker.permanentAddress}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <button className="btn btn-info">Edit Profile</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="row gutters-sm">
              {[
                { title: "Work History", link: "/WorkerHistory", color: "primary" },
                { title: "Payment History", link: "/WorkerPayment", color: "success" },
                { title: "Feedback", link: "/Workerfeedback", color: "danger" },
                { title: "All Details", link: "/Workerdetails", color: "warning" },
                // { title: "Verify Worker", link: "/worker/verify", color: "info" },
                { title: "Request Inbox", link: "/RequestInbox", color: "primary" }
              ].map((item) => (
                <div className="col-sm-6 mb-3" key={item.title}>
                  <div className="card h-100 text-center">
                    <div className="card-body d-flex flex-column justify-content-center">
                      <h6 className="mb-3">{item.title}</h6>
                      <a href={item.link} className={`btn btn-${item.color}`}>
                        Go to {item.title}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
