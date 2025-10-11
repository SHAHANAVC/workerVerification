// import React, { useState } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Workerregistr() {
//   // All your existing state and handler functions remain unchanged
//   const [name, setName] = useState("");
//   const [confirmName, setConfirmName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [aadhaar, setAadhaar] = useState("");
//   const [confirmAadhaar, setConfirmAadhaar] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [address, setAddress] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [state, setState] = useState("");
//   const [district, setDistrict] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name !== confirmName) { setError("❌ Names do not match!"); return; }
//     if (password !== confirmPassword) { setError("❌ Passwords do not match!"); return; }
//     if (aadhaar !== confirmAadhaar) { setError("❌ Aadhaar numbers do not match!"); return; }
//     if (aadhaar.length !== 12) { setError("❌ Aadhaar must be 12 digits!"); return; }
//     if (mobile.length !== 10) { setError("❌ Mobile number must be 10 digits!"); return; }
//     if (pincode.length !== 6) { setError("❌ Pincode must be 6 digits!"); return; }
//     if (!photo) { setError("❌ Please upload a photo!"); return; }
//     setError("");
//     alert("✅ Form submitted successfully!");
//   };

//   const handleAadhaarChange = (e, setter) => {
//     const value = e.target.value.replace(/\D/g, "");
//     if (value.length <= 12) setter(value);
//   };

//   const handleMobileChange = (e) => {
//     const value = e.target.value.replace(/\D/g, "");
//     if (value.length <= 10) setMobile(value);
//   };

//   const handlePincodeChange = async (e) => {
//     const value = e.target.value.replace(/\D/g, "");
//     if (value.length <= 6) setPincode(value);
//     if (value.length === 6) {
//       try {
//         const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
//         const data = response.data[0];
//         if (data.Status === "Success") {
//           setState(data.PostOffice[0].State);
//           setDistrict(data.PostOffice[0].District);
//         } else {
//           setState(""); setDistrict("");
//         }
//       } catch (err) {
//         console.error("Error fetching PIN code data:", err);
//         setState(""); setDistrict("");
//       }
//     } else { setState(""); setDistrict(""); }
//   };

//   return (
//     <div className="bg-light">
//       {/* ===== HEADER ===== */}
//       <header className="bg-white shadow-sm py-3 border-bottom border-success border-top border-warning border-5">
//         <div className="container d-flex align-items-center">
//           <img 
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png" 
//             alt="National Emblem of India" 
//             style={{ height: '70px' }}
//             className="me-3"
//           />
//           <div>
//             <h1 className="fs-4 fw-bold text-primary mb-0">Government of Kerala</h1>
//             <h2 className="fs-6 text-secondary">കേരള സർക്കാർ</h2>
//           </div>
//         </div>
//       </header>

//       {/* ===== MAIN FORM CONTAINER ===== */}
//       <main className="container my-5">
//         <div className="card shadow-lg border-0 rounded-3">
//           <div className="card-body p-4 p-md-5">
//             <h2 className="card-title text-center text-dark mb-2 fw-bold">Worker Registration Form</h2>
//             <p className="card-subtitle text-center text-muted mb-4">श्रमिक पंजीकरण पोर्टल</p>
            
//             <form onSubmit={handleSubmit}>
//               {error && <div className="alert alert-danger">{error}</div>}

//               {/* ----- Personal Details ----- */}
//               <fieldset className="mb-4">
//                 <legend className="fs-5 fw-semibold text-primary border-bottom pb-2 mb-3">Personal Details</legend>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Full Name (पूरा नाम)</label>
//                   <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Confirm Name (नाम की पुष्टि करें)</label>
//                   <input type="text" className="form-control" value={confirmName} onChange={(e) => setConfirmName(e.target.value)} required />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Date of Birth (जन्म की तारीख)</label>
//                   <input type="date" className="form-control" required />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold me-3">Gender (लिंग)</label>
//                   <div>
//                     <div className="form-check form-check-inline">
//                       <input type="radio" id="male" name="gender" value="male" className="form-check-input" />
//                       <label htmlFor="male" className="form-check-label">Male</label>
//                     </div>
//                     <div className="form-check form-check-inline">
//                       <input type="radio" id="female" name="gender" value="female" className="form-check-input" />
//                       <label htmlFor="female" className="form-check-label">Female</label>
//                     </div>
//                     <div className="form-check form-check-inline">
//                       <input type="radio" id="other" name="gender" value="other" className="form-check-input" />
//                       <label htmlFor="other" className="form-check-label">Other</label>
//                     </div>
//                   </div>
//                 </div>
//               </fieldset>

