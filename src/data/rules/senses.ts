import { create } from '#/definitions/rule.ts'

const glossary = (anchor: string) => ({ page: 'rules-glossary', anchor }) as const

export const blindsight = create({
  name: 'Blindsight',
  category: 'sense',
  summary: [
    'Senses its surroundings within that range without seeing; it can perceive invisible creatures there.',
  ],
  source: glossary('Blindsight'),
})

export const darkvision = create({
  name: 'Darkvision',
  category: 'sense',
  summary: ['Sees in darkness within that range as if it were dim light, in shades of gray.'],
  source: glossary('Darkvision'),
})

export const tremorsense = create({
  name: 'Tremorsense',
  category: 'sense',
  summary: ['Senses creatures and objects within that range that touch the same ground or liquid.'],
  source: glossary('Tremorsense'),
})

export const truesight = create({
  name: 'Truesight',
  category: 'sense',
  summary: [
    'Within that range it sees in darkness, sees invisible creatures, and sees through illusions and shape-changes.',
  ],
  source: glossary('Truesight'),
})
