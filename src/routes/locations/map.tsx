import { createFileRoute } from '@tanstack/react-router'

import { LocationsScreen } from '#/components/locations-index'
import {
  ResponsiveImagesPrototype,
  type ResponsiveImagePrototypeVariant,
} from '#/components/prototype-responsive-images'
import { locationsSearchSchema } from '#/lib/locations-search'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/locations/map')({
  head: () => publicPageHeadForPath('/locations/map'),
  validateSearch: locationsSearchSchema,
  component: function LocationsMapPage() {
    const search = Route.useSearch()
    const navigate = Route.useNavigate()
    if (search.variant) {
      return (
        <ResponsiveImagesPrototype
          variant={search.variant}
          onVariantChange={(variant: ResponsiveImagePrototypeVariant) => {
            void navigate({
              search: (current) => ({ ...current, variant }),
              replace: true,
              resetScroll: false,
            })
          }}
        />
      )
    }
    return <LocationsScreen view="map" />
  },
})
