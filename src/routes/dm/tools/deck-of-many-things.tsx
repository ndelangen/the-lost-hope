import { createFileRoute } from '@tanstack/react-router'
import { Minus, Plus, RotateCcw, ThumbsDown, ThumbsUp, X } from 'lucide-react'
import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { GiCardDraw } from 'react-icons/gi'

import { DECK_TONES, DeckCardBack, DeckCardFace, DeckCardFlip } from '#/components/deck-card-face'
import { DmFaces } from '#/components/dm/dm-faces'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { EntityReference } from '#/components/entity-reference'
import { refLink } from '#/lib/campaign'
import {
  type CardTone,
  type DeckCard,
  type DeckMode,
  DECK_MODES,
  buildDeck,
  cardStatus,
  drawCards,
} from '#/lib/deck'
import { deckCards } from '#/lib/dm-campaign'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/dm/tools/deck-of-many-things')({
  head: () => ({
    meta: [{ title: 'Deck of Many Things | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: DeckPage,
})

const TONE_BADGES: Record<CardTone, string> = {
  good: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
  mixed: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
  bad: 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200',
}

/** The pause between two cards of one draw turning over. */
const FLIP_STAGGER_MS = 450

const byKey = new Map(deckCards.map((card) => [card.key, card]))

const chipClass = (active: boolean) =>
  cn(
    'border-border rounded-md border px-2.5 py-1',
    active ? 'bg-foreground text-background' : 'hover:bg-muted',
  )

function DeckPage() {
  const [mode, setMode] = useState<DeckMode>('full')
  const [custom, setCustom] = useState<Set<string>>(
    () => new Set(deckCards.filter((card) => card.classic).map((card) => card.key)),
  )
  const [remaining, setRemaining] = useState(() => buildDeck(deckCards, 'full'))
  // Newest first. Each card keeps the delay it was dealt with, so it never flips twice.
  const [drawn, setDrawn] = useState<{ key: string; delay: number }[]>([])
  const [count, setCount] = useState(1)
  const [toneFilter, setToneFilter] = useState<CardTone | undefined>()
  const [opened, setOpened] = useState<string | undefined>()

  const reset = (nextMode = mode, nextCustom = custom) => {
    setRemaining(buildDeck(deckCards, nextMode, nextCustom))
    setDrawn([])
  }
  const pickMode = (next: DeckMode) => {
    setMode(next)
    reset(next)
  }
  const toggleCustom = (key: string) => {
    const next = new Set(custom)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setCustom(next)
    reset('custom', next)
  }
  const drawCount = Math.min(count, remaining.length)
  const draw = () => {
    const result = drawCards(remaining, drawCount)
    setRemaining(result.remaining)
    setDrawn([
      ...result.drawn.map((key, index) => ({ key, delay: index * FLIP_STAGGER_MS })),
      ...drawn,
    ])
  }

  const drawnKeys = useMemo(() => drawn.map((entry) => entry.key), [drawn])
  const deckSize = remaining.length + drawn.length
  const listed = useMemo(
    () => deckCards.filter((card) => !toneFilter || card.tone === toneFilter),
    [toneFilter],
  )
  const openedCard = opened ? byKey.get(opened) : undefined

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-6">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold">Deck of Many Things</h1>
          <p className="text-muted-foreground text-sm">
            The 55-card deck the Fiddler plays: the 22 classic cards and 33 more. Drawn cards stay
            out until you shuffle them back.
          </p>
        </div>

        <section className="border-border bg-card grid gap-4 rounded-xl border p-3 text-sm sm:p-4">
          <div className="grid gap-2">
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(DECK_MODES) as DeckMode[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={mode === option}
                  onClick={() => pickMode(option)}
                  className={chipClass(mode === option)}
                >
                  {DECK_MODES[option].label}
                </button>
              ))}
            </div>
            <p className="text-muted-foreground">{DECK_MODES[mode].about}</p>
          </div>

          {mode === 'custom' ? (
            <div className="grid gap-x-4 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
              {deckCards.map((card) => (
                <label key={card.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={custom.has(card.key)}
                    onChange={() => toggleCustom(card.key)}
                  />
                  <span>{card.name}</span>
                  <ToneBadge tone={card.tone} />
                </label>
              ))}
            </div>
          ) : null}

          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={draw}
              disabled={remaining.length === 0}
              aria-label={`Draw ${drawCount} from the deck`}
              className="group relative w-24 rounded-lg outline-offset-4 disabled:cursor-not-allowed sm:w-32"
            >
              {remaining.length > 0 ? (
                <>
                  {remaining.length > 2 ? (
                    <DeckCardBack className="absolute inset-0 translate-x-2 translate-y-2 opacity-60" />
                  ) : null}
                  {remaining.length > 1 ? (
                    <DeckCardBack className="absolute inset-0 translate-x-1 translate-y-1 opacity-80" />
                  ) : null}
                  <DeckCardBack className="transition-transform duration-200 group-hover:-translate-y-1.5 group-hover:-rotate-2 group-active:translate-y-0" />
                </>
              ) : (
                <div className="border-border text-muted-foreground grid aspect-[5/7] place-items-center rounded-lg border-2 border-dashed p-2 text-center text-xs">
                  The deck is empty
                </div>
              )}
              <span className="bg-foreground text-background ring-card absolute -top-2 -right-3 min-w-8 rounded-full px-2 py-0.5 text-center text-sm font-semibold tabular-nums ring-2">
                {remaining.length}
              </span>
            </button>

            <div className="grid justify-items-start gap-3">
              <p className="text-muted-foreground">
                <span className="text-foreground text-lg font-semibold tabular-nums">
                  {remaining.length}
                </span>{' '}
                of {deckSize} cards left
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <fieldset
                  aria-label="Cards to draw"
                  className="border-border flex items-center rounded-md border"
                >
                  <button
                    type="button"
                    aria-label="One card fewer"
                    disabled={count <= 1}
                    onClick={() => setCount(count - 1)}
                    className="hover:bg-muted grid size-9 place-items-center rounded-l-md disabled:opacity-40"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center text-base font-semibold tabular-nums">
                    {count}
                  </span>
                  <button
                    type="button"
                    aria-label="One card more"
                    disabled={count >= remaining.length}
                    onClick={() => setCount(count + 1)}
                    className="hover:bg-muted grid size-9 place-items-center rounded-r-md disabled:opacity-40"
                  >
                    <Plus className="size-4" />
                  </button>
                </fieldset>
                <button
                  type="button"
                  onClick={draw}
                  disabled={remaining.length === 0}
                  className="bg-foreground text-background flex h-9 items-center gap-1.5 rounded-md px-3 font-medium disabled:opacity-40"
                >
                  <GiCardDraw className="size-5" /> Draw {drawCount}
                </button>
              </div>
              <button
                type="button"
                onClick={() => reset()}
                className="border-border hover:bg-muted flex items-center gap-1.5 rounded-md border px-3 py-1.5"
              >
                <RotateCcw className="size-4" /> Shuffle back
              </button>
            </div>
          </div>
        </section>

        {drawn.length > 0 ? (
          <section className="grid gap-3">
            <h2 className="text-xl font-semibold">Drawn</h2>
            <ol className="grid gap-4">
              {drawn.map(({ key, delay }, index) => {
                const card = byKey.get(key)!
                return (
                  <li
                    key={key}
                    className="border-border bg-card grid gap-4 rounded-xl border p-3 sm:grid-cols-[13rem_minmax(0,1fr)] sm:p-4"
                  >
                    <button
                      type="button"
                      onClick={() => setOpened(key)}
                      aria-label={`Open ${card.name}`}
                      className="mx-auto w-48 rounded-lg outline-offset-4 sm:w-full"
                    >
                      <DeckCardFlip delay={delay}>
                        <DeckCardFace card={card} />
                      </DeckCardFlip>
                    </button>
                    <div
                      className="deck-reading grid content-start gap-3"
                      style={{ '--deck-flip-delay': `${delay}ms` } as CSSProperties}
                    >
                      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Draw {drawn.length - index}
                      </p>
                      <CardReading card={card} />
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        ) : null}

        <section className="grid gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold">All 55 cards</h2>
            <div className="flex flex-wrap gap-1.5 text-sm">
              {([undefined, 'good', 'mixed', 'bad'] as const).map((tone) => (
                <button
                  key={tone ?? 'all'}
                  type="button"
                  aria-pressed={toneFilter === tone}
                  onClick={() => setToneFilter(tone)}
                  className={chipClass(toneFilter === tone)}
                >
                  {tone ? DECK_TONES[tone].label : 'All'} (
                  {deckCards.filter((card) => !tone || card.tone === tone).length})
                </button>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Faded cards are not in this deck. Tap a card to read it.
          </p>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
            {listed.map((card) => {
              const status = cardStatus(card.key, remaining, drawnKeys)
              return (
                <li key={card.key} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpened(card.key)}
                    aria-label={`Open ${card.name}`}
                    className="block w-full rounded-lg outline-offset-4 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <DeckCardFace
                      card={card}
                      className={cn(status === 'left-out' && 'opacity-35 grayscale')}
                    />
                  </button>
                  {status === 'drawn' ? (
                    <span className="bg-foreground text-background pointer-events-none absolute top-1/3 left-1/2 -translate-1/2 -rotate-12 rounded px-2 py-0.5 text-xs font-semibold tracking-wide uppercase shadow">
                      Drawn
                    </span>
                  ) : null}
                  {card.draws.length ? (
                    <div
                      className="pointer-events-none absolute -right-1 -bottom-1"
                      title={`Drawn in the campaign by ${card.draws.map((entry) => refLink(entry.by)?.name).join(', ')}`}
                    >
                      <DmFaces people={card.draws.map((entry) => entry.by)} size="sm" max={3} />
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </section>
      </div>
      <aside className="order-first grid min-w-0 content-start gap-4 xl:sticky xl:top-20 xl:order-none">
        <DmQuickLinks stackAt="xl" />
      </aside>

      <CardDialog card={openedCard} onClose={() => setOpened(undefined)} />
    </div>
  )
}

function ToneBadge({ tone }: { tone: CardTone }) {
  return (
    <span className={cn('rounded px-1.5 py-0.5 text-xs font-medium', TONE_BADGES[tone])}>
      {DECK_TONES[tone].label}
    </span>
  )
}

/** One card opened large over the page, to read or to show the table. */
function CardDialog({ card, onClose }: { card: DeckCard | undefined; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (card && !dialog.open) dialog.showModal()
    if (!card && dialog.open) dialog.close()
  }, [card])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-label={card?.name}
      className="m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-transparent p-4 backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {card ? (
        <div className="grid min-h-full place-items-center">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            tabIndex={-1}
            className="fixed inset-0 cursor-default"
          />
          <div className="bg-background text-foreground border-border relative grid w-full max-w-3xl gap-4 rounded-2xl border p-4 shadow-2xl sm:grid-cols-[18rem_minmax(0,1fr)] sm:gap-6 sm:p-6">
            <DeckCardFace card={card} className="mx-auto max-w-60 sm:max-w-none" />
            <div className="grid content-start gap-3 sm:pr-8">
              <CardReading card={card} />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="bg-background/80 hover:bg-muted border-border absolute top-3 right-3 grid size-9 place-items-center rounded-full border"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}

/** A card's text, set large enough to read aloud, with who in the campaign has drawn it. */
function CardReading({ card }: { card: DeckCard }) {
  return (
    <>
      <header className="flex flex-wrap items-center gap-2">
        <h3 className="font-serif text-2xl font-semibold">{card.name}</h3>
        <ToneBadge tone={card.tone} />
        <span className="text-muted-foreground text-xs">
          {card.suit}
          {card.classic ? ' · classic' : ''}
        </span>
      </header>
      <p className="text-lg leading-relaxed text-pretty">{card.text}</p>
      {card.benefit || card.drawback ? (
        <div className="grid gap-1.5 text-sm">
          {card.benefit ? (
            <p className="flex items-start gap-2 text-emerald-700 dark:text-emerald-300">
              <ThumbsUp className="mt-0.5 size-4 shrink-0" aria-label="Benefit" />
              {card.benefit}
            </p>
          ) : null}
          {card.drawback ? (
            <p className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
              <ThumbsDown className="mt-0.5 size-4 shrink-0" aria-label="Drawback" />
              {card.drawback}
            </p>
          ) : null}
        </div>
      ) : null}
      {card.extraDraws ? (
        <p className="border-border bg-muted flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium">
          <GiCardDraw className="size-5 shrink-0" />
          {card.extraDraws}
        </p>
      ) : null}
      {card.draws.length ? (
        <ul className="border-border grid gap-1.5 border-t pt-3 text-sm">
          {card.draws.map((draw) => {
            const at = refLink(draw.at)
            const outcomes = draw.effects.flatMap((ref) => refLink(ref) ?? [])
            return (
              <li
                key={`${draw.by.key}:${draw.at.key}`}
                className="flex flex-wrap items-center gap-2"
              >
                <DmFaces people={[draw.by]} size="sm" />
                <span>Drawn by {refLink(draw.by)?.name}</span>
                {at ? (
                  <EntityReference kind={at.kind} slug={at.slug} label={`day ${draw.day}`} />
                ) : null}
                {outcomes.map((outcome) => (
                  <EntityReference
                    key={`${outcome.kind}:${outcome.slug}`}
                    kind={outcome.kind}
                    slug={outcome.slug}
                    label={outcome.name}
                  />
                ))}
              </li>
            )
          })}
        </ul>
      ) : null}
    </>
  )
}
