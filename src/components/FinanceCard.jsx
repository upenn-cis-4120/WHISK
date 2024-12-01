import React from "react";
import "./FinanceCard.css";

function FinanceCard({ event }) {
  return (
    <div className="finance-card">
      <h2 className="date-header">{event.date}</h2>
      <div className="stats-container">
        <div className="stat-box guests">
          <span className="stat-number">{event.stats.guests - 1}</span>
          <span className="stat-label">Yet to Pay</span>
        </div>
        <div className="stat-box outstanding">
          <span className="stat-number">${event.stats.outstanding}</span>
          <span className="stat-label">Outstanding</span>
        </div>
      </div>
    </div>
  );
}

export default FinanceCard;
