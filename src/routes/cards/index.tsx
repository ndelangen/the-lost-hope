import { createFileRoute } from '@tanstack/react-router'

import { EntityCollection } from '#/components/entity-page'
import { allEntities, COLLECTION_LABELS } from '#/lib/campaign'
import { CARD_SUIT_ICONS } from '#/lib/card-icons'
import { entityCollectionItems } from '#/lib/entity-page-data'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/cards/')({
  head: () => publicPageHeadForPath('/cards'),
  component: CardsPage,
})

function CardsPage() {
  const items = entityCollectionItems('card')
  const suits = new Map(allEntities('card').map((card) => [card.slug, card.data.suit]))

  return (
    <EntityCollection
      label={COLLECTION_LABELS.card}
      items={items}
      iconForItem={(item) => CARD_SUIT_ICONS[suits.get(item.slug) ?? 'Star']}
    />
  )
}
