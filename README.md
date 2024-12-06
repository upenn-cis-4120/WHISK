# Whisk - Potluck Event Management App

Whisk is a modern web application designed to streamline the organization of potluck events for college students. It provides an intuitive interface for managing guests, groceries, recipes, and expenses.

If you're interested in learning more about how we made this: 
[check out the medium article](https://medium.com/@sroling17/introducing-whisk-b86a2e839f73)

## Features

### Event Management

- Create and manage multiple potluck events
- View all events in a clean, card-based interface
- Track key event statistics including guest count, outstanding expenses, and alerts
- Navigate between events seamlessly with automatic scroll restoration

### Guest Management

- Add and remove guests with name and phone number
- Interactive guest list with hover effects showing contact information
- Quick access to chat and call functions for each guest
- Visual avatars for each guest using their initials

### Grocery Management

- Create and maintain shopping lists for each event
- Track item quantities and prices
- Mark items as purchased/acquired
- Edit or remove items as needed
- Assign items to specific guests
- Interactive checkboxes for shopping progress

### Recipe & Expenses

- View total outstanding expenses for the event
- Track individual recipe components and ingredients
- Organize recipes by courses with images
- Mark recipe items as acquired or needed
- Add or modify courses as needed

### Financial Management

- Track expenses per person
- View outstanding balances
- Record and manage payments
- Mark payments as completed
- Calculate per-person cost distribution
- View payment history

## Technical Stack

- React 18.2.0
- React Router DOM 6.22.3
- Vite for build tooling
- PropTypes for type checking
- Modern CSS with CSS Variables
- Responsive design for mobile compatibility

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:

   ```bash
   cd whisk
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/src`
  - `/components` - React components
    - `/event` - Event-specific components
  - `/data` - Data management and storage
  - `/utils` - Utility functions
  - `/assets` - Static assets

## Design System

The app uses a consistent design system with CSS variables for:

- Primary colors (--primary-blue, --action-green)
- Secondary colors (--secondary-purple, --tertiary-yellow)
- Text colors (--text-light, --text-dark)
- Consistent border radiuses and padding
- Responsive animations and transitions

## Contributing

This is a prototype for CIS 4120. Please refer to the course guidelines for contribution rules.

## License

This project is part of CIS 4120 coursework and is subject to university guidelines.

