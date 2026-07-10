import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { COLLECTION_LABELS } from '#/lib/campaign'
import { entityCollectionItems } from '#/lib/entity-page-data'

export const Route = createFileRoute('/sessions/')({
  component: SessionsPage,
})

function SessionsPage() {
  const items = entityCollectionItems('session')
  return <EntityCollection label={COLLECTION_LABELS.session} items={items} />
}
