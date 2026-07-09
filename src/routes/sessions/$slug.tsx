import { createFileRoute } from '@tanstack/react-router'

import { EntityDetailPage } from '@/components/entity-pages'

export const Route = createFileRoute('/sessions/$slug')({
  component: function SessionPage() {
    const { slug } = Route.useParams()
    return <EntityDetailPage kind="session" slug={slug} />
  },
})
