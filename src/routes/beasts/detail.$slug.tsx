import { createFileRoute, notFound } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFields } from '#/components/dm/dm-fields'
import { EffectList } from '#/components/effect-list'
import { EntityContext } from '#/components/entity-context'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { ImageViewer } from '#/components/image-viewer'
import { LocationReference } from '#/components/location-reference'
import { PortraitGallery } from '#/components/portrait-gallery'
import { Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { effectsOn, getEntity, resolveRef } from '#/lib/campaign'
import { entityContextData } from '#/lib/entity-context-data'
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
        <Stack gap="md">
          <Inline gap="sm" wrap>
            {beast.species ? <Pill variant="outline">{beast.species}</Pill> : null}
            {home ? <LocationReference slug={home.slug} /> : null}
          </Inline>
          {beast.additionalPortraits ? (
            <PortraitGallery
              kind="additional"
              subject={beast.name}
              portraits={beast.additionalPortraits}
            />
          ) : null}
          {beast.previousPortraits ? (
            <PortraitGallery
              kind="previous"
              subject={beast.name}
              portraits={beast.previousPortraits}
            />
          ) : null}
        </Stack>
      }
      dm={<DmFields kind="beast" slug={entity.slug} />}
      correction={<EntityCorrectionSubmission entity={entity} />}
      context={
        <EntityContext key={`${entity.kind}:${entity.slug}`} data={entityContextData(entity)} />
      }
    >
      <EffectList entries={effectsOn('beast', entity.slug)} />
      {beast.notes ? <ContentRenderer content={beast.notes} /> : null}
    </EntityDetail>
  )
}
