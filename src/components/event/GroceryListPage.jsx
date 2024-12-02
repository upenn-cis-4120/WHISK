import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./GroceryListPage.css";

function GroceryListPage({ events, onToggleGroceryItem, onAddGroceryItem, onDeleteGroceryItem, onEditGroceryItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemInput, setItemInput] = useState({ name: "", quantity: "", price: "" });
  const { id } = useParams();
  const navigate = useNavigate();
  const eventData = events.find(e => e.id === parseInt(id));

  if (!eventData) {
    return <div>Event not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    if (itemInput.name) {
      if (editingItem) {
        onEditGroceryItem(eventData.id, {
          ...editingItem,
          ...itemInput
        });
        setEditingItem(null);
      } else {
        onAddGroceryItem(eventData.id, {
          id: Date.now(),
          name: itemInput.name,
          quantity: itemInput.quantity,
          price: itemInput.price || "0",
          have: false,
          purchasedBy: null
        });
      }
      setItemInput({ name: "", quantity: "", price: "" });
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setItemInput({
      name: item.name,
      quantity: item.quantity,
      price: item.price || ""
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setItemInput({ name: "", quantity: "", price: "" });
  };

  return (
    <div className="grocery-page">
      <header className="event-header">
        <button onClick={() => navigate(`/event/${id}`)} className="back-button">←</button>
        <div className="event-date-container">
          <div className="event-date">{eventData.date} Groceries</div>
        </div>
      </header>

      {isEditing && (
        <div className="add-item-form">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={itemInput.name}
            onChange={handleInputChange}
            className="item-input"
          />
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={itemInput.quantity}
            onChange={handleInputChange}
            className="item-input"
          />
          <input
            type="number"
            name="price"
            placeholder="Price (optional)"
            value={itemInput.price}
            onChange={handleInputChange}
            className="item-input"
            step="0.01"
            min="0"
          />
          <div className="form-actions">
            <button 
              onClick={handleAddItem}
              className="add-item-btn"
            >
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
            {editingItem && (
              <button 
                onClick={cancelEditing}
                className="cancel-btn"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

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
            <div className={`grocery-item-content ${item.have ? 'checked' : ''} ${isEditing ? 'editing' : ''}`}>
              <span className="item-name">{item.name}</span>
              <div className="item-details">
                <span className="item-quantity">{item.quantity}</span>
                <span className="item-price">${parseFloat(item.price || 0).toFixed(2)}</span>
                <div className="item-actions">
                  <button 
                    onClick={() => startEditing(item)}
                    className="edit-btn"
                  >
                    ✎
                  </button>
                  <button 
                    onClick={() => onDeleteGroceryItem(eventData.id, item.id)}
                    className="delete-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        className={`edit-list-btn ${isEditing ? 'active' : ''}`}
        onClick={() => {
          setIsEditing(!isEditing);
          if (!isEditing) {
            cancelEditing();
          }
        }}
      >
        {isEditing ? (
          <span className="close-icon">×</span>
        ) : (
          <>
            <span>✎</span> Edit List
          </>
        )}
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
          price: PropTypes.string,
          have: PropTypes.bool.isRequired,
          purchasedBy: PropTypes.number
        })
      ).isRequired
    })
  ).isRequired,
  onToggleGroceryItem: PropTypes.func.isRequired,
  onAddGroceryItem: PropTypes.func.isRequired,
  onDeleteGroceryItem: PropTypes.func.isRequired,
  onEditGroceryItem: PropTypes.func.isRequired
};

export default GroceryListPage; 