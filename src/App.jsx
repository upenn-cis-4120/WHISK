import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import MainDisplay from "./components/MainDisplay";
import EventDetails from "./components/EventDetails";
import Calendar from "./components/EventsPage";
import FinancePage from "./components/FinancePage";
import GroceryListPage from "./components/event/GroceryListPage";
import CreateEvent from "./components/CreateEvent";
import Expenses from "./components/event/Expenses";
import RoommatePage from "./components/roommates/RoommatePage";
import RoommateExpenses from "./components/roommate/RoommateExpenses";
import ScrollToTop from "./components/ScrollToTop";
import events from "./data/events";
import roommateExpenses from "./data/roommateExpenses";
import "./App.css";

function App() {
  const [eventsData, setEventsData] = useState(events);
  const [roommateData, setRoommateData] = useState(roommateExpenses);

  // Combine regular expenses with grocery items
  const combinedRoommateExpenses = {
    ...roommateData,
    expenses: [
      ...roommateData.expenses,
      ...roommateData.groceries.map(item => ({
        id: `grocery-${item.id}`,
        description: `${item.name} (${item.quantity})`,
        amount: item.price,
        paidBy: item.addedBy,
        date: item.addedAt,
        type: "grocery",
        settled: item.settled
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date))
  };

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

  const handleAddRoommateExpense = (newExpense) => {
    setRoommateData(prev => ({
      ...prev,
      expenses: [...prev.expenses, newExpense]
    }));
  };

  const handleToggleExpenseSettled = (expenseId) => {
    // Check if it's a grocery item
    if (typeof expenseId === 'string' && expenseId.startsWith('grocery-')) {
      const groceryId = parseInt(expenseId.split('-')[1]);
      setRoommateData(prev => ({
        ...prev,
        groceries: prev.groceries.map(item =>
          item.id === groceryId
            ? { ...item, settled: !item.settled }
            : item
        )
      }));
    } else {
      setRoommateData(prev => ({
        ...prev,
        expenses: prev.expenses.map(expense =>
          expense.id === expenseId
            ? { ...expense, settled: !expense.settled }
            : expense
        )
      }));
    }
  };

  const handleAddRoommateGroceryItem = (newItem) => {
    setRoommateData(prev => ({
      ...prev,
      groceries: [...prev.groceries, {
        ...newItem,
        settled: false
      }]
    }));
  };

  return (
    <Router>
      <ScrollToTop />
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
            path="/event/:id/expenses" 
            element={
              <Expenses 
                events={eventsData}
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
          <Route 
            path="/roommates" 
            element={
              <RoommatePage 
                roommates={roommateData}
                onAddGroceryItem={handleAddRoommateGroceryItem}
              />
            } 
          />
          <Route 
            path="/roommate-expenses" 
            element={
              <RoommateExpenses 
                expenses={combinedRoommateExpenses.expenses}
                members={combinedRoommateExpenses.members}
                onAddExpense={handleAddRoommateExpense}
                onToggleSettled={handleToggleExpenseSettled}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
