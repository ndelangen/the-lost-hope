import type { Card, CardTone } from '#/definitions/card'
import type { Effect } from '#/definitions/effect'
import type { CardDraw, Event } from '#/definitions/event'
import type { EntityRef } from '#/definitions/kind'

export type { CardTone }

/** A card as the draw tool shows it: its record plus who drew it and what it left behind. */
export type DeckCard = Pick<
  Card,
  'name' | 'suit' | 'tone' | 'classic' | 'text' | 'benefit' | 'drawback' | 'extraDraws'
> & {
  key: string
  /** The card's own artwork, as an image src. A card without one shows its suit placeholder. */
  image?: string
  /** Every time the card was drawn in the campaign, in campaign order, with what it left behind. */
  draws: {
    by: CardDraw['by']
    at: EntityRef<'event'>
    day: number
    effects: EntityRef<'effect'>[]
  }[]
}

/**
 * Joins the card records with the events that record their draws. Each draw carries the effects the
 * card caused on that drawer in that event. Draws come out by campaign day.
 */
export function buildDeckCards(
  cards: Readonly<Record<string, Card>>,
  events: Readonly<Record<string, Pick<Event, 'day' | 'draws'>>>,
  effects: Readonly<Record<string, Pick<Effect, 'cause' | 'on' | 'began'>>>,
): DeckCard[] {
  const draws = Object.entries(events)
    .toSorted(([, a], [, b]) => a.day - b.day)
    .flatMap(([key, event]) =>
      (event.draws ?? []).map((draw) => ({
        card: draw.card.key,
        by: draw.by,
        at: { ref: 'event' as const, key },
        day: event.day,
      })),
    )
  return Object.entries(cards).map(([key, card]) => ({
    key,
    name: card.name,
    suit: card.suit,
    tone: card.tone,
    classic: card.classic,
    text: card.text,
    benefit: card.benefit,
    drawback: card.drawback,
    extraDraws: card.extraDraws,
    draws: draws
      .filter((draw) => draw.card === key)
      .map(({ by, at, day }) => ({
        by,
        at,
        day,
        effects: Object.entries(effects)
          .filter(
            ([, effect]) =>
              effect.cause?.ref === 'card' &&
              effect.cause.key === key &&
              effect.began.key === at.key &&
              effect.on.some((bearer) => bearer.ref === by.ref && bearer.key === by.key),
          )
          .map(([effectKey]) => ({ ref: 'effect' as const, key: effectKey })),
      })),
  }))
}

export const DECK_MODES = {
  full: { label: 'Full deck', about: 'All 55 cards, as the Fiddler plays it.' },
  classic: { label: 'Classic 22', about: 'Only the 22 cards of the original deck.' },
  random: { label: 'Random 22', about: '22 cards picked at random from the 55.' },
  good: { label: 'Beneficial only', about: 'Only cards with no drawback.' },
  bad: { label: 'Harmful only', about: 'Only cards with no upside.' },
  balanced: { label: 'Balanced', about: 'Beneficial and mixed cards, nothing purely harmful.' },
  custom: { label: 'Custom', about: 'Pick the cards yourself.' },
} as const

export type DeckMode = keyof typeof DECK_MODES

type Random = () => number

export function shuffle<T>(items: readonly T[], random: Random = Math.random): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1))
    ;[copy[index], copy[swap]] = [copy[swap]!, copy[index]!]
  }
  return copy
}

/** The keys of the cards a deck mode puts in the deck. */
export function buildDeck(
  cards: readonly DeckCard[],
  mode: DeckMode,
  custom: ReadonlySet<string> = new Set(),
  random: Random = Math.random,
): string[] {
  const pick = (keep: (card: DeckCard) => boolean) => cards.filter(keep).map((card) => card.key)
  switch (mode) {
    case 'full':
      return pick(() => true)
    case 'classic':
      return pick((card) => card.classic)
    case 'random':
      return shuffle(cards, random)
        .slice(0, 22)
        .map((card) => card.key)
    case 'good':
    case 'bad':
      return pick((card) => card.tone === mode)
    case 'balanced':
      return pick((card) => card.tone !== 'bad')
    case 'custom':
      return pick((card) => custom.has(card.key))
  }
}

/**
 * Draws `count` cards from what is left, without putting them back. Returns the drawn keys in
 * order and what remains.
 */
export function drawCards(
  remaining: readonly string[],
  count: number,
  random: Random = Math.random,
): { drawn: string[]; remaining: string[] } {
  const shuffled = shuffle(remaining, random)
  return { drawn: shuffled.slice(0, count), remaining: shuffled.slice(count) }
}

export type CardStatus = 'in-deck' | 'drawn' | 'left-out'

/** Where a card is during a draw: still in the deck, already drawn, or not part of this deck. */
export function cardStatus(
  key: string,
  remaining: readonly string[],
  drawn: readonly string[],
): CardStatus {
  if (drawn.includes(key)) return 'drawn'
  return remaining.includes(key) ? 'in-deck' : 'left-out'
}
