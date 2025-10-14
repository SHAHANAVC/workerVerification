
import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import WorkersTable from "./WorkersTable";
import ViewUsers from "./ViewUsers";
import RegisterPolice from "./RegisterPolice";
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
            className={`nav-item ${activeTab === "police" ? "active" : ""}`}
            onClick={() => setActiveTab("police")}
          >
            👥 Police
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
              {activeTab === "police" && "Police "}

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
                  {/* <div className="tab-header">
                    <h2>User Management</h2>
                    <div className="tab-actions">
                      <button className="btn-primary">Export Users</button>
                    </div>
                  </div> */}
                  <div className="placeholder-content">
                    {/* <p>User management interface will be implemented here.</p> */}
                    <ViewUsers/>
                  </div>
                </div>
              )}
                 {/* Other tabs remain the same */}
              {activeTab === "police" && (
                <div className="police-tab">
                  {/* <div className="tab-header">
                    <h2>User Management</h2>
                    <div className="tab-actions">
                      <button className="btn-primary">Export Users</button>
                    </div>
                  </div> */}
                  <div className="placeholder-content">
                    {/* <p>User management interface will be implemented here.</p> */}
                    {/* <ViewUsers/> */}
                    <RegisterPolice/>
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