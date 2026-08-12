import { createFileRoute, notFound } from '@tanstack/react-router'

import { AvatarViewer } from '#/components/avatar-viewer'
import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { Inline } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
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
        content: <AvatarViewer src={beast.avatar} name={beast.name} eyebrow="Beast portrait" />,
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
