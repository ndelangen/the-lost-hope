import { refs } from '#/data/generated/refs.ts'
import { create } from '#/definitions/rule.ts'

const glossary = (anchor: string) => ({ page: 'rules-glossary', anchor }) as const

export const armor_class = create({
  name: 'Armor Class',
  short: 'AC',
  category: 'combat',
  summary: [
    'How hard it is to hit. An ',
    refs.rules.attack_roll,
    ' hits when d20 + its bonus equals or beats the target’s AC.',
  ],
  source: glossary('ArmorClass'),
})

export const hit_points = create({
  name: 'Hit Points',
  short: 'HP',
  category: 'combat',
  summary: [
    'How much damage it can take. At 0 a monster usually dies; a player character falls ',
    refs.rules.unconscious,
    ' and starts making death saves.',
  ],
  source: glossary('HitPoints'),
})

export const initiative = create({
  name: 'Initiative',
  category: 'combat',
  summary: [
    'The turn order in combat. Everyone rolls d20 + Dexterity modifier; highest goes first.',
  ],
  source: glossary('Initiative'),
})

export const speed = create({
  name: 'Speed',
  category: 'combat',
  summary: ['How many feet it can move on its turn, split before and after its action.'],
  source: glossary('Speed'),
})

export const challenge_rating = create({
  name: 'Challenge Rating',
  short: 'CR',
  category: 'combat',
  summary: [
    'How dangerous a monster is. Four characters of a level equal to the CR should be able to beat one such monster.',
  ],
  source: glossary('ChallengeRating'),
})

export const proficiency_bonus = create({
  name: 'Proficiency Bonus',
  short: 'PB',
  category: 'combat',
  summary: [
    'Added to attacks, saves, and checks it is trained in. It grows with level or ',
    refs.rules.challenge_rating,
    ', from +2 to +9.',
  ],
  source: glossary('Proficiency'),
})

export const saving_throw = create({
  name: 'Saving Throw',
  category: 'combat',
  summary: [
    'A d20 roll to resist something, plus the matching ability’s save bonus. It succeeds on the effect’s ',
    refs.rules.difficulty_class,
    ' or higher.',
  ],
  source: glossary('SavingThrow'),
})

export const difficulty_class = create({
  name: 'Difficulty Class',
  short: 'DC',
  category: 'combat',
  summary: ['The number a check or save must reach to succeed. 10 is easy, 15 medium, 20 hard.'],
  source: glossary('DifficultyClass'),
})

export const attack_roll = create({
  name: 'Attack Roll',
  category: 'combat',
  summary: [
    'd20 + attack bonus against the target’s ',
    refs.rules.armor_class,
    '. A natural 20 always hits and is a ',
    refs.rules.critical_hit,
    '; a natural 1 always misses.',
  ],
  source: glossary('AttackRoll'),
})

export const advantage = create({
  name: 'Advantage',
  category: 'combat',
  summary: [
    'Roll two d20s and use the higher. Advantage and ',
    refs.rules.disadvantage,
    ' cancel out, however many of each apply.',
  ],
  source: glossary('Advantage'),
})

export const disadvantage = create({
  name: 'Disadvantage',
  category: 'combat',
  summary: [
    'Roll two d20s and use the lower. ',
    refs.rules.advantage,
    ' and disadvantage cancel out, however many of each apply.',
  ],
  source: glossary('Disadvantage'),
})

export const critical_hit = create({
  name: 'Critical Hit',
  category: 'combat',
  summary: ['A natural 20 on an attack. Roll the attack’s damage dice twice, then add modifiers.'],
  source: glossary('CriticalHit'),
})

export const concentration = create({
  name: 'Concentration',
  category: 'combat',
  summary: [
    'Some spells last only while the caster concentrates. Taking damage forces a Constitution ',
    refs.rules.saving_throw,
    ' (DC 10 or half the damage, whichever is higher, up to 30) to keep it. One at a time.',
  ],
  source: glossary('Concentration'),
})

export const resistance = create({
  name: 'Resistance',
  category: 'combat',
  summary: ['Takes half damage of that type, rounded down.'],
  source: glossary('Resistance'),
})

export const vulnerability = create({
  name: 'Vulnerability',
  category: 'combat',
  summary: ['Takes double damage of that type.'],
  source: glossary('Vulnerability'),
})

export const immunity = create({
  name: 'Immunity',
  category: 'combat',
  summary: ['Takes no damage of that type, or can’t be affected by that condition.'],
  source: glossary('Immunity'),
})

export const bonus_action = create({
  name: 'Bonus Action',
  category: 'combat',
  summary: ['An extra, quick action on its turn, only when a feature or spell grants one.'],
  source: glossary('BonusAction'),
})

export const reaction = create({
  name: 'Reaction',
  category: 'combat',
  summary: [
    'One instant response per round, even on someone else’s turn, such as an ',
    refs.rules.opportunity_attack,
    '.',
  ],
  source: glossary('Reaction'),
})

export const passive_perception = create({
  name: 'Passive Perception',
  category: 'combat',
  summary: [
    '10 + its Perception bonus. What it notices without trying; compare it to a Stealth check.',
  ],
  source: glossary('PassivePerception'),
})

export const cover = create({
  name: 'Cover',
  category: 'combat',
  summary: [
    'Half cover gives +2 ',
    refs.rules.armor_class,
    ' and Dexterity saves, three-quarters cover +5, and full cover means it can’t be targeted directly.',
  ],
  source: glossary('Cover'),
})
