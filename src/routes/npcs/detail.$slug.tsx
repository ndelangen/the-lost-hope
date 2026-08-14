import { createFileRoute, notFound } from '@tanstack/react-router'

import { CharacterMemberships } from '#/components/character-memberships'
import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { ImageViewer } from '#/components/image-viewer'
import { LocationReference } from '#/components/location-reference'
import { Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { getEntity, npcLocation } from '#/lib/campaign'
import { characterMemberships, referencedByItems } from '#/lib/entity-page-data'
import { publicEntityPageHead } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/npcs/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('npc', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('npc', params.slug),
  component: NpcPage,
})

function NpcPage() {
  const { slug } = Route.useParams()
  const entity = Route.useLoaderData()

  const npc = entity.data
  const home = npcLocation(npc)
  const memberships = characterMemberships(npc)

  return (
    <EntityDetail
      kind="npc"
      title={npc.name}
      visual={{
        variant: 'avatar',
        content: (
          <ImageViewer
            src={npc.avatar}
            fallbackSrc={DEFAULT_AVATAR}
            alt={npc.name}
            title={npc.name}
            eyebrow="NPC portrait"
            accessibleLabel={`portrait of ${npc.name}`}
          />
        ),
      }}
      headerContent={
        <Stack gap="md">
          <Inline gap="sm" wrap>
            {npc.species ? <Pill variant="outline">{npc.species}</Pill> : null}
            {home ? <LocationReference slug={home.slug} /> : null}
          </Inline>
          {npc.languages?.length ? (
            <p className="text-muted-foreground text-sm">
              <span className="font-medium">Languages:</span> {npc.languages.join(', ')}
            </p>
          ) : null}
        </Stack>
      }
      correction={<EntityCorrectionSubmission entity={entity} />}
      referencedBy={referencedByItems('npc', slug)}
    >
      <Stack gap="2xl">
        <CharacterMemberships items={memberships} />
        {npc.notes ? <ContentRenderer content={npc.notes} /> : null}
      </Stack>
    </EntityDetail>
  )
}
