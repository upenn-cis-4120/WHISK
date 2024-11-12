import { useState } from "react";
import "./MainDisplay.css";

function MainDisplay() {
  const [currentDate] = useState("Monday, Oct 28th");
  
  return (
    <main className="main-display">
      {/* Events Section */}
      <div className="section-title">
        <div className="title-line"></div>
        <div className="title-text">Events</div>
        <div className="title-line"></div>
      </div>

      <div className="event-section">
        <button className="nav-arrow left">←</button>
        
        <div className="event-card">
          <h2 className="date-header">{currentDate}</h2>
          <div className="stats-container">
            <div className="stat-box guests">
              <span className="stat-number">4</span>
              <span className="stat-label">Guests</span>
            </div>
            <div className="stat-box outstanding">
              <span className="stat-number">$32</span>
              <span className="stat-label">Outstanding</span>
            </div>
            <div className="stat-box alerts">
              <span className="stat-number">2</span>
              <span className="stat-label">Alerts</span>
            </div>
          </div>
        </div>

        <button className="nav-arrow right">→</button>
      </div>

      <button className="new-event-button">
        <span className="plus-icon">+</span>
        New Event
      </button>

      {/* Roommates Section */}
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
        <button className="nav-button calendar">
          <span className="icon">📅</span>
          Calendar
        </button>
      </div>
    </main>
  );
}

export default MainDisplay;