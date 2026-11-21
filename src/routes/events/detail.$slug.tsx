import { createFileRoute, notFound } from '@tanstack/react-router'
import { Calendar } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFields } from '#/components/dm/dm-fields'
import { EntityContext } from '#/components/entity-context'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityKindPill } from '#/components/entity-kind-pill'
import { EntityDetail } from '#/components/entity-page'
import { EventIllustrations } from '#/components/event-illustrations'
import { EventVisualizations } from '#/components/event-visualizations'
import { ForetoldList } from '#/components/foretold-list'
import { ImageViewer } from '#/components/image-viewer'
import { LocationReference } from '#/components/location-reference'
import { Inline, Stack } from '#/components/ui/layout'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { eventLocation, eventMarkVisual, getEntity } from '#/lib/campaign'
import { entityContextData } from '#/lib/entity-context-data'
import { EventMarkIcon } from '#/lib/event-icons'
import { eventNarrative } from '#/lib/foretold'
import { publicEntityPageHead } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/events/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('event', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('event', params.slug),
  component: EventPage,
})

function EventPage() {
  const entity = Route.useLoaderData()

  const event = entity.data
  const place = eventLocation(event)
  const mark = eventMarkVisual(event)

  return (
    <EntityDetail
      kind="event"
      title={event.name}
      visual={
        mark.type === 'avatar'
          ? {
              variant: 'avatar',
              content: (
                <ImageViewer
                  src={mark.url}
                  fallbackSrc={DEFAULT_AVATAR}
                  alt={event.name}
                  title={event.name}
                  eyebrow="Event portrait"
                  accessibleLabel={`portrait for ${event.name}`}
                />
              ),
            }
          : {
              variant: 'icon',
              content: <EventMarkIcon name={mark.name} className="size-10" />,
            }
      }
      headerAside={
        <EntityKindPill kind="event" dot={false} className="gap-1">
          <Calendar className="size-3.5" />
          day {event.day}
        </EntityKindPill>
      }
      headerContent={
        place ? (
          <Inline gap="sm" wrap className="text-muted-foreground text-sm">
            <LocationReference slug={place.slug} />
          </Inline>
        ) : null
      }
      dm={<DmFields kind="event" slug={entity.slug} />}
      correction={<EntityCorrectionSubmission entity={entity} />}
      context={
        <EntityContext key={`${entity.kind}:${entity.slug}`} data={entityContextData(entity)} />
      }
    >
      <Stack as="section" gap="lg">
        <h2 className="text-lg font-semibold">What happened</h2>
        <EventIllustrations illustrations={event.illustrations} eventName={event.name} />
        <EventVisualizations eventSlug={entity.slug} visualizations={event.visualizations} />
        <ContentRenderer content={eventNarrative(event)} />
      </Stack>
      {event.foretold ? (
        <Stack as="section" gap="md">
          <h2 className="text-lg font-semibold">Foretold</h2>
          <ForetoldList foretold={event.foretold} />
        </Stack>
      ) : null}
    </EntityDetail>
  )
}
