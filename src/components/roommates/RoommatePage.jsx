import { useState } from 'react';
import RoommateGroceryList from './RoommateGroceryList';
import roommates from '../../data/roommates';
import './RoommatePage.css';

function RoommatePage() {
  const [groceryData, setGroceryData] = useState(roommates.groceries);

  const handleToggleItem = (itemId) => {
    setGroceryData(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, have: !item.have }
          : item
      )
    );
  };

  const handleAddItem = (newItem) => {
    setGroceryData(prevItems => [...prevItems, newItem]);
  };

  const handleDeleteItem = (itemId) => {
    setGroceryData(prevItems =>
      prevItems.filter(item => item.id !== itemId)
    );
  };

  return (
    <div className="roommate-page">
      <header className="roommate-header">
        <h1>Roommates</h1>
      </header>
      
      <RoommateGroceryList
        groceries={groceryData}
        members={roommates.members}
        onToggleItem={handleToggleItem}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default RoommatePage; 