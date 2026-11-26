import { Dices, Plus, Store, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { useDmMode } from '#/components/dm-mode'
import { SearchInput } from '#/components/ui/search-input'
import { magicItemNames } from '#/data/generated/magic-item-names'
import type { MagicItem } from '#/definitions/library'
import {
  SHOP_TYPES,
  SHOP_TYPE_LABELS,
  type Shop,
  type ShopType,
  type StockLine,
} from '#/definitions/shop'
import { canSaveRecords, saveRecordEdits } from '#/lib/dev-records'
import { loadAllMagicItems } from '#/lib/library-magic-items'
import {
  SETTLEMENT_SIZES,
  SETTLEMENT_SIZE_LABELS,
  formatPrice,
  magicItemPrice,
  rollMagicStock,
  rollsMagicItems,
  seededRandom,
  type SettlementSize,
  type StockCandidate,
} from '#/lib/shop'

const buttonClass =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold disabled:opacity-50'
const fieldClass = 'border-border bg-background rounded-lg border px-3 py-2 text-sm'

/** The SRD 5.1 copy of an item that SRD 5.2.1 also prints, which a shop should not offer twice. */
const isOlderCopy = (key: string) =>
  key.endsWith('_srd_5_1') && Object.hasOwn(magicItemNames, key.slice(0, -'_srd_5_1'.length))

function candidatesFrom(items: ReadonlyMap<string, MagicItem>): StockCandidate[] {
  return [...items]
    .filter(([key]) => !isOlderCopy(key))
    .map(([key, item]) => ({
      item: { ref: 'magicItem', key },
      name: item.name,
      rarity: item.rarity,
      category: item.category,
    }))
}

/** A shop with its fields in schema order, so the data file reads the same way every time. */
const inOrder = ({ type, keeper, stock }: Shop): Shop => ({
  type,
  ...(keeper ? { keeper } : {}),
  stock: stock.map(({ item, quantity, price }) => ({
    item,
    ...(quantity ? { quantity } : {}),
    ...(price ? { price } : {}),
  })),
})

const same = (a: Shop | undefined, b: Shop | undefined) =>
  JSON.stringify(a && inOrder(a)) === JSON.stringify(b && inOrder(b))

/**
 * A location's shop for the DM: its kind and what is on its shelves. In local dev the DM can roll
 * stock, swap lines, add items from the library, and save it into the location's data file.
 */
export function ShopPanel({ locationKey, shop }: { locationKey: string; shop: Shop | undefined }) {
  const dmMode = useDmMode()
  const [draft, setDraft] = useState<Shop>()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()
  const [size, setSize] = useState<SettlementSize>('town')
  const [items, setItems] = useState<ReadonlyMap<string, MagicItem>>()
  const [seed, setSeed] = useState(() => Date.now())

  useEffect(() => {
    if (!dmMode) return
    let live = true
    void loadAllMagicItems().then((loaded) => live && setItems(loaded))
    return () => {
      live = false
    }
  }, [dmMode])

  // A save is done once the hot update brings the saved stock back from the file.
  useEffect(() => {
    if (saving && same(shop, draft)) {
      setSaving(false)
      setDraft(undefined)
    }
  }, [shop, draft, saving])

  const candidates = useMemo(() => (items ? candidatesFrom(items) : []), [items])

  if (!dmMode) return null
  const shown = draft ?? shop
  const editable = canSaveRecords && !saving

  const edit = (next: Shop) => {
    setError(undefined)
    setDraft(inOrder(next))
  }
  const setStock = (stock: StockLine[]) => shown && edit({ ...shown, stock })
  const roll = (type: ShopType) => {
    const random = seededRandom(seed)
    setSeed((current) => current + 1)
    edit({
      ...(shown ?? { stock: [] }),
      type,
      stock: rollMagicStock({ type, size, candidates, random }),
    })
  }
  const save = async () => {
    if (!draft) return
    setSaving(true)
    setError(undefined)
    try {
      await saveRecordEdits('location', locationKey, [
        shop === undefined
          ? { op: 'set', path: ['shop'], value: draft }
          : { op: 'set', path: ['shop'], value: draft, expected: shop },
      ])
    } catch (failure) {
      setSaving(false)
      setError((failure as Error).message)
    }
  }

  return (
    <section
      aria-label="Shop"
      className="grid gap-4 rounded-xl border border-dashed border-amber-500/60 bg-amber-500/5 p-5"
      data-shop-panel
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-lg font-bold">
          <Store className="size-5" aria-hidden />
          {shown ? SHOP_TYPE_LABELS[shown.type] : 'Not a shop'}
        </h2>
        {draft && editable ? (
          <div className="flex gap-2">
            <button type="button" className={buttonClass} onClick={() => setDraft(undefined)}>
              Discard
            </button>
            <button
              type="button"
              className={`${buttonClass} border-transparent bg-emerald-600 text-white hover:bg-emerald-700`}
              onClick={() => void save()}
            >
              Save to the location
            </button>
          </div>
        ) : saving ? (
          <p className="text-muted-foreground text-sm">Saving…</p>
        ) : null}
      </header>
      {error ? <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p> : null}

      {editable ? (
        <div className="flex flex-wrap items-end gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">Kind of shop</span>
            <select
              className={fieldClass}
              value={shown?.type ?? ''}
              onChange={(event) => {
                const type = event.target.value as ShopType
                edit({ ...(shown ?? { stock: [] }), type })
              }}
            >
              {shown ? null : <option value="">Choose…</option>}
              {SHOP_TYPES.map((type) => (
                <option key={type} value={type}>
                  {SHOP_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">Settlement</span>
            <select
              className={fieldClass}
              value={size}
              onChange={(event) => setSize(event.target.value as SettlementSize)}
            >
              {SETTLEMENT_SIZES.map((option) => (
                <option key={option} value={option}>
                  {SETTLEMENT_SIZE_LABELS[option]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className={`${buttonClass} border-transparent bg-indigo-600 text-white hover:bg-indigo-700`}
            disabled={!shown || !items || !rollsMagicItems(shown.type)}
            onClick={() => shown && roll(shown.type)}
            title={
              shown && !rollsMagicItems(shown.type)
                ? 'This kind of shop sells plain goods, which arrive with the equipment library'
                : undefined
            }
          >
            <Dices className="size-4" aria-hidden />
            {items ? 'Roll stock' : 'Loading items…'}
          </button>
        </div>
      ) : null}

      {shown ? (
        <StockTable stock={shown.stock} items={items} onChange={editable ? setStock : undefined} />
      ) : null}
      {shown && editable ? (
        <AddFromLibrary stock={shown.stock} onAdd={(line) => setStock([...shown.stock, line])} />
      ) : null}
    </section>
  )
}

function StockTable({
  stock,
  items,
  onChange,
}: {
  stock: readonly StockLine[]
  items: ReadonlyMap<string, MagicItem> | undefined
  onChange?: (stock: StockLine[]) => void
}) {
  if (stock.length === 0)
    return <p className="text-muted-foreground text-sm">Nothing on the shelves yet.</p>
  const update = (index: number, line: StockLine | undefined) =>
    onChange?.(stock.flatMap((current, at) => (at !== index ? [current] : line ? [line] : [])))

  return (
    <div className="border-border bg-card overflow-x-auto rounded-xl border">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="text-muted-foreground border-border border-b text-xs font-semibold tracking-wider uppercase">
            <th scope="col" className="px-3 py-2">
              Item
            </th>
            <th scope="col" className="px-3 py-2">
              Rarity
            </th>
            <th scope="col" className="px-3 py-2">
              Price
            </th>
            <th scope="col" className="px-3 py-2">
              On the shelf
            </th>
            {onChange ? (
              <th scope="col" className="sr-only">
                Remove
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {stock.map((line, index) => {
            const item = items?.get(line.item.key)
            const derived = item ? magicItemPrice(item) : undefined
            const price = line.price ?? derived
            return (
              <tr key={line.item.key} className="border-border border-b last:border-0">
                <td className="px-3 py-2 font-medium">
                  {magicItemNames[line.item.key] ?? line.item.key}
                  {item ? (
                    <span className="text-muted-foreground block text-xs">{item.category}</span>
                  ) : null}
                </td>
                <td className="px-3 py-2 capitalize">{item?.rarity ?? '…'}</td>
                <td className="px-3 py-2">
                  {price ? formatPrice(price) : <span className="text-red-600">No price</span>}
                  {line.price ? (
                    <span className="text-muted-foreground block text-xs">set by the shop</span>
                  ) : null}
                </td>
                <td className="px-3 py-2">
                  {onChange ? (
                    <input
                      type="number"
                      min={1}
                      aria-label={`How many ${magicItemNames[line.item.key] ?? ''}`}
                      className={`${fieldClass} w-20`}
                      placeholder="Plenty"
                      value={line.quantity ?? ''}
                      onChange={(event) => {
                        const quantity = Number.parseInt(event.target.value, 10)
                        const { quantity: _, ...rest } = line
                        update(index, quantity > 0 ? { ...rest, quantity } : rest)
                      }}
                    />
                  ) : (
                    (line.quantity ?? 'Plenty')
                  )}
                </td>
                {onChange ? (
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      aria-label={`Remove ${magicItemNames[line.item.key] ?? ''}`}
                      className="text-muted-foreground hover:text-red-600"
                      onClick={() => update(index, undefined)}
                    >
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                  </td>
                ) : null}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const ALL_ITEMS = Object.entries(magicItemNames).filter(([key]) => !isOlderCopy(key))

/** A library search that adds a magic item to the stock. */
function AddFromLibrary({
  stock,
  onAdd,
}: {
  stock: readonly StockLine[]
  onAdd: (line: StockLine) => void
}) {
  const [query, setQuery] = useState('')
  const words = query.trim().toLowerCase()
  const listed = new Set(stock.map(({ item }) => item.key))
  const matches =
    words.length < 2
      ? []
      : ALL_ITEMS.filter(
          ([key, name]) => !listed.has(key) && name.toLowerCase().includes(words),
        ).slice(0, 8)

  return (
    <div className="grid gap-2">
      <SearchInput
        placeholder="Add a magic item from the library…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {matches.length > 0 ? (
        <ul className="grid gap-1">
          {matches.map(([key, name]) => (
            <li key={key}>
              <button
                type="button"
                className="hover:bg-muted inline-flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm"
                onClick={() => {
                  onAdd({ item: { ref: 'magicItem', key } })
                  setQuery('')
                }}
              >
                <Plus className="size-4" aria-hidden /> {name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
