const roommateExpenses = {
  members: [
    {
      id: 1,
      name: "Vedansh",
      color: "#FF6B6B"
    },
    {
      id: 2,
      name: "Rohan",
      color: "#4ECDC4"
    },
    {
      id: 3,
      name: "Eric",
      color: "#45B7D1"
    }
  ],
  expenses: [
    {
      id: 1,
      description: "Internet Bill",
      amount: "89.99",
      paidBy: "Vedansh",
      date: "2024-03-15",
      type: "bill",
      settled: false
    },
    {
      id: 2,
      description: "Electricity",
      amount: "120.50",
      paidBy: "Rohan",
      date: "2024-03-10",
      type: "bill",
      settled: false
    },
    {
      id: 3,
      description: "Water Bill",
      amount: "45.75",
      paidBy: "Eric",
      date: "2024-03-05",
      type: "bill",
      settled: false
    },
    {
      id: 4,
      description: "Netflix Subscription",
      amount: "19.99",
      paidBy: "Vedansh",
      date: "2024-03-01",
      type: "subscription",
      settled: false
    }
  ],
  groceries: [
    {
      id: 1,
      name: "Milk",
      quantity: "1 gallon",
      price: "4.99",
      have: false,
      addedBy: "Vedansh",
      addedAt: "2024-03-20",
      priority: "high",
      settled: false
    },
    {
      id: 2,
      name: "Bread",
      quantity: "2 loaves",
      price: "5.98",
      have: true,
      addedBy: "Rohan",
      addedAt: "2024-03-19",
      priority: "medium",
      settled: false
    },
    {
      id: 3,
      name: "Eggs",
      quantity: "1 dozen",
      price: "3.99",
      have: false,
      addedBy: "Eric",
      addedAt: "2024-03-20",
      priority: "high",
      settled: false
    }
  ]
};

export default roommateExpenses; 