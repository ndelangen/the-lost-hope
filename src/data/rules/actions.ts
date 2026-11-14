import { refs } from '#/data/generated/refs.ts'
import { create } from '#/definitions/rule.ts'

const glossary = (anchor: string) => ({ page: 'rules-glossary', anchor }) as const

export const attack = create({
  name: 'Attack',
  category: 'action',
  summary: ['Make one attack, or more with Extra Attack or Multiattack.'],
  source: glossary('AttackAction'),
})

export const magic = create({
  name: 'Magic',
  category: 'action',
  summary: ['Cast a spell, or use a magic item or a magical feature.'],
  source: glossary('MagicAction'),
})

export const dash = create({
  name: 'Dash',
  category: 'action',
  summary: ['Gain extra movement equal to its ', refs.rules.speed, ' this turn.'],
  source: glossary('DashAction'),
})

export const disengage = create({
  name: 'Disengage',
  category: 'action',
  summary: ['Its movement doesn’t provoke an ', refs.rules.opportunity_attack, ' this turn.'],
  source: glossary('DisengageAction'),
})

export const dodge = create({
  name: 'Dodge',
  category: 'action',
  summary: [
    'Until its next turn, attacks against it have ',
    refs.rules.disadvantage,
    ' and it has ',
    refs.rules.advantage,
    ' on Dexterity saves.',
  ],
  source: glossary('DodgeAction'),
})

export const help = create({
  name: 'Help',
  category: 'action',
  summary: [
    'An ally gains ',
    refs.rules.advantage,
    ' on its next check, or on its next attack against an enemy within 5 ft. of the helper.',
  ],
  source: glossary('HelpAction'),
})

export const hide = create({
  name: 'Hide',
  category: 'action',
  summary: ['Make a DC 15 Dexterity (Stealth) check while out of sight to become hidden.'],
  source: glossary('HideAction'),
})

export const ready = create({
  name: 'Ready',
  category: 'action',
  summary: [
    'Pick a trigger and an action; take it as a ',
    refs.rules.reaction,
    ' when the trigger happens.',
  ],
  source: glossary('ReadyAction'),
})

export const search = create({
  name: 'Search',
  category: 'action',
  summary: ['Make a Wisdom check to notice or find something.'],
  source: glossary('SearchAction'),
})

export const study = create({
  name: 'Study',
  category: 'action',
  summary: ['Make an Intelligence check to recall lore or work something out.'],
  source: glossary('StudyAction'),
})

export const influence = create({
  name: 'Influence',
  category: 'action',
  summary: ['Make a Charisma or Wisdom check to sway a creature’s attitude.'],
  source: glossary('InfluenceAction'),
})

export const utilize = create({
  name: 'Utilize',
  category: 'action',
  summary: ['Use an object that needs an action, like a lever or a potion.'],
  source: glossary('UtilizeAction'),
})

export const grapple = create({
  name: 'Grapple',
  category: 'action',
  summary: [
    'Replaces one attack. The target makes a Strength or Dexterity save (',
    refs.rules.difficulty_class,
    ' 8 + Strength modifier + ',
    refs.rules.proficiency_bonus,
    ') or is ',
    refs.rules.grappled,
    '.',
  ],
  source: glossary('Grappling'),
})

export const shove = create({
  name: 'Shove',
  category: 'action',
  summary: [
    'Replaces one attack. The target makes a Strength or Dexterity save (',
    refs.rules.difficulty_class,
    ' 8 + Strength modifier + ',
    refs.rules.proficiency_bonus,
    ') or is pushed 5 ft. or knocked ',
    refs.rules.prone,
    '.',
  ],
  source: glossary('UnarmedStrike'),
})

export const opportunity_attack = create({
  name: 'Opportunity Attack',
  category: 'combat',
  summary: [
    'A ',
    refs.rules.reaction,
    ': one melee attack when a creature it can see leaves its reach.',
  ],
  source: glossary('OpportunityAttacks'),
})
