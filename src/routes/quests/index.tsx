import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { allEntities, COLLECTION_LABELS } from '#/lib/campaign'
import { entityCollectionItems } from '#/lib/entity-page-data'
import { resolveQuestIcon } from '#/lib/quest-icons'

export const Route = createFileRoute('/quests/')({
  component: QuestsPage,
})

function QuestsPage() {
  const items = entityCollectionItems('quest')
  const icons = new Map(allEntities('quest').map((quest) => [quest.slug, quest.data.icon]))

  return (
    <EntityCollection
      label={COLLECTION_LABELS.quest}
      items={items}
      iconForItem={(item) => resolveQuestIcon(icons.get(item.slug) ?? '')}
    />
  )
}
