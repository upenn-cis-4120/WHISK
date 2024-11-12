import PropTypes from "prop-types";
import "./Expenses.css";

function Expenses({ expenses }) {
  return (
    <div className="expenses-section">
      <div className="section-header">
        <h2>Recipe & Expenses</h2>
      </div>

      <div className="expenses-container">
        <div className="expense-icon">🍽️</div>
        <div className="expense-details">
          <div className="expense-amount">
            ${expenses.total}
            <span className="expense-label">Outstanding</span>
          </div>
        </div>
      </div>

      <div className="expense-breakdown">
        {expenses.breakdown.map((person, index) => (
          <div key={index} className={`expense-item ${person.paid ? 'paid' : 'unpaid'}`}>
            <div className="person-info">
              <div className="person-icon">
                {person.name.charAt(0)}
              </div>
              <span className="person-name">{person.name}</span>
            </div>
            <span className="person-amount">${person.amount}</span>
          </div>
        ))}
      </div>

      <button className="add-expense-button">
        <span className="plus-icon">+</span>
        <span>Paid by:</span>
        <span className="amount-placeholder">$___</span>
      </button>
    </div>
  );
}

Expenses.propTypes = {
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
};

export default Expenses; 