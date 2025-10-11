import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function UserRegistration() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setError("❌ First Name and Last Name are required!");
      return;
    }
    if (password.length < 6) {
      setError("❌ Password must be at least 6 characters long!");
      return;
    }
    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }
    if (pincode.length !== 6) {
      setError("❌ Pincode must be 6 digits!");
      return;
    }

    setError("");
    alert("✅ User Registration Successful!");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0 && value.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  const handlePincodeChange = async (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) setPincode(value);
    if (value.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${value}`
        );
        const data = response.data[0];
        if (data.Status === "Success") {
          setState(data.PostOffice[0].State);
          setDistrict(data.PostOffice[0].District);
        } else {
          setState("");
          setDistrict("");
        }
      } catch (err) {
        console.error("Error fetching PIN code data:", err);
        setState("");
        setDistrict("");
      }
    } else {
      setState("");
      setDistrict("");
    }
  };

  return (
    <div className="bg-light">
      {/* HEADER */}
      <header className="bg-white shadow-sm py-3 border-bottom border-success border-top border-warning border-5">
        <div className="container d-flex align-items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png"
            alt="National Emblem of India"
            style={{ height: "70px" }}
            className="me-3"
          />
          <div>
            <h1 className="fs-4 fw-bold text-primary mb-0">
              Government of Kerala
            </h1>
            <h2 className="fs-6 text-secondary">കേരള സർക്കാർ</h2>
          </div>
        </div>
      </header>

      {/* MAIN FORM */}
      <main className="container my-5">
        <div className="card shadow-lg border-0 rounded-3">
          <div className="card-body p-4 p-md-5">
            <h2 className="card-title text-center text-dark mb-2 fw-bold">
              User Registration
            </h2>

            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}

              {/* First, Middle, Last Name */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">Middle Name (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password + Confirm Password */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${passwordError ? "is-invalid" : ""}`}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                  />
                  {passwordError && (
                    <div className="invalid-feedback">{passwordError}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Show Password */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPass"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label className="form-check-label" htmlFor="showPass">
                  Show Passwords
                </label>
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Address</label>
                <textarea
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="3"
                  required
                />
              </div>

              {/* Pin, State, District */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">Pincode</label>
                  <input
                    type="text"
                    className="form-control"
                    value={pincode}
                    onChange={handlePincodeChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">State</label>
                  <input
                    type="text"
                    className="form-control"
                    value={state}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">District</label>
                  <input
                    type="text"
                    className="form-control"
                    value={district}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 btn-lg fw-bold py-2"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} User Registration Portal
          </p>
        </div>
      </footer>
    </div>
  );
}

export default UserRegistration;
