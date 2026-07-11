import { createFileRoute } from '@tanstack/react-router'
import { Calendar } from 'lucide-react'

import { EntityKindBadge } from '#/components/entity-kind-badge'
import { EntityChip, EntityDetail, EntityNotFound } from '#/components/entity-page'
import { SessionTimeline } from '#/components/session-timeline'
import { Inline, Stack } from '#/components/ui/layout'
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
      <Stack as="header" gap="md">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Session {sessionNumber(slug)}
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{session.name}</h1>
        <Inline gap="sm" wrap className="text-muted-foreground text-sm">
          <Inline
            as="span"
            inline
            gap="2xs"
            className="border-border rounded-full border px-2.5 py-1"
          >
            <Calendar className="size-3.5" />
            {session.date.toLocaleDateString(undefined, { dateStyle: 'long' })}
          </Inline>
          <EntityKindBadge kind="event">{session.events.length} events</EntityKindBadge>
        </Inline>
      </Stack>

      <Stack gap="2xl">
        {party.length > 0 ? (
          <Stack as="section" gap="lg">
            <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Party present
            </h2>
            <Inline as="ul" gap="md" wrap>
              {party.map((pc) => (
                <li key={pc.slug}>
                  <EntityChip kind="pc" slug={pc.slug} name={pc.name} avatar={pc.avatar} />
                </li>
              ))}
            </Inline>
          </Stack>
        ) : null}
        <SessionTimeline days={timeline} />
      </Stack>
    </EntityDetail>
  )
}
