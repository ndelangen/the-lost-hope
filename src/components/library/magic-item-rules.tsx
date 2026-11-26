import { ContentRenderer } from '#/components/content-renderer'
import type { MagicItem } from '#/definitions/library'

/** A typed magic item's printed rules: its category line, then its text. */
export function MagicItemRules({ item }: { item: MagicItem }) {
  const category = item.detail ? `${item.category} (${item.detail})` : item.category
  const attunement =
    item.attunement === true
      ? ' (requires attunement)'
      : item.attunement
        ? ` (requires attunement ${item.attunement})`
        : ''
  return (
    <section aria-label="Rules" className="grid gap-2">
      <h2 className="text-lg font-semibold">Rules</h2>
      <p className="text-sm italic">
        {category}, {item.rarity}
        {attunement}
      </p>
      <div className="grid gap-2 text-sm">
        <ContentRenderer content={item.text} />
      </div>
    </section>
  )
}
