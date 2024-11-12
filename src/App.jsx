import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import MainDisplay from "./components/MainDisplay";
import EventDetails from "./components/EventDetails";
import GroceryListPage from "./components/event/GroceryListPage";
import events from "./data/events";
import "./App.css";

function App() {
  const [eventsData, setEventsData] = useState(events);

  const handleToggleGroceryItem = (eventId, itemId) => {
    setEventsData(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? {
              ...event,
              groceries: event.groceries.map(item =>
                item.id === itemId ? { ...item, have: !item.have } : item
              )
            }
          : event
      )
    );
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<MainDisplay />} />
          <Route 
            path="/event/:id" 
            element={
              <EventDetails 
                events={eventsData}
                onToggleGroceryItem={handleToggleGroceryItem}
              />
            } 
          />
          <Route 
            path="/event/:id/groceries" 
            element={
              <GroceryListPage 
                events={eventsData}
                onToggleGroceryItem={handleToggleGroceryItem}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
