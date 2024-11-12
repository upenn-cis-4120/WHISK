import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import GuestList from "./event/GuestList";
import GroceryList from "./event/GroceryList";
import RecipeExpenses from "./event/RecipeExpenses";
import "./EventDetails.css";

function EventDetails({ events, onToggleGroceryItem }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventData = events.find(e => e.id === parseInt(id));

  if (!eventData) {
    return <div>Event not found</div>;
  }

  return (
    <div className="event-details">
      <header className="event-header">
        <button onClick={() => navigate("/")} className="back-button">←</button>
        <div className="event-date-container">
          <div className="event-date">{eventData.date} Event</div>
        </div>
      </header>

      <GuestList guests={eventData.guests} />
      <GroceryList 
        items={eventData.groceries} 
        onToggleItem={(itemId) => onToggleGroceryItem(eventData.id, itemId)}
      />
      <RecipeExpenses event={eventData} />
    </div>
  );
}

EventDetails.propTypes = {
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

export default EventDetails; 