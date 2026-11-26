import { ContentRenderer } from '#/components/content-renderer'
import type { Equipment } from '#/definitions/library'

/** "2 lb.", "½ lb.": a weight as the books print it. */
function weight(pounds: number) {
  const whole = Math.floor(pounds)
  const part = pounds - whole === 0.5 ? '½' : pounds - whole === 0.25 ? '¼' : ''
  return `${whole || !part ? whole : ''}${part} lb.`
}

/** A typed piece of equipment's printed rules: its kind, price and weight, then its text. */
export function EquipmentRules({ item }: { item: Equipment }) {
  const kind = item.detail ? `${item.category} (${item.detail})` : item.category
  const facts = [
    kind,
    item.price
      ? `${item.price.amount.toLocaleString('en')} ${item.price.coin.toUpperCase()}${item.priceEstimated ? ' (estimate)' : ''}`
      : '',
    item.weight ? weight(item.weight) : '',
  ].filter(Boolean)
  return (
    <section aria-label="Rules" className="grid gap-2">
      <h2 className="text-lg font-semibold">Rules</h2>
      <p className="text-sm italic">{facts.join(' · ')}</p>
      <div className="grid gap-2 text-sm">
        <ContentRenderer content={item.text} />
      </div>
    </section>
  )
}
