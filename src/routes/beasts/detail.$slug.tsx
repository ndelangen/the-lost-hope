import { createFileRoute, notFound } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { ImageViewer } from '#/components/image-viewer'
import { LocationReference } from '#/components/location-reference'
import { Inline } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { getEntity, resolveRef } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { publicEntityPageHead } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/beasts/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('beast', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('beast', params.slug),
  component: BeastPage,
})

function BeastPage() {
  const { slug } = Route.useParams()
  const entity = Route.useLoaderData()

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
          <ImageViewer
            src={beast.avatar}
            fallbackSrc={DEFAULT_AVATAR}
            alt={beast.name}
            title={beast.name}
            eyebrow="Beast portrait"
            accessibleLabel={`portrait of ${beast.name}`}
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
