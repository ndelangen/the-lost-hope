import { createFileRoute } from '@tanstack/react-router'

import { EntityDetailPage } from '@/components/entity-pages'

export const Route = createFileRoute('/npcs/$slug')({
  component: function NpcPage() {
    const { slug } = Route.useParams()
    return <EntityDetailPage kind="npc" slug={slug} />
  },
})
