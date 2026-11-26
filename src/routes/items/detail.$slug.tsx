import { createFileRoute, notFound } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFields } from '#/components/dm/dm-fields'
import { EntityContext } from '#/components/entity-context'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { EntityReference } from '#/components/entity-reference'
import { ForetoldList } from '#/components/foretold-list'
import { Grid, Stack } from '#/components/ui/layout'
import { VESSEL_CLASS_LABELS } from '#/definitions/item'
import { getEntity, refLink } from '#/lib/campaign'
import { entityContextData } from '#/lib/entity-context-data'
import { ItemIcon } from '#/lib/item-icons'
import { formatItemPrice, loadItemFacts } from '#/lib/item-view'
import { publicEntityPageHead } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/items/detail/$slug')({
  loader: async ({ params }) => {
    const entity = getEntity('item', params.slug)
    if (!entity) throw notFound()
    return { entity, facts: await loadItemFacts(entity.data) }
  },
  head: ({ params }) => publicEntityPageHead('item', params.slug),
  component: ItemPage,
})

function ItemPage() {
  const { entity, facts } = Route.useLoaderData()

  const item = entity.data
  const owner = item.currentOwner ? refLink(item.currentOwner) : undefined
  const carrier = item.carriedBy ? refLink(item.carriedBy) : undefined
  const crafter = item.craftedBy ? refLink(item.craftedBy) : undefined
  const controller = item.controlledBy ? refLink(item.controlledBy) : undefined

  return (
    <EntityDetail
      kind="item"
      title={item.name}
      visual={{
        variant: 'icon',
        content: <ItemIcon icon={item.icon} className="size-10" />,
      }}
      dm={<DmFields kind="item" slug={entity.slug} />}
      correction={<EntityCorrectionSubmission entity={entity} />}
      context={
        <EntityContext key={`${entity.kind}:${entity.slug}`} data={entityContextData(entity)} />
      }
    >
      <Grid as="section" gap="lg" smTemplate={2}>
        <Attribute label="Category" value={facts.category} />
        {facts.price ? <Attribute label="Worth" value={formatItemPrice(facts.price)} /> : null}
        <Relationship label="Current owner" relationship={owner} />
        {controller ? <Relationship label="Controlled by" relationship={controller} /> : null}
        <Relationship label="Carried by" relationship={carrier} />
        {crafter ? <Relationship label="Crafted by" relationship={crafter} /> : null}
        {item.vessel ? <Attribute label="Vessel" value={VESSEL_CLASS_LABELS[item.vessel]} /> : null}
        {item.quantity ? <Attribute label="Quantity" value={String(item.quantity)} /> : null}
      </Grid>

      {item.notes ? <ContentRenderer content={item.notes} /> : null}
      {item.foretold ? (
        <Stack as="section" gap="md">
          <h2 className="text-lg font-semibold">Foretold</h2>
          <ForetoldList foretold={item.foretold} />
        </Stack>
      ) : null}
    </EntityDetail>
  )
}

function Attribute({ label, value }: { label: string; value: string }) {
  return (
    <Stack gap="xs">
      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        {label}
      </p>
      <p className="font-medium">{value}</p>
    </Stack>
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
