/** DM screen reference tables. Terms they mention are explained by the rules glossary. */

/** What a creature can do on its turn, in the order a new DM checks it. */
export const TURN_PARTS = [
  { label: 'Move', note: 'Up to its speed, split before and after its action.' },
  { label: 'Action', note: 'One action: Attack, Magic, Dash, Dodge, and so on.' },
  { label: 'Bonus action', note: 'Only if a feature or spell gives one.' },
  { label: 'Reaction', note: 'One per round, even on others’ turns, e.g. an opportunity attack.' },
  { label: 'Free', note: 'Talk briefly and interact with one object, like drawing a weapon.' },
] as const

export const DIFFICULTY_CLASSES = [
  { dc: 5, label: 'Very easy' },
  { dc: 10, label: 'Easy' },
  { dc: 15, label: 'Medium' },
  { dc: 20, label: 'Hard' },
  { dc: 25, label: 'Very hard' },
  { dc: 30, label: 'Nearly impossible' },
] as const

export const ADVANTAGE_SOURCES = {
  advantage: [
    'The attacker is unseen, or the target can’t see it',
    'Melee attack against a prone target',
    'The target is restrained, paralyzed, stunned, or unconscious',
    'An ally used Help on this target',
  ],
  disadvantage: [
    'The attacker can’t see the target',
    'Ranged attack with an enemy within 5 ft.',
    'Ranged attack against a prone target',
    'Attacking beyond normal range',
    'The attacker is prone, restrained, poisoned, or frightened',
  ],
} as const

/** Damage for traps and hazards the DM makes up, by how bad it should hurt and party level. */
export const IMPROVISED_DAMAGE = {
  levels: ['Levels 1–4', 'Levels 5–10', 'Levels 11–16', 'Levels 17–20'],
  rows: [
    { label: 'Setback', dice: ['1d10', '2d10', '4d10', '10d10'] },
    { label: 'Dangerous', dice: ['2d10', '4d10', '10d10', '18d10'] },
    { label: 'Deadly', dice: ['4d10', '10d10', '18d10', '24d10'] },
  ],
} as const

export const FALLING = [
  { label: 'Damage', note: '1d6 bludgeoning per 10 ft. fallen, up to 20d6.' },
  { label: 'Landing', note: 'Lands prone unless it avoids the damage.' },
] as const
