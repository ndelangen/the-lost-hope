import { createFileRoute, notFound } from '@tanstack/react-router'
import { Calendar, List } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { PcReference } from '#/components/pc-reference'
import { SessionJournal } from '#/components/session-journal'
import { Inline, Stack } from '#/components/ui/layout'
import { getEntity, sessionNumber, sessionPcs } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { publicEntityPageHead } from '#/lib/public-page-metadata'
import { formatSessionDate } from '#/lib/session-date'
import { SessionIcon } from '#/lib/session-icons'
import { sessionJournalData } from '#/lib/session-journal-data'

export const Route = createFileRoute('/sessions/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('session', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('session', params.slug),
  component: SessionPage,
})

function SessionPage() {
  const { slug } = Route.useParams()
  const entity = Route.useLoaderData()

  const session = entity.data
  const party = sessionPcs(session)
  const journal = sessionJournalData(session)

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
            {formatSessionDate(session.date, 'long')}
          </Inline>
          <Inline as="span" inline gap="2xs">
            <List className="size-3.5" />
            {session.events.length} events
          </Inline>
        </Inline>
      }
      correction={<EntityCorrectionSubmission entity={entity} />}
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
        <SessionJournal days={journal} />
      </Stack>
    </EntityDetail>
  )
}
