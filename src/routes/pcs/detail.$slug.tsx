import { createFileRoute } from '@tanstack/react-router'

import { EntityDetailPage } from '#/components/entity-pages'

export const Route = createFileRoute('/pcs/detail/$slug')({
  component: function PcPage() {
    const { slug } = Route.useParams()
    return <EntityDetailPage kind="pc" slug={slug} />
  },
})
