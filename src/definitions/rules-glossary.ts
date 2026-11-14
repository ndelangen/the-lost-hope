/** Short reminders for rules terms that ability text refers to. Paraphrased from the SRD. */
export const CONDITIONS = {
  blinded: 'Can’t see. Its attacks have disadvantage; attacks against it have advantage.',
  charmed: 'Can’t attack the charmer. The charmer has advantage on social checks against it.',
  deafened: 'Can’t hear and fails any check that relies on hearing.',
  frightened:
    'Disadvantage on checks and attacks while it can see the source, and it can’t move closer to it.',
  grappled: 'Speed 0. Ends if the grappler is incapacitated or it is moved out of reach.',
  incapacitated: 'Can’t take actions, bonus actions, or reactions.',
  invisible: 'Can’t be seen. Its attacks have advantage; attacks against it have disadvantage.',
  paralyzed:
    'Incapacitated and can’t move or speak. Fails Str and Dex saves; hits from within 5 ft. are critical.',
  petrified:
    'Turned to stone: incapacitated, resistant to all damage, and immune to poison and disease.',
  poisoned: 'Disadvantage on attack rolls and ability checks.',
  prone:
    'Can only crawl; standing up costs half its speed. Melee attacks against it have advantage, ranged ones disadvantage.',
  restrained:
    'Speed 0. Its attacks and Dex saves have disadvantage; attacks against it have advantage.',
  stunned: 'Incapacitated, can’t move, and speaks falteringly. Fails Str and Dex saves.',
  unconscious:
    'Incapacitated, drops what it holds, and falls prone. Hits from within 5 ft. are critical.',
} as const

export type Condition = keyof typeof CONDITIONS

export const STANDARD_ACTIONS = {
  attack: { label: 'Attack', note: 'Make one attack, or more with Extra Attack or Multiattack.' },
  magic: { label: 'Magic', note: 'Cast a spell or use a magic item or magical feature.' },
  dash: { label: 'Dash', note: 'Gain extra movement equal to its speed this turn.' },
  disengage: {
    label: 'Disengage',
    note: 'Its movement doesn’t provoke opportunity attacks this turn.',
  },
  dodge: {
    label: 'Dodge',
    note: 'Attacks against it have disadvantage and it has advantage on Dex saves until its next turn.',
  },
  help: {
    label: 'Help',
    note: 'An ally gains advantage on its next check or attack against a nearby target.',
  },
  hide: { label: 'Hide', note: 'Make a Dexterity (Stealth) check to become hidden.' },
  ready: {
    label: 'Ready',
    note: 'Pick a trigger and an action; take it as a reaction when the trigger happens.',
  },
  search: { label: 'Search', note: 'Make a Wisdom check to notice or find something.' },
  study: { label: 'Study', note: 'Make an Intelligence check to recall or work something out.' },
  influence: { label: 'Influence', note: 'Make a Charisma or Wisdom check to sway a creature.' },
  utilize: {
    label: 'Utilize',
    note: 'Use an object that needs an action, like a lever or potion.',
  },
  grapple: {
    label: 'Grapple',
    note: 'Replaces one attack. The target makes a Str or Dex save (DC 8 + Str mod + PB) or is grappled.',
  },
  shove: {
    label: 'Shove',
    note: 'Replaces one attack. Str or Dex save (DC 8 + Str mod + PB) or pushed 5 ft. or knocked prone.',
  },
  'opportunity attack': {
    label: 'opportunity attack',
    note: 'A reaction: one melee attack when a creature it can see leaves its reach.',
  },
} as const

export type StandardAction = keyof typeof STANDARD_ACTIONS

/** What a creature can do on its turn, in the order a new DM checks it. */
export const TURN_PARTS = [
  { label: 'Move', note: 'Up to its speed, split before and after its action.' },
  { label: 'Action', note: 'One action: Attack, Magic, Dash, Dodge, and so on.' },
  { label: 'Bonus action', note: 'Only if a feature or spell gives one.' },
  { label: 'Reaction', note: 'One per round, even on others’ turns, e.g. an opportunity attack.' },
  { label: 'Free', note: 'Talk briefly and interact with one object, like drawing a weapon.' },
] as const

export const COVER = [
  { label: 'Half cover', note: '+2 AC and Dex saves. A low wall, furniture, another creature.' },
  { label: 'Three-quarters', note: '+5 AC and Dex saves. An arrow slit, a thick tree trunk.' },
  { label: 'Full cover', note: 'Can’t be targeted directly.' },
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
  note: 'Advantage and disadvantage cancel out, however many of each apply.',
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
