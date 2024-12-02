import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import GuestList from "./event/GuestList";
import GroceryList from "./event/GroceryList";
import RecipeExpenses from "./event/RecipeExpenses";
import "./EventDetails.css";

function EventDetails({ 
  events, 
  onToggleGroceryItem, 
  onAddGroceryItem,
  onDeleteGroceryItem,
  onEditGroceryItem,
  onAddGuest, 
  onDeleteGuest 
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventData = events.find(e => e.id === parseInt(id));

  const handleBack = () => {
    console.log('EventDetails: Starting navigation...');
    navigate("/");
    console.log('EventDetails: Navigation called, setting timeout...');
    setTimeout(() => {
      const root = document.getElementById('root');
      console.log('EventDetails: Root element:', root);
      console.log('EventDetails: Current scroll position:', root?.scrollTop);
      if (root) {
        root.scrollTo(0, 0);
        console.log('EventDetails: Scroll attempted, new position:', root.scrollTop);
      }
    }, 0);
  };

  if (!eventData) {
    return <div>Event not found</div>;
  }

  const handleAddGuest = (newGuest) => {
    onAddGuest(eventData.id, newGuest);
  };

  const handleDeleteGuest = (guestId) => {
    onDeleteGuest(eventData.id, guestId);
  };

  const handleAddGroceryItem = (newItem) => {
    onAddGroceryItem(eventData.id, newItem);
  };

  const handleDeleteGroceryItem = (itemId) => {
    onDeleteGroceryItem(eventData.id, itemId);
  };

  const handleEditGroceryItem = (editedItem) => {
    onEditGroceryItem(eventData.id, editedItem);
  };

  return (
    <div className="event-details">
      <header className="event-header">
        <button onClick={handleBack} className="back-button">←</button>
        <div className="event-date-container">
          <div className="event-date">{eventData.date} Event</div>
        </div>
      </header>

      <GuestList 
        guests={eventData.guests} 
        onAddGuest={handleAddGuest}
        onDeleteGuest={handleDeleteGuest}
      />
      <GroceryList 
        items={eventData.groceries} 
        guests={eventData.guests}
        onToggleItem={(itemId) => onToggleGroceryItem(eventData.id, itemId)}
        onAddItem={handleAddGroceryItem}
        onDeleteItem={handleDeleteGroceryItem}
        onEditItem={handleEditGroceryItem}
      />
      <RecipeExpenses event={eventData} />
    </div>
  );
}

EventDetails.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      guests: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          phone: PropTypes.string.isRequired,
          hasResponded: PropTypes.bool.isRequired
        })
      ).isRequired,
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
  onToggleGroceryItem: PropTypes.func.isRequired,
  onAddGroceryItem: PropTypes.func.isRequired,
  onDeleteGroceryItem: PropTypes.func.isRequired,
  onEditGroceryItem: PropTypes.func.isRequired,
  onAddGuest: PropTypes.func.isRequired,
  onDeleteGuest: PropTypes.func.isRequired
};

export default EventDetails; 