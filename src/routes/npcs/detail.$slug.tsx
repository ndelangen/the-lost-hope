import { createFileRoute } from '@tanstack/react-router'

import { CharacterMemberships } from '#/components/character-memberships'
import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound, EntityPortrait } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { Badge } from '#/components/ui/badge'
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
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <EntityPortrait src={npc.avatar} alt={npc.name} />
        <div className="space-y-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            NPC
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{npc.name}</h1>
          <div className="flex flex-wrap gap-2">
            {npc.species ? <Badge variant="outline">{npc.species}</Badge> : null}
            {home ? <LocationReference slug={home.slug} /> : null}
          </div>
          {npc.languages?.length ? (
            <p className="text-muted-foreground text-sm">
              <span className="font-medium">Languages:</span> {npc.languages.join(', ')}
            </p>
          ) : null}
        </div>
      </header>

      <div className="space-y-8">
        <CharacterMemberships items={memberships} />
        {npc.notes ? <ContentRenderer content={npc.notes} /> : null}
      </div>
    </EntityDetail>
  )
}
