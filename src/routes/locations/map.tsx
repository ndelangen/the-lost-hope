import { createFileRoute } from '@tanstack/react-router'

import { LocationsIndex } from '#/components/locations-index'
import { locationsSearchSchema } from '#/lib/locations-search'

export const Route = createFileRoute('/locations/map')({
  validateSearch: locationsSearchSchema,
  component: function LocationsMapPage() {
    return <LocationsIndex view="map" />
  },
})
