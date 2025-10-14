import React, { useState, useEffect } from "react";
import api from "../../api"; // Adjust path as needed

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/user");
      
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setMessage("❌ Failed to load users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("❌ Error loading users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(user => {
    return (
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.pincode?.includes(searchTerm)
    );
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Address', 'Pincode', 'State', 'District', 'Registered Date'];
    const csvData = users.map(user => [
      `${user.firstName} ${user.middleName || ''} ${user.lastName}`.trim(),
      user.email,
      user.address,
      user.pincode,
      user.state,
      user.district,
      formatDate(user.createdAt)
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setMessage("✅ Users exported successfully");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="view-users">
      {/* Header Section */}
      {/* <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>User Management</h2>
          <p className="text-muted mb-0">
            Manage all registered users on the platform - Total {users.length} users
          </p>
        </div>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-primary"
            onClick={exportToCSV}
          >
            <i className="bi bi-download me-2"></i>
            Export CSV
          </button>
          <button 
            className="btn btn-primary"
            onClick={fetchUsers}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh
          </button>
        </div>
      </div> */}

      {/* Message Alert */}
      {message && (
        <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} mb-4`}>
          {message}
        </div>
      )}

      {/* Search Section */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email, address, or pincode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-muted small d-flex justify-content-end align-items-center h-100">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>User Details</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Location</th>
                  <th>Registration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <i className="bi bi-people display-1 text-muted"></i>
                      <h5 className="mt-3 text-muted">No Users Found</h5>
                      <p className="text-muted">No users match your search criteria</p>
                    </td>
                  </tr>
                ) : (
                  currentUsers.map(user => (
                    <tr key={user._id || user.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-circle bg-primary text-white me-3">
                            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                          </div>
                          <div>
                            <strong>
                              {user.firstName} {user.middleName ? user.middleName + ' ' : ''}{user.lastName}
                            </strong>
                            <br />
                            <small className="text-muted">ID: {user._id || user.id}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="fw-semibold">{user.email}</div>
                          {user.phone && (
                            <small className="text-muted">{user.phone}</small>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="small">
                          <div>{user.address}</div>
                          <strong className="text-primary">Pincode: {user.pincode}</strong>
                        </div>
                      </td>
                      <td>
                        <div className="small">
                          <div>{user.district}</div>
                          <div className="text-muted">{user.state}</div>
                        </div>
                      </td>
                      <td>
                        <div className="small">
                          <div>{formatDate(user.createdAt)}</div>
                          <div className="text-muted">
                            {user.updatedAt && user.updatedAt !== user.createdAt && 
                              `Updated: ${formatDate(user.updatedAt)}`
                            }
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => setSelectedUser(user)}
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn btn-outline-info"
                            onClick={() => {/* View bookings functionality */}}
                            title="View Bookings"
                          >
                            <i className="bi bi-calendar-check"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="card-footer">
              <nav>
                <ul className="pagination justify-content-center mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <li 
                      key={index + 1} 
                      className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  User Details - {selectedUser.firstName} {selectedUser.lastName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Personal Information</h6>
                    <p><strong>Full Name:</strong> {selectedUser.firstName} {selectedUser.middleName || ''} {selectedUser.lastName}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    {selectedUser.phone && <p><strong>Phone:</strong> {selectedUser.phone}</p>}
                  </div>
                  <div className="col-md-6">
                    <h6>Address Information</h6>
                    <p><strong>Address:</strong> {selectedUser.address}</p>
                    <p><strong>Pincode:</strong> {selectedUser.pincode}</p>
                    <p><strong>District:</strong> {selectedUser.district}</p>
                    <p><strong>State:</strong> {selectedUser.state}</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Registration Details</h6>
                    <p><strong>Registered:</strong> {formatDate(selectedUser.createdAt)}</p>
                    {selectedUser.updatedAt && selectedUser.updatedAt !== selectedUser.createdAt && (
                      <p><strong>Last Updated:</strong> {formatDate(selectedUser.updatedAt)}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <h6>User ID</h6>
                    <p className="text-muted small">{selectedUser._id || selectedUser.id}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        .table th {
          border-top: none;
          font-weight: 600;
          color: #495057;
          background-color: #f8f9fa;
        }
      `}</style>

     
    </div>
  );
}

export default ViewUsers;