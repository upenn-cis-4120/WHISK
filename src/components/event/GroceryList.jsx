import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import "./GroceryList.css";

function GroceryList({ items, onToggleItem }) {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="grocery-list-container">
      <div className="grocery-list-header">
        <h2>Groceries</h2>
        <div className="outstanding-label">Outstanding Items</div>
      </div>

      <div className="grocery-items">
        {items.filter(item => !item.have).map((item) => (
          <div key={item.id} className="grocery-item">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={item.have}
                onChange={() => onToggleItem(item.id)}
                className="grocery-checkbox"
              />
            </div>
            <span className="item-name">{item.name}</span>
            <span className="item-quantity">{item.quantity}</span>
          </div>
        ))}
        <button 
          className="see-more-btn"
          onClick={() => navigate(`/event/${id}/groceries`)}
        >
          See More
        </button>
      </div>
    </div>
  );
}

GroceryList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
      have: PropTypes.bool.isRequired
    })
  ).isRequired,
  onToggleItem: PropTypes.func.isRequired
};

export default GroceryList; 