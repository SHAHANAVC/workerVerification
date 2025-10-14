import React, { useState, useEffect } from "react";
import BookWorker from "./BookWorker";
import BookingHistory from "./BookingHistory";
import api from "../../api"; // Adjust the path as per your project structure
import "bootstrap/dist/css/bootstrap.min.css";

function UserHome() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("book");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userLogId = localStorage.getItem("userLogId");
      
      if (!userLogId) {
        setMessage("❌ User not logged in. Please login again.");
        setLoading(false);
        return;
      }

      // Fetch user details from backend
      const response = await api.get(`/user/bylogiId/${userLogId}`);
      console.log(response);
      
      if (response.status === 200) {
        setUser(response.data);
      } else {
        setMessage("❌ Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage("❌ Error loading user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userLogId");
    localStorage.removeItem("userToken");
    window.location.href = "/login"; // Redirect to login page
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      {/* HEADER */}
      <header className="bg-white shadow-sm py-3 border-bottom border-success border-top border-warning border-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png"
                  alt="National Emblem of India"
                  style={{ height: "60px" }}
                  className="me-3"
                />
                <div>
                  <h1 className="fs-4 fw-bold text-primary mb-0">Government of Kerala</h1>
                  <h2 className="fs-6 text-secondary">കേരള സർക്കാർ</h2>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-end">
              {user && (
                <div className="d-flex align-items-center justify-content-end">
                  <div className="text-end">
                    <h6 className="mb-0 fw-bold">
                      {user.firstName} {user.lastName}
                    </h6>
                    <small className="text-muted">{user.email}</small>
                  </div>
                  <div className="dropdown ms-3">
                    <button
                      className="btn btn-outline-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-person-circle"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={() => {/* Add profile modal */}}>
                          Profile
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => {/* Add settings modal */}}>
                          Settings
                        </button>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container my-4">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="bg-primary text-white p-4 rounded-3">
              <h2 className="mb-2">
                Welcome back, {user?.firstName} {user?.lastName}!
              </h2>
              <p className="mb-0">Book skilled workers for your home services needs</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="row">
          <div className="col-12">
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'book' ? 'active' : ''}`}
                  onClick={() => setActiveTab('book')}
                >
                  <i className="bi bi-tools me-2"></i>Book a Worker
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  <i className="bi bi-clock-history me-2"></i>Booking History
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} mb-4`}>
            {message}
          </div>
        )}

        {/* Render Components Based on Active Tab */}
        {activeTab === 'book' && (
          <BookWorker 
            user={user._id}
            onMessage={setMessage}
          />
        )}

        {activeTab === 'history' && (
          <BookingHistory 
            user={user}
            onMessage={setMessage}
            onTabChange={setActiveTab}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Kerala Government Services Portal
          </p>
        </div>
      </footer>

      {/* Bootstrap Icons */}
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" 
      />
    </div>
  );
}

export default UserHome;