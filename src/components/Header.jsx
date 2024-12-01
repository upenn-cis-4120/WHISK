import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate("/");
  };

  return (
    <div className="header" onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
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
    </div>
  );
}

export default Header;