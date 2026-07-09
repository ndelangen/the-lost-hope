import { createFileRoute } from '@tanstack/react-router'

import { EntityDetailPage } from '#/components/entity-pages'

export const Route = createFileRoute('/quests/detail/$slug')({
  component: function QuestPage() {
    const { slug } = Route.useParams()
    return <EntityDetailPage kind="quest" slug={slug} />
  },
})
