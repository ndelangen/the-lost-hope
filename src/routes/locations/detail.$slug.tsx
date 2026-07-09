import { createFileRoute } from '@tanstack/react-router'

import { EntityDetailPage } from '@/components/entity-pages'

export const Route = createFileRoute('/locations/detail/$slug')({
  component: function LocationDetailPage() {
    const { slug } = Route.useParams()
    return <EntityDetailPage kind="location" slug={slug} />
  },
})
