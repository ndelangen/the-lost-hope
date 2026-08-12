import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { COLLECTION_LABELS } from '#/lib/campaign'
import { entityCollectionItems } from '#/lib/entity-page-data'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/npcs/')({
  head: () => publicPageHeadForPath('/npcs'),
  component: NpcsPage,
})

function NpcsPage() {
  const items = entityCollectionItems('npc')
  return <EntityCollection label={COLLECTION_LABELS.npc} items={items} />
}
