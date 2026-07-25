import { createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { EntityReference } from '#/components/entity-reference'
import { Grid, Stack } from '#/components/ui/layout'
import { getEntity, refLink } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { ItemIcon } from '#/lib/item-icons'

export const Route = createFileRoute('/items/detail/$slug')({
  component: ItemPage,
})

function ItemPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('item', slug)
  if (!entity) return <EntityNotFound kind="item" />

  const item = entity.data
  const owner = item.currentOwner ? refLink(item.currentOwner) : undefined
  const carrier = item.carriedBy ? refLink(item.carriedBy) : undefined

  return (
    <EntityDetail
      kind="item"
      title={item.name}
      visual={{
        variant: 'icon',
        content: <ItemIcon icon={item.icon} className="size-10" />,
      }}
      correction={<EntityCorrectionSubmission entity={entity} />}
      referencedBy={referencedByItems('item', slug)}
    >
      <Grid as="section" gap="lg" smTemplate={2}>
        <Relationship label="Current owner" relationship={owner} />
        <Relationship label="Carried by" relationship={carrier} />
      </Grid>

      {item.notes ? <ContentRenderer content={item.notes} /> : null}
    </EntityDetail>
  )
}

function Relationship({
  label,
  relationship,
}: {
  label: string
  relationship: ReturnType<typeof refLink>
}) {
  return (
    <Stack gap="xs">
      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        {label}
      </p>
      {relationship ? (
        <EntityReference
          kind={relationship.kind}
          slug={relationship.slug}
          label={relationship.name}
        />
      ) : (
        <p className="text-muted-foreground font-medium">Unknown</p>
      )}
    </Stack>
  )
}
