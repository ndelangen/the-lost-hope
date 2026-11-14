import { create } from '#/definitions/rule.ts'

const source = { page: 'rules-glossary', anchor: 'DamageTypes' } as const

export const acid = create({
  name: 'Acid',
  category: 'damageType',
  icon: 'gi/GiAcid',
  summary: ['Corrosive liquids and digestive enzymes.'],
  source,
})

export const bludgeoning = create({
  name: 'Bludgeoning',
  category: 'damageType',
  icon: 'gi/GiWarhammer',
  summary: ['Blunt objects, constriction, and falling.'],
  source,
})

export const cold = create({
  name: 'Cold',
  category: 'damageType',
  icon: 'gi/GiSnowflake1',
  summary: ['Freezing water and icy blasts.'],
  source,
})

export const fire = create({
  name: 'Fire',
  category: 'damageType',
  icon: 'gi/GiFire',
  summary: ['Flames and unbearable heat.'],
  source,
})

export const force = create({
  name: 'Force',
  category: 'damageType',
  icon: 'gi/GiMightyForce',
  summary: ['Pure magical energy. Very few creatures resist it.'],
  source,
})

export const lightning = create({
  name: 'Lightning',
  category: 'damageType',
  icon: 'gi/GiLightningTrio',
  summary: ['Electricity.'],
  source,
})

export const necrotic = create({
  name: 'Necrotic',
  category: 'damageType',
  icon: 'gi/GiDeathSkull',
  summary: ['Life-draining energy.'],
  source,
})

export const piercing = create({
  name: 'Piercing',
  category: 'damageType',
  icon: 'gi/GiPiercingSword',
  summary: ['Fangs, arrows, and other puncturing objects.'],
  source,
})

export const poison = create({
  name: 'Poison',
  category: 'damageType',
  icon: 'gi/GiPoisonBottle',
  summary: ['Toxic gas and venom. Many undead and constructs are immune.'],
  source,
})

export const psychic = create({
  name: 'Psychic',
  category: 'damageType',
  icon: 'gi/GiPsychicWaves',
  summary: ['Mind-rending energy.'],
  source,
})

export const radiant = create({
  name: 'Radiant',
  category: 'damageType',
  icon: 'gi/GiSunRadiations',
  summary: ['Holy energy and searing radiation.'],
  source,
})

export const slashing = create({
  name: 'Slashing',
  category: 'damageType',
  icon: 'gi/GiCrossedSlashes',
  summary: ['Claws, blades, and other cutting objects.'],
  source,
})

export const thunder = create({
  name: 'Thunder',
  category: 'damageType',
  icon: 'gi/GiSoundWaves',
  summary: ['Concussive sound.'],
  source,
})
