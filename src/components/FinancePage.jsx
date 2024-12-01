

import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import PropTypes from 'prop-types';
import FinanceCard from './FinanceCard';

const EventsPage = ({ events }) => {
  return (
    <div className="events-page">
      <h1 className="page-title">Financials</h1>
      <div className="events-list">
        {events.map((event, index) => (
          <Link 
            key={event.id} 
            to={`/event/${event.id}`}
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

EventsPage.propTypes = {
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

export default EventsPage;