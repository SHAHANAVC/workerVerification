// import React, { useState, useEffect } from "react";
// import "./AdminPanel.css";
// // import api from "../api";

// function AdminPanel() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [stats, setStats] = useState({});
//   const [users, setUsers] = useState([]);
//   const [workers, setWorkers] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       const [statsRes, usersRes, workersRes, jobsRes] = await Promise.all([
//         api.get("/admin/stats"),
//         api.get("/admin/users"),
//         api.get("/admin/workers"),
//         api.get("/admin/jobs")
//       ]);
      
//       setStats(statsRes.data);
//       setUsers(usersRes.data);
//       setWorkers(workersRes.data);
//       setJobs(jobsRes.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const approveWorker = async (workerId) => {
//     try {
//       await api.put(`/admin/workers/${workerId}/approve`);
//       fetchDashboardData();
//     } catch (error) {
//       console.error("Error approving worker:", error);
//     }
//   };

//   const suspendUser = async (userId) => {
//     try {
//       await api.put(`/admin/users/${userId}/suspend`);
//       fetchDashboardData();
//     } catch (error) {
//       console.error("Error suspending user:", error);
//     }
//   };

//   return (
//     <div className="admin-panel">
//       {/* Sidebar */}
//       <div className="admin-sidebar">
//         <div className="sidebar-header">
//           <div className="admin-logo">
//             <span className="logo-icon">🛠️</span>
//             <span className="logo-text">WorkHub Admin</span>
//           </div>
//         </div>
        
//         <nav className="sidebar-nav">
//           <button 
//             className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
//             onClick={() => setActiveTab("dashboard")}
//           >
//             📊 Dashboard
//           </button>
//           <button 
//             className={`nav-item ${activeTab === "users" ? "active" : ""}`}
//             onClick={() => setActiveTab("users")}
//           >
//             👥 Users
//           </button>
//           <button 
//             className={`nav-item ${activeTab === "workers" ? "active" : ""}`}
//             onClick={() => setActiveTab("workers")}
//           >
//             👷 Workers
//           </button>
//           <button 
//             className={`nav-item ${activeTab === "jobs" ? "active" : ""}`}
//             onClick={() => setActiveTab("jobs")}
//           >
//             💼 Jobs
//           </button>
//           <button 
//             className={`nav-item ${activeTab === "payments" ? "active" : ""}`}
//             onClick={() => setActiveTab("payments")}
//           >
//             💳 Payments
//           </button>
//           <button 
//             className={`nav-item ${activeTab === "reports" ? "active" : ""}`}
//             onClick={() => setActiveTab("reports")}
//           >
//             📈 Reports
//           </button>
//           <button 
//             className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
//             onClick={() => setActiveTab("settings")}
//           >
//             ⚙️ Settings
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="admin-main">
//         <header className="admin-header">
//           <div className="header-left">
//             <h1>Admin Dashboard</h1>
//             <p>Manage your WorkHub platform</p>
//           </div>
//           <div className="header-right">
//             <div className="admin-search">
//               <input type="text" placeholder="Search..." />
//             </div>
//             <div className="admin-profile">
//               <span>Admin User</span>
//               <div className="profile-avatar">A</div>
//             </div>
//           </div>
//         </header>

//         <div className="admin-content">
//           {loading ? (
//             <div className="loading-spinner">Loading...</div>
//           ) : (
//             <>
//               {/* Dashboard Tab */}
//               {activeTab === "dashboard" && (
//                 <div className="dashboard-tab">
//                   <div className="stats-grid">
//                     <div className="stat-card">
//                       <div className="stat-icon total-users">👥</div>
//                       <div className="stat-info">
//                         <h3>{stats.totalUsers || 0}</h3>
//                         <p>Total Users</p>
//                       </div>
//                     </div>
//                     <div className="stat-card">
//                       <div className="stat-icon total-workers">👷</div>
//                       <div className="stat-info">
//                         <h3>{stats.totalWorkers || 0}</h3>
//                         <p>Verified Workers</p>
//                       </div>
//                     </div>
//                     <div className="stat-card">
//                       <div className="stat-icon active-jobs">💼</div>
//                       <div className="stat-info">
//                         <h3>{stats.activeJobs || 0}</h3>
//                         <p>Active Jobs</p>
//                       </div>
//                     </div>
//                     <div className="stat-card">
//                       <div className="stat-icon revenue">💰</div>
//                       <div className="stat-info">
//                         <h3>${stats.totalRevenue || 0}</h3>
//                         <p>Total Revenue</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="charts-section">
//                     <div className="chart-card">
//                       <h3>User Growth</h3>
//                       <div className="chart-placeholder">
//                         📈 User growth chart will be here
//                       </div>
//                     </div>
//                     <div className="chart-card">
//                       <h3>Job Categories</h3>
//                       <div className="chart-placeholder">
//                         🥧 Job categories pie chart
//                       </div>
//                     </div>
//                   </div>

