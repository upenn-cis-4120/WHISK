import { useState } from "react";
import PropTypes from "prop-types";
import "./GuestList.css";

function GuestList({ guests, onAddGuest, onDeleteGuest }) {
  const [isModifying, setIsModifying] = useState(false);
  const [guestInput, setGuestInput] = useState({ name: "", phone: "" });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setGuestInput(prev => ({
      ...prev,
      [id === "guestName" ? "name" : "phone"]: value
    }));
  };

  const handleAddGuest = () => {
    if (guestInput.name && guestInput.phone) {
      onAddGuest({
        id: Date.now(),
        name: guestInput.name,
        phone: guestInput.phone,
        hasResponded: false
      });
      setGuestInput({ name: "", phone: "" });
    }
  };

  return (
    <div className="guest-list-container">
      <div className="guest-list-header">
        <h2>Guest List</h2>
        <button 
          className={`invite-others-btn ${isModifying ? 'active' : ''}`}
          onClick={() => setIsModifying(!isModifying)}
        >
          {isModifying ? (
            <span className="close-icon">×</span>
          ) : (
            <>
              <span>✎</span> Modify List
            </>
          )}
        </button>
      </div>

      {isModifying && (
        <div className="invite-form">
          <input
            type="text"
            id="guestName"
            placeholder="Guest Name"
            value={guestInput.name}
            onChange={handleInputChange}
            className="invite-input"
          />
          <input
            type="tel"
            id="guestPhone"
            placeholder="Phone Number"
            value={guestInput.phone}
            onChange={handleInputChange}
            className="invite-input"
          />
          <button 
            onClick={handleAddGuest}
            className="add-guest-btn"
          >
            Add Guest
          </button>
        </div>
      )}

      <div className="guests-list">
        {guests.map((guest) => (
          <div key={guest.id} className="guest-item">
            <div className="guest-info">
              <div className="guest-avatar">
                <span>{guest.name.charAt(0)}</span>
              </div>
              <span className="guest-name">{guest.name}</span>
              <span className="guest-phone">{guest.phone}</span>
            </div>
            <div className="guest-actions">
              {isModifying ? (
                <button 
                  className="action-btn delete"
                  onClick={() => onDeleteGuest(guest.id)}
                >
                  🗑️
                </button>
              ) : (
                <>
                  <button className="action-btn chat">💬</button>
                  <button className="action-btn call">📞</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

GuestList.propTypes = {
  guests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      hasResponded: PropTypes.bool.isRequired
    })
  ).isRequired,
  onAddGuest: PropTypes.func.isRequired,
  onDeleteGuest: PropTypes.func.isRequired
};

export default GuestList; 