/**
 * How hard a fight is for the party, by the 2024 rules: each enemy is worth XP by its challenge
 * rating, and each character's level gives an XP budget for a Low, Moderate, or High difficulty
 * fight. The budgets of the party add up.
 */

const XP_BY_CR: Readonly<Record<string, number>> = {
  '0': 10,
  '1/8': 25,
  '1/4': 50,
  '1/2': 100,
  '1': 200,
  '2': 450,
  '3': 700,
  '4': 1100,
  '5': 1800,
  '6': 2300,
  '7': 2900,
  '8': 3900,
  '9': 5000,
  '10': 5900,
  '11': 7200,
  '12': 8400,
  '13': 10000,
  '14': 11500,
  '15': 13000,
  '16': 15000,
  '17': 18000,
  '18': 20000,
  '19': 22000,
  '20': 25000,
  '21': 33000,
  '22': 41000,
  '23': 50000,
  '24': 62000,
  '25': 75000,
  '26': 90000,
  '27': 105000,
  '28': 120000,
  '29': 135000,
  '30': 155000,
}

/** XP budget per character, by level: Low, Moderate, High. */
const BUDGET_BY_LEVEL: readonly (readonly [number, number, number])[] = [
  [50, 75, 100],
  [100, 150, 200],
  [150, 225, 400],
  [250, 375, 500],
  [500, 750, 1100],
  [600, 1000, 1400],
  [750, 1300, 1700],
  [1000, 1700, 2100],
  [1300, 2000, 2600],
  [1600, 2300, 3100],
  [1900, 2900, 4100],
  [2200, 3700, 4700],
  [2600, 4200, 5400],
  [2900, 4900, 6200],
  [3300, 5400, 7800],
  [3800, 6100, 9800],
  [4500, 7200, 11700],
  [5000, 8700, 14200],
  [5500, 10700, 17200],
  [6400, 13200, 22000],
]

export function xpForCr(cr: string | undefined): number {
  return cr === undefined ? 0 : (XP_BY_CR[cr] ?? 0)
}

export type DifficultyBudget = { low: number; moderate: number; high: number }

/** The party's combined budget. Characters without a known level are left out. */
export function partyBudget(levels: readonly (number | undefined)[]): DifficultyBudget {
  return levels.reduce<DifficultyBudget>(
    (sum, level) => {
      if (level === undefined) return sum
      const [low, moderate, high] = BUDGET_BY_LEVEL[Math.min(20, Math.max(1, level)) - 1]!
      return { low: sum.low + low, moderate: sum.moderate + moderate, high: sum.high + high }
    },
    { low: 0, moderate: 0, high: 0 },
  )
}

export type DifficultyBand = 'none' | 'below-low' | 'low' | 'moderate' | 'high' | 'beyond-high'

/**
 * Where an XP total falls. A fight past the High budget by half again is beyond what the rules
 * plan for, and can kill characters.
 */
export function difficultyBand(xp: number, budget: DifficultyBudget): DifficultyBand {
  if (xp <= 0) return 'none'
  if (budget.high === 0) return 'none'
  if (xp > budget.high * 1.5) return 'beyond-high'
  if (xp >= budget.high) return 'high'
  if (xp >= budget.moderate) return 'moderate'
  if (xp >= budget.low) return 'low'
  return 'below-low'
}

export const DIFFICULTY_LABEL: Readonly<Record<DifficultyBand, string>> = {
  none: 'No enemies',
  'below-low': 'Below Low',
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  'beyond-high': 'Beyond High',
}
