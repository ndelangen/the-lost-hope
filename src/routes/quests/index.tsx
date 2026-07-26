import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { allEntities, questProgress } from '#/lib/campaign'
import { entityCollectionItems } from '#/lib/entity-page-data'
import {
  QuestCataloguePrototype,
  type QuestPrototypeItem,
} from '#/routes/quests/-quest-catalogue-prototype'

export const Route = createFileRoute('/quests/')({
  validateSearch: z.object({
    variant: z.enum(['A', 'B', 'C']).optional().catch('A'),
  }),
  component: QuestsPage,
})

const MISSION_NAMES = new Set([
  'Bring Swift’s Sister to Sylvia',
  'Help the Rare-Animal Dealer',
  'Make Abraham Known Among His Peers',
])

function QuestsPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const entities = new Map(allEntities('quest').map((quest) => [quest.slug, quest]))
  const items: QuestPrototypeItem[] = entityCollectionItems('quest').map((item) => {
    const entity = entities.get(item.slug)
    if (!entity) throw new Error(`Missing quest ${item.slug}`)
    return {
      ...item,
      icon: entity.data.icon,
      questType: MISSION_NAMES.has(item.name) ? 'mission' : 'mystery',
      status: entity.data.status,
      campaignDaysAgo: questProgress(entity.data)?.campaignDaysAgo,
    }
  })

  return (
    <QuestCataloguePrototype
      items={items}
      variant={search.variant ?? 'A'}
      onVariantChange={(variant) => {
        void navigate({
          search: (current) => ({ ...current, variant }),
          replace: true,
          resetScroll: false,
        })
      }}
    />
  )
}
