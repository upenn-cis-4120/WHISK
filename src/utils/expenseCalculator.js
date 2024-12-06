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

  // Convert balances to a list of transactions
  const breakdown = [];
  const processed = new Set();

  // Find people who owe money (negative balance)
  Object.entries(balances).forEach(([fromPerson, fromBalance]) => {
    if (fromBalance < -0.01) { // Using -0.01 to handle floating point imprecision
      // Find people who are owed money (positive balance)
      Object.entries(balances).forEach(([toPerson, toBalance]) => {
        if (toBalance > 0.01 && !processed.has(`${fromPerson}-${toPerson}`)) {
          const amount = Math.min(Math.abs(fromBalance), toBalance);
          if (amount > 0.01) { // Only add non-zero transactions
            breakdown.push({
              from: fromPerson,
              to: toPerson,
              amount: Number(amount.toFixed(2)),
              items: groceries
                .filter(item => item.assignedTo === toPerson)
                .map(item => item.name)
            });
            processed.add(`${fromPerson}-${toPerson}`);
          }
        }
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