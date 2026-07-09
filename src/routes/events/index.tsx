import { createFileRoute } from '@tanstack/react-router'

import { EventsTimeline } from '#/components/events-timeline'

export const Route = createFileRoute('/events/')({
  component: EventsTimeline,
})
