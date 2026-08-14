import { createFileRoute, notFound } from '@tanstack/react-router'
import { Calendar } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityKindPill } from '#/components/entity-kind-pill'
import { EntityDetail } from '#/components/entity-page'
import { ImageViewer } from '#/components/image-viewer'
import { LocationReference } from '#/components/location-reference'
import { Inline, Stack } from '#/components/ui/layout'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { eventLocation, getEntity } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { EventMarkIcon } from '#/lib/event-icons'
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
  const { slug } = Route.useParams()
  const entity = Route.useLoaderData()

  const event = entity.data
  const place = eventLocation(event)

  return (
    <EntityDetail
      kind="event"
      title={event.name}
      visual={
        event.mark.type === 'avatar'
          ? {
              variant: 'avatar',
              content: (
                <ImageViewer
                  src={event.mark.url}
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
              content: <EventMarkIcon name={event.mark.name} className="size-10" />,
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
      correction={<EntityCorrectionSubmission entity={entity} />}
      referencedBy={referencedByItems('event', slug)}
    >
      <Stack as="section" gap="lg">
        <h2 className="text-lg font-semibold">What happened</h2>
        <ContentRenderer content={event.notes} />
      </Stack>
    </EntityDetail>
  )
}
