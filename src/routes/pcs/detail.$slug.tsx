import { createFileRoute } from '@tanstack/react-router'

import { CharacterMemberships } from '#/components/character-memberships'
import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound, EntityPortrait } from '#/components/entity-page'
import { Badge } from '#/components/ui/badge'
import { Inline, Stack, SwitchLayout } from '#/components/ui/layout'
import { getEntity, pcStatusLabel } from '#/lib/campaign'
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
      <SwitchLayout as="header" gap="lg">
        <EntityPortrait src={pc.avatar} alt={pc.name} />
        <Stack gap="md">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Player character
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{pc.name}</h1>
          <Inline gap="sm" wrap>
            <Badge variant={pc.status === 'active' ? 'success' : 'outline'}>
              {pcStatusLabel(pc.status)}
            </Badge>
            {pc.species ? <Badge variant="secondary">{pc.species}</Badge> : null}
            {pc.class ? <Badge variant="outline">{pc.class}</Badge> : null}
            {pc.subclass ? <Badge variant="outline">{pc.subclass}</Badge> : null}
            {pc.level ? <Badge variant="outline">Level {pc.level}</Badge> : null}
          </Inline>
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
        </Stack>
      </SwitchLayout>

      <Stack gap="2xl">
        <CharacterMemberships items={memberships} />
        {pc.notes ? <ContentRenderer content={pc.notes} /> : null}
      </Stack>
    </EntityDetail>
  )
}
