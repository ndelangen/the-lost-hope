import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { COLLECTION_LABELS } from '#/lib/campaign'
import { entityCollectionItems } from '#/lib/entity-page-data'

export const Route = createFileRoute('/organizations/')({
  component: OrganizationsPage,
})

function OrganizationsPage() {
  const items = entityCollectionItems('organization')
  return <EntityCollection label={COLLECTION_LABELS.organization} items={items} />
}
