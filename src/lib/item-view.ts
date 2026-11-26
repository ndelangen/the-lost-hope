import type { CampaignItemCategory, Item } from '#/definitions/item'
import type { EntityRef } from '#/definitions/kind'
import type { Price, PriceRange } from '#/definitions/price'
import { scenes, sceneMentions } from '#/lib/dm-campaign'
import { loadEquipment } from '#/lib/library-equipment'
import { loadMagicItem } from '#/lib/library-magic-items'
import { publishedLibrary } from '#/lib/published-library-data'

const amount = (price: Price) => price.amount.toLocaleString('en')

/** An item's worth as one line: `50 gp`, or `50–1,000 gp` for a range. */
export function formatItemPrice(price: Price | PriceRange): string {
  if ('amount' in price) return `${amount(price)} ${price.coin}`
  const { min, max } = price
  return min.coin === max.coin
    ? `${amount(min)}–${amount(max)} ${max.coin}`
    : `${amount(min)} ${min.coin} – ${amount(max)} ${max.coin}`
}

/** A colour family per category, so a glance tells a weapon from a ship or a letter. */
const CATEGORY_TONES: Record<CampaignItemCategory, string> = {
  Weapon: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 ring-rose-500/30',
  Ammunition: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 ring-rose-500/30',
  Armor: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 ring-slate-500/30',
  Shield: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 ring-slate-500/30',
  Potion: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30',
  Poison: 'bg-lime-500/15 text-lime-700 dark:text-lime-300 ring-lime-500/30',
  Ring: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 ring-violet-500/30',
  Rod: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 ring-violet-500/30',
  Staff: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 ring-violet-500/30',
  Wand: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 ring-violet-500/30',
  Scroll: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 ring-violet-500/30',
  'Wondrous Item': 'bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 ring-fuchsia-500/30',
  'Adventuring Gear': 'bg-amber-500/15 text-amber-800 dark:text-amber-200 ring-amber-500/30',
  Tool: 'bg-amber-500/15 text-amber-800 dark:text-amber-200 ring-amber-500/30',
  'Tack and Harness': 'bg-amber-500/15 text-amber-800 dark:text-amber-200 ring-amber-500/30',
  'Food and Drink': 'bg-orange-500/15 text-orange-700 dark:text-orange-300 ring-orange-500/30',
  'Trade Good': 'bg-yellow-500/15 text-yellow-800 dark:text-yellow-200 ring-yellow-500/30',
  'Mount or Vehicle': 'bg-sky-500/15 text-sky-700 dark:text-sky-300 ring-sky-500/30',
  Other: 'bg-stone-500/15 text-stone-700 dark:text-stone-300 ring-stone-500/30',
}

export function itemCategoryTone(category: CampaignItemCategory): string {
  return CATEGORY_TONES[category]
}

/** The prepared scenes that name an item anywhere, in registry order. */
export function scenesMentioningItem(key: string): EntityRef<'scene'>[] {
  return Object.entries(scenes)
    .filter(([, scene]) =>
      sceneMentions(scene).some((ref) => ref.ref === 'item' && ref.key === key),
    )
    .map(([sceneKey]) => ({ ref: 'scene', key: sceneKey }) as EntityRef<'scene'>)
}

/** What an item is, whether it says so itself or takes it from its library entry. */
export type ItemFacts = {
  category: CampaignItemCategory
  price?: Price | PriceRange
  /** The library entry it is one of: where its rules live, and its picture. */
  library?: { name: string; slug: string; picture?: string }
}

/** The catalog record whose typed printing is this library entry. */
function catalogRecordFor(ref: NonNullable<Item['library']>) {
  for (const record of publishedLibrary) {
    for (const printing of record.printings) {
      const typed = printing.typed
      if (!typed) continue
      const key =
        ref.ref === 'magicItem'
          ? 'magicItem' in typed && typed.magicItem.key
          : 'equipment' in typed && typed.equipment.key
      if (key === ref.key) return { record, publication: typed.publication }
    }
  }
  return undefined
}

/**
 * An item's category and price: its own, or for an item that is one of a library entry, that
 * entry's, with its picture. Loads only the library book the entry is in.
 */
export async function loadItemFacts(item: Item): Promise<ItemFacts> {
  if (!item.library) return { category: item.category!, price: item.price }
  const found = catalogRecordFor(item.library)
  if (!found)
    throw new Error(`${item.name}: library entry ${item.library.key} is not in the catalog`)
  const { record, publication } = found
  const library = { name: record.name, slug: record.slug, picture: record.art?.[0]?.file }
  if (item.library.ref === 'magicItem') {
    const entry = await loadMagicItem(item.library, publication)
    if (!entry) throw new Error(`${item.name}: magic item ${item.library.key} did not load`)
    return { category: entry.category, library }
  }
  const entry = await loadEquipment(item.library, publication)
  if (!entry) throw new Error(`${item.name}: equipment ${item.library.key} did not load`)
  return { category: entry.category, price: entry.price, library }
}
