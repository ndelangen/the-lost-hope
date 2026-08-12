import { createFileRoute } from '@tanstack/react-router'

import { LocationsScreen } from '#/components/locations-index'
import { locationsSearchSchema } from '#/lib/locations-search'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/locations/list')({
  head: () => publicPageHeadForPath('/locations/list'),
  validateSearch: locationsSearchSchema,
  component: function LocationsListPage() {
    return <LocationsScreen view="list" />
  },
})
