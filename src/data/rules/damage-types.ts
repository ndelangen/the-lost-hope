import { create } from '#/definitions/rule.ts'

const source = { page: 'rules-glossary', anchor: 'DamageTypes' } as const

export const acid = create({
  name: 'Acid',
  category: 'damageType',
  summary: ['Corrosive liquids and digestive enzymes.'],
  source,
})

export const bludgeoning = create({
  name: 'Bludgeoning',
  category: 'damageType',
  summary: ['Blunt objects, constriction, and falling.'],
  source,
})

export const cold = create({
  name: 'Cold',
  category: 'damageType',
  summary: ['Freezing water and icy blasts.'],
  source,
})

export const fire = create({
  name: 'Fire',
  category: 'damageType',
  summary: ['Flames and unbearable heat.'],
  source,
})

export const force = create({
  name: 'Force',
  category: 'damageType',
  summary: ['Pure magical energy. Very few creatures resist it.'],
  source,
})

export const lightning = create({
  name: 'Lightning',
  category: 'damageType',
  summary: ['Electricity.'],
  source,
})

export const necrotic = create({
  name: 'Necrotic',
  category: 'damageType',
  summary: ['Life-draining energy.'],
  source,
})

export const piercing = create({
  name: 'Piercing',
  category: 'damageType',
  summary: ['Fangs, arrows, and other puncturing objects.'],
  source,
})

export const poison = create({
  name: 'Poison',
  category: 'damageType',
  summary: ['Toxic gas and venom. Many undead and constructs are immune.'],
  source,
})

export const psychic = create({
  name: 'Psychic',
  category: 'damageType',
  summary: ['Mind-rending energy.'],
  source,
})

export const radiant = create({
  name: 'Radiant',
  category: 'damageType',
  summary: ['Holy energy and searing radiation.'],
  source,
})

export const slashing = create({
  name: 'Slashing',
  category: 'damageType',
  summary: ['Claws, blades, and other cutting objects.'],
  source,
})

export const thunder = create({
  name: 'Thunder',
  category: 'damageType',
  summary: ['Concussive sound.'],
  source,
})
