import { Link2, Unlink2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useGroupSave } from '#/components/dm/use-group-save'
import { Avatar } from '#/components/ui/avatar'
import { DEFAULT_AVATAR } from '#/definitions/media'
import {
  GROUP_SAVE_PAGE_SIZE,
  groupSavePageCount,
  groupSaveRows,
  type GroupSave,
  type GroupSaveRow,
} from '#/lib/group-save'
import { cn } from '#/lib/utils'

/** How long a die tumbles before it lands. Typing a roll keeps it tumbling until the DM stops. */
const TUMBLE_MS = 1300
/** How long a page takes to slide in before its dice start to land. */
const PAGE_IN_MS = 700
/** The gap between one line landing and the next when a whole page is revealed. */
const RIPPLE_MS = 130
const FACE_MS = 70

/**
 * A group save on the player screen, over the scene's picture: every character with their roll
 * and how it came out. A roll tumbles before it lands, and turning to another page reveals that
 * whole page in one go.
 */
export function GroupSaveOnScreen({ storageKey, save }: { storageKey: string; save: GroupSave }) {
  const [state] = useGroupSave(storageKey, save)
  if (!state.onScreen) return null
  const pages = groupSavePageCount(save)
  const rows = groupSaveRows(save, state).filter((row) => row.page === state.page)
  const columns = save.rollers.length > 5

  return (
    <div className="animate-in fade-in absolute inset-0 flex items-center justify-center bg-black/45 p-[4vmin] duration-700">
      <div
        className={cn(
          'flex max-h-full w-full flex-col gap-[3vmin]',
          columns ? 'max-w-[168vmin]' : 'max-w-[90vmin]',
        )}
      >
        <h1 className="text-center text-[6vmin] leading-tight font-bold tracking-tight [text-shadow:0_0.4vmin_2.4vmin_rgb(0_0_0/0.9)]">
          {save.title}
        </h1>
        <ul
          // A new page is a new list, so every line on it plays its reveal.
          key={state.page}
          // Two columns read top to bottom, so the list keeps its order.
          className={cn(
            'grid gap-[1.6vmin]',
            columns ? 'grid-flow-col grid-cols-2' : 'grid-cols-1',
          )}
          style={
            columns ? { gridTemplateRows: `repeat(${GROUP_SAVE_PAGE_SIZE / 2}, auto)` } : undefined
          }
        >
          {rows.map((row, order) => (
            <li
              key={row.id}
              className="animate-in fade-in slide-in-from-bottom-[6vmin] duration-500"
              style={{ animationDelay: `${order * 60}ms`, animationFillMode: 'backwards' }}
            >
              <ScreenRow row={row} save={save} order={order} />
            </li>
          ))}
        </ul>
        {pages > 1 ? (
          <div className="flex justify-center gap-[1.2vmin]" aria-label={`Page ${state.page + 1}`}>
            {Array.from({ length: pages }, (_, page) => (
              <span
                // oxlint-disable-next-line react/no-array-index-key -- pages are positions in a fixed list
                key={page}
                className={cn(
                  'size-[1.6vmin] rounded-full transition-colors duration-500',
                  page === state.page ? 'bg-white' : 'bg-white/30',
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

type Reveal = { phase: 'waiting' | 'tumbling' | 'landed'; face: number }

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Plays one line's result in: the die tumbles through random faces, then lands. A result that is
 * already there when the line appears waits its turn, so a whole page lands as one ripple.
 */
function useReveal(row: GroupSaveRow, order: number): Reveal {
  const target = row.total
  const [reveal, setReveal] = useState<Reveal>({ phase: 'waiting', face: 20 })
  const appearedAt = useRef<number | undefined>(undefined)

  useEffect(() => {
    appearedAt.current ??= performance.now()
    if (target === undefined) {
      setReveal((current) => ({ ...current, phase: 'waiting' }))
      return
    }
    if (prefersReducedMotion()) {
      setReveal((current) => ({ ...current, phase: 'landed' }))
      return
    }

    const withThePage = performance.now() - appearedAt.current < 300
    const lead = withThePage ? PAGE_IN_MS + order * RIPPLE_MS : 0
    setReveal((current) => ({ ...current, phase: 'tumbling' }))
    const tumble = setInterval(
      () => setReveal((current) => ({ ...current, face: 1 + Math.floor(Math.random() * 20) })),
      FACE_MS,
    )
    const land = setTimeout(() => {
      clearInterval(tumble)
      setReveal((current) => ({ ...current, phase: 'landed' }))
    }, TUMBLE_MS + lead)
    return () => {
      clearInterval(tumble)
      clearTimeout(land)
    }
  }, [target, order])

  return reveal
}

function ScreenRow({ row, save, order }: { row: GroupSaveRow; save: GroupSave; order: number }) {
  const { phase, face } = useReveal(row, order)
  const landed = phase === 'landed'
  const passed = landed && row.outcome === 'passed'
  const failed = landed && row.outcome === 'failed'
  const card = useRef<HTMLDivElement>(null)

  // The moment it lands: a bond that holds swells and glows, one that snaps jolts and flashes.
  useEffect(() => {
    if (!card.current || (!passed && !failed) || prefersReducedMotion()) return
    const glow = passed ? '110 231 183' : '248 113 113'
    card.current.animate(
      passed
        ? [{ transform: 'scale(1)' }, { transform: 'scale(1.05)' }, { transform: 'scale(1)' }]
        : [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-1.4vmin)' },
            { transform: 'translateX(1.2vmin)' },
            { transform: 'translateX(-0.8vmin)' },
            { transform: 'translateX(0.5vmin)' },
            { transform: 'translateX(0)' },
          ],
      { duration: passed ? 550 : 480, easing: 'ease-out' },
    )
    card.current.animate(
      [
        { boxShadow: `0 0 0 0.3vmin rgb(${glow} / 0.95), 0 0 3vmin 0.6vmin rgb(${glow} / 0.7)` },
        { boxShadow: `0 0 0 0 rgb(${glow} / 0), 0 0 9vmin 2vmin rgb(${glow} / 0)` },
      ],
      { duration: 1100, easing: 'ease-out' },
    )
  }, [passed, failed])

  return (
    <div
      ref={card}
      className={cn(
        'flex items-center gap-[2vmin] rounded-[2.4vmin] bg-black/65 px-[2vmin] py-[1.4vmin] ring-1 backdrop-blur-md transition-colors duration-700',
        passed && 'ring-emerald-300/60',
        failed && 'ring-red-400/50',
        !passed && !failed && 'ring-white/15',
      )}
    >
      <Avatar
        src={row.avatar ?? DEFAULT_AVATAR}
        alt=""
        sizes="12vmin"
        maxWidth={256}
        loading="eager"
        className={cn(
          'size-[9vmin] ring-2 ring-white/25 transition duration-1000',
          failed && 'opacity-60 grayscale',
        )}
      />
      <span
        className={cn(
          'line-clamp-2 min-w-0 flex-1 text-[3.2vmin] leading-[1.15] font-semibold text-balance transition-colors duration-1000',
          failed && 'text-white/60',
        )}
      >
        {row.name}
      </span>
      {phase === 'tumbling' ? (
        <span className="flex shrink-0 items-center gap-[2vmin]">
          <span className="w-[7vmin] text-right text-[5.4vmin] leading-none font-bold text-white/55 tabular-nums">
            {face}
          </span>
          <span className="w-[26vmin]" />
        </span>
      ) : !landed ? (
        <span className="text-[2.6vmin] text-white/45">Not rolled yet</span>
      ) : (
        <span className="flex shrink-0 items-center gap-[2vmin]">
          <span className="animate-in zoom-in-50 w-[7vmin] text-right text-[5.4vmin] leading-none font-bold tabular-nums duration-300">
            {row.total ?? ''}
          </span>
          <span
            className={cn(
              'animate-in fade-in slide-in-from-right-[3vmin] flex w-[26vmin] items-center gap-[1vmin] text-[2.5vmin] leading-tight font-semibold whitespace-nowrap duration-500',
              failed ? 'text-red-300' : 'text-emerald-300',
            )}
          >
            {failed ? (
              <Unlink2 className="size-[3.2vmin] shrink-0" aria-hidden />
            ) : (
              <Link2 className="size-[3.2vmin] shrink-0" aria-hidden />
            )}
            {failed ? save.failed : save.passed}
          </span>
        </span>
      )}
    </div>
  )
}
