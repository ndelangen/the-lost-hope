import { createFileRoute } from '@tanstack/react-router'

import { LocationsScreen } from '#/components/locations-index'
import { locationsSearchSchema } from '#/lib/locations-search'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/locations/map')({
  head: () => publicPageHeadForPath('/locations/map'),
  validateSearch: locationsSearchSchema,
  component: function LocationsMapPage() {
    return <LocationsScreen view="map" />
  },
})
