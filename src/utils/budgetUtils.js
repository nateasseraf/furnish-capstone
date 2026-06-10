export function calculateTotalSpent(items) {
  return items
    .filter((item) => item.status === 'Bought')
    .reduce((total, item) => total + item.price, 0)
}

export function calculatePlannedTotal(items) {
  return items
    .filter((item) => item.status === 'Planned')
    .reduce((total, item) => total + item.price, 0)
}

export function calculateRemainingBudget(totalBudget, items) {
  return totalBudget - calculateTotalSpent(items)
}

export function calculateTopUpNeeded(totalBudget, items) {
  const spent = calculateTotalSpent(items)
  const planned = calculatePlannedTotal(items)
  const difference = spent + planned - totalBudget

  return difference > 0 ? difference : 0
}