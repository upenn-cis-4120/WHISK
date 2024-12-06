// Mock data for events
const events = [
  {
    id: 1,
    date: "Oct 28",
    guests: [
      {
        id: 1,
        name: "Vedansh Goenka",
        phone: "+1234567890",
        hasResponded: true,
      },
      {
        id: 2,
        name: "Logan Brassington",
        phone: "+1234567891",
        hasResponded: true,
      },
      { id: 3, name: "Simon Roling", phone: "+1234567892", hasResponded: true },
    ],
    groceries: [
      { id: 1, name: "Rice Flour", quantity: "1.5 lb", have: false },
      { id: 2, name: "Watermelon", quantity: "1 unit", have: false },
      { id: 3, name: "Paprika", quantity: "3 tbsp", have: false },
      { id: 4, name: "Apples", quantity: "12 unit", have: true },
      { id: 5, name: "Cinnamon", quantity: "4 tbsp", have: true },
    ],
    expenses: {
      total: 40,
      perPerson: 13,
      breakdown: [
        { name: "Simon R", amount: 13, paid: false },
        { name: "Vedansh G", amount: 27, paid: false },
        { name: "Logan B", amount: 0, paid: true },
      ],
    },
    recipes: [
      {
        id: 1,
        courseName: "Snacks",
        image: "/images/snacks.jpg",
        items: [
          { name: "Strawberry", have: true },
          { name: "Oat Cheese", have: true },
          { name: "Crackers", have: false },
        ],
      },
      {
        id: 2,
        courseName: "Mains",
        image: "/images/mains.jpg",
        items: [
          { name: "Bread", have: true },
          { name: "Fish Broth", have: true },
          { name: "Shrimp", have: false },
        ],
      },
    ],
    stats: {
      guests: 3,
      outstanding: 60,
      alerts: 2,
    },
  },
  {
    id: 2,
    date: "Nov 4",
    guests: [
      { id: 1, name: "Sarah Chen", phone: "+1234567893", hasResponded: true },
      { id: 2, name: "Michael Park", phone: "+1234567894", hasResponded: true },
      { id: 3, name: "Emma Wilson", phone: "+1234567895", hasResponded: true },
      { id: 4, name: "David Kim", phone: "+1234567896", hasResponded: false },
    ],
    groceries: [
      { id: 1, name: "Quinoa", quantity: "2 cups", have: true },
      { id: 2, name: "Bell Peppers", quantity: "4 units", have: true },
      { id: 3, name: "Olive Oil", quantity: "1 bottle", have: false },
      { id: 4, name: "Chicken", quantity: "2 lbs", have: false },
    ],
    expenses: {
      total: 45,
      perPerson: 15,
      breakdown: [
        { name: "Sarah", amount: 15, paid: false },
        { name: "Michael", amount: 0, paid: true },
        { name: "Emma", amount: 15, paid: false },
        { name: "David", amount: 15, paid: false },
      ],
    },
    recipes: [
      {
        id: 1,
        courseName: "Appetizer",
        image: "/images/appetizer.jpg",
        items: [
          { name: "Hummus", have: true },
          { name: "Pita", have: true },
          { name: "Olive Oil", have: false },
        ],
      },
      {
        id: 2,
        courseName: "Main Course",
        image: "/images/main-course.jpg",
        items: [
          { name: "Quinoa", have: true },
          { name: "Chicken", have: false },
          { name: "Bell Peppers", have: true },
        ],
      },
    ],
    stats: {
      guests: 4,
      outstanding: 45,
      alerts: 1,
    },
  },
  {
    id: 3,
    date: "Nov 11",
    guests: [
      { id: 1, name: "Alex Johnson", phone: "+1234567897", hasResponded: true },
      { id: 2, name: "Maria Garcia", phone: "+1234567898", hasResponded: true },
      { id: 3, name: "James Lee", phone: "+1234567899", hasResponded: true },
      { id: 4, name: "Lisa Brown", phone: "+1234567900", hasResponded: true },
      { id: 5, name: "Tom Wilson", phone: "+1234567901", hasResponded: false },
    ],
    groceries: [
      { id: 1, name: "Pasta", quantity: "2 boxes", have: true },
      { id: 2, name: "Tomatoes", quantity: "6 units", have: true },
      { id: 3, name: "Basil", quantity: "1 bunch", have: false },
      { id: 4, name: "Parmesan", quantity: "200g", have: false },
      { id: 5, name: "Garlic", quantity: "2 heads", have: false },
    ],
    expenses: {
      total: 75,
      perPerson: 15,
      breakdown: [
        { name: "Alex", amount: 25, paid: false },
        { name: "Maria", amount: 0, paid: true },
        { name: "James", amount: 25, paid: false },
        { name: "Lisa", amount: 25, paid: false },
        { name: "Tom", amount: 0, paid: true },
      ],
    },
    recipes: [
      {
        id: 1,
        courseName: "Pasta Course",
        image: "/images/pasta.jpg",
        items: [
          { name: "Pasta", have: true },
          { name: "Tomatoes", have: true },
          { name: "Basil", have: false },
          { name: "Garlic", have: false },
        ],
      },
      {
        id: 2,
        courseName: "Dessert",
        image: "/images/dessert.jpg",
        items: [
          { name: "Tiramisu", have: true },
          { name: "Coffee", have: true },
          { name: "Cocoa", have: false },
        ],
      },
    ],
    stats: {
      guests: 5,
      outstanding: 75,
      alerts: 3,
    },
  },
  {
    id: 4,
    date: "Nov 18",
    guests: [
      {
        id: 1,
        name: "Ryan Martinez",
        phone: "+1234567902",
        hasResponded: true,
      },
      {
        id: 2,
        name: "Sophie Taylor",
        phone: "+1234567903",
        hasResponded: true,
      },
      { id: 3, name: "Kevin Wang", phone: "+1234567904", hasResponded: true },
    ],
    groceries: [
      { id: 1, name: "Tofu", quantity: "2 blocks", have: true },
      { id: 2, name: "Soy Sauce", quantity: "1 bottle", have: true },
      { id: 3, name: "Ginger", quantity: "100g", have: false },
      { id: 4, name: "Green Onions", quantity: "1 bunch", have: false },
    ],
    expenses: {
      total: 30,
      perPerson: 10,
      breakdown: [
        { name: "Ryan", amount: 10, paid: false },
        { name: "Sophie", amount: 10, paid: false },
        { name: "Kevin", amount: 10, paid: false },
      ],
    },
    recipes: [
      {
        id: 1,
        courseName: "Asian Fusion",
        image: "/images/asian.jpg",
        items: [
          { name: "Tofu", have: true },
          { name: "Soy Sauce", have: true },
          { name: "Ginger", have: false },
        ],
      },
    ],
    stats: {
      guests: 3,
      outstanding: 30,
      alerts: 0,
    },
  },
  {
    id: 5,
    date: "Nov 25",
    guests: [
      {
        id: 1,
        name: "Chris Anderson",
        phone: "+1234567905",
        hasResponded: true,
      },
      { id: 2, name: "Rachel Kim", phone: "+1234567906", hasResponded: true },
      { id: 3, name: "Daniel Smith", phone: "+1234567907", hasResponded: true },
      { id: 4, name: "Emily Davis", phone: "+1234567908", hasResponded: false },
      { id: 5, name: "John Miller", phone: "+1234567909", hasResponded: false },
      { id: 6, name: "Anna White", phone: "+1234567910", hasResponded: false },
    ],
    groceries: [
      { id: 1, name: "Turkey", quantity: "15 lbs", have: true },
      { id: 2, name: "Potatoes", quantity: "5 lbs", have: true },
      { id: 3, name: "Cranberries", quantity: "2 bags", have: false },
      { id: 4, name: "Stuffing Mix", quantity: "2 boxes", have: false },
      { id: 5, name: "Green Beans", quantity: "2 lbs", have: false },
      { id: 6, name: "Pumpkin Pie", quantity: "2 pies", have: false },
    ],
    expenses: {
      total: 90,
      perPerson: 15,
      breakdown: [
        { name: "Chris", amount: 30, paid: false },
        { name: "Rachel", amount: 0, paid: true },
        { name: "Daniel", amount: 30, paid: false },
        { name: "Emily", amount: 30, paid: false },
        { name: "John", amount: 0, paid: true },
        { name: "Anna", amount: 0, paid: true },
      ],
    },
    recipes: [
      {
        id: 1,
        courseName: "Main Course",
        image: "/images/thanksgiving.jpg",
        items: [
          { name: "Turkey", have: true },
          { name: "Stuffing Mix", have: false },
          { name: "Potatoes", have: true },
        ],
      },
      {
        id: 2,
        courseName: "Sides",
        image: "/images/sides.jpg",
        items: [
          { name: "Green Beans", have: false },
          { name: "Cranberries", have: false },
        ],
      },
      {
        id: 3,
        courseName: "Dessert",
        image: "/images/thanksgiving-dessert.jpg",
        items: [{ name: "Pumpkin Pie", have: false }],
      },
    ],
    stats: {
      guests: 6,
      outstanding: 90,
      alerts: 4,
    },
  },
];

export default events;
