import { createFileRoute } from '@tanstack/react-router'

import { EntityDetailPage } from '#/components/entity-pages'

export const Route = createFileRoute('/beasts/detail/$slug')({
  component: function BeastPage() {
    const { slug } = Route.useParams()
    return <EntityDetailPage kind="beast" slug={slug} />
  },
})
