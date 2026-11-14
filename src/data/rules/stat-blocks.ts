import { refs } from '#/data/generated/refs.ts'
import { create } from '#/definitions/rule.ts'

const monster = (anchor: string) => ({ page: 'how-to-use-a-monster', anchor }) as const

export const multiattack = create({
  name: 'Multiattack',
  category: 'statBlock',
  summary: [
    'One ',
    refs.rules.attack,
    ' action that makes several attacks, as listed. Roll each attack separately.',
  ],
  source: monster('Multiattack'),
})

export const legendary_action = create({
  name: 'Legendary Action',
  category: 'statBlock',
  summary: [
    'A special action taken right after another creature’s turn, spending uses from a pool that refills at the start of the monster’s own turn. One at a time.',
  ],
  source: monster('LegendaryActions'),
})

export const lair_action = create({
  name: 'Lair Action',
  category: 'statBlock',
  summary: [
    'While fighting in its lair, the monster takes one lair action on ',
    refs.rules.initiative,
    ' count 20 each round, and not the same one twice in a row.',
  ],
})

export const recharge = create({
  name: 'Recharge',
  category: 'statBlock',
  summary: [
    'After using it, roll a d6 at the start of each of the monster’s turns. On one of the listed numbers, such as 5–6, it can be used again.',
  ],
  source: monster('LimitedUsage'),
})

export const uses_per_day = create({
  name: 'Uses per Day',
  category: 'statBlock',
  summary: [
    'It can be used that many times, such as 2/Day, and regains all uses after a long rest.',
  ],
  source: monster('LimitedUsage'),
})

export const reach = create({
  name: 'Reach',
  category: 'combat',
  summary: [
    'How far away a melee attack can hit, usually 5 ft. Leaving it can provoke an ',
    refs.rules.opportunity_attack,
    '.',
  ],
  source: { page: 'playing-the-game', anchor: 'Reach' },
})

export const range = create({
  name: 'Range',
  category: 'combat',
  summary: [
    'A ranged attack lists two numbers, like 80/320 ft. Beyond the first it has ',
    refs.rules.disadvantage,
    '; beyond the second it can’t hit.',
  ],
  source: { page: 'playing-the-game', anchor: 'Range' },
})
