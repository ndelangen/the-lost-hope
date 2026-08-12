import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { COLLECTION_LABELS } from '#/lib/campaign'
import { entityCollectionItems } from '#/lib/entity-page-data'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/beasts/')({
  head: () => publicPageHeadForPath('/beasts'),
  component: BeastsPage,
})

function BeastsPage() {
  const items = entityCollectionItems('beast')
  return <EntityCollection label={COLLECTION_LABELS.beast} items={items} />
}
