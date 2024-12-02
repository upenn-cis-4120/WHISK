import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import EventCard from "./EventCard";
import "./MainDisplay.css";

function MainDisplay({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    setSlideDirection("slide-left");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
      setSlideDirection("");
    }, 300);
  };

  const handlePrev = () => {
    setSlideDirection("slide-right");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
      setSlideDirection("");
    }, 300);
  };

  const handleEventClick = () => {
    console.log('MainDisplay: Starting event navigation...');
    navigate(`/event/${events[currentIndex].id}`);
    console.log('MainDisplay: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('MainDisplay: Root element:', root);
      console.log('MainDisplay: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('MainDisplay: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  const handleEventClickCal = () => {
    console.log('MainDisplay: Starting calendar navigation...');
    navigate(`/calendar/`);
    console.log('MainDisplay: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('MainDisplay: Root element:', root);
      console.log('MainDisplay: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('MainDisplay: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  const handleEventClickFinance = () => {
    console.log('MainDisplay: Starting finance navigation...');
    navigate(`/finance/`);
    console.log('MainDisplay: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('MainDisplay: Root element:', root);
      console.log('MainDisplay: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('MainDisplay: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  const handleNewEvent = () => {
    console.log('MainDisplay: Starting new event navigation...');
    navigate("/create-event");
    console.log('MainDisplay: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('MainDisplay: Root element:', root);
      console.log('MainDisplay: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('MainDisplay: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  return (
    <main className="main-display">
      <div className="section-title">
        <div className="title-line"></div>
        <div className="title-text">Events</div>
        <div className="title-line"></div>
      </div>

      <div className="event-section">
        <button className="nav-arrow left" onClick={handlePrev}>←</button>
        <div onClick={handleEventClick}>
          <EventCard 
            event={events[currentIndex]} 
            slideDirection={slideDirection}
          />
        </div>
        <button className="nav-arrow right" onClick={handleNext}>→</button>
      </div>

      <button className="new-event-button" onClick={handleNewEvent}>
        <span className="plus-icon">+</span>
        New Event
      </button>

      <div className="section-divider"></div>

      <div className="section-title">
        <div className="title-line"></div>
        <div className="title-text">Roommates</div>
        <div className="title-line"></div>
      </div>

      <div className="nav-buttons">
        <button className="nav-button financials" onClick={handleEventClickFinance}>
          <span className="icon">$</span>
          Financials
        </button>
        <button className="nav-button grocery">
          <span className="icon">🛒</span>
          Grocery List
        </button>
        <button className="nav-button calendar" onClick={handleEventClickCal}>
          <span className="icon">📅</span>
          Calendar
        </button>
      </div>
    </main>
  );
}

MainDisplay.propTypes = {
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

export default MainDisplay;