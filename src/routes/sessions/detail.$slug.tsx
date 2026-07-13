import { createFileRoute } from '@tanstack/react-router'
import { Calendar, List } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { PcReference } from '#/components/pc-reference'
import { SessionTimeline } from '#/components/session-timeline'
import { Inline, Stack } from '#/components/ui/layout'
import { getEntity, sessionNumber, sessionPcs } from '#/lib/campaign'
import { referencedByItems, sessionTimelineDays } from '#/lib/entity-page-data'
import { SessionIcon } from '#/lib/session-icons'

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
    <EntityDetail
      kind="session"
      title={session.name}
      typeLabel={`Session ${sessionNumber(slug)}`}
      visual={{
        variant: 'icon',
        content: <SessionIcon icon={session.icon} className="size-10" />,
      }}
      headerContent={
        <Inline gap="md" wrap className="text-muted-foreground text-xs">
          <Inline as="span" inline gap="2xs">
            <Calendar className="size-3.5" />
            {session.date.toLocaleDateString(undefined, { dateStyle: 'long' })}
          </Inline>
          <Inline as="span" inline gap="2xs">
            <List className="size-3.5" />
            {session.events.length} events
          </Inline>
        </Inline>
      }
      referencedBy={referencedByItems('session', slug)}
    >
      <Stack gap="2xl">
        {session.notes ? (
          <Stack as="section" gap="lg">
            <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Session notes
            </h2>
            <ContentRenderer content={session.notes} />
          </Stack>
        ) : null}
        {party.length > 0 ? (
          <Stack as="section" gap="lg">
            <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Party present
            </h2>
            <Inline as="ul" gap="md" wrap>
              {party.map((pc) => (
                <li key={pc.slug}>
                  <PcReference slug={pc.slug} />
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
