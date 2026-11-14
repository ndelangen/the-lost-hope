import { create } from '#/definitions/rule.ts'

const source = { page: 'playing-the-game', anchor: 'AbilityDescriptions' } as const

export const str = create({
  name: 'Strength',
  short: 'STR',
  category: 'ability',
  summary: ['Physical might: lifting, pushing, climbing, and melee attacks with most weapons.'],
  source: source,
})

export const dex = create({
  name: 'Dexterity',
  short: 'DEX',
  category: 'ability',
  summary: ['Agility, reflexes, and balance: dodging, sneaking, ranged attacks, and initiative.'],
  source: source,
})

export const con = create({
  name: 'Constitution',
  short: 'CON',
  category: 'ability',
  summary: ['Health and stamina: hit points and holding concentration.'],
  source: source,
})

export const int = create({
  name: 'Intelligence',
  short: 'INT',
  category: 'ability',
  summary: ['Reasoning and memory: recalling lore and working things out.'],
  source: source,
})

export const wis = create({
  name: 'Wisdom',
  short: 'WIS',
  category: 'ability',
  summary: ['Perception and insight: noticing things, reading people, and resisting charms.'],
  source: source,
})

export const cha = create({
  name: 'Charisma',
  short: 'CHA',
  category: 'ability',
  summary: ['Force of personality: persuading, deceiving, and performing.'],
  source: source,
})
