import { useState } from "react";
import PropTypes from "prop-types";
import "./RoommateGroceryList.css";

function RoommateGroceryList({ groceries, members, onToggleItem, onAddItem, onDeleteItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [itemInput, setItemInput] = useState({ 
    name: "", 
    quantity: "", 
    price: "",
    priority: "medium" 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    if (itemInput.name) {
      onAddItem({
        id: Date.now(),
        name: itemInput.name,
        quantity: itemInput.quantity,
        price: itemInput.price || "0",
        have: false,
        addedBy: "John", // TODO: Replace with current user
        addedAt: new Date().toISOString().split('T')[0],
        priority: itemInput.priority
      });
      setItemInput({ 
        name: "", 
        quantity: "", 
        price: "",
        priority: "medium" 
      });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#FF6B6B";
      case "medium":
        return "#FFD93D";
      case "low":
        return "#6BCB77";
      default:
        return "#FFD93D";
    }
  };

  const getMemberColor = (name) => {
    const member = members.find(m => m.name === name);
    return member ? member.color : "#gray";
  };

  return (
    <div className="roommate-grocery-list">
      <div className="list-header">
        <h2>Grocery List</h2>
        <button 
          className={`edit-list-btn ${isEditing ? 'active' : ''}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <span className="close-icon">×</span>
          ) : (
            <>
              <span>✎</span> Add Items
            </>
          )}
        </button>
      </div>

      {isEditing && (
        <div className="add-item-form">
          <div className="form-row">
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
          </div>
          <div className="form-row">
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
            <select
              name="priority"
              value={itemInput.priority}
              onChange={handleInputChange}
              className="priority-select"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <button 
            onClick={handleAddItem}
            className="add-item-btn"
          >
            Add Item
          </button>
        </div>
      )}

      <div className="grocery-items">
        {groceries.map((item) => (
          <div 
            key={item.id} 
            className={`grocery-item ${item.have ? 'checked' : ''}`}
            style={{
              borderLeft: `4px solid ${getPriorityColor(item.priority)}`
            }}
          >
            <div className="item-header">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={item.have}
                  onChange={() => onToggleItem(item.id)}
                  className="grocery-checkbox"
                />
              </div>
              <span className="item-name">{item.name}</span>
              <div className="item-meta">
                <span className="item-quantity">{item.quantity}</span>
                <span className="item-price">${parseFloat(item.price).toFixed(2)}</span>
              </div>
            </div>
            <div className="item-footer">
              <div 
                className="added-by"
                style={{ color: getMemberColor(item.addedBy) }}
              >
                {item.addedBy}
              </div>
              <button 
                onClick={() => onDeleteItem(item.id)}
                className="delete-btn"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

RoommateGroceryList.propTypes = {
  groceries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      have: PropTypes.bool.isRequired,
      addedBy: PropTypes.string.isRequired,
      addedAt: PropTypes.string.isRequired,
      priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired
    })
  ).isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  onToggleItem: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired
};

export default RoommateGroceryList; 