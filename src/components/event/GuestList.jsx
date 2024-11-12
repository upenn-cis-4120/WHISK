import PropTypes from "prop-types";
import "./GuestList.css";

function GuestList({ guests }) {
  return (
    <div className="guest-list-container">
      <div className="guest-list-header">
        <h2>Guest List</h2>
        <button className="invite-others-btn">
          <span>+</span> Invite Others
        </button>
      </div>

      <div className="guests-list">
        {guests.map((guest) => (
          <div key={guest.id} className="guest-item">
            <div className="guest-info">
              <div className="guest-avatar">
                <span>{guest.name.charAt(0)}</span>
              </div>
              <span className="guest-name">{guest.name}</span>
            </div>
            <div className="guest-actions">
              <button className="action-btn chat">💬</button>
              <button className="action-btn call">📞</button>
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
  ).isRequired
};

export default GuestList; 