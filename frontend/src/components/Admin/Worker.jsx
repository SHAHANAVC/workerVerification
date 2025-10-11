import React from 'react'
import './Worker.css'

function Worker() {
  return (
    <div className="manage-worker-container">
      <h2>Manage Interstate Workers (Admin Page)</h2>

      {/* Add Worker Form */}
      <form className="worker-form">
        <input type="text" placeholder="Enter worker name" />
        <input type="text" placeholder="Enter worker state" />
        <input type="text" placeholder="Enter job role" />
        <button type="button">Add Worker</button>
      </form>

      {/* Worker List Table */}
      <table className="worker-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Worker Name</th>
            <th>State</th>
            <th>Job Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Rows */}
          <tr>
            <td>1</td>
            <td>Kaushik priju</td>
            <td>Tamil Nadu</td>
            <td>singer</td>
            <td><button className="delete-btn">Delete</button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Sourav suran</td>
            <td>bengal</td>
            <td>bodyshow</td>
            <td><button className="delete-btn">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  
}

export default Worker
