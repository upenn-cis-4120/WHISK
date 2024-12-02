import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FinanceCard from './FinanceCard';
import './FinancePage.css';

const FinancePage = ({ events }) => {
  const navigate = useNavigate();

  return (
    <div className="finance-page">
      <header className="event-header">
        <button onClick={() => navigate("/")} className="back-button">←</button>
        <div className="event-date-container">
          <div className="event-date">Financials</div>
        </div>
      </header>

      <div className="events-list">
        {events.map((event, index) => (
          <Link 
            key={event.id} 
            to={`/event/${event.id}/expenses`}
            className="event-link"
          >
            <FinanceCard
              event={event}
              slideDirection={index % 2 === 0 ? 'slide-left' : 'slide-right'}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

FinancePage.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      stats: PropTypes.shape({
        guests: PropTypes.number.isRequired,
        outstanding: PropTypes.number.isRequired,
        alerts: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired
};

export default FinancePage;