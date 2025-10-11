import React from "react";
import "./WorkerPayement.css";

export default function WorkerPayment() {
  // Example payment history data
  const paymentHistory = [
    {
      payer: "Metro Construction Ltd.",
      amount: "₹15,000",
      transactionId: "TXN12345678",
      dateTime: "2025-05-10 10:30 AM",
    },
    {
      payer: "Green Builders",
      amount: "₹20,000",
      transactionId: "TXN87654321",
      dateTime: "2024-12-05 02:15 PM",
    },
    {
      payer: "Urban Infra Pvt Ltd.",
      amount: "₹12,500",
      transactionId: "TXN56781234",
      dateTime: "2024-06-20 11:00 AM",
    },
  ];

  return (
    <div className="payment-history-container">
      <h2>Payment History</h2>
      <table className="payment-history-table">
        <thead>
          <tr>
            <th>Payer</th>
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment, index) => (
            <tr key={index}>
              <td>{payment.payer}</td>
              <td>{payment.amount}</td>
              <td>{payment.transactionId}</td>
              <td>{payment.dateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
