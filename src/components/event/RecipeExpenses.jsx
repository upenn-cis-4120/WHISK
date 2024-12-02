import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./RecipeExpenses.css";

function RecipeExpenses({ event }) {
  const navigate = useNavigate();

  return (
    <div className="recipe-expenses-section">
      <h2 className="section-title">Recipe & Expenses</h2>
      <div className="content-container">
        <div className="recipe-icon">
          <span className="icon-placeholder">🍽️</span>
        </div>
        <div 
          className="expense-box"
          onClick={() => navigate(`/event/${event.id}/expenses`)}
        >
          <div className="amount">${event.expenses.total}</div>
          <div className="label">Outstanding</div>
        </div>
      </div>
    </div>
  );
}

RecipeExpenses.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    expenses: PropTypes.shape({
      total: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default RecipeExpenses; 