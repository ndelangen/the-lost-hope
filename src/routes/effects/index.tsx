import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { allEntities, COLLECTION_LABELS } from '#/lib/campaign'
import { resolveEffectIcon } from '#/lib/effect-icons'
import { entityCollectionItems } from '#/lib/entity-page-data'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/effects/')({
  head: () => publicPageHeadForPath('/effects'),
  component: EffectsPage,
})

function EffectsPage() {
  const items = entityCollectionItems('effect')
  const icons = new Map(allEntities('effect').map((effect) => [effect.slug, effect.data.icon]))

  return (
    <EntityCollection
      label={COLLECTION_LABELS.effect}
      items={items}
      iconForItem={(item) => resolveEffectIcon(icons.get(item.slug) ?? '')}
    />
  )
}
