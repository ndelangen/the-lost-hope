import { refs } from '#/data/generated/refs.ts'
import { create } from '#/definitions/rule.ts'

const glossary = (anchor: string) => ({ page: 'rules-glossary', anchor }) as const

export const blinded = create({
  name: 'Blinded',
  category: 'condition',
  summary: [
    'Can’t see and fails any check that relies on sight. Its attacks have ',
    refs.rules.disadvantage,
    '; attacks against it have ',
    refs.rules.advantage,
    '.',
  ],
  source: glossary('BlindedCondition'),
})

export const charmed = create({
  name: 'Charmed',
  category: 'condition',
  summary: [
    'Can’t attack or target the charmer with harmful effects. The charmer has ',
    refs.rules.advantage,
    ' on social checks against it.',
  ],
  source: glossary('CharmedCondition'),
})

export const deafened = create({
  name: 'Deafened',
  category: 'condition',
  summary: ['Can’t hear and fails any check that relies on hearing.'],
  source: glossary('DeafenedCondition'),
})

export const frightened = create({
  name: 'Frightened',
  category: 'condition',
  summary: [
    refs.rules.disadvantage,
    ' on checks and attacks while it can see the source of its fear, and it can’t willingly move closer to it.',
  ],
  source: glossary('FrightenedCondition'),
})

export const grappled = create({
  name: 'Grappled',
  category: 'condition',
  summary: [
    'Speed 0, and ',
    refs.rules.disadvantage,
    ' on attacks against anyone but the grappler. Ends if the grappler is ',
    refs.rules.incapacitated,
    ' or it is moved out of reach.',
  ],
  source: glossary('GrappledCondition'),
})

export const incapacitated = create({
  name: 'Incapacitated',
  category: 'condition',
  summary: [
    'Can’t take an action, a ',
    refs.rules.bonus_action,
    ', or a ',
    refs.rules.reaction,
    ', and loses ',
    refs.rules.concentration,
    '.',
  ],
  source: glossary('IncapacitatedCondition'),
})

export const invisible = create({
  name: 'Invisible',
  category: 'condition',
  summary: [
    'Can’t be seen. Its attacks have ',
    refs.rules.advantage,
    '; attacks against it have ',
    refs.rules.disadvantage,
    '.',
  ],
  source: glossary('InvisibleCondition'),
})

export const paralyzed = create({
  name: 'Paralyzed',
  category: 'condition',
  summary: [
    refs.rules.incapacitated,
    ', speed 0, and fails Strength and Dexterity saves. Attacks against it have ',
    refs.rules.advantage,
    ', and a hit from within 5 ft. is a ',
    refs.rules.critical_hit,
    '.',
  ],
  source: glossary('ParalyzedCondition'),
})

export const petrified = create({
  name: 'Petrified',
  category: 'condition',
  summary: [
    'Turned to stone: ',
    refs.rules.incapacitated,
    ', speed 0, ',
    refs.rules.resistance,
    ' to all damage, and immune to poison.',
  ],
  source: glossary('PetrifiedCondition'),
})

export const poisoned = create({
  name: 'Poisoned',
  category: 'condition',
  summary: [refs.rules.disadvantage, ' on attack rolls and ability checks.'],
  source: glossary('PoisonedCondition'),
})

export const prone = create({
  name: 'Prone',
  category: 'condition',
  summary: [
    'Can only crawl; standing up costs half its speed. Its attacks have ',
    refs.rules.disadvantage,
    '. Melee attacks against it have ',
    refs.rules.advantage,
    ', ranged ones ',
    refs.rules.disadvantage,
    '.',
  ],
  source: glossary('ProneCondition'),
})

export const restrained = create({
  name: 'Restrained',
  category: 'condition',
  summary: [
    'Speed 0. Its attacks and Dexterity saves have ',
    refs.rules.disadvantage,
    '; attacks against it have ',
    refs.rules.advantage,
    '.',
  ],
  source: glossary('RestrainedCondition'),
})

export const stunned = create({
  name: 'Stunned',
  category: 'condition',
  summary: [
    refs.rules.incapacitated,
    ' and fails Strength and Dexterity saves. Attacks against it have ',
    refs.rules.advantage,
    '.',
  ],
  source: glossary('StunnedCondition'),
})

export const unconscious = create({
  name: 'Unconscious',
  category: 'condition',
  summary: [
    refs.rules.incapacitated,
    ' and ',
    refs.rules.prone,
    ', drops what it holds, and fails Strength and Dexterity saves. A hit from within 5 ft. is a ',
    refs.rules.critical_hit,
    '.',
  ],
  source: glossary('UnconsciousCondition'),
})
