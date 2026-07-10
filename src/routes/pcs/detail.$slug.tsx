import { createFileRoute } from '@tanstack/react-router'

import { CharacterMemberships } from '#/components/character-memberships'
import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound, EntityPortrait } from '#/components/entity-page'
import { Badge } from '#/components/ui/badge'
import { getEntity } from '#/lib/campaign'
import { characterMemberships, referencedByItems } from '#/lib/entity-page-data'

export const Route = createFileRoute('/pcs/detail/$slug')({
  component: PcPage,
})

function PcPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('pc', slug)
  if (!entity) return <EntityNotFound kind="pc" />

  const pc = entity.data
  const memberships = characterMemberships(pc)

  return (
    <EntityDetail kind="pc" referencedBy={referencedByItems('pc', slug)}>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <EntityPortrait src={pc.avatar} alt={pc.name} />
        <div className="space-y-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Player character
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{pc.name}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant={pc.status === 'active' ? 'success' : 'outline'}>{pc.status}</Badge>
            {pc.species ? <Badge variant="secondary">{pc.species}</Badge> : null}
            {pc.class ? <Badge variant="outline">{pc.class}</Badge> : null}
            {pc.subclass ? <Badge variant="outline">{pc.subclass}</Badge> : null}
            {pc.level ? <Badge variant="outline">Level {pc.level}</Badge> : null}
          </div>
          <p className="text-muted-foreground text-sm">Played by {pc.player}</p>
          {pc.languages?.length ? (
            <p className="text-muted-foreground text-sm">
              <span className="font-medium">Languages:</span> {pc.languages.join(', ')}
            </p>
          ) : null}
          {pc.url ? (
            <a
              href={pc.url}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-sm hover:underline"
            >
              Character sheet →
            </a>
          ) : null}
        </div>
      </header>

      <div className="space-y-8">
        <CharacterMemberships items={memberships} />
        {pc.notes ? <ContentRenderer content={pc.notes} /> : null}
      </div>
    </EntityDetail>
  )
}
