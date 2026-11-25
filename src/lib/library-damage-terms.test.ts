import { expect, test } from 'vitest'

import { DAMAGE_TYPE_COLORS } from './damage-type-colors'
import { libraryDamageTerms } from './library-damage-terms'

test('recognizes compact rolls and preserves the printed case and offsets', () => {
  const text = 'Hit 12 (2d6 + 5) bludgeoning. Later, take 6 Acid Damage.'
  expect(
    libraryDamageTerms(text).map(({ start, end, type }) => [text.slice(start, end), type]),
  ).toEqual([
    ['bludgeoning', 'bludgeoning'],
    ['Acid', 'acid'],
  ])
})

test('recognizes coordinated types, defenses, and the full encounter palette', () => {
  const text = 'Resistance to bludgeoning, piercing, and slashing; lightning or thunder damage.'
  expect(libraryDamageTerms(text).map((term) => term.type)).toEqual([
    'bludgeoning',
    'piercing',
    'slashing',
    'lightning',
    'thunder',
  ])
  const types = Object.keys(DAMAGE_TYPE_COLORS)
  expect(libraryDamageTerms(types.join(', '), true).map((term) => term.type)).toEqual(types)
})

test('leaves spell names and ordinary prose alone', () => {
  expect(libraryDamageTerms('Phantasmal Force. Cast Wall of Fire in the cold air.')).toEqual([])
})

test('distinguishes conditional equipment from the damage list it grants', () => {
  const text = 'While attuned to the ring of force resistance: force'
  expect(libraryDamageTerms(text, true)).toEqual([
    { start: text.lastIndexOf('force'), end: text.length, type: 'force' },
  ])
  expect(
    libraryDamageTerms('It resists all damage except force, psychic, and radiant.').map(
      (term) => term.type,
    ),
  ).toEqual(['force', 'psychic', 'radiant'])
})