//               {/* ----- Credentials ----- */}
//               <fieldset className="mb-4">
//                 <legend className="fs-5 fw-semibold text-primary border-bottom pb-2 mb-3">Login Credentials</legend>
//                  <div className="mb-3">
//                   <label className="form-label fw-semibold">Email(ईमेल)</label>
//                   <input type="email" className="form-control" required />
//                 </div>
//                  <div className="mb-3">
//                   <label className="form-label fw-semibold">Username(यूजरनेम)</label>
//                   <input type="text" className="form-control" required />
//                 </div>
//                 <div className="row">
//                     <div className="col-md-6 mb-3">
//                         <label className="form-label fw-semibold">Password(पासवर्ड)</label>
//                         <input type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <label className="form-label fw-semibold">Confirm Password(कन्फर्म पासवर्ड)</label>
//                         <input type={showPassword ? "text" : "password"} className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//                     </div>
//                 </div>
//                 <div className="form-check mb-3">
//                   <input type="checkbox" className="form-check-input" id="showPass" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
//                   <label className="form-check-label" htmlFor="showPass">Show Passwords(पासवर्ड दिखाएँ)</label>
//                 </div>
//               </fieldset>

//               {/* ----- Contact & Address ----- */}
//               <fieldset className="mb-4">
//                 <legend className="fs-5 fw-semibold text-primary border-bottom pb-2 mb-3">Contact & Identity</legend>
//                 <div className="row">
//                     <div className="col-md-6 mb-3">
//                         <label className="form-label fw-semibold">Aadhaar Number (आधार संख्या)</label>
//                         <input type="text" className="form-control" value={aadhaar} onChange={(e) => handleAadhaarChange(e, setAadhaar)} required />
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <label className="form-label fw-semibold">Confirm Aadhaar Number(कन्फर्म आधार)</label>
//                         <input type="text" className="form-control" value={confirmAadhaar} onChange={(e) => handleAadhaarChange(e, setConfirmAadhaar)} required />
//                     </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Mobile Number (मोबाइल नंबर)</label>
//                   <input type="text" className="form-control" value={mobile} onChange={handleMobileChange} required />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Permanent Address (स्थायी पता)</label>
//                   <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} rows="3" required />
//                 </div>
//                 <div className="row">
//                   <div className="col-md-4 mb-3">
//                     <label className="form-label fw-semibold">Pincode (पिन कोड)</label>
//                     <input type="text" className="form-control" value={pincode} onChange={handlePincodeChange} required />
//                   </div>
//                   <div className="col-md-4 mb-3">
//                     <label className="form-label fw-semibold">State (राज्य)</label>
//                     <input type="text" className="form-control" value={state} readOnly placeholder="Auto-filled" />
//                   </div>
//                   <div className="col-md-4 mb-3">
//                     <label className="form-label fw-semibold">District (जिला)</label>
//                     <input type="text" className="form-control" value={district} readOnly placeholder="Auto-filled" />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Upload Photo (फोटो अपलोड करें)</label>
//                   <input type="file" className="form-control" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} required />
//                 </div>
//               </fieldset>
              
//               <button type="submit" className="btn btn-primary w-100 btn-lg fw-bold py-2">Register</button>
//             </form>
//           </div>
//         </div>
//       </main>
      
//       {/* ===== FOOTER ===== */}
//       <footer className="bg-dark text-white text-center py-3">
//         <div className="container">
//             <p className="mb-0">&copy; {new Date().getFullYear()} Content Owned by Ministry of Labour & Employment, Government of India.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Workerregistr;



import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../../api";

