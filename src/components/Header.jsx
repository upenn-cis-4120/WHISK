import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    console.log('Header: Starting navigation...');
    navigate("/");
    console.log('Header: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('Header: Root element:', root);
      console.log('Header: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('Header: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
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