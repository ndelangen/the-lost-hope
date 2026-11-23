import { describe, expect, it } from 'vitest'

import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { deckCards } from '#/lib/dm-campaign'

import { type DeckCard, buildDeck, cardStatus, drawCards, shuffle } from './deck'

/** A small deterministic generator (mulberry32), so a shuffle can be repeated. */
function seeded(seed: number) {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let mixed = Math.imul(state ^ (state >>> 15), 1 | state)
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296
  }
}

const card = (key: string, tone: DeckCard['tone'], classic = false): DeckCard => ({
  key,
  name: key,
  suit: 'Star',
  tone,
  classic,
  text: '',
  draws: [],
})

const sample = [
  card('a', 'good', true),
  card('b', 'mixed'),
  card('c', 'bad', true),
  card('d', 'good'),
]

describe('the campaign deck', () => {
  it('holds 55 cards with unique keys, 22 of them classic', () => {
    expect(deckCards).toHaveLength(55)
    expect(new Set(deckCards.map((entry) => entry.key)).size).toBe(55)
    expect(deckCards.filter((entry) => entry.classic)).toHaveLength(22)
  })

  it('marks the cards that change how many cards are drawn', () => {
    expect(
      deckCards
        .filter((entry) => entry.extraDraws)
        .map((entry) => entry.key)
        .toSorted(),
    ).toEqual(['the_fool', 'the_idiot', 'the_jester'])
  })

  it('finds the draw behind every effect a card caused', () => {
    const linked = new Set(
      deckCards.flatMap((entry) =>
        entry.draws.flatMap((draw) => draw.effects.map((ref) => ref.key)),
      ),
    )
    const causedByCards = Object.entries(SOURCE_REGISTRIES.effect)
      .filter(([, effect]) => effect.cause?.ref === 'card')
      .map(([key]) => key)
    expect(causedByCards.length).toBeGreaterThan(0)
    expect(causedByCards.filter((key) => !linked.has(key))).toEqual([])
  })
})

describe('shuffle', () => {
  it('keeps every item and leaves the input alone', () => {
    const input = ['a', 'b', 'c', 'd', 'e']
    const result = shuffle(input, seeded(7))
    expect(result.toSorted()).toEqual(input)
    expect(input).toEqual(['a', 'b', 'c', 'd', 'e'])
  })

  it('gives the same order for the same seed', () => {
    const input = deckCards.map((entry) => entry.key)
    expect(shuffle(input, seeded(42))).toEqual(shuffle(input, seeded(42)))
    expect(shuffle(input, seeded(42))).not.toEqual(shuffle(input, seeded(43)))
  })
})

describe('buildDeck', () => {
  it('picks cards by mode', () => {
    expect(buildDeck(sample, 'full')).toEqual(['a', 'b', 'c', 'd'])
    expect(buildDeck(sample, 'classic')).toEqual(['a', 'c'])
    expect(buildDeck(sample, 'good')).toEqual(['a', 'd'])
    expect(buildDeck(sample, 'bad')).toEqual(['c'])
    expect(buildDeck(sample, 'balanced')).toEqual(['a', 'b', 'd'])
  })

  it('builds a custom deck from the chosen keys, and an empty one by default', () => {
    expect(buildDeck(sample, 'custom', new Set(['d', 'b']))).toEqual(['b', 'd'])
    expect(buildDeck(sample, 'custom')).toEqual([])
  })

  it('picks 22 distinct cards at random, repeatably for a seed', () => {
    const deck = buildDeck(deckCards, 'random', undefined, seeded(3))
    expect(deck).toHaveLength(22)
    expect(new Set(deck).size).toBe(22)
    expect(buildDeck(deckCards, 'random', undefined, seeded(3))).toEqual(deck)
  })
})

describe('drawCards', () => {
  it('moves cards out of the deck without putting them back', () => {
    const deck = buildDeck(deckCards, 'full')
    const first = drawCards(deck, 3, seeded(1))
    expect(first.drawn).toHaveLength(3)
    expect(first.remaining).toHaveLength(52)
    expect([...first.drawn, ...first.remaining].toSorted()).toEqual(deck.toSorted())

    const second = drawCards(first.remaining, 2, seeded(2))
    expect(second.drawn.filter((key) => first.drawn.includes(key))).toEqual([])
    expect(second.remaining).toHaveLength(50)
  })

  it('draws what is left when asked for more', () => {
    const result = drawCards(['a', 'b'], 5, seeded(1))
    expect(result.drawn.toSorted()).toEqual(['a', 'b'])
    expect(result.remaining).toEqual([])
  })
})

describe('cardStatus', () => {
  it('tells drawn, in-deck and left-out cards apart', () => {
    expect(cardStatus('a', ['b'], ['a'])).toBe('drawn')
    expect(cardStatus('b', ['b'], ['a'])).toBe('in-deck')
    expect(cardStatus('c', ['b'], ['a'])).toBe('left-out')
  })
})