function Workerregistr() {
  const [name, setName] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skill, setSkill] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [confirmAadhaar, setConfirmAadhaar] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [temporaryAddress, setTemporaryAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [photo, setPhoto] = useState(null);
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name !== confirmName) { setError("❌ Names do not match!"); return; }
    if (password !== confirmPassword) { setError("❌ Passwords do not match!"); return; }
    if (aadhaar !== confirmAadhaar) { setError("❌ Aadhaar numbers do not match!"); return; }
    if (aadhaar.length !== 12) { setError("❌ Aadhaar must be 12 digits!"); return; }
    if (mobile.length !== 10) { setError("❌ Mobile number must be 10 digits!"); return; }
    if (pincode.length !== 6) { setError("❌ Pincode must be 6 digits!"); return; }
    if (!photo) { setError("❌ Please upload a photo!"); return; }
    if (!gender) { setError("❌ Please select gender!"); return; }

    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("jobTitle", jobTitle);
      formData.append("skill", skill);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", mobile); // mapped
      formData.append("gender", gender);
      formData.append("aadhaarNumber", aadhaar); // mapped
      formData.append("permanentAddress", address); // mapped
      formData.append("temporaryAddress", temporaryAddress); // optional
      formData.append("image", photo);

      const response = await api.post("/workers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message || "✅ Form submitted successfully!");
      // Optional: reset form
      setName(""); setConfirmName(""); setJobTitle(""); setSkill("");
      setEmail(""); setPassword(""); setConfirmPassword("");
      setAadhaar(""); setConfirmAadhaar(""); setMobile("");
      setAddress(""); setTemporaryAddress(""); setPincode("");
      setState(""); setDistrict(""); setPhoto(null); setGender("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Submission failed!");
    }
  };

  const handleAadhaarChange = (e, setter) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 12) setter(value);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setMobile(value);
  };

  const handlePincodeChange = async (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) setPincode(value);
    if (value.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
        const data = response.data[0];
        if (data.Status === "Success") {
          setState(data.PostOffice[0].State);
          setDistrict(data.PostOffice[0].District);
        } else {
          setState(""); setDistrict("");
        }
      } catch (err) {
        console.error("Error fetching PIN code data:", err);
        setState(""); setDistrict("");
      }
    } else { setState(""); setDistrict(""); }
  };

  return (
    <div className="bg-light">
      <header className="bg-white shadow-sm py-3 border-bottom border-success border-top border-warning border-5">
        <div className="container d-flex align-items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png" 
            alt="National Emblem of India" 
            style={{ height: '70px' }}
            className="me-3"
          />
          <div>
            <h1 className="fs-4 fw-bold text-primary mb-0">Government of Kerala</h1>
            <h2 className="fs-6 text-secondary">കേരള സർക്കാർ</h2>
          </div>
        </div>
      </header>

      <main className="container my-5">
        <div className="card shadow-lg border-0 rounded-3">
          <div className="card-body p-4 p-md-5">
            <h2 className="card-title text-center text-dark mb-2 fw-bold">Worker Registration Form</h2>
            <p className="card-subtitle text-center text-muted mb-4">श्रमिक पंजीकरण पोर्टल</p>
            
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}

              <fieldset className="mb-4">
                <legend className="fs-5 fw-semibold text-primary border-bottom pb-2 mb-3">Personal Details</legend>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name (पूरा नाम)</label>
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Confirm Name (नाम की पुष्टि करें)</label>
                  <input type="text" className="form-control" value={confirmName} onChange={(e) => setConfirmName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Date of Birth (जन्म की तारीख)</label>
                  <input type="date" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold me-3">Gender (लिंग)</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input type="radio" id="male" name="gender" value="Male" className="form-check-input" checked={gender==="Male"} onChange={(e)=>setGender(e.target.value)} />
                      <label htmlFor="male" className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="radio" id="female" name="gender" value="Female" className="form-check-input" checked={gender==="Female"} onChange={(e)=>setGender(e.target.value)} />
                      <label htmlFor="female" className="form-check-label">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="radio" id="other" name="gender" value="Other" className="form-check-input" checked={gender==="Other"} onChange={(e)=>setGender(e.target.value)} />
                      <label htmlFor="other" className="form-check-label">Other</label>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="mb-4">
                <legend className="fs-5 fw-semibold text-primary border-bottom pb-2 mb-3">Login Credentials</legend>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email(ईमेल)</label>
                  <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username(यूजरनेम)</label>
                  <input type="text" className="form-control" value={email} disabled placeholder="Using Email as Username" />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Password(पासवर्ड)</label>
                        <input type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Confirm Password(कन्फर्म पासवर्ड)</label>
                        <input type={showPassword ? "text" : "password"} className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" className="form-check-input" id="showPass" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                  <label className="form-check-label" htmlFor="showPass">Show Passwords(पासवर्ड दिखाएँ)</label>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Job Title (काम का शीर्षक)</label>
                  <input type="text" className="form-control" value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Skill (कौशल)</label>
                  <input type="text" className="form-control" value={skill} onChange={(e)=>setSkill(e.target.value)} required />
                </div>
              </fieldset>

              <fieldset className="mb-4">
                <legend className="fs-5 fw-semibold text-primary border-bottom pb-2 mb-3">Contact & Identity</legend>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Aadhaar Number (आधार संख्या)</label>
                        <input type="text" className="form-control" value={aadhaar} onChange={(e) => handleAadhaarChange(e, setAadhaar)} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Confirm Aadhaar Number(कन्फर्म आधार)</label>
                        <input type="text" className="form-control" value={confirmAadhaar} onChange={(e) => handleAadhaarChange(e, setConfirmAadhaar)} required />
                    </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Mobile Number (मोबाइल नंबर)</label>
                  <input type="text" className="form-control" value={mobile} onChange={handleMobileChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Permanent Address (स्थायी पता)</label>
                  <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} rows="3" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Temporary Address (अस्थायी पता)</label>
                  <textarea className="form-control" value={temporaryAddress} onChange={(e) => setTemporaryAddress(e.target.value)} rows="2" />
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Pincode (पिन कोड)</label>
                    <input type="text" className="form-control" value={pincode} onChange={handlePincodeChange} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">State (राज्य)</label>
                    <input type="text" className="form-control" value={state} readOnly placeholder="Auto-filled" />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">District (जिला)</label>
                    <input type="text" className="form-control" value={district} readOnly placeholder="Auto-filled" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Upload Photo (फोटो अपलोड करें)</label>
                  <input type="file" className="form-control" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} required />
                </div>
              </fieldset>

              <button type="submit" className="btn btn-primary w-100 btn-lg fw-bold py-2">Register</button>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
            <p className="mb-0">&copy; {new Date().getFullYear()} Content Owned by Ministry of Labour & Employment, Government of India.</p>
        </div>
      </footer>
    </div>
  );
}

export default Workerregistr;
