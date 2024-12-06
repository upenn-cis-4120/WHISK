import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getEventOutstanding } from "../../utils/expenseCalculator";
import "./RecipeExpenses.css";

function RecipeExpenses({ event }) {
  const navigate = useNavigate();

  const handleExpenseClick = () => {
    console.log('RecipeExpenses: Starting navigation...');
    navigate(`/event/${event.id}/expenses`);
    console.log('RecipeExpenses: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('RecipeExpenses: Root element:', root);
      console.log('RecipeExpenses: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('RecipeExpenses: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  const totalOutstanding = getEventOutstanding(event);

  return (
    <div className="recipe-expenses-section">
      <h2 className="section-title">Recipe & Expenses</h2>
      <div className="content-container">
        <div className="recipe-icon">
          <span className="icon-placeholder">🍽️</span>
        </div>
        <div 
          className="expense-box"
          onClick={handleExpenseClick}
        >
          <div className="amount">${totalOutstanding}</div>
          <div className="label">Outstanding</div>
        </div>
      </div>
    </div>
  );
}

RecipeExpenses.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
  }).isRequired
};

export default RecipeExpenses; 