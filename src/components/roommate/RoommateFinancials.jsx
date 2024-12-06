import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import "./RoommateFinancials.css";

function RoommateFinancials({ groceryList, roommates }) {
  const navigate = useNavigate();
  const [completedPayments, setCompletedPayments] = useState(new Set());

  const handleBack = () => {
    navigate('/');
  };

  // Calculate total cost and per person share
  const total = groceryList.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const perPerson = total / roommates.length;

  // Calculate net balance for each person
  const balances = {};
  roommates.forEach(roommate => {
    balances[roommate] = 0;
  });

  // For each item:
  // - Buyer gets credited for the full amount
  // - Everyone (including buyer) pays their share
  groceryList.forEach(item => {
    const price = parseFloat(item.price);
    const share = price / roommates.length;

    // Credit the buyer
    balances[item.assignedTo] += price;

    // Debit everyone's share
    roommates.forEach(roommate => {
      balances[roommate] -= share;
    });
  });

  // Find the person with the highest positive balance to use as intermediary
  const sortedBalances = Object.entries(balances)
    .sort(([, a], [, b]) => b - a);
  const [intermediary] = sortedBalances[0];

  // Convert balances to a list of optimized transactions
  const breakdown = [];
  
  // First, have everyone with negative balance pay the intermediary
  sortedBalances.forEach(([person, balance]) => {
    if (balance < -0.01 && person !== intermediary) { // negative balance
      breakdown.push({
        from: person,
        to: intermediary,
        amount: Number(Math.abs(balance).toFixed(2))
      });
    }
  });

  // Then, have intermediary pay everyone with positive balance
  sortedBalances.forEach(([person, balance]) => {
    if (balance > 0.01 && person !== intermediary) { // positive balance
      breakdown.push({
        from: intermediary,
        to: person,
        amount: Number(balance.toFixed(2))
      });
    }
  });

  const calculateUpdatedBalances = (balances, completedPayments) => {
    const updatedBalances = { ...balances };
    
    completedPayments.forEach(paymentIndex => {
      const payment = breakdown[paymentIndex];
      if (payment) {
        updatedBalances[payment.from] += payment.amount;
        updatedBalances[payment.to] -= payment.amount;
      }
    });

    return updatedBalances;
  };

  const updatedBalances = calculateUpdatedBalances(balances, completedPayments);
  const finalSortedBalances = Object.entries(updatedBalances)
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
  const pendingPayments = breakdown.filter((_, index) => !completedPayments.has(index));
  const completedPaymentsList = breakdown.filter((_, index) => completedPayments.has(index));

  return (
    <div className="expenses-section">
      <div className="expenses-header">
        <button onClick={handleBack} className="back-button">←</button>
        <div className="header-title">
          Roommate Expenses
        </div>
      </div>

      <div className="total-container">
        <div className="total-icon">🏠</div>
        <div className="total-text">
          ${total.toFixed(2)}
          <div className="total-label">Total</div>
        </div>
        <div className="per-person-text">
          ${perPerson.toFixed(2)} per person
        </div>
      </div>

      <div className="balances-list">
        <h3>Net Balances</h3>
        {finalSortedBalances.map(([name, balance]) => (
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
            onClick={() => handlePaymentClick(breakdown.indexOf(transaction))}
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
              onClick={() => handlePaymentClick(breakdown.indexOf(transaction))}
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

RoommateFinancials.propTypes = {
  groceryList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
      have: PropTypes.bool.isRequired,
      assignedTo: PropTypes.string.isRequired
    })
  ).isRequired,
  roommates: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RoommateFinancials; 