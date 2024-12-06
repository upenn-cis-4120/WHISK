import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./CreateEvent.css";

function CreateEvent({ onCreateEvent }) {
  const navigate = useNavigate();
  const [guestInput, setGuestInput] = useState({ name: "", phone: "" });
  const [groceryInput, setGroceryInput] = useState({ name: "", quantity: "" });
  const [eventData, setEventData] = useState({
    date: "",
    guests: [],
    groceries: [],
    expenses: {
      total: 0,
      perPerson: 0,
      breakdown: []
    },
    recipes: [],
    stats: {
      guests: 0,
      outstanding: 0,
      alerts: 0
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventData.date || eventData.guests.length === 0) {
      alert("Please add a date and at least one guest");
      return;
    }
    onCreateEvent({
      ...eventData,
      id: Date.now(),
      stats: {
        guests: eventData.guests.length,
        outstanding: 0,
        alerts: eventData.groceries.length
      }
    });
    console.log('CreateEvent: Starting navigation after submit...');
    navigate("/");
    console.log('CreateEvent: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('CreateEvent: Root element:', root);
      console.log('CreateEvent: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('CreateEvent: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  const handleBack = () => {
    console.log('CreateEvent: Starting back navigation...');
    navigate("/");
    console.log('CreateEvent: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('CreateEvent: Root element:', root);
      console.log('CreateEvent: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('CreateEvent: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    setEventData({ ...eventData, date: formattedDate });
  };

  const handleGuestInputChange = (e) => {
    const { id, value } = e.target;
    setGuestInput(prev => ({
      ...prev,
      [id === "guestName" ? "name" : "phone"]: value
    }));
  };

  const handleGroceryInputChange = (e) => {
    const { id, value } = e.target;
    setGroceryInput(prev => ({
      ...prev,
      [id === "groceryName" ? "name" : "quantity"]: value
    }));
  };

  const handleAddGuest = () => {
    if (guestInput.name && guestInput.phone) {
      setEventData(prev => ({
        ...prev,
        guests: [
          ...prev.guests,
          {
            id: prev.guests.length + 1,
            name: guestInput.name,
            phone: guestInput.phone,
            hasResponded: false
          }
        ]
      }));
      setGuestInput({ name: "", phone: "" });
    }
  };

  const handleAddGrocery = () => {
    if (groceryInput.name && groceryInput.quantity) {
      setEventData(prev => ({
        ...prev,
        groceries: [
          ...prev.groceries,
          {
            id: prev.groceries.length + 1,
            name: groceryInput.name,
            quantity: groceryInput.quantity,
            have: false
          }
        ]
      }));
      setGroceryInput({ name: "", quantity: "" });
    }
  };

  const handleRemoveGuest = (guestId) => {
    setEventData(prev => ({
      ...prev,
      guests: prev.guests.filter(guest => guest.id !== guestId)
    }));
  };

  const handleRemoveGrocery = (groceryId) => {
    setEventData(prev => ({
      ...prev,
      groceries: prev.groceries.filter(item => item.id !== groceryId)
    }));
  };

  return (
    <div className="create-event">
      <header className="event-header">
        <button onClick={handleBack} className="back-button">←</button>
        <div className="event-date-container">
          <div className="event-date">New Event</div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input
            type="date"
            id="eventDate"
            required
            onChange={handleDateChange}
            className="date-input"
          />
        </div>

        <div className="form-group">
          <h3>Add Guests</h3>
          <div className="input-group">
            <input
              type="text"
              id="guestName"
              placeholder="Guest Name"
              value={guestInput.name}
              onChange={handleGuestInputChange}
              className="form-input"
            />
            <input
              type="tel"
              id="guestPhone"
              placeholder="Phone Number"
              value={guestInput.phone}
              onChange={handleGuestInputChange}
              className="form-input"
            />
            <button 
              type="button" 
              onClick={handleAddGuest}
              className="add-btn"
            >
              Add
            </button>
          </div>
          <div className="items-list">
            {eventData.guests.map((guest) => (
              <div key={guest.id} className="list-item">
                <div className="item-info">
                  <div className="avatar">
                    <span>{guest.name.charAt(0)}</span>
                  </div>
                  <span className="item-name">{guest.name}</span>
                  <span className="item-detail">{guest.phone}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleRemoveGuest(guest.id)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <h3>Add Groceries</h3>
          <div className="input-group">
            <input
              type="text"
              id="groceryName"
              placeholder="Item Name"
              value={groceryInput.name}
              onChange={handleGroceryInputChange}
              className="form-input"
            />
            <input
              type="text"
              id="groceryQuantity"
              placeholder="Quantity"
              value={groceryInput.quantity}
              onChange={handleGroceryInputChange}
              className="form-input"
            />
            <button 
              type="button" 
              onClick={handleAddGrocery}
              className="add-btn"
            >
              Add
            </button>
          </div>
          <div className="items-list">
            {eventData.groceries.map((item) => (
              <div key={item.id} className="list-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-detail">{item.quantity}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleRemoveGrocery(item.id)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="create-event-btn">
          Create Event
        </button>
      </form>
    </div>
  );
}

CreateEvent.propTypes = {
  onCreateEvent: PropTypes.func.isRequired
};

export default CreateEvent; 