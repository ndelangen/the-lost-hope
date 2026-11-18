import { AlertTriangle, CalendarClock, Hourglass, Moon, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { GiCrystalBall } from 'react-icons/gi'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityReference } from '#/components/entity-reference'
import { CameTrueIn } from '#/components/foretold-list'
import { foretoldDueLabel, type ForetoldEntry, type ForetoldStatus } from '#/lib/foretold'
import { cn } from '#/lib/utils'

const STATUS: Record<ForetoldStatus, { icon: ReactNode; tone: string }> = {
  overdue: {
    icon: <AlertTriangle className="size-6" aria-hidden />,
    tone: 'text-red-600 dark:text-red-400',
  },
  dueToday: {
    icon: <CalendarClock className="size-6" aria-hidden />,
    tone: 'text-amber-600 dark:text-amber-300',
  },
  upcoming: {
    icon: <Hourglass className="size-6" aria-hidden />,
    tone: 'text-indigo-600 dark:text-indigo-300',
  },
  fullMoon: {
    icon: <Moon className="size-6" aria-hidden />,
    tone: 'text-sky-600 dark:text-sky-300',
  },
  open: {
    icon: <Sparkles className="size-6" aria-hidden />,
    tone: 'text-muted-foreground',
  },
}

/** What the campaign has promised or foretold, most pressing first, counted from the live day. */
export function DmForetoldPanel({
  pending,
  cameTrue,
  today,
}: {
  pending: readonly ForetoldEntry[]
  cameTrue: readonly ForetoldEntry[]
  today: number
}) {
  return (
    <section aria-labelledby="foretold" className="border-border grid gap-4 rounded-xl border p-4">
      <div>
        <h2 id="foretold" className="inline-flex items-center gap-2 text-xl font-bold">
          <GiCrystalBall className="size-6 text-violet-600 dark:text-violet-300" aria-hidden />
          Promised and foretold
        </h2>
        <p className="text-muted-foreground text-sm">
          Still to come, counted from day {today}. Each line lives on the event or item that made
          the promise.
        </p>
      </div>
      {pending.length === 0 ? (
        <p className="text-muted-foreground">Nothing is waiting to happen.</p>
      ) : (
        <ul className="grid gap-2">
          {pending.map((entry) => (
            <ForetoldRow key={entry.id} entry={entry} today={today} />
          ))}
        </ul>
      )}
      {cameTrue.length > 0 ? (
        <details className="text-sm">
          <summary className="text-muted-foreground cursor-pointer font-semibold">
            Came true ({cameTrue.length})
          </summary>
          <ul className="mt-2 grid gap-2">
            {cameTrue.map((entry) => (
              <ForetoldRow key={entry.id} entry={entry} today={today} />
            ))}
          </ul>
        </details>
      ) : null}
    </section>
  )
}

function ForetoldRow({ entry, today }: { entry: ForetoldEntry; today: number }) {
  const status = STATUS[entry.status]
  return (
    <li className="bg-card flex items-start gap-3 rounded-lg p-3">
      <span
        className={cn('mt-0.5 shrink-0', entry.cameTrue ? 'text-muted-foreground' : status.tone)}
      >
        {status.icon}
      </span>
      <div className="grid min-w-0 flex-1 gap-1">
        <p
          className={cn(
            'text-sm font-semibold',
            entry.cameTrue ? 'text-muted-foreground' : status.tone,
          )}
        >
          {entry.cameTrue ? (
            <>
              Came true
              <CameTrueIn event={entry.cameTrue} />
            </>
          ) : (
            foretoldDueLabel(entry, today)
          )}
        </p>
        <ContentRenderer content={entry.what} className="text-base" />
        <p className="text-muted-foreground text-xs">
          From{' '}
          <EntityReference
            kind={entry.source.kind}
            slug={entry.source.slug}
            label={entry.source.name}
          />
          {entry.source.day !== undefined ? ` · day ${entry.source.day}` : null}
        </p>
      </div>
    </li>
  )
}