//                   <div className="recent-activity">
//                     <h3>Recent Activity</h3>
//                     <div className="activity-list">
//                       {jobs.slice(0, 5).map(job => (
//                         <div key={job.id} className="activity-item">
//                           <div className="activity-icon">💼</div>
//                           <div className="activity-details">
//                             <p><strong>New job posted:</strong> {job.title}</p>
//                             <span className="activity-time">{job.createdAt}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Users Tab */}
//               {activeTab === "users" && (
//                 <div className="users-tab">
//                   <div className="tab-header">
//                     <h2>User Management</h2>
//                     <div className="tab-actions">
//                       <button className="btn-primary">Export Users</button>
//                     </div>
//                   </div>
                  
//                   <div className="table-container">
//                     <table className="data-table">
//                       <thead>
//                         <tr>
//                           <th>User ID</th>
//                           <th>Name</th>
//                           <th>Email</th>
//                           <th>Type</th>
//                           <th>Status</th>
//                           <th>Joined</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {users.map(user => (
//                           <tr key={user.id}>
//                             <td>#{user.id}</td>
//                             <td>
//                               <div className="user-info">
//                                 <div className="user-avatar">{user.name.charAt(0)}</div>
//                                 {user.name}
//                               </div>
//                             </td>
//                             <td>{user.email}</td>
//                             <td>
//                               <span className={`user-type ${user.type}`}>
//                                 {user.type}
//                               </span>
//                             </td>
//                             <td>
//                               <span className={`status-badge ${user.status}`}>
//                                 {user.status}
//                               </span>
//                             </td>
//                             <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                             <td>
//                               <div className="action-buttons">
//                                 <button className="btn-view">View</button>
//                                 <button 
//                                   className="btn-suspend"
//                                   onClick={() => suspendUser(user.id)}
//                                 >
//                                   Suspend
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {/* Workers Tab */}
//               {activeTab === "workers" && (
//                 <div className="workers-tab">
//                   <div className="tab-header">
//                     <h2>Worker Management</h2>
//                     <div className="tab-filters">
//                       <select>
//                         <option>All Workers</option>
//                         <option>Pending Approval</option>
//                         <option>Verified</option>
//                         <option>Suspended</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="workers-grid">
//                     {workers.map(worker => (
//                       <div key={worker.id} className="worker-card">
//                         <div className="worker-header">
//                           <div className="worker-avatar">
//                             {worker.name.charAt(0)}
//                           </div>
//                           <div className="worker-info">
//                             <h4>{worker.name}</h4>
//                             <p>{worker.specialization}</p>
//                           </div>
//                           <span className={`verification-status ${worker.verified ? 'verified' : 'pending'}`}>
//                             {worker.verified ? '✅ Verified' : '⏳ Pending'}
//                           </span>
//                         </div>
                        
//                         <div className="worker-details">
//                           <div className="detail-item">
//                             <span>Rating:</span>
//                             <span className="rating">⭐ {worker.rating || 'No ratings'}</span>
//                           </div>
//                           <div className="detail-item">
//                             <span>Jobs Completed:</span>
//                             <span>{worker.jobsCompleted || 0}</span>
//                           </div>
//                           <div className="detail-item">
//                             <span>Location:</span>
//                             <span>{worker.location}</span>
//                           </div>
//                         </div>

