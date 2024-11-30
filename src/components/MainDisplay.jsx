import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import events from "../data/events";
import "./MainDisplay.css";

function MainDisplay() {
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
    navigate(`/event/${events[currentIndex].id}`);
  };

  const handleEventClickCal = () => {
    navigate(`/calendar/`);
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

      <button className="new-event-button">
        <span className="plus-icon">+</span>
        New Event
      </button>

      <div className="section-title">
        <div className="title-line"></div>
        <div className="title-text">Roommates</div>
        <div className="title-line"></div>
      </div>

      <div className="nav-buttons">
        <button className="nav-button financials">
          <span className="icon">$</span>
          Financials
        </button>
        <button className="nav-button grocery">
          <span className="icon">≡</span>
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

export default MainDisplay;