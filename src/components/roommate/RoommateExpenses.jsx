import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./RoommateExpenses.css";

function RoommateExpenses({ expenses, members, onAddExpense, onToggleSettled }) {
  const navigate = useNavigate();
  const [completedPayments, setCompletedPayments] = useState(new Set());
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    paidBy: members[0].name,
    type: "bill"
  });

  // Reset completedPayments when expenses change
  useEffect(() => {
    setCompletedPayments(new Set());
  }, [expenses]);

  const handleBack = () => {
    console.log('RoommateExpenses: Starting navigation...');
    navigate("/finance");
    console.log('RoommateExpenses: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('RoommateExpenses: Root element:', root);
      console.log('RoommateExpenses: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('RoommateExpenses: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  // Calculate total cost and per person share for unsettled expenses
  const unsettledExpenses = expenses.filter(expense => !expense.settled);
  const total = unsettledExpenses.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  const perPerson = total / members.length;

  // Calculate net balance for each person
  const balances = {};
  members.forEach(member => {
    balances[member.name] = 0;
  });

  // For each unsettled expense:
  // - Payer gets credited for the full amount
  // - Everyone (including payer) pays their share
  unsettledExpenses.forEach(expense => {
    const amount = parseFloat(expense.amount);
    const share = amount / members.length;

    // Credit the payer for the full amount
    balances[expense.paidBy] += amount;

    // Debit everyone's share (including the payer)
    members.forEach(member => {
      balances[member.name] -= share;
    });
  });

  // Find the person with the highest positive balance to use as intermediary
  const sortedBalances = Object.entries(balances)
    .sort(([, a], [, b]) => b - a);
  const [intermediary] = sortedBalances[0] || [members[0].name, 0];

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

  // Apply completed payments as offsets to balances
  const adjustedBalances = { ...balances };
  completedPayments.forEach(index => {
    const payment = breakdown[index];
    if (payment) {
      adjustedBalances[payment.from] += payment.amount;
      adjustedBalances[payment.to] -= payment.amount;
    }
  });

  // Filter payments to only show those that haven't been completed
  const pendingPayments = breakdown.filter((_, index) => !completedPayments.has(index));
  const completedPaymentsList = breakdown.filter((_, index) => completedPayments.has(index));

  // Sort balances by amount (positive first) after applying offsets
  const sortedAdjustedBalances = Object.entries(adjustedBalances)
    .sort(([, a], [, b]) => b - a);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.paidBy) {
      const expense = {
        ...newExpense,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        settled: false
      };
      onAddExpense(expense);
      setNewExpense({
        description: "",
        amount: "",
        paidBy: members[0].name,
        type: "bill"
      });
      setIsAddingExpense(false);
    }
  };

  const handleSettleExpense = (expenseId) => {
    // Reset completedPayments when settling an expense
    setCompletedPayments(new Set());
    onToggleSettled(expenseId);
  };

  const getExpenseIcon = (type) => {
    switch (type) {
      case "bill": return "📄";
      case "subscription": return "🔄";
      case "grocery": return "🛒";
      default: return "💰";
    }
  };

  // Sort expenses by date, with unsettled first
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (a.settled !== b.settled) {
      return a.settled ? 1 : -1;
    }
    return new Date(b.date) - new Date(a.date);
  });

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
        {sortedAdjustedBalances.map(([name, balance]) => (
          <div key={name} className={`balance-row ${balance > 0 ? 'positive' : 'negative'}`}>
            <div className="person-info">
              <div 
                className="person-avatar"
                style={{ 
                  background: members.find(m => m.name === name)?.color || 'var(--primary-bg)' 
                }}
              >
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
                  {transaction.from} → {transaction.to}
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
                    {transaction.from} → {transaction.to}
                  </span>
                </div>
                <span className="person-amount">${transaction.amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="expense-list recent-expenses">
        <div className="expense-list-header">
          <h3>Recent Expenses</h3>
          <button 
            className="add-expense-button"
            onClick={() => setIsAddingExpense(!isAddingExpense)}
          >
            {isAddingExpense ? "Cancel" : "+ Add Expense"}
          </button>
        </div>

        {isAddingExpense && (
          <div className="add-expense-form">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newExpense.description}
              onChange={handleInputChange}
              className="expense-input"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              className="expense-input"
              step="0.01"
            />
            <select
              name="paidBy"
              value={newExpense.paidBy}
              onChange={handleInputChange}
              className="expense-input"
            >
              {members.map(member => (
                <option key={member.id} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
            <select
              name="type"
              value={newExpense.type}
              onChange={handleInputChange}
              className="expense-input"
            >
              <option value="bill">Bill</option>
              <option value="subscription">Subscription</option>
              <option value="grocery">Grocery</option>
              <option value="other">Other</option>
            </select>
            <button 
              onClick={handleAddExpense}
              className="add-expense-submit"
            >
              Add Expense
            </button>
          </div>
        )}

        {sortedExpenses.map((expense) => (
          <div 
            key={expense.id} 
            className={`expense-row ${expense.settled ? 'settled' : ''}`}
            onClick={() => handleSettleExpense(expense.id)}
            data-action={expense.settled ? "Mark as Unsettled" : "Mark as Settled"}
          >
            <div className="expense-item">
              <div className="person-info">
                <div 
                  className="person-avatar"
                  style={{ 
                    background: members.find(m => m.name === expense.paidBy)?.color || 'var(--primary-bg)' 
                  }}
                >
                  {getExpenseIcon(expense.type)}
                </div>
                <div className="expense-details">
                  <span className="expense-description">{expense.description}</span>
                  <span className="expense-date">{expense.date}</span>
                </div>
              </div>
              <div className="expense-right">
                <span className="expense-paidby">Paid by {expense.paidBy}</span>
                <span className="person-amount">${expense.amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

RoommateExpenses.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      paidBy: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      settled: PropTypes.bool.isRequired
    })
  ).isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  onAddExpense: PropTypes.func.isRequired,
  onToggleSettled: PropTypes.func.isRequired
};

export default RoommateExpenses; 