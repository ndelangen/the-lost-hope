import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

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
    const navigate = Route.useNavigate()
    const [prototypeVariant, setPrototypeVariant] = useState<ResponsiveImagePrototypeVariant>()

    useEffect(() => {
      const variant = new URLSearchParams(window.location.search).get('variant')
      if (variant === 'A' || variant === 'B' || variant === 'C') {
        setPrototypeVariant(variant)
      }
    }, [])

    if (prototypeVariant) {
      return (
        <ResponsiveImagesPrototype
          variant={prototypeVariant}
          onVariantChange={(variant: ResponsiveImagePrototypeVariant) => {
            setPrototypeVariant(variant)
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
