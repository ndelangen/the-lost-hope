import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { COLLECTION_LABELS } from '#/lib/campaign'
import { entityCollectionItems } from '#/lib/entity-page-data'

export const Route = createFileRoute('/quests/')({
  component: QuestsPage,
})

function QuestsPage() {
  const items = entityCollectionItems('quest')
  return <EntityCollection label={COLLECTION_LABELS.quest} items={items} />
}
