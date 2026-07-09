import { createFileRoute } from '@tanstack/react-router'

import { EntityDetailPage } from '#/components/entity-pages'

export const Route = createFileRoute('/organizations/detail/$slug')({
  component: function OrganizationPage() {
    const { slug } = Route.useParams()
    return <EntityDetailPage kind="organization" slug={slug} />
  },
})
