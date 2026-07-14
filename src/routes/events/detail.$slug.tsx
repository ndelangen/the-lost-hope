import { createFileRoute } from '@tanstack/react-router'
import { Calendar } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityKindPill } from '#/components/entity-kind-pill'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { Avatar } from '#/components/ui/avatar'
import { Inline, Stack } from '#/components/ui/layout'
import { eventLocation, getEntity } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { EventMarkIcon } from '#/lib/event-icons'

export const Route = createFileRoute('/events/detail/$slug')({
  component: EventPage,
})

function EventPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('event', slug)
  if (!entity) return <EntityNotFound kind="event" />

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
                <Avatar
                  src={event.mark.url}
                  alt=""
                  loading="lazy"
                  className="size-full rounded-2xl"
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
      referencedBy={referencedByItems('event', slug)}
    >
      <Stack as="section" gap="lg">
        <h2 className="text-lg font-semibold">What happened</h2>
        <ContentRenderer content={event.notes} />
      </Stack>
    </EntityDetail>
  )
}
