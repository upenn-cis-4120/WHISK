import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="whisk-text">WHISK</div>
        <div className="whisk-handle"></div>
        <div className="whisk-stem"></div>
        <div className="whisk-line line1"></div>
        <div className="whisk-line line2"></div>
        <div className="whisk-line line3"></div>
        <div className="whisk-line line4"></div>
        <div className="whisk-underline line5"></div>
        <div className="whisk-underline line6"></div>
      </div>
    </header>
  );
}

export default Header;