import React, { useState, useEffect } from "react";
import api from "../../api";

function BookWorker({ user, onMessage }) {
    console.log(user,'uuuuuu');
    
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    address: user?.address || "",
    description: "",
    duration: "2"
  });
  const [loading, setLoading] = useState(false);
  const [workersLoading, setWorkersLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProfession, setFilterProfession] = useState("");

  useEffect(() => {
    fetchWorkers();
    setBookingForm(prev => ({
      ...prev,
      address: user?.address || ""
    }));
  }, [user]);

  const fetchWorkers = async () => {
    try {
      setWorkersLoading(true);
      const response = await api.get("/workers");
      console.log(response);
      
      
      if (response.status === 200) {
        setWorkers(response.data);
      } else {
        onMessage("❌ Failed to load workers.");
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
      onMessage("❌ Error loading workers. Please try again.");
    } finally {
      setWorkersLoading(false);
    }
  };

  const handleBookWorker = (worker) => {
    setSelectedWorker(worker);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userLogId = localStorage.getItem("userLogId");
      
      if (!userLogId) {
        onMessage("❌ User not logged in. Please login again.");
        return;
      }

      const bookingData = {
        userId: user,
        workerId: selectedWorker.id,
        date: bookingForm.date,
        time: bookingForm.time,
        address: bookingForm.address,
        description: bookingForm.description,
        duration: parseInt(bookingForm.duration),
        totalAmount: selectedWorker.hourlyRate * parseInt(bookingForm.duration),
        status: "pending"
      };

      const response = await api.post("/booking", bookingData);
      
      if (response.status === 201) {
        onMessage("✅ Booking request submitted successfully!");
        setSelectedWorker(null);
        setBookingForm({
          date: "",
          time: "",
          address: user?.address || "",
          description: "",
          duration: "2"
        });
      } else {
        onMessage("❌ Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      onMessage("❌ Error submitting booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter workers based on search and profession
  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (worker.skills && worker.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesProfession = !filterProfession || worker.profession === filterProfession;
    return matchesSearch && matchesProfession;
  });

  const professions = [...new Set(workers.map(worker => worker.profession))];

  if (workersLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading workers...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-lg-8">
        {/* Search and Filter Section */}
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
                    placeholder="Search workers by name, profession, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={filterProfession}
                  onChange={(e) => setFilterProfession(e.target.value)}
                >
                  <option value="">All Professions</option>
                  {professions.map(profession => (
                    <option key={profession} value={profession}>
                      {profession}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <h3 className="mb-4">Available Workers</h3>
        
        {/* Worker Cards */}
        <div className="row">
          {filteredWorkers.length === 0 ? (
            <div className="col-12 text-center py-5">
              <i className="bi bi-search display-1 text-muted"></i>
              <h4 className="mt-3 text-muted">No Workers Found</h4>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredWorkers.map(worker => (
              <div key={worker.id} className="col-md-6 mb-4">
                <div className={`card h-100 shadow-sm ${!worker.available ? 'opacity-75' : ''}`}>
                  <div className="card-body">
                    <div className="d-flex align-items-start mb-3">
                      <img
                        src={`http://localhost:5000/uploads/${worker.image}` || "https://via.placeholder.com/100"}
                        alt={worker.name}
                        className="rounded-circle me-3"
                        style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">{worker.name}</h5>
                        <p className="text-muted mb-1">{worker.jobTitle}</p>
                        <p className="text-muted mb-1">{worker.temporaryAddress}</p>

                        <div className="d-flex align-items-center flex-wrap">
                          <span className="badge bg-warning text-dark me-2 mb-1">
                            <i className="bi bi-star-fill me-1"></i>
                            {worker.rating || "4.0"}
                          </span>
                          <span className="badge bg-light text-dark me-2 mb-1">
                            <i className="bi bi-briefcase me-1"></i>
                            {worker.experience || "2+ years"}
                          </span>
                        </div>
                      </div>
                      <span className={`badge ${worker.available ? 'bg-success' : 'bg-danger'}`}>
                        {worker.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                    
                    {worker.skills && worker.skills.length > 0 && (
                      <div className="mb-3">
                        <strong>Skills:</strong>
                        <div className="mt-1">
                          {worker.skills.map((skill, index) => (
                            <span key={index} className="badge bg-secondary me-1 mb-1">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="text-primary mb-0">₹{worker.hourlyRate}2000/hour</h5>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleBookWorker(worker)}
                        // disabled={!worker.available}
                      >
                        {/* {worker.available ? 'Book Now' : 'Not Available'} */}
                        BookNow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Form Sidebar */}
      <div className="col-lg-4">
        {selectedWorker ? (
          <div className="card shadow-lg sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Book {selectedWorker.name}</h5>
              <small className="opacity-75">{selectedWorker.profession}</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleBookingSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Service Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Preferred Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Service Duration (hours)</label>
                  <select
                    className="form-select"
                    value={bookingForm.duration}
                    onChange={(e) => setBookingForm({...bookingForm, duration: e.target.value})}
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                    <option value="5">5+ hours</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Service Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={bookingForm.address}
                    onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Work Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={bookingForm.description}
                    onChange={(e) => setBookingForm({...bookingForm, description: e.target.value})}
                    placeholder="Describe the work you need in detail..."
                    required
                  />
                </div>
                
                <div className="bg-light p-3 rounded mb-3">
                  <div className="d-flex justify-content-between">
                    <span>Hourly Rate:</span>
                    <span>₹{selectedWorker.hourlyRate}/hour</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Duration:</span>
                    <span>{bookingForm.duration} hours</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary">
                      ₹{selectedWorker.hourlyRate * parseInt(bookingForm.duration)}
                    </span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 mt-2"
                  onClick={() => setSelectedWorker(null)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="card text-center">
            <div className="card-body py-5">
              <i className="bi bi-tools display-1 text-muted"></i>
              <h5 className="mt-3 text-muted">Select a Worker</h5>
              <p className="text-muted">Choose a worker from the list to book their services</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookWorker;