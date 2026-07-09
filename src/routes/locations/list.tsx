import { createFileRoute } from '@tanstack/react-router'

import { LocationsIndex } from '#/components/locations-index'
import { locationsSearchSchema } from '#/lib/locations-search'

export const Route = createFileRoute('/locations/list')({
  validateSearch: locationsSearchSchema,
  component: function LocationsListPage() {
    return <LocationsIndex view="list" />
  },
})
