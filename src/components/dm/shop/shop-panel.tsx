import { Dices, Plus, Store, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { useDmMode } from '#/components/dm-mode'
import { Input } from '#/components/ui/input'
import { SearchInput } from '#/components/ui/search-input'
import { Select } from '#/components/ui/select'
import { equipmentNames } from '#/data/generated/equipment-names'
import { magicItemNames } from '#/data/generated/magic-item-names'
import type { Equipment, MagicItem } from '#/definitions/library'
import {
  SHOP_TYPES,
  SHOP_TYPE_LABELS,
  type Shop,
  type ShopAssortments,
  type ShopType,
  type StockItem,
  type StockLine,
} from '#/definitions/shop'
import { canSaveRecords, saveRecordEdits } from '#/lib/dev-records'
import { loadAllEquipment } from '#/lib/library-equipment'
import { loadAllMagicItems } from '#/lib/library-magic-items'
import {
  SETTLEMENT_SIZES,
  SETTLEMENT_SIZE_LABELS,
  describeStockLine,
  formatPrice,
  rollStock,
  seededRandom,
  type SettlementSize,
  type StockCandidate,
} from '#/lib/shop'

const buttonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold disabled:opacity-50'
const labelClass = 'text-muted-foreground text-xs font-semibold tracking-wider uppercase'

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

/** The usual rarity colours, so a rare item stands out on a long shelf. */
const RARITY_TONES: Readonly<Record<string, string>> = {
  common: 'bg-muted text-muted-foreground',
  uncommon: 'bg-emerald-600/15 text-emerald-700 dark:text-emerald-300',
  rare: 'bg-sky-600/15 text-sky-700 dark:text-sky-300',
  'very rare': 'bg-violet-600/15 text-violet-700 dark:text-violet-300',
  legendary: 'bg-amber-500/20 text-amber-800 dark:text-amber-200',
}

const NAMES = { magicItem: magicItemNames, equipment: equipmentNames }

/** The library records the panel shows and rolls from, loaded once DM mode is on. */
type Library = {
  magicItems: ReadonlyMap<string, MagicItem>
  equipment: ReadonlyMap<string, Equipment>
  assortments: ShopAssortments
}

async function loadLibrary(): Promise<Library> {
  const [magicItems, equipment, { default: assortments }] = await Promise.all([
    loadAllMagicItems(),
    loadAllEquipment(),
    import('#/data/library/shop-assortments'),
  ])
  return { magicItems, equipment, assortments }
}

const lineKey = ({ item }: StockLine) => `${item.ref}:${item.key}`

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
  const [library, setLibrary] = useState<Library>()
  const [seed, setSeed] = useState(() => Date.now())

  useEffect(() => {
    if (!dmMode) return
    let live = true
    void loadLibrary().then((loaded) => live && setLibrary(loaded))
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

  const candidates = useMemo(() => (library ? candidatesFrom(library.magicItems) : []), [library])

  if (!dmMode) return null
  const shown = draft ?? shop
  const editable = canSaveRecords && !saving

  const edit = (next: Shop) => {
    setError(undefined)
    setDraft(inOrder(next))
  }
  const setStock = (stock: StockLine[]) => shown && edit({ ...shown, stock })
  const roll = (type: ShopType) => {
    if (!library) return
    const random = seededRandom(seed)
    setSeed((current) => current + 1)
    const assortment = library.assortments[type] ?? []
    edit({
      ...(shown ?? { stock: [] }),
      type,
      stock: rollStock({ type, size, assortment, candidates, random }),
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

  // A location that is not a shop shows only the way to make it one.
  if (!shown) {
    if (!editable) return null
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-muted-foreground inline-flex items-center gap-2 text-sm">
          <Store className="size-4" aria-hidden /> Make this place a shop:
        </span>
        <Select
          aria-label="Kind of shop"
          containerClassName="w-52"
          value=""
          onChange={(event) => edit({ type: event.target.value as ShopType, stock: [] })}
        >
          <option value="">Choose a kind…</option>
          {SHOP_TYPES.map((type) => (
            <option key={type} value={type}>
              {SHOP_TYPE_LABELS[type]}
            </option>
          ))}
        </Select>
      </div>
    )
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
          {SHOP_TYPE_LABELS[shown.type]}
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
          <label className="grid w-52 gap-1.5">
            <span className={labelClass}>Kind of shop</span>
            <Select
              value={shown?.type ?? ''}
              onChange={(event) => {
                const type = event.target.value as ShopType
                edit({ ...shown, type })
              }}
            >
              {SHOP_TYPES.map((type) => (
                <option key={type} value={type}>
                  {SHOP_TYPE_LABELS[type]}
                </option>
              ))}
            </Select>
          </label>
          <label className="grid w-36 gap-1.5">
            <span className={labelClass}>Settlement</span>
            <Select
              value={size}
              onChange={(event) => setSize(event.target.value as SettlementSize)}
            >
              {SETTLEMENT_SIZES.map((option) => (
                <option key={option} value={option}>
                  {SETTLEMENT_SIZE_LABELS[option]}
                </option>
              ))}
            </Select>
          </label>
          <button
            type="button"
            className={`${buttonClass} border-transparent bg-indigo-600 text-white hover:bg-indigo-700`}
            disabled={!library}
            onClick={() => roll(shown.type)}
          >
            <Dices className="size-4" aria-hidden />
            {library ? 'Roll stock' : 'Loading the library…'}
          </button>
        </div>
      ) : null}

      <StockTable
        stock={shown.stock}
        library={library}
        onChange={editable ? setStock : undefined}
      />
      {editable ? (
        <AddFromLibrary stock={shown.stock} onAdd={(line) => setStock([...shown.stock, line])} />
      ) : null}
    </section>
  )
}

function StockTable({
  stock,
  library,
  onChange,
}: {
  stock: readonly StockLine[]
  library: Library | undefined
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
            const view = describeStockLine(line, library ?? {}, NAMES)
            return (
              <tr key={lineKey(line)} className="border-border border-b last:border-0">
                <td className="px-3 py-2.5 font-medium">
                  {view.name}
                  {view.category ? (
                    <span className="text-muted-foreground block text-xs">{view.category}</span>
                  ) : null}
                </td>
                <td className="px-3 py-2">
                  {view.rarity ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${RARITY_TONES[view.rarity] ?? RARITY_TONES.common}`}
                    >
                      {view.rarity}
                    </span>
                  ) : line.item.ref === 'magicItem' ? (
                    '…'
                  ) : (
                    <span className="text-muted-foreground text-xs">Mundane</span>
                  )}
                </td>
                <td className="px-3 py-2 tabular-nums">
                  {view.price ? (
                    formatPrice(view.price)
                  ) : library ? (
                    <span className="text-red-600 dark:text-red-400">No price</span>
                  ) : (
                    '…'
                  )}
                  {view.priceNote ? (
                    <span className="text-muted-foreground block text-xs">{view.priceNote}</span>
                  ) : null}
                </td>
                <td className="px-3 py-2">
                  {onChange ? (
                    <Input
                      type="number"
                      min={1}
                      aria-label={`How many ${view.name}`}
                      className="h-8 w-20 tabular-nums"
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
                      aria-label={`Remove ${view.name}`}
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

/** Everything a shop can stock, by name: plain goods first, then magic items. */
const ALL_ITEMS: readonly { item: StockItem; name: string }[] = [
  ...Object.entries(equipmentNames).map(([key, name]) => ({
    item: { ref: 'equipment' as const, key },
    name,
  })),
  ...Object.entries(magicItemNames)
    .filter(([key]) => !isOlderCopy(key))
    .map(([key, name]) => ({ item: { ref: 'magicItem' as const, key }, name })),
]

/** A library search that adds goods or a magic item to the stock. */
function AddFromLibrary({
  stock,
  onAdd,
}: {
  stock: readonly StockLine[]
  onAdd: (line: StockLine) => void
}) {
  const [query, setQuery] = useState('')
  const words = query.trim().toLowerCase()
  const listed = new Set(stock.map(lineKey))
  const matches =
    words.length < 2
      ? []
      : ALL_ITEMS.filter(
          ({ item, name }) =>
            !listed.has(`${item.ref}:${item.key}`) && name.toLowerCase().includes(words),
        ).slice(0, 10)

  return (
    <div className="grid gap-2">
      <SearchInput
        placeholder="Add goods or a magic item from the library…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {matches.length > 0 ? (
        <ul className="grid gap-1">
          {matches.map(({ item, name }) => (
            <li key={`${item.ref}:${item.key}`}>
              <button
                type="button"
                className="hover:bg-muted inline-flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm"
                onClick={() => {
                  onAdd(item.ref === 'magicItem' ? { item, quantity: 1 } : { item })
                  setQuery('')
                }}
              >
                <Plus className="size-4" aria-hidden /> {name}
                <span className="text-muted-foreground text-xs">
                  {item.ref === 'magicItem' ? 'magic item' : 'goods'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
