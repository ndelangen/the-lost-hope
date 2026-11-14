import { refs } from '#/data/generated/refs.ts'
import { create } from '#/definitions/rule.ts'

const glossary = (anchor: string) => ({ page: 'rules-glossary', anchor }) as const

export const cone = create({
  name: 'Cone',
  category: 'area',
  summary: [
    'Spreads from its point of origin; at any distance its width equals that distance. The origin itself isn’t included.',
  ],
  source: glossary('ConeAreaofEffect'),
})

export const cube = create({
  name: 'Cube',
  category: 'area',
  summary: ['A cube whose side length is given. Its point of origin lies on one face.'],
  source: glossary('CubeAreaofEffect'),
})

export const line = create({
  name: 'Line',
  category: 'area',
  summary: ['A straight path from its point of origin, with the given length and width.'],
  source: glossary('LineAreaofEffect'),
})

export const sphere = create({
  name: 'Sphere',
  category: 'area',
  summary: ['Extends in every direction from its point of origin to the given radius.'],
  source: glossary('SphereAreaofEffect'),
})

export const emanation = create({
  name: 'Emanation',
  category: 'area',
  summary: [
    'Extends in every direction from a creature or object and moves with it. The source itself isn’t affected unless the rule says so.',
  ],
  source: glossary('EmanationAreaofEffect'),
})

export const half_damage = create({
  name: 'Half Damage',
  category: 'combat',
  summary: [
    'On a successful ',
    refs.rules.saving_throw,
    ' against damage that allows it, the target takes half the rolled damage, rounded down.',
  ],
  source: { page: 'playing-the-game', anchor: 'HalfDamage' },
})
