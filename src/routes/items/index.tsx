import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { allEntities, COLLECTION_LABELS } from '#/lib/campaign'
import { entityCollectionItems } from '#/lib/entity-page-data'
import { resolveItemIcon } from '#/lib/item-icons'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/items/')({
  head: () => publicPageHeadForPath('/items'),
  component: ItemsPage,
})

function ItemsPage() {
  const items = entityCollectionItems('item')
  const icons = new Map(allEntities('item').map((item) => [item.slug, item.data.icon]))

  return (
    <EntityCollection
      label={COLLECTION_LABELS.item}
      items={items}
      iconForItem={(item) => resolveItemIcon(icons.get(item.slug) ?? '')}
    />
  )
}
