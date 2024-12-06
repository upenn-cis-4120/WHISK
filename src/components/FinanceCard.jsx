import React from "react";
import PropTypes from "prop-types";
import { getEventOutstanding } from "../utils/expenseCalculator";
import "./FinanceCard.css";

function FinanceCard({ event }) {
  const outstanding = getEventOutstanding(event);
  const unpaidCount = event.guests.filter(guest => {
    // Check if this guest has any items they need to pay for
    const guestItems = event.groceries.filter(item => item.assignedTo === guest.name);
    const guestTotal = guestItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    return guestTotal > 0;
  }).length;

  return (
    <div className="finance-card">
      <h2 className="date-header">{event.date}</h2>
      <div className="stats-container">
        <div className="stat-box guests">
          <span className="stat-number">{unpaidCount}</span>
          <span className="stat-label">Yet to Pay</span>
        </div>
        <div className="stat-box outstanding">
          <span className="stat-number">${outstanding}</span>
          <span className="stat-label">Outstanding</span>
        </div>
      </div>
    </div>
  );
}

FinanceCard.propTypes = {
  event: PropTypes.shape({
    date: PropTypes.string.isRequired,
    guests: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    groceries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        assignedTo: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default FinanceCard;
