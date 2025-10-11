import React from 'react'
import "./Compandfedbk.css";

export default function Compandfedbk() {
  return (
    <div>
       <div className="complaints-feedback-container">
      <h2>Complaints & Feedback (Admin Page)</h2>

      {/* Complaints Section */}
      <section className="section-box">
        <h3>User Complaints Against Workers</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Worker</th>
              <th>Complaint</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Amit Kumar</td>
              <td>Ravi (Plumber)</td>
              <td>Did not complete the work on time.</td>
              <td><span className="status pending">Pending</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Neha Singh</td>
              <td>Sunil (Electrician)</td>
              <td>Charged extra money than agreed.</td>
              <td><span className="status resolved">Resolved</span></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Feedback Section */}
      <section className="section-box">
        <h3>User Feedback About Workers</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Worker</th>
              <th>Feedback</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Rohit Verma</td>
              <td>Anil (Painter)</td>
              <td>Very professional and quick service.</td>
              <td>⭐⭐⭐⭐⭐</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Priya Sharma</td>
              <td>Mahesh (Carpenter)</td>
              <td>Good work but a bit slow.</td>
              <td>⭐⭐⭐</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Household Tools Renting Section */}
      <section className="section-box">
        <h3>Household Tools Renting (From Shops)</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Shop</th>
              <th>Tool</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Rajesh</td>
              <td>ABC Hardware Store</td>
              <td>Drill Machine</td>
              <td>Worked perfectly, reasonable price.</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Meena</td>
              <td>XYZ Tools & Rentals</td>
              <td>Ladder</td>
              <td>Ladder was old and shaky.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    </div>
  )
}
