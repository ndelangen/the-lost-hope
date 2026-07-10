import { createFileRoute } from '@tanstack/react-router'
import { Calendar } from 'lucide-react'

import { EntityChip, EntityDetail, EntityNotFound } from '#/components/entity-page'
import { SessionTimeline } from '#/components/session-timeline'
import { Badge } from '#/components/ui/badge'
import { getEntity, sessionNumber, sessionPcs } from '#/lib/campaign'
import { referencedByItems, sessionTimelineDays } from '#/lib/entity-page-data'

export const Route = createFileRoute('/sessions/detail/$slug')({
  component: SessionPage,
})

function SessionPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('session', slug)
  if (!entity) return <EntityNotFound kind="session" />

  const session = entity.data
  const party = sessionPcs(session)
  const timeline = sessionTimelineDays(session)

  return (
    <EntityDetail kind="session" referencedBy={referencedByItems('session', slug)}>
      <header className="space-y-3">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Session {sessionNumber(slug)}
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{session.name}</h1>
        <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
          <span className="border-border inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
            <Calendar className="size-3.5" />
            {session.date.toLocaleDateString(undefined, { dateStyle: 'long' })}
          </span>
          <Badge variant="secondary">{session.events.length} events</Badge>
        </div>
      </header>

      <div className="space-y-8">
        {party.length > 0 ? (
          <section className="space-y-4">
            <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Party present
            </h2>
            <ul className="flex flex-wrap gap-3">
              {party.map((pc) => (
                <li key={pc.slug}>
                  <EntityChip kind="pc" slug={pc.slug} name={pc.name} avatar={pc.avatar} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <SessionTimeline days={timeline} />
      </div>
    </EntityDetail>
  )
}
