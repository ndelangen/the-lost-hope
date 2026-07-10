import { createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound, EntityPortrait } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { Badge } from '#/components/ui/badge'
import { getEntity, resolveRef } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'

export const Route = createFileRoute('/beasts/detail/$slug')({
  component: BeastPage,
})

function BeastPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('beast', slug)
  if (!entity) return <EntityNotFound kind="beast" />

  const beast = entity.data
  const locationEntity = beast.location ? resolveRef(beast.location) : undefined
  const home = locationEntity?.kind === 'location' ? locationEntity.data : undefined

  return (
    <EntityDetail kind="beast" referencedBy={referencedByItems('beast', slug)}>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <EntityPortrait src={beast.avatar} alt={beast.name} />
        <div className="space-y-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Beast
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{beast.name}</h1>
          <div className="flex flex-wrap gap-2">
            {beast.species ? <Badge variant="outline">{beast.species}</Badge> : null}
            {home ? <LocationReference slug={home.slug} /> : null}
          </div>
        </div>
      </header>

      {beast.notes ? <ContentRenderer content={beast.notes} /> : null}
    </EntityDetail>
  )
}
