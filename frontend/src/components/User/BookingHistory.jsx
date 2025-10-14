import React, { useState, useEffect } from "react";
import api from "../../api";

function BookingHistory({ user, onMessage, onTabChange }) {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const userLogId = localStorage.getItem("userLogId");
      
      if (!userLogId) {
        onMessage("❌ User not logged in. Please login again.");
        setLoading(false);
        return;
      }

      const response = await api.get(`/booking/user/${userLogId}`);
      console.log(response);
      
      if (response.status === 200) {
        setBookings(response.data);
      } else {
        onMessage("❌ Failed to load booking history.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      onMessage("❌ Error loading booking history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRateBooking = async (bookingId, rating) => {
    try {
      const response = await api.put(`/bookings/${bookingId}/rate`, { rating });
      
      if (response.status === 200) {
        const updatedBookings = bookings.map(booking =>
          booking.id === bookingId ? { ...booking, rating } : booking
        );
        setBookings(updatedBookings);
        onMessage("✅ Rating submitted successfully!");
      } else {
        onMessage("❌ Failed to submit rating.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      onMessage("❌ Error submitting rating. Please try again.");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await api.put(`/bookings/${bookingId}`, { status: "cancelled" });
      
      if (response.status === 200) {
        const updatedBookings = bookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
        );
        setBookings(updatedBookings);
        onMessage("✅ Booking cancelled successfully!");
      } else {
        onMessage("❌ Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      onMessage("❌ Error cancelling booking. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': 'success',
      'confirmed': 'primary',
      'pending': 'warning',
      'cancelled': 'danger'
    };
    return `badge bg-${statusConfig[status] || 'secondary'}`;
  };

  const filteredBookings = filterStatus 
    ? bookings.filter(booking => booking.status === filterStatus)
    : bookings;

  const statusCounts = {
    All: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading bookings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Your Booking History</h3>
          <button
            className="btn btn-primary"
            onClick={() => onTabChange('book')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            New Booking
          </button>
        </div>

        {/* Status Filter */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn ${!filterStatus ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilterStatus("")}
                  >
                    All ({statusCounts.All})
                  </button>
                  <button
                    type="button"
                    className={`btn ${filterStatus === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setFilterStatus("pending")}
                  >
                    Pending ({statusCounts.pending})
                  </button>
                  <button
                    type="button"
                    className={`btn ${filterStatus === 'confirmed' ? 'btn-info' : 'btn-outline-info'}`}
                    onClick={() => setFilterStatus("confirmed")}
                  >
                    Confirmed ({statusCounts.confirmed})
                  </button>
                  <button
                    type="button"
                    className={`btn ${filterStatus === 'completed' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setFilterStatus("completed")}
                  >
                    Completed ({statusCounts.completed})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-clock-history display-1 text-muted"></i>
            <h4 className="mt-3 text-muted">No Bookings Found</h4>
            <p className="text-muted">
              {filterStatus 
                ? `You don't have any ${filterStatus} bookings.`
                : "You haven't made any bookings yet."}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => onTabChange('book')}
            >
              Book a Worker Now
            </button>
          </div>
        ) : (
          <div className="row">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="col-lg-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-start mb-3">
                      <img
                        src={booking.workerImage || "https://via.placeholder.com/60"}
                        alt={booking.workerName}
                        className="rounded-circle me-3"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">{booking.workerName}</h5>
                        <p className="text-muted mb-1">{booking.workerProfession}</p>
                        <div className="d-flex align-items-center flex-wrap">
                          <span className={getStatusBadge(booking.status)}>
                            {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="mb-2"><strong>Work Description:</strong></p>
                      <p className="text-muted small">{booking.description}</p>
                    </div>

                    <div className="row mb-3">
                      <div className="col-6">
                        <small className="text-muted">Date & Time</small>
                        <p className="mb-0 fw-semibold">
                          {formatDate(booking.date)}<br />
                          <small className="text-muted">{booking.time}</small>
                        </p>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Duration</small>
                        <p className="mb-0 fw-semibold">{booking.duration} hours</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted">Address</small>
                      <p className="mb-0 small">{booking.address}</p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="text-primary mb-0">₹{booking.totalAmount}</h5>
                      
                      <div className="d-flex gap-2">
                        {booking.status === 'completed' && !booking.rating && (
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-warning btn-sm dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              Rate Service
                            </button>
                            <ul className="dropdown-menu">
                              {[1, 2, 3, 4, 5].map(star => (
                                <li key={star}>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleRateBooking(booking.id, star)}
                                  >
                                    {'★'.repeat(star)}{'☆'.repeat(5 - star)}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {booking.rating && (
                          <div className="text-warning">
                            {'★'.repeat(booking.rating)}
                            {'☆'.repeat(5 - booking.rating)}
                          </div>
                        )}

                        {booking.status === 'pending' && (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </button>
                        )}

                        <button className="btn btn-outline-primary btn-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistory;