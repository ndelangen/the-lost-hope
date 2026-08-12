import { createFileRoute } from '@tanstack/react-router'

import { EventsTimeline } from '#/components/events-timeline'
import { sessionTimelineSections, type SessionTimelineEntry } from '#/lib/campaign'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/events/')({
  head: () => publicPageHeadForPath('/events'),
  component: EventsPage,
})

function EventsPage() {
  const sections = sessionTimelineSections()
  const events = sections.flatMap((section) =>
    section.entries.filter(
      (entry): entry is Extract<SessionTimelineEntry, { kind: 'event' }> => entry.kind === 'event',
    ),
  )
  const days = events.map((event) => event.day)
  const daySpan =
    days.length === 0
      ? null
      : Math.min(...days) === Math.max(...days)
        ? `day ${days[0]}`
        : `days ${Math.min(...days)}–${Math.max(...days)}`

  return <EventsTimeline sections={sections} eventCount={events.length} daySpan={daySpan} />
}
