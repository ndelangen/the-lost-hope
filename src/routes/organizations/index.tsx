import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { allEntities, COLLECTION_LABELS } from '#/lib/campaign'
import { entityCollectionItems } from '#/lib/entity-page-data'
import { resolveOrganizationIcon } from '#/lib/organization-icons'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/organizations/')({
  head: () => publicPageHeadForPath('/organizations'),
  component: OrganizationsPage,
})

function OrganizationsPage() {
  const items = entityCollectionItems('organization')
  const icons = new Map(
    allEntities('organization').map((organization) => [organization.slug, organization.data.icon]),
  )

  return (
    <EntityCollection
      label={COLLECTION_LABELS.organization}
      items={items}
      iconForItem={(item) => resolveOrganizationIcon(icons.get(item.slug))}
    />
  )
}
