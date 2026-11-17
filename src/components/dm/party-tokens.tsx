import { Minus, Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { GiCursedStar, GiToken } from 'react-icons/gi'

import { Avatar } from '#/components/ui/avatar'
import type { TokenKind, TokenRow } from '#/lib/pc-tokens'
import { cn } from '#/lib/utils'

const KINDS: readonly { kind: TokenKind; label: string; icon: ReactNode; tone: string }[] = [
  {
    kind: 'dm',
    label: 'DM tokens',
    icon: <GiToken aria-hidden />,
    tone: 'text-amber-600 dark:text-amber-300',
  },
  {
    kind: 'curse',
    label: 'Curse tokens',
    icon: <GiCursedStar aria-hidden />,
    tone: 'text-violet-600 dark:text-violet-300',
  },
]

/**
 * How many DM tokens and curse tokens each player holds, with − and + steppers when `onAdjust` is
 * given (local dev, where a step saves to the PC record).
 */
export function PartyTokens({
  rows,
  onAdjust,
  error,
}: {
  rows: readonly TokenRow[]
  onAdjust?: (key: string, kind: TokenKind, delta: 1 | -1) => void
  error?: string
}) {
  return (
    <section aria-labelledby="party-tokens" className="grid gap-3">
      <h2 id="party-tokens" className="text-xl font-bold">
        Tokens
      </h2>
      <div className="border-border bg-card overflow-x-auto rounded-2xl border-2">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="text-muted-foreground border-border border-b text-xs font-semibold tracking-wider uppercase">
              <th scope="col" className="px-3 py-2">
                Player
              </th>
              {KINDS.map(({ kind, label, icon, tone }) => (
                <th key={kind} scope="col" className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={cn('text-base', tone)}>{icon}</span> {label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-border border-b last:border-b-0">
                <th scope="row" className="px-3 py-2">
                  <span className="flex items-center gap-2.5">
                    <Avatar src={row.avatar} sizes="40px" maxWidth={128} className="size-10" />
                    <span className="grid">
                      <span className="text-base font-semibold">{row.name}</span>
                      {row.occasional ? (
                        <span className="text-muted-foreground text-xs font-normal">
                          Occasional
                        </span>
                      ) : null}
                    </span>
                  </span>
                </th>
                {KINDS.map(({ kind, label, icon, tone }) => (
                  <td key={kind} className="px-3 py-2">
                    <TokenStepper
                      name={row.name}
                      label={label}
                      icon={<span className={tone}>{icon}</span>}
                      count={row.counts[kind]}
                      onStep={onAdjust ? (delta) => onAdjust(row.key, kind, delta) : undefined}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
    </section>
  )
}

const step =
  'hover:bg-muted focus-visible:ring-ring/50 flex w-12 items-center justify-center outline-none transition-colors focus-visible:z-10 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-35'

/** One count as a joined [ − | count | + ] group, or the count alone when it can't be edited. */
function TokenStepper({
  name,
  label,
  icon,
  count,
  onStep,
}: {
  name: string
  label: string
  icon: ReactNode
  count: number
  onStep?: (delta: 1 | -1) => void
}) {
  const value = (
    <span
      className={cn(
        'flex min-w-16 items-center justify-center gap-1.5 text-2xl font-bold tabular-nums',
        count === 0 && 'text-muted-foreground',
      )}
      aria-label={`${name}: ${count} ${label}`}
    >
      <span className="text-xl">{icon}</span>
      {count}
    </span>
  )
  if (!onStep) return <div className="flex h-12">{value}</div>
  return (
    <div className="border-border inline-flex h-12 overflow-hidden rounded-xl border-2">
      <button
        type="button"
        className={cn(step, 'border-border border-r-2')}
        aria-label={`Remove one of ${name}’s ${label}`}
        disabled={count === 0}
        onClick={() => onStep(-1)}
      >
        <Minus className="size-6" aria-hidden />
      </button>
      {value}
      <button
        type="button"
        className={cn(step, 'border-border border-l-2')}
        aria-label={`Give ${name} one of the ${label}`}
        onClick={() => onStep(1)}
      >
        <Plus className="size-6" aria-hidden />
      </button>
    </div>
  )
}
