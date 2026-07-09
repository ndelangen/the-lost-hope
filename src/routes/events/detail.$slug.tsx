import { createFileRoute } from '@tanstack/react-router'

import { EntityDetailPage } from '#/components/entity-pages'

export const Route = createFileRoute('/events/detail/$slug')({
  component: function EventPage() {
    const { slug } = Route.useParams()
    return <EntityDetailPage kind="event" slug={slug} />
  },
})
