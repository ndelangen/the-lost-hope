import { createFileRoute } from '@tanstack/react-router'

import { CharacterMemberships } from '#/components/character-memberships'
import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound, EntityPortrait } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { Badge } from '#/components/ui/badge'
import { Inline, Stack, SwitchLayout } from '#/components/ui/layout'
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
    <EntityDetail kind="npc" referencedBy={referencedByItems('npc', slug)}>
      <SwitchLayout as="header" gap="lg">
        <EntityPortrait src={npc.avatar} alt={npc.name} />
        <Stack gap="md">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            NPC
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{npc.name}</h1>
          <Inline gap="sm" wrap>
            {npc.species ? <Badge variant="outline">{npc.species}</Badge> : null}
            {home ? <LocationReference slug={home.slug} /> : null}
          </Inline>
          {npc.languages?.length ? (
            <p className="text-muted-foreground text-sm">
              <span className="font-medium">Languages:</span> {npc.languages.join(', ')}
            </p>
          ) : null}
        </Stack>
      </SwitchLayout>

      <Stack gap="2xl">
        <CharacterMemberships items={memberships} />
        {npc.notes ? <ContentRenderer content={npc.notes} /> : null}
      </Stack>
    </EntityDetail>
  )
}
