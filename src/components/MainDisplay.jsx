import React from 'react';
import CloudIcon from './CloudIcon';

const MainDisplay = () => {
  return (
    <div className="main-display">
      <div className="side-data left-data">
        <div className="data-item">
          <span className="label">Rain</span>
          <div className="rain-chance">0%</div>
        </div>
        <div className="data-item">
          <span className="label">UV Index</span>
          <div className="uv-index">HIGH</div>
        </div>
      </div>
      <div className="temperature">
        <h2 className="current-temp">
          68°
        </h2>
        <div className="temp-range">
          <span className="low">52°</span> <span className="high">72°</span>
        </div>
      </div>
      <div className="side-data right-data">
        <div className="data-item">
          <span className="label">Conditions</span>
          <div className="conditions">
            <CloudIcon/>
          </div>
        </div>
        <div className="data-item">
          <span className="label">Feels Like</span>
          <div className="feels-like">71°</div>
        </div>
      </div>
    </div>
  );
};

export default MainDisplay;