/**
 * Utility functions to calculate expenses from groceries data
 */

/**
 * Calculate total expenses and breakdown for an event
 * @param {Object} event - Event object containing guests and groceries
 * @returns {Object} Expenses object with total, perPerson, and breakdown
 */
export function calculateExpenses(event) {
  const { guests, groceries } = event;

  // Calculate total cost and per person share
  const total = groceries.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const perPerson = total / guests.length;

  // Calculate net balance for each person
  const balances = {};
  guests.forEach(guest => {
    balances[guest.name] = 0;
  });

  // For each item:
  // - Buyer gets credited for the full amount
  // - Everyone (including buyer) pays their share
  groceries.forEach(item => {
    const price = parseFloat(item.price);
    const share = price / guests.length;

    // Credit the buyer
    balances[item.assignedTo] += price;

    // Debit everyone's share
    guests.forEach(guest => {
      balances[guest.name] -= share;
    });
  });

  // Find the person with the highest positive balance to use as intermediary
  const sortedBalances = Object.entries(balances)
    .sort(([, a], [, b]) => b - a);
  const [intermediary] = sortedBalances[0];

  // Convert balances to a list of optimized transactions
  const breakdown = [];
  
  // First, have everyone with negative balance pay the intermediary
  sortedBalances.forEach(([person, balance]) => {
    if (balance < -0.01 && person !== intermediary) { // negative balance
      breakdown.push({
        from: person,
        to: intermediary,
        amount: Number(Math.abs(balance).toFixed(2))
      });
    }
  });

  // Then, have intermediary pay everyone with positive balance
  sortedBalances.forEach(([person, balance]) => {
    if (balance > 0.01 && person !== intermediary) { // positive balance
      breakdown.push({
        from: intermediary,
        to: person,
        amount: Number(balance.toFixed(2))
      });
    }
  });

  return {
    total: Number(total.toFixed(2)),
    perPerson: Number(perPerson.toFixed(2)),
    breakdown,
    balances: Object.fromEntries(
      Object.entries(balances).map(([name, balance]) => [
        name,
        Number(balance.toFixed(2))
      ])
    )
  };
}

/**
 * Get total outstanding amount for an event
 * @param {Object} event - Event object containing groceries
 * @returns {number} Total outstanding amount
 */
export function getEventOutstanding(event) {
  const { groceries } = event;
  return Number(groceries.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2));
} 