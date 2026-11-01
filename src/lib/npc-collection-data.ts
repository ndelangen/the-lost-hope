import { campaignEvents, compareEntityNames, resolveRef } from '#/lib/campaign'
import { collectReferences } from '#/lib/campaign-read-model'
import { entityCollectionItems, type EntityCardItem } from '#/lib/entity-page-data'

export type NpcSortOrder = 'appearance' | 'name'

export type NpcAppearanceEvent = {
  day: number
  npcSlugs: readonly string[]
}

export function parseNpcSortOrder(value: string | null): NpcSortOrder {
  return value === 'name' ? 'name' : 'appearance'
}

/** Event order breaks ties within a day; names break ties within the same event. */
export function buildNpcCollectionItems(
  items: readonly EntityCardItem[],
  events: readonly NpcAppearanceEvent[],
  order: NpcSortOrder,
): EntityCardItem[] {
  const appearances = new Map<string, { day: number; position: number }>()
  events
    .toSorted((a, b) => a.day - b.day)
    .forEach((event, position) => {
      for (const slug of event.npcSlugs) {
        if (!appearances.has(slug)) appearances.set(slug, { day: event.day, position })
      }
    })

  return items
    .toSorted((a, b) => {
      if (order === 'appearance') {
        const first = appearances.get(a.slug)
        const second = appearances.get(b.slug)
        if (!first && second) return 1
        if (first && !second) return -1
        if (first && second && first.position !== second.position) {
          return first.position - second.position
        }
      }
      return compareEntityNames(a.name, b.name)
    })
    .map((item) => {
      const first = appearances.get(item.slug)
      return {
        kind: item.kind,
        slug: item.slug,
        name: item.name,
        description: item.description,
        meta: first ? `First recorded: Day ${first.day}` : 'No recorded appearance',
      }
    })
}

export function npcCollectionItems(order: NpcSortOrder): EntityCardItem[] {
  const events = campaignEvents().map((event) => ({
    day: event.data.day,
    npcSlugs: collectReferences(event.data.notes).flatMap((ref) => {
      if (ref.ref !== 'npc') return []
      const npc = resolveRef(ref)
      return npc?.kind === 'npc' ? [npc.slug] : []
    }),
  }))
  return buildNpcCollectionItems(entityCollectionItems('npc'), events, order)
}
