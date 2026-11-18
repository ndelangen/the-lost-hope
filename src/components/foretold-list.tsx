import { Hourglass, Moon, Sparkles } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EventReference } from '#/components/event-reference'
import type { Foretold, ForetoldWhen } from '#/definitions/foretold'
import type { EntityRef } from '#/definitions/kind'
import { refLink } from '#/lib/campaign'
import { formatForetoldWhen } from '#/lib/foretold'

export function ForetoldWhenIcon({
  when,
  className,
}: {
  when: ForetoldWhen | undefined
  className?: string
}) {
  if (when?.type === 'fullMoon') return <Moon className={className} aria-hidden />
  if (when) return <Hourglass className={className} aria-hidden />
  return <Sparkles className={className} aria-hidden />
}

/** What a record promised or foretold, each with its timing and, once it happened, the event. */
export function ForetoldList({ foretold }: { foretold: readonly Foretold[] }) {
  return (
    <ul className="grid gap-3">
      {foretold.map((entry, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- promises have no stable ids
        <li key={index} className="border-border grid gap-1.5 rounded-lg border-l-4 py-1 pl-3">
          <p className="text-muted-foreground inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
            <ForetoldWhenIcon when={entry.when} className="size-3.5" />
            {entry.cameTrue ? 'Came true' : formatForetoldWhen(entry.when)}
            {entry.cameTrue ? <CameTrueIn event={entry.cameTrue} /> : null}
          </p>
          <ContentRenderer content={entry.what} />
        </li>
      ))}
    </ul>
  )
}

/** The event in which a promise came true, as an inline link. */
export function CameTrueIn({ event }: { event: EntityRef<'event'> }) {
  const link = refLink(event)
  if (!link) return null
  return (
    <span className="normal-case">
      {' · '}
      <EventReference slug={link.slug} label={link.name} />
    </span>
  )
}
