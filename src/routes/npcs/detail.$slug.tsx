import { createFileRoute } from '@tanstack/react-router'

import { AvatarViewer } from '#/components/avatar-viewer'
import { CharacterMemberships } from '#/components/character-memberships'
import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import { getEntity, npcLocation } from '#/lib/campaign'
import { characterMemberships, referencedByItems } from '#/lib/entity-page-data'

export const Route = createFileRoute('/npcs/detail/$slug')({
  component: NpcPage,
})

function NpcPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('npc', slug)
  if (!entity) return <EntityNotFound kind="npc" />

  const npc = entity.data
  const home = npcLocation(npc)
  const memberships = characterMemberships(npc)

  return (
    <EntityDetail
      kind="npc"
      title={npc.name}
      visual={{
        variant: 'avatar',
        content: <AvatarViewer src={npc.avatar} name={npc.name} eyebrow="NPC portrait" />,
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
