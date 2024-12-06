import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { calculateExpenses } from "../../utils/expenseCalculator";
import "./Expenses.css";

function Expenses({ events }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const eventData = events.find(e => e.id === parseInt(id));

  const handleBack = () => {
    console.log('Expenses: Starting navigation...');
    navigate(`/event/${id}`);
    console.log('Expenses: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('Expenses: Root element:', root);
      console.log('Expenses: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('Expenses: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  if (!eventData) {
    return <div>Event not found</div>;
  }

  const expenses = calculateExpenses(eventData);

  // Sort balances by amount (positive first)
  const sortedBalances = Object.entries(expenses.balances)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="expenses-section">
      <div className="expenses-header">
        <button onClick={handleBack} className="back-button">←</button>
        <div className="header-title">
          {eventData.date} Expenses
        </div>
      </div>

      <div className="total-container">
        <div className="total-icon">🍽️</div>
        <div className="total-text">
          ${expenses.total}
          <div className="total-label">Total</div>
        </div>
        <div className="per-person-text">
          ${expenses.perPerson} per person
        </div>
      </div>

      <div className="balances-list">
        <h3>Net Balances</h3>
        {sortedBalances.map(([name, balance]) => (
          <div key={name} className={`balance-row ${balance > 0 ? 'positive' : 'negative'}`}>
            <div className="person-info">
              <div className="person-avatar">
                {name.charAt(0)}
              </div>
              <span className="person-name">{name}</span>
            </div>
            <span className="balance-amount">
              {balance > 0 ? '+' : ''}{balance.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="expense-list">
        <h3>Required Payments</h3>
        {expenses.breakdown.map((transaction, index) => (
          <div key={index} className="expense-row">
            <div className="expense-item">
              <div className="person-info">
                <div className="person-avatar">
                  {transaction.from.charAt(0)}
                </div>
                <span className="person-name">
                  {transaction.from} → {transaction.to}
                </span>
              </div>
              <span className="person-amount">${transaction.amount}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="add-payment-button">
        <div className="button-avatar">+</div>
        <span>Record Payment</span>
      </button>
    </div>
  );
}

Expenses.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      guests: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        })
      ).isRequired,
      groceries: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.string.isRequired,
          quantity: PropTypes.string.isRequired,
          have: PropTypes.bool.isRequired,
          assignedTo: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired
};

export default Expenses; 