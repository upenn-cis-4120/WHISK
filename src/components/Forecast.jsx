import React, { useState } from "react";

const forecastData = [
  { date: "9/9", icon: "Sunny", low: 71, high: 99 },
  { date: "9/10", icon: "Cloudy", low: 63, high: 91 },
  { date: "9/11", icon: "Sunny", low: 81, high: 99 },
  { date: "9/12", icon: "Sunny", low: 72, high: 100 },
];

// Button functionality was generated using chatgpt
const Forecast = () => {
  const [activeTab, setActiveTab] = useState("7-day");

  const tabs = ["3-day", "7-day", "10-day", "30-day"];

  return (
    <div className="forecast">
      <div className="forecast-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <table className="forecast-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weather</th>
            <th>Low</th>
            <th>High</th>
          </tr>
        </thead>
        <tbody>
          {forecastData.map((day) => (
            <tr key={day.date}>
              <td>{day.date}</td>
              <td>{day.icon}</td>
              <td>{day.low}°F</td>
              <td>{day.high}°F</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Forecast;