//                         <div className="worker-actions">
//                           {!worker.verified && (
//                             <button 
//                               className="btn-approve"
//                               onClick={() => approveWorker(worker.id)}
//                             >
//                               Approve
//                             </button>
//                           )}
//                           <button className="btn-view">View Profile</button>
//                           <button className="btn-suspend">Suspend</button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Jobs Tab */}
//               {activeTab === "jobs" && (
//                 <div className="jobs-tab">
//                   <div className="tab-header">
//                     <h2>Job Management</h2>
//                     <div className="tab-filters">
//                       <select>
//                         <option>All Jobs</option>
//                         <option>Active</option>
//                         <option>Completed</option>
//                         <option>Cancelled</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="table-container">
//                     <table className="data-table">
//                       <thead>
//                         <tr>
//                           <th>Job ID</th>
//                           <th>Title</th>
//                           <th>Client</th>
//                           <th>Worker</th>
//                           <th>Category</th>
//                           <th>Budget</th>
//                           <th>Status</th>
//                           <th>Posted</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {jobs.map(job => (
//                           <tr key={job.id}>
//                             <td>#{job.id}</td>
//                             <td>{job.title}</td>
//                             <td>{job.clientName}</td>
//                             <td>{job.workerName || 'Not assigned'}</td>
//                             <td>
//                               <span className="category-tag">{job.category}</span>
//                             </td>
//                             <td>${job.budget}</td>
//                             <td>
//                               <span className={`status-badge ${job.status}`}>
//                                 {job.status}
//                               </span>
//                             </td>
//                             <td>{new Date(job.createdAt).toLocaleDateString()}</td>
//                             <td>
//                               <div className="action-buttons">
//                                 <button className="btn-view">View</button>
//                                 <button className="btn-edit">Edit</button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {/* Payments Tab */}
//               {activeTab === "payments" && (
//                 <div className="payments-tab">
//                   <div className="tab-header">
//                     <h2>Payment Management</h2>
//                     <div className="revenue-summary">
//                       <div className="revenue-card">
//                         <h3>Total Revenue</h3>
//                         <p className="revenue-amount">${stats.totalRevenue || 0}</p>
//                       </div>
//                       <div className="revenue-card">
//                         <h3>This Month</h3>
//                         <p className="revenue-amount">${stats.monthlyRevenue || 0}</p>
//                       </div>
//                     </div>
//                   </div>
//                   {/* Payment transactions table would go here */}
//                 </div>
//               )}

//               {/* Settings Tab */}
//               {activeTab === "settings" && (
//                 <div className="settings-tab">
//                   <h2>Platform Settings</h2>
//                   <div className="settings-grid">
//                     <div className="setting-card">
//                       <h3>General Settings</h3>
//                       <div className="setting-item">
//                         <label>Platform Name</label>
//                         <input type="text" defaultValue="WorkHub" />
//                       </div>
//                       <div className="setting-item">
//                         <label>Commission Rate (%)</label>
//                         <input type="number" defaultValue="15" />
//                       </div>
//                     </div>
                    
//                     <div className="setting-card">
//                       <h3>Worker Verification</h3>
//                       <div className="setting-item">
//                         <label>
//                           <input type="checkbox" defaultChecked />
//                           Require ID verification
//                         </label>
//                       </div>
//                       <div className="setting-item">
//                         <label>
//                           <input type="checkbox" defaultChecked />
//                           Require background check
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;


import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import WorkersTable from "./WorkersTable";
// import api from "../api";
// import WorkersTable from "../components/WorkersTable"; // Adjust path

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const statsRes = await api.get("/admin/stats");
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration - replace with your actual API calls
  const mockStats = {
    totalUsers: 1250,
    totalWorkers: 450,
    activeJobs: 89,
    totalRevenue: 12500,
    monthlyRevenue: 3200
  };

  return (
    <div className="admin-panel">
      {/* Sidebar - Same as before */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <div className="admin-logo">
            <span className="logo-icon">🛠️</span>
            <span className="logo-text">WorkHub Admin</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Users
          </button>
          <button 
            className={`nav-item ${activeTab === "workers" ? "active" : ""}`}
            onClick={() => setActiveTab("workers")}
          >
            👷 Workers
          </button>
          <button 
            className={`nav-item ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => setActiveTab("jobs")}
          >
            💼 Jobs
          </button>
          <button 
            className={`nav-item ${activeTab === "payments" ? "active" : ""}`}
            onClick={() => setActiveTab("payments")}
          >
            💳 Payments
          </button>
          <button 
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h1>
              {activeTab === "dashboard" && "Admin Dashboard"}
              {activeTab === "workers" && "Worker Management"}
              {activeTab === "users" && "User Management"}
              {activeTab === "jobs" && "Job Management"}
              {activeTab === "payments" && "Payment Management"}
              {activeTab === "settings" && "Platform Settings"}
            </h1>
            <p>Manage your WorkHub platform</p>
          </div>
          <div className="header-right">
            {/* <div className="admin-search">
              <input type="text" placeholder="Search..." />
            </div> */}
            <div className="admin-profile">
              <span>Admin User</span>
              <div className="profile-avatar">A</div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <>
              {/* Dashboard Tab */}
              {activeTab === "dashboard" && (
                <div className="dashboard-tab">
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon total-users">👥</div>
                      <div className="stat-info">
                        <h3>{mockStats.totalUsers}</h3>
                        <p>Total Users</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon total-workers">👷</div>
                      <div className="stat-info">
                        <h3>{mockStats.totalWorkers}</h3>
                        <p>Verified Workers</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon active-jobs">💼</div>
                      <div className="stat-info">
                        <h3>{mockStats.activeJobs}</h3>
                        <p>Active Jobs</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon revenue">💰</div>
                      <div className="stat-info">
                        <h3>${mockStats.totalRevenue}</h3>
                        <p>Total Revenue</p>
                      </div>
                    </div>
                  </div>

                  <div className="recent-activity">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons-grid">
                      <button 
                        className="action-card"
                        onClick={() => setActiveTab("workers")}
                      >
                        <div className="action-icon">👷</div>
                        <div className="action-text">
                          <h4>Manage Workers</h4>
                          <p>Approve or reject worker applications</p>
                        </div>
                      </button>
                      <button 
                        className="action-card"
                        onClick={() => setActiveTab("users")}
                      >
                        <div className="action-icon">👥</div>
                        <div className="action-text">
                          <h4>User Management</h4>
                          <p>Manage client accounts</p>
                        </div>
                      </button>
                      <button 
                        className="action-card"
                        onClick={() => setActiveTab("jobs")}
                      >
                        <div className="action-icon">💼</div>
                        <div className="action-text">
                          <h4>Job Listings</h4>
                          <p>Monitor active job postings</p>
                        </div>
                      </button>
                      <button 
                        className="action-card"
                        onClick={() => setActiveTab("payments")}
                      >
                        <div className="action-icon">💰</div>
                        <div className="action-text">
                          <h4>Payment Overview</h4>
                          <p>View revenue and transactions</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Workers Tab - Integrated WorkersTable */}
              {activeTab === "workers" && (
                <div className="workers-tab">
                  {/* <div className="tab-header">
                    <h2>Worker Verification & Management</h2>
                    <div className="tab-actions">
                      <button className="btn-primary" onClick={fetchDashboardData}>
                        Refresh Data
                      </button>
                    </div>
                  </div> */}
                  
                  {/* Your existing WorkersTable component */}
                  <WorkersTable />
                </div>
              )}

              {/* Other tabs remain the same */}
              {activeTab === "users" && (
                <div className="users-tab">
                  <div className="tab-header">
                    <h2>User Management</h2>
                    <div className="tab-actions">
                      <button className="btn-primary">Export Users</button>
                    </div>
                  </div>
                  <div className="placeholder-content">
                    <p>User management interface will be implemented here.</p>
                  </div>
                </div>
              )}

              {activeTab === "jobs" && (
                <div className="jobs-tab">
                  <div className="tab-header">
                    <h2>Job Management</h2>
                    <div className="tab-filters">
                      <select>
                        <option>All Jobs</option>
                        <option>Active</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="placeholder-content">
                    <p>Job management interface will be implemented here.</p>
                  </div>
                </div>
              )}

              {activeTab === "payments" && (
                <div className="payments-tab">
                  <div className="tab-header">
                    <h2>Payment Management</h2>
                    <div className="revenue-summary">
                      <div className="revenue-card">
                        <h3>Total Revenue</h3>
                        <p className="revenue-amount">${mockStats.totalRevenue}</p>
                      </div>
                      <div className="revenue-card">
                        <h3>This Month</h3>
                        <p className="revenue-amount">${mockStats.monthlyRevenue}</p>
                      </div>
                    </div>
                  </div>
                  <div className="placeholder-content">
                    <p>Payment transactions and revenue details will be shown here.</p>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="settings-tab">
                  <h2>Platform Settings</h2>
                  <div className="placeholder-content">
                    <p>Platform configuration settings will be available here.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;