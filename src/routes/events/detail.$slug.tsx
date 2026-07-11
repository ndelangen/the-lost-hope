import { createFileRoute } from '@tanstack/react-router'
import { Calendar } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { Inline, Stack } from '#/components/ui/layout'
import { getEntity, eventLocation } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'

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
    <EntityDetail kind="event" referencedBy={referencedByItems('event', slug)}>
      <Stack as="header" gap="md">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Event
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{event.name}</h1>
        <Inline gap="sm" wrap className="text-muted-foreground text-sm">
          <Inline
            as="span"
            inline
            gap="2xs"
            className="border-border rounded-full border px-2.5 py-1"
          >
            <Calendar className="size-3.5" />
            Campaign day {event.day}
          </Inline>
          {place ? <LocationReference slug={place.slug} /> : null}
        </Inline>
      </Stack>

      <Stack as="section" gap="lg">
        <h2 className="text-lg font-semibold">What happened</h2>
        <ContentRenderer content={event.notes} />
      </Stack>
    </EntityDetail>
  )
}
