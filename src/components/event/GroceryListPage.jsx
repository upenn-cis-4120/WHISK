import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./GroceryListPage.css";

function GroceryListPage({ events, onToggleGroceryItem }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventData = events.find(e => e.id === parseInt(id));

  if (!eventData) {
    return <div>Event not found</div>;
  }

  return (
    <div className="grocery-page">
      <header className="event-header">
        <button onClick={() => navigate(`/event/${id}`)} className="back-button">←</button>
        <div className="event-date-container">
          <div className="event-date">{eventData.date} / List</div>
        </div>
      </header>

      <div className="grocery-list">
        {eventData.groceries.map((item) => (
          <div key={item.id} className="grocery-row">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={item.have}
                onChange={() => onToggleGroceryItem(eventData.id, item.id)}
                className="grocery-checkbox"
              />
            </div>
            <div className={`grocery-item-content ${item.have ? 'checked' : ''}`}>
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">{item.quantity}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="add-item-button">
        <span className="plus-icon">+</span>
        <span>Add Item</span>
        <span className="quantity-placeholder"># ##</span>
      </button>
    </div>
  );
}

GroceryListPage.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      groceries: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          quantity: PropTypes.string.isRequired,
          have: PropTypes.bool.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  onToggleGroceryItem: PropTypes.func.isRequired
};

export default GroceryListPage; 