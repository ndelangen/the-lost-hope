import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { EntityCollection } from '#/components/entity-page'
import { Stack, SwitchLayout } from '#/components/ui/layout'
import { COLLECTION_LABELS } from '#/lib/campaign'
import { npcCollectionItems, parseNpcSortOrder, type NpcSortOrder } from '#/lib/npc-collection-data'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/npcs/')({
  head: () => publicPageHeadForPath('/npcs'),
  component: NpcsPage,
})

export const NPC_SORT_STORAGE_KEY = 'dag:npcs:sort'

export function NpcsPage() {
  const [order, setOrder] = useState<NpcSortOrder>('appearance')

  useEffect(() => {
    try {
      setOrder(parseNpcSortOrder(localStorage.getItem(NPC_SORT_STORAGE_KEY)))
    } catch {
      // Keep the default when browser storage is unavailable.
    }
  }, [])

  function changeOrder(value: string) {
    const next = parseNpcSortOrder(value)
    setOrder(next)
    try {
      localStorage.setItem(NPC_SORT_STORAGE_KEY, next)
    } catch {
      // Sorting still works for this visit when storage is unavailable.
    }
  }

  return (
    <EntityCollection
      label={COLLECTION_LABELS.npc}
      items={npcCollectionItems(order)}
      controls={
        <SwitchLayout rowJustify="between" rowAlign="end" columnAlign="stretch" className="pt-3">
          <p id="npc-sort-description" className="text-muted-foreground max-w-prose text-sm">
            {order === 'appearance'
              ? 'Based on first mentions in session events. NPCs with no recorded appearance are listed last.'
              : 'NPC names in alphabetical order.'}
          </p>
          <Stack gap="xs" className="shrink-0">
            <label htmlFor="npc-sort" className="text-sm font-medium">
              Sort NPCs
            </label>
            <select
              id="npc-sort"
              value={order}
              onChange={(event) => changeOrder(event.target.value)}
              aria-describedby="npc-sort-description"
              className="border-input bg-background focus-visible:ring-ring min-h-10 w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 sm:w-52"
            >
              <option value="appearance">First appearance</option>
              <option value="name">Name, A to Z</option>
            </select>
          </Stack>
        </SwitchLayout>
      }
    />
  )
}
