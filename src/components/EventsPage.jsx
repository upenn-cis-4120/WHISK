import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';
import PropTypes from 'prop-types';

const EventsPage = ({ events }) => {
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    console.log('EventsPage: Starting navigation...');
    navigate(`/event/${eventId}`);
    console.log('EventsPage: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('EventsPage: Root element:', root);
      console.log('EventsPage: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('EventsPage: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  return (
    <div className="events-page">
      <h1 className="page-title">All Events</h1>
      <div className="events-list">
        {events.map((event, index) => (
          <div 
            key={event.id} 
            onClick={() => handleEventClick(event.id)}
            className="event-link"
          >
            <EventCard 
              event={event}
              slideDirection={index % 2 === 0 ? 'slide-left' : 'slide-right'}
            />
          </div>
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