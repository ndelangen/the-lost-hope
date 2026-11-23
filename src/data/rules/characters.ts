import { refs } from '#/data/generated/refs.ts'
import { create } from '#/definitions/rule.ts'

const glossary = (anchor: string) => ({ page: 'rules-glossary', anchor }) as const

export const temporary_hit_points = create({
  name: 'Temporary Hit Points',
  short: 'Temp HP',
  category: 'character',
  summary: [
    'A buffer on top of your ',
    refs.rules.hit_points,
    '. Damage takes them first. They don’t stack: a new amount replaces the old one. Healing doesn’t restore them, and they’re gone after a ',
    refs.rules.long_rest,
    '.',
  ],
  source: glossary('TemporaryHitPoints'),
})

export const exhaustion = create({
  name: 'Exhaustion',
  category: 'character',
  summary: [
    'Levels 1 to 6. Each level takes 2 off every d20 Test and 5 ft. off your ',
    refs.rules.speed,
    '. At level 6 you die. A ',
    refs.rules.long_rest,
    ' removes one level.',
  ],
  source: glossary('ExhaustionCondition'),
})

export const heroic_inspiration = create({
  name: 'Heroic Inspiration',
  category: 'character',
  summary: [
    'A reward from the DM. Spend it to reroll any one die right after you roll it; you must use the new roll. You either have it or you don’t.',
  ],
  source: glossary('HeroicInspiration'),
})

export const spell_slot = create({
  name: 'Spell Slot',
  category: 'character',
  summary: [
    'Casting a spell of level 1 or higher spends one slot of that level or higher. Cantrips are free. Spent slots come back after a ',
    refs.rules.long_rest,
    '.',
  ],
})

export const pact_magic = create({
  name: 'Pact Magic',
  category: 'character',
  summary: [
    'A warlock’s spell slots. They are all of one level, and they all come back after a ',
    refs.rules.short_rest,
    ' or a ',
    refs.rules.long_rest,
    '.',
  ],
})

export const hit_point_dice = create({
  name: 'Hit Point Dice',
  short: 'Hit Dice',
  category: 'character',
  summary: [
    'One die per character level. During a ',
    refs.rules.short_rest,
    ', spend any number: roll each, add your ',
    refs.rules.con,
    ' modifier, and regain that many ',
    refs.rules.hit_points,
    '. A ',
    refs.rules.long_rest,
    ' gives them all back.',
  ],
  source: glossary('HitPointDice'),
})

export const expertise = create({
  name: 'Expertise',
  category: 'character',
  summary: ['Your ', refs.rules.proficiency_bonus, ' counts twice for checks with this skill.'],
  source: glossary('Expertise'),
})

export const stable = create({
  name: 'Stable',
  category: 'character',
  summary: [
    'At 0 ',
    refs.rules.hit_points,
    ' and ',
    refs.rules.unconscious,
    ', but no longer making death saves. You regain 1 HP after 1d4 hours, and any damage starts the death saves again.',
  ],
  source: glossary('Stable'),
})
