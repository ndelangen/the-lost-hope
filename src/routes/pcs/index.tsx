import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { COLLECTION_LABELS } from '#/lib/campaign'
import { entityCollectionItems } from '#/lib/entity-page-data'

export const Route = createFileRoute('/pcs/')({
  component: PcsPage,
})

function PcsPage() {
  const items = entityCollectionItems('pc')
  return <EntityCollection label={COLLECTION_LABELS.pc} items={items} />
}
