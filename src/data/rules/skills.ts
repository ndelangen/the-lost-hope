import { refs } from '#/data/generated/refs.ts'
import { create } from '#/definitions/rule.ts'

const source = { page: 'playing-the-game', anchor: 'SkillList' } as const

export const acrobatics = create({
  name: 'Acrobatics',
  category: 'skill',
  ability: refs.rules.dex,
  summary: ['Staying on your feet: balancing, tumbling, and slipping out of a grapple.'],
  source,
})

export const animal_handling = create({
  name: 'Animal Handling',
  category: 'skill',
  ability: refs.rules.wis,
  summary: ['Calming, training, or reading an animal.'],
  source,
})

export const arcana = create({
  name: 'Arcana',
  category: 'skill',
  ability: refs.rules.int,
  summary: ['Knowing about spells, magic items, and the planes.'],
  source,
})

export const athletics = create({
  name: 'Athletics',
  category: 'skill',
  ability: refs.rules.str,
  summary: ['Climbing, jumping, swimming, and grappling.'],
  source,
})

export const deception = create({
  name: 'Deception',
  category: 'skill',
  ability: refs.rules.cha,
  summary: ['Telling convincing lies or keeping up a disguise.'],
  source,
})

export const history = create({
  name: 'History',
  category: 'skill',
  ability: refs.rules.int,
  summary: ['Recalling past events, people, and lost kingdoms.'],
  source,
})

export const insight = create({
  name: 'Insight',
  category: 'skill',
  ability: refs.rules.wis,
  summary: ['Reading someone’s mood and intentions, and spotting lies.'],
  source,
})

export const intimidation = create({
  name: 'Intimidation',
  category: 'skill',
  ability: refs.rules.cha,
  summary: ['Getting your way through threats.'],
  source,
})

export const investigation = create({
  name: 'Investigation',
  category: 'skill',
  ability: refs.rules.int,
  summary: ['Searching for clues and working out how things fit together.'],
  source,
})

export const medicine = create({
  name: 'Medicine',
  category: 'skill',
  ability: refs.rules.wis,
  summary: ['Stabilizing the dying and diagnosing illness.'],
  source,
})

export const nature = create({
  name: 'Nature',
  category: 'skill',
  ability: refs.rules.int,
  summary: ['Knowing about terrain, plants, animals, and weather.'],
  source,
})

export const perception = create({
  name: 'Perception',
  category: 'skill',
  ability: refs.rules.wis,
  summary: ['Noticing things with your senses.'],
  source,
})

export const performance = create({
  name: 'Performance',
  category: 'skill',
  ability: refs.rules.cha,
  summary: ['Entertaining with music, dance, acting, or storytelling.'],
  source,
})

export const persuasion = create({
  name: 'Persuasion',
  category: 'skill',
  ability: refs.rules.cha,
  summary: ['Influencing others with tact and honesty.'],
  source,
})

export const religion = create({
  name: 'Religion',
  category: 'skill',
  ability: refs.rules.int,
  summary: ['Knowing about gods, rites, and holy symbols.'],
  source,
})

export const sleight_of_hand = create({
  name: 'Sleight of Hand',
  category: 'skill',
  ability: refs.rules.dex,
  summary: ['Picking pockets, palming objects, and other tricks of the hand.'],
  source,
})

export const stealth = create({
  name: 'Stealth',
  category: 'skill',
  ability: refs.rules.dex,
  summary: ['Hiding and moving without being noticed.'],
  source,
})

export const survival = create({
  name: 'Survival',
  category: 'skill',
  ability: refs.rules.wis,
  summary: ['Tracking, hunting, finding the way, and reading the weather.'],
  source,
})
