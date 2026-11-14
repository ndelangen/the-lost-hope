import { refs } from '#/data/generated/refs.ts'
import { create } from '#/definitions/rule.ts'

const glossary = (anchor: string) => ({ page: 'rules-glossary', anchor }) as const

export const short_rest = create({
  name: 'Short Rest',
  category: 'rest',
  summary: [
    'An hour of downtime. Characters can spend Hit Point Dice to heal, and some features recharge.',
  ],
  source: glossary('ShortRest'),
})

export const long_rest = create({
  name: 'Long Rest',
  category: 'rest',
  summary: [
    'At least 8 hours, mostly sleep. Characters regain all ',
    refs.rules.hit_points,
    ' and spent Hit Point Dice, and most features and spell slots recharge. Once per day.',
  ],
  source: glossary('LongRest'),
})

export const death_saving_throw = create({
  name: 'Death Saving Throw',
  category: 'combat',
  summary: [
    'A character at 0 HP rolls a d20 at the start of each turn: 10 or higher is a success, lower a failure. Three successes: stable. Three failures: dead. A natural 20 brings them back with 1 HP.',
  ],
  source: glossary('DeathSavingThrow'),
})
