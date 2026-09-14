export const calculateBudgetBreakdown = (budget, days, style = 'comfort') => {
  const dailyBudget = budget / days
  
  const breakdown = {
    flights: budget * 0.25,
    accommodation: budget * 0.35,
    food: budget * 0.20,
    attractions: budget * 0.12,
    transport: budget * 0.05,
    other: budget * 0.03
  }
  
  if (style === 'budget') {
    breakdown.accommodation *= 0.6
    breakdown.food *= 0.7
    breakdown.attractions *= 0.5
    breakdown.flights *= 0.9
  } else if (style === 'luxury') {
    breakdown.accommodation *= 1.5
    breakdown.food *= 1.5
    breakdown.attractions *= 1.5
    breakdown.flights *= 1.1
  }
  
  return breakdown
}

export const calculateTotalCost = (breakdown) => {
  return Object.values(breakdown).reduce((a, b) => a + b, 0)
}

export const recommendCities = (country, interests, days, budget) => {
  const recommendations = {
    'Spain': {
      beach: ['Barcelona', 'Malaga'],
      architecture: ['Barcelona', 'Seville'],
      nightlife: ['Madrid', 'Barcelona'],
      football: ['Barcelona', 'Madrid']
    },
    'France': {
      architecture: ['Paris', 'Lyon'],
      food: ['Lyon', 'Bordeaux'],
      beaches: ['Nice', 'Cannes'],
      museums: ['Paris']
    },
    'Italy': {
      architecture: ['Rome', 'Venice'],
      beaches: ['Naples', 'Sicily'],
      museums: ['Florence', 'Rome'],
      food: ['Bologna', 'Rome']
    }
  }
  
  return recommendations[country] || []
}

export const optimizeBudget = (currentPlan, targetBudget) => {
  const cost = calculateTotalCost(currentPlan)
  const difference = cost - targetBudget
  
  if (difference <= 0) return currentPlan
  
  const optimized = { ...currentPlan }
  optimized.accommodation *= (1 - (difference / cost) * 0.4)
  optimized.attractions *= (1 - (difference / cost) * 0.3)
  optimized.food *= (1 - (difference / cost) * 0.2)
  
  return optimized
}
