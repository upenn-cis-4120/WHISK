import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import "./Expenses.css";

function Expenses({ events }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const eventData = events.find(e => e.id === parseInt(id));

  if (!eventData) {
    return <div>Event not found</div>;
  }

  const { expenses } = eventData;

  return (
    <div className="expenses-section">
      <div className="expenses-header">
        <button onClick={() => navigate(`/event/${id}`)} className="back-button">←</button>
        <div className="header-title">
          {eventData.date} Expenses
        </div>
      </div>

      <div className="total-container">
        <div className="total-icon">🍽️</div>
        <div className="total-text">
          ${expenses.total}
          <div className="total-label">Outstanding</div>
        </div>
      </div>

      <div className="expense-list">
        {expenses.breakdown.map((person, index) => (
          <div key={index} className="expense-row">
            <div className={`expense-item ${person.paid ? 'checked' : ''}`}>
              <div className="person-info">
                <div className="person-avatar">
                  {person.name.charAt(0)}
                </div>
                <span className="person-name">{person.name}</span>
              </div>
              <span className="person-amount">${person.amount}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="add-payment-button">
        <div className="button-avatar">+</div>
        <span>Paid by:</span>
        <span className="amount-placeholder">$___</span>
      </button>
    </div>
  );
}

Expenses.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      expenses: PropTypes.shape({
        total: PropTypes.number.isRequired,
        perPerson: PropTypes.number.isRequired,
        breakdown: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            paid: PropTypes.bool.isRequired
          })
        ).isRequired
      }).isRequired
    })
  ).isRequired
};

export default Expenses; 