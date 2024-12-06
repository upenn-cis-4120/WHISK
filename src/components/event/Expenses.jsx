import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { calculateExpenses } from "../../utils/expenseCalculator";
import "./Expenses.css";

function Expenses({ events }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const eventData = events.find(e => e.id === parseInt(id));
  const [completedPayments, setCompletedPayments] = useState(new Set());

  const handleBack = () => {
    navigate(`/event/${id}`);
    setTimeout(() => {
      const root = document.getElementById('root');
      if (root) {
        root.scrollTo(0, 0);
      }
    }, 0);
  };

  const calculateUpdatedBalances = (expenses, completedPayments) => {
    // Start with initial balances from expenses
    const balances = { ...expenses.balances };
    
    // Adjust balances based on completed payments
    completedPayments.forEach(paymentIndex => {
      const payment = expenses.breakdown[paymentIndex];
      if (payment) {
        // When a payment is completed, reduce the amount owed by the payer
        // and reduce the amount to be received by the payee
        balances[payment.from] += payment.amount;
        balances[payment.to] -= payment.amount;
      }
    });

    return balances;
  };

  if (!eventData) {
    return <div>Event not found</div>;
  }

  const expenses = calculateExpenses(eventData);
  const updatedBalances = calculateUpdatedBalances(expenses, completedPayments);

  // Sort balances by amount (positive first)
  const sortedBalances = Object.entries(updatedBalances)
    .sort(([, a], [, b]) => b - a);

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

  const handlePaymentClick = (index) => {
    setCompletedPayments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Filter payments into pending and completed
  const pendingPayments = expenses.breakdown.filter((_, index) => !completedPayments.has(index));
  const completedPaymentsList = expenses.breakdown.filter((_, index) => completedPayments.has(index));

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
        {pendingPayments.map((transaction, index) => (
          <div 
            key={index} 
            className="expense-row"
            onClick={() => handlePaymentClick(expenses.breakdown.indexOf(transaction))}
            data-action="Complete Payment"
          >
            <div className="expense-item">
              <div className="person-info">
                <span className="person-name">
                  {getFirstName(transaction.from)} → {getFirstName(transaction.to)}
                </span>
              </div>
              <span className="person-amount">${transaction.amount}</span>
            </div>
          </div>
        ))}
        {pendingPayments.length === 0 && (
          <div className="no-payments">
            All payments completed! 🎉
          </div>
        )}
      </div>

      {completedPaymentsList.length > 0 && (
        <div className="completed-payments">
          <h3>Completed Payments</h3>
          {completedPaymentsList.map((transaction, index) => (
            <div 
              key={index} 
              className="expense-row completed"
              onClick={() => handlePaymentClick(expenses.breakdown.indexOf(transaction))}
              data-action="Mark as Unresolved"
            >
              <div className="expense-item">
                <div className="person-info">
                  <span className="person-name">
                    {getFirstName(transaction.from)} → {getFirstName(transaction.to)}
                  </span>
                </div>
                <span className="person-amount">${transaction.amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
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