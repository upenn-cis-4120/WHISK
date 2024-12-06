import React from "react";
import PropTypes from "prop-types";
import { getEventOutstanding } from "../utils/expenseCalculator";
import "./EventCard.css";

function EventCard({ event }) {
  const outstanding = getEventOutstanding(event);

  return (
    <div className="event-card">
      <h2 className="date-header">{event.date}</h2>
      <div className="stats-container">
        <div className="stat-box guests">
          <span className="stat-number">{event.stats.guests}</span>
          <span className="stat-label">Guests</span>
        </div>
        <div className="stat-box outstanding">
          <span className="stat-number">${outstanding}</span>
          <span className="stat-label">Outstanding</span>
        </div>
        <div className="stat-box alerts">
          <span className="stat-number">{event.stats.alerts}</span>
          <span className="stat-label">Alerts</span>
        </div>
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    date: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      guests: PropTypes.number.isRequired,
      alerts: PropTypes.number.isRequired
    }).isRequired,
    groceries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        have: PropTypes.bool.isRequired,
        assignedTo: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default EventCard;



// import PropTypes from "prop-types";
// import "./EventCard.css";

// function EventCard({ event, slideDirection }) {
//   return (
//     <div className={`event-card ${slideDirection}`}>
//       <h2 className="date-header">{event.date}</h2>
//       <div className="stats-container">
//         <div className="stat-box guests">
//           <span className="stat-number">{event.stats.guests}</span>
//           <span className="stat-label">Guests</span>
//         </div>
//         <div className="stat-box outstanding">
//           <span className="stat-number">${event.stats.outstanding}</span>
//           <span className="stat-label">Outstanding</span>
//         </div>
//         <div className="stat-box alerts">
//           <span className="stat-number">{event.stats.alerts}</span>
//           <span className="stat-label">Alerts</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// EventCard.propTypes = {
//   event: PropTypes.shape({
//     date: PropTypes.string.isRequired,
//     stats: PropTypes.shape({
//       guests: PropTypes.number.isRequired,
//       outstanding: PropTypes.number.isRequired,
//       alerts: PropTypes.number.isRequired
//     }).isRequired
//   }).isRequired,
//   slideDirection: PropTypes.string
// };

// export default EventCard; 