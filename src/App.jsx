import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import MainDisplay from "./components/MainDisplay";
import EventDetails from "./components/EventDetails";
import Calendar from "./components/EventsPage";
import FinancePage from "./components/FinancePage";
import GroceryListPage from "./components/event/GroceryListPage";
import CreateEvent from "./components/CreateEvent";
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

  const handleAddGroceryItem = (eventId, newItem) => {
    setEventsData(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              groceries: [...event.groceries, newItem],
              stats: {
                ...event.stats,
                alerts: event.stats.alerts + 1
              }
            }
          : event
      )
    );
  };

  const handleDeleteGroceryItem = (eventId, itemId) => {
    setEventsData(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              groceries: event.groceries.filter(item => item.id !== itemId),
              stats: {
                ...event.stats,
                alerts: Math.max(0, event.stats.alerts - 1)
              }
            }
          : event
      )
    );
  };

  const handleEditGroceryItem = (eventId, editedItem) => {
    setEventsData(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              groceries: event.groceries.map(item =>
                item.id === editedItem.id ? editedItem : item
              )
            }
          : event
      )
    );
  };

  const handleCreateEvent = (newEvent) => {
    setEventsData(prevEvents => [...prevEvents, newEvent]);
  };

  const handleAddGuest = (eventId, newGuest) => {
    setEventsData(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              guests: [...event.guests, newGuest],
              stats: {
                ...event.stats,
                guests: event.guests.length + 1
              }
            }
          : event
      )
    );
  };

  const handleDeleteGuest = (eventId, guestId) => {
    setEventsData(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              guests: event.guests.filter(guest => guest.id !== guestId),
              groceries: event.groceries.map(item =>
                item.purchasedBy === guestId ? { ...item, purchasedBy: null } : item
              ),
              stats: {
                ...event.stats,
                guests: event.guests.length - 1
              }
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
          <Route path="/" element={<MainDisplay events={eventsData} />} />
          <Route 
            path="/event/:id" 
            element={
              <EventDetails 
                events={eventsData}
                onToggleGroceryItem={handleToggleGroceryItem}
                onAddGroceryItem={handleAddGroceryItem}
                onDeleteGroceryItem={handleDeleteGroceryItem}
                onEditGroceryItem={handleEditGroceryItem}
                onAddGuest={handleAddGuest}
                onDeleteGuest={handleDeleteGuest}
              />
            } 
          />
          <Route 
            path="/event/:id/groceries" 
            element={
              <GroceryListPage 
                events={eventsData}
                onToggleGroceryItem={handleToggleGroceryItem}
                onAddGroceryItem={handleAddGroceryItem}
                onDeleteGroceryItem={handleDeleteGroceryItem}
                onEditGroceryItem={handleEditGroceryItem}
              />
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <Calendar
                events={eventsData}
              />
            } 
          />
          <Route 
            path="/finance" 
            element={
              <FinancePage
                events={eventsData}
              />
            } 
          />
          <Route 
            path="/create-event" 
            element={
              <CreateEvent
                onCreateEvent={handleCreateEvent}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
