import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import "./GroceryList.css";

function GroceryList({ items, onToggleItem, onAddItem, onDeleteItem, onEditItem, guests }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemInput, setItemInput] = useState({ name: "", quantity: "", price: "" });
  const navigate = useNavigate();
  const { id } = useParams();

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
        onEditItem({
          ...editingItem,
          ...itemInput
        });
        setEditingItem(null);
      } else {
        onAddItem({
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

  const formatPrice = (price) => {
    return `$${parseFloat(price || 0).toFixed(2)}`;
  };

  const handleBack = () => {
    console.log('GroceryList: Starting navigation...');
    navigate(`/event/${id}`);
    console.log('GroceryList: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('GroceryList: Root element:', root);
      console.log('GroceryList: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('GroceryList: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  const handleSeeMore = () => {
    console.log('GroceryList: Starting navigation to full list...');
    navigate(`/event/${id}/groceries`);
    console.log('GroceryList: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('GroceryList: Root element:', root);
      console.log('GroceryList: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('GroceryList: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  return (
    <div className="grocery-list-container">
      <div className="grocery-list-header">
        <h2>Groceries</h2>
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

      <div className="grocery-items">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className={`grocery-item ${item.have ? 'checked' : ''} ${isEditing ? 'editing' : ''}`}>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={item.have}
                onChange={() => onToggleItem(item.id)}
                className="grocery-checkbox"
              />
            </div>
            <span className="item-name">{item.name}</span>
            <div className="item-details">
              <span className="item-quantity">{item.quantity}</span>
              <span className="item-price">{formatPrice(item.price)}</span>
              {item.purchasedBy && (
                <span className="purchased-by">
                  Bought by {guests.find(g => g.id === item.purchasedBy)?.name}
                </span>
              )}
            </div>
            {isEditing && (
              <div className="item-actions">
                <button 
                  onClick={() => startEditing(item)}
                  className="edit-btn"
                >
                  ✎
                </button>
                <button 
                  onClick={() => onDeleteItem(item.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
        {items.length > 3 && (
          <button 
            className="see-more-btn"
            onClick={handleSeeMore}
          >
            See {items.length - 3} more items
          </button>
        )}
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
      price: PropTypes.string,
      have: PropTypes.bool.isRequired,
      purchasedBy: PropTypes.number
    })
  ).isRequired,
  guests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onToggleItem: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired
};

export default GroceryList; 