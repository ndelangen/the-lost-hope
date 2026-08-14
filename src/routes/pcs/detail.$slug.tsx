import { createFileRoute, notFound } from '@tanstack/react-router'

import { CharacterItems } from '#/components/character-items'
import { CharacterMemberships } from '#/components/character-memberships'
import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { ImageViewer } from '#/components/image-viewer'
import { PreviousPortraits } from '#/components/previous-portraits'
import { Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { getEntity, itemsCarriedBy, itemsOwnedBy, pcStatusLabel } from '#/lib/campaign'
import { characterMemberships, referencedByItems } from '#/lib/entity-page-data'
import { publicEntityPageHead } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/pcs/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('pc', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('pc', params.slug),
  component: PcPage,
})

function PcPage() {
  const { slug } = Route.useParams()
  const entity = Route.useLoaderData()

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
          <ImageViewer
            src={pc.avatar}
            fallbackSrc={DEFAULT_AVATAR}
            alt={pc.name}
            title={pc.name}
            eyebrow="Player character portrait"
            accessibleLabel={`portrait of ${pc.name}`}
          />
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
          {pc.previousPortraits?.length ? (
            <PreviousPortraits characterName={pc.name} portraits={pc.previousPortraits} />
          ) : null}
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
      correction={<EntityCorrectionSubmission entity={entity} />}
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
