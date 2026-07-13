import { createFileRoute } from '@tanstack/react-router'

import { CharacterItems } from '#/components/character-items'
import { CharacterMemberships } from '#/components/character-memberships'
import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { Avatar } from '#/components/ui/avatar'
import { Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import { getEntity, itemsCarriedBy, itemsOwnedBy, pcStatusLabel } from '#/lib/campaign'
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
  const ownedItems = itemsOwnedBy('pc', slug)
  const carriedItems = itemsCarriedBy('pc', slug)

  return (
    <EntityDetail
      kind="pc"
      title={pc.name}
      visual={{
        variant: 'avatar',
        content: (
          <Avatar src={pc.avatar} alt={pc.name} loading="lazy" className="size-full rounded-2xl" />
        ),
      }}
      headerContent={
        <Stack gap="md">
          <Inline gap="sm" wrap>
            <Pill variant={pc.status === 'active' ? 'success' : 'outline'}>
              {pcStatusLabel(pc.status)}
            </Pill>
            {pc.species ? <Pill variant="secondary">{pc.species}</Pill> : null}
            {pc.class ? <Pill variant="outline">{pc.class}</Pill> : null}
            {pc.subclass ? <Pill variant="outline">{pc.subclass}</Pill> : null}
            {pc.level ? <Pill variant="outline">Level {pc.level}</Pill> : null}
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
      }
      referencedBy={referencedByItems('pc', slug)}
    >
      <Stack gap="2xl">
        <CharacterMemberships items={memberships} />
        <CharacterItems owned={ownedItems} carried={carriedItems} />
        {pc.notes ? <ContentRenderer content={pc.notes} /> : null}
      </Stack>
    </EntityDetail>
  )
}
