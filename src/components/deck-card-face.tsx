import { Star } from 'lucide-react'
import type { ComponentType, CSSProperties, ReactNode } from 'react'
import { GiCastleRuins, GiCursedStar, GiJesterHat, GiKey, GiScales } from 'react-icons/gi'

import type { CardTone, DeckCard } from '#/lib/deck'
import { cn } from '#/lib/utils'

type Suit = DeckCard['suit']

const SUITS: Record<Suit, { icon: ComponentType<{ className?: string }>; art: string }> = {
  Key: { icon: GiKey, art: 'from-amber-300 via-amber-600 to-stone-900' },
  Ruin: { icon: GiCastleRuins, art: 'from-rose-400 via-rose-800 to-zinc-950' },
  Star: { icon: Star, art: 'from-sky-300 via-indigo-600 to-slate-950' },
  Jester: { icon: GiJesterHat, art: 'from-fuchsia-300 via-purple-600 to-indigo-950' },
  Balance: { icon: GiScales, art: 'from-teal-200 via-teal-600 to-slate-900' },
}

export const DECK_TONES: Record<CardTone, { label: string; gem: string; edge: string }> = {
  good: { label: 'Beneficial', gem: 'bg-emerald-400', edge: 'ring-emerald-400/80' },
  mixed: { label: 'Mixed', gem: 'bg-amber-400', edge: 'ring-amber-400/80' },
  bad: { label: 'Harmful', gem: 'bg-rose-500', edge: 'ring-rose-500/80' },
}

const cardShape = '@container relative aspect-[5/7] w-full select-none'
const cardBody =
  'absolute inset-0 overflow-hidden rounded-[5.5cqw] bg-slate-950 text-white shadow-lg shadow-black/30'

/**
 * The face of one card of the deck at playing-card proportions, scaling with its width. The art
 * area shows the card's own artwork when it has one, and a suit-coloured placeholder until then.
 */
export function DeckCardFace({
  card,
  className,
}: {
  card: Pick<DeckCard, 'name' | 'suit' | 'tone' | 'classic' | 'image'>
  className?: string
}) {
  const suit = SUITS[card.suit]
  const tone = DECK_TONES[card.tone]
  const SuitIcon = suit.icon
  return (
    <div className={cn(cardShape, className)}>
      <div className={cn(cardBody, 'ring-[0.9cqw] ring-inset', tone.edge)}>
        {card.image ? (
          <img
            src={card.image}
            alt=""
            loading="lazy"
            draggable={false}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className={cn('absolute inset-0 bg-linear-to-b', suit.art)} aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgb(255_255_255/0.35),transparent_55%)]" />
            <SuitIcon className="absolute top-[38%] left-1/2 size-[46cqw] -translate-1/2 text-white/80 drop-shadow-[0_0_6cqw_rgb(255_255_255/0.45)]" />
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-[52%] bg-linear-to-t from-black/90 via-black/60 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-[3.5cqw] rounded-[3cqw] border-[0.5cqw] border-white/30"
          aria-hidden
        />
        <span className="absolute top-[6cqw] left-[6cqw] grid size-[13cqw] place-items-center rounded-full bg-black/45 backdrop-blur-sm">
          <SuitIcon className="size-[8cqw]" />
        </span>
        <span
          title={tone.label}
          className={cn(
            'absolute top-[8cqw] right-[8cqw] size-[8cqw] rotate-45 rounded-[1.4cqw] ring-[0.7cqw] ring-white/70',
            tone.gem,
          )}
        />
        <div className="absolute inset-x-[7cqw] bottom-[8cqw] grid justify-items-center gap-[1.5cqw] text-center">
          <span className="font-serif text-[10.5cqw] leading-[1.05] font-semibold text-balance drop-shadow-[0_0.4cqw_0.8cqw_rgb(0_0_0/0.9)]">
            {card.name}
          </span>
          <span className="text-[4.6cqw] leading-none font-medium tracking-[0.18em] text-white/75 uppercase">
            {card.suit}
            {card.classic ? ' · Classic' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

/** The back every card of the deck shares. */
export function DeckCardBack({ className }: { className?: string }) {
  return (
    <div className={cn(cardShape, className)} aria-hidden>
      <div
        className={cn(
          cardBody,
          'bg-[repeating-linear-gradient(45deg,rgb(255_255_255/0.07)_0_2cqw,transparent_2cqw_6cqw),repeating-linear-gradient(-45deg,rgb(255_255_255/0.07)_0_2cqw,transparent_2cqw_6cqw),linear-gradient(160deg,#312e81,#0f172a_55%,#4c1d95)] ring-[0.9cqw] ring-amber-200/60 ring-inset',
        )}
      >
        <div className="absolute inset-[5cqw] rounded-[3cqw] border-[0.6cqw] border-amber-200/50" />
        <div className="absolute top-1/2 left-1/2 grid size-[46cqw] -translate-1/2 place-items-center rounded-full border-[0.6cqw] border-amber-200/60 bg-slate-950/70">
          <GiCursedStar className="size-[30cqw] text-amber-200/90" />
        </div>
      </div>
    </div>
  )
}

/**
 * Turns a card over from its back to its face once, when it first appears. `delay` staggers the
 * cards of one draw. The flip always plays: it is the reveal the table is waiting for.
 */
export function DeckCardFlip({
  delay = 0,
  className,
  children,
}: {
  delay?: number
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('deck-flip', className)}>
      <div
        className="deck-flip-inner"
        style={{ '--deck-flip-delay': `${delay}ms` } as CSSProperties}
      >
        <div className="deck-flip-face">{children}</div>
        <DeckCardBack className="deck-flip-face deck-flip-back absolute inset-0" />
      </div>
    </div>
  )
}
