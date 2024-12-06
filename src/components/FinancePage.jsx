import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FinanceCard from './FinanceCard';
import roommateExpenses from '../data/roommateExpenses';
import './FinancePage.css';

const FinancePage = ({ events }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log('FinancePage: Starting navigation...');
    navigate("/");
    console.log('FinancePage: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('FinancePage: Root element:', root);
      console.log('FinancePage: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('FinancePage: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  const handleExpenseClick = (eventId) => {
    console.log('FinancePage: Starting expense navigation...');
    navigate(`/event/${eventId}/expenses`);
    console.log('FinancePage: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('FinancePage: Root element:', root);
      console.log('FinancePage: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('FinancePage: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  const handleRoommateClick = () => {
    console.log('FinancePage: Starting roommate navigation...');
    navigate("/roommate-expenses");
    console.log('FinancePage: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('FinancePage: Root element:', root);
      console.log('FinancePage: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('FinancePage: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  // Calculate balances for roommates
  const total = roommateExpenses.expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const perPerson = total / roommateExpenses.members.length;
  
  const balances = {};
  roommateExpenses.members.forEach(member => {
    balances[member.name] = 0;
  });

  roommateExpenses.expenses.forEach(expense => {
    const amount = parseFloat(expense.amount);
    const share = amount / roommateExpenses.members.length;

    // Credit the payer
    balances[expense.paidBy] += amount;

    // Debit everyone's share
    roommateExpenses.members.forEach(member => {
      balances[member.name] -= share;
    });
  });

  // Count people who need to pay (have negative balance)
  const needToPayCount = Object.values(balances).filter(balance => balance < -0.01).length;

  // Calculate total outstanding (sum of positive balances)
  const outstanding = Object.values(balances)
    .filter(balance => balance > 0)
    .reduce((sum, balance) => sum + balance, 0);

  return (
    <div className="finance-page">
      <header className="event-header">
        <button onClick={handleBack} className="back-button">←</button>
        <div className="event-date-container">
          <div className="event-date">Financials</div>
        </div>
      </header>

      <div className="events-list">
        {/* Roommate Financials Card */}
        <div 
          onClick={handleRoommateClick}
          className="event-link"
        >
          <div className="finance-card roommate-card">
            <div className="card-content">
              <div className="card-header">
                <div className="date">Roommate Expenses</div>
                <div className="stats">
                  <div className="stat">
                    <div className="stat-value">{needToPayCount}</div>
                    <div className="stat-label">Yet to Pay</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">${outstanding.toFixed(2)}</div>
                    <div className="stat-label">Outstanding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Finance Cards */}
        {events.map((event, index) => (
          <div 
            key={event.id} 
            onClick={() => handleExpenseClick(event.id)}
            className="event-link"
          >
            <FinanceCard
              event={event}
              slideDirection={index % 2 === 0 ? 'slide-left' : 'slide-right'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

FinancePage.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      stats: PropTypes.shape({
        guests: PropTypes.number.isRequired,
        outstanding: PropTypes.number.isRequired,
        alerts: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired
};

export default FinancePage;