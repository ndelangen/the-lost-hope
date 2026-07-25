import { createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { Avatar } from '#/components/ui/avatar'
import { Inline } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
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
    <EntityDetail
      kind="beast"
      title={beast.name}
      visual={{
        variant: 'avatar',
        content: (
          <Avatar
            src={beast.avatar}
            alt={beast.name}
            loading="lazy"
            className="size-full rounded-2xl"
          />
        ),
      }}
      headerContent={
        <Inline gap="sm" wrap>
          {beast.species ? <Pill variant="outline">{beast.species}</Pill> : null}
          {home ? <LocationReference slug={home.slug} /> : null}
        </Inline>
      }
      correction={<EntityCorrectionSubmission entity={entity} />}
      referencedBy={referencedByItems('beast', slug)}
    >
      {beast.notes ? <ContentRenderer content={beast.notes} /> : null}
    </EntityDetail>
  )
}
