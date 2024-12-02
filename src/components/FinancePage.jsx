import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FinanceCard from './FinanceCard';
import './FinancePage.css';

const FinancePage = ({ events }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log('FinancePage: Starting navigation...');
    navigate("/");
    console.log('FinancePage: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('FinancePage: Root element:', root);
      console.log('FinancePage: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('FinancePage: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  const handleExpenseClick = (eventId) => {
    console.log('FinancePage: Starting expense navigation...');
    navigate(`/event/${eventId}/expenses`);
    console.log('FinancePage: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('FinancePage: Root element:', root);
      console.log('FinancePage: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('FinancePage: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  return (
    <div className="finance-page">
      <header className="event-header">
        <button onClick={handleBack} className="back-button">←</button>
        <div className="event-date-container">
          <div className="event-date">Financials</div>
        </div>
      </header>

      <div className="events-list">
        {events.map((event, index) => (
          <div 
            key={event.id} 
            onClick={() => handleExpenseClick(event.id)}
            className="event-link"
          >
            <FinanceCard
              event={event}
              slideDirection={index % 2 === 0 ? 'slide-left' : 'slide-right'}
            />
          </div>
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