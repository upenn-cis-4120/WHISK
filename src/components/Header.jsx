import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="time-location">
        <span className="time">5:17</span>
      </div>
      <h1 className="city">Santa Clara</h1>
      <div className="status-icons">
        <svg className="signal" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 20h20v2H2v-2zm2-8h2v6H4v-6zm4-4h2v10H8V8zm4-4h2v14h-2V4zm4 4h2v10h-2V8zm4 4h2v6h-2v-6z" fill="currentColor"/>
        </svg>
        <span className="network">5G</span>
        <svg className="battery" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 6H3a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2zm0 10H3V8h14v8zm6-4h-1V8h1v4z" fill="currentColor"/>
        </svg>
      </div>
    </header>
  );
};

export default Header;