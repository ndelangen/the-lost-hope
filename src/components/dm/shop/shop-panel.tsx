import { Check, Dices, Loader2, Sparkles, Store, TriangleAlert } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { useDmMode } from '#/components/dm-mode'
import { DmReference } from '#/components/dm/dm-reference'
import { Button } from '#/components/ui/button'
import { SegmentedControl, SegmentedControlItem } from '#/components/ui/segmented-control'
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
import {
  canSaveRecords,
  itemArtState,
  saveRecordEdits,
  type ResponsiveImageSizes,
} from '#/lib/dev-records'
import { useHoldReloadWhile } from '#/lib/dev-reload-guard'
import { loadAllEquipment } from '#/lib/library-equipment'
import { loadAllMagicItems } from '#/lib/library-magic-items'
import { libraryRecords, loadLibraryIndex } from '#/lib/published-library-data'
import {
  SETTLEMENT_SIZES,
  SETTLEMENT_SIZE_LABELS,
  describeStockLine,
  orderedShop,
  picturesByItem,
  rerollStock,
  rollStock,
  sameShop,
  searchStockItems,
  seededRandom,
  stockLineKey,
  stockShelves,
  type SettlementSize,
  type StockCandidate,
} from '#/lib/shop'

import { AddFromLibrary } from './add-from-library'
import { NewItemPrompt } from './new-item-prompt'
import { StockList } from './stock-list'

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

const NAMES = { magicItem: magicItemNames, equipment: equipmentNames }

/** Everything a shop can stock, by name: plain goods and magic items. */
const ALL_ITEMS: readonly { item: StockItem; name: string }[] = [
  ...Object.entries(equipmentNames).map(([key, name]) => ({
    item: { ref: 'equipment' as const, key },
    name,
  })),
  ...Object.entries(magicItemNames)
    .filter(([key]) => !isOlderCopy(key))
    .map(([key, name]) => ({ item: { ref: 'magicItem' as const, key }, name })),
]

/** The library records the panel shows and rolls from, loaded once DM mode is on. */
type Library = {
  magicItems: ReadonlyMap<string, MagicItem>
  equipment: ReadonlyMap<string, Equipment>
  assortments: ShopAssortments
  pictures: ReadonlyMap<string, string>
}

async function loadLibrary(): Promise<Library> {
  const [magicItems, equipment, { default: assortments }] = await Promise.all([
    loadAllMagicItems(),
    loadAllEquipment(),
    import('#/data/library/shop-assortments'),
    loadLibraryIndex(['items']),
  ])
  return {
    magicItems,
    equipment,
    assortments,
    pictures: picturesByItem(libraryRecords(['items'])),
  }
}

type StockKey = string

/** A picture painted since the page loaded, with the sizes the page could not know yet. */
type PaintedPicture = { src: string; sizes?: ResponsiveImageSizes }

const paintingStore = (locationKey: string) => `shop-paintings:${locationKey}`

/** The items whose pictures this tab saw start painting at a location, across page reloads. */
function paintingSince(locationKey: string): StockKey[] {
  try {
    const keys: unknown = JSON.parse(sessionStorage.getItem(paintingStore(locationKey)) ?? '[]')
    return Array.isArray(keys) ? keys.filter((key) => typeof key === 'string') : []
  } catch {
    return []
  }
}

function rememberPainting(locationKey: string, keys: readonly StockKey[]) {
  if (keys.length > 0) sessionStorage.setItem(paintingStore(locationKey), JSON.stringify(keys))
  else sessionStorage.removeItem(paintingStore(locationKey))
}

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

/**
 * A location's shop for the DM: its kind and what is on its shelves. In local dev the DM can roll
 * stock, change lines, add items from the library, and save it into the location's data file. A
 * place that is not a shop shows only the way to make it one.
 */
export function ShopPanel({ locationKey, shop }: { locationKey: string; shop: Shop | undefined }) {
  const dmMode = useDmMode()
  const [draft, setDraft] = useState<Shop>()
  const [saving, setSaving] = useState(false)
  useHoldReloadWhile(draft !== undefined && !saving)
  const [removing, setRemoving] = useState<'asked' | 'saving'>()
  const [error, setError] = useState<string>()
  const [size, setSize] = useState<SettlementSize>('town')
  const [locked, setLocked] = useState<ReadonlySet<string>>(new Set())
  const [library, setLibrary] = useState<Library>()
  const [seed, setSeed] = useState(() => Date.now())
  const [makingUp, setMakingUp] = useState<string>()
  /** Pictures of made-up items: `painting` until the background job brings back its file. */
  // Creating an item can reload the page; the paintings in progress are kept for the session.
  const [painted, setPainted] = useState<ReadonlyMap<StockKey, PaintedPicture | 'painting'>>(
    new Map(),
  )
  useEffect(() => {
    const kept = paintingSince(locationKey)
    if (kept.length > 0) setPainted(new Map(kept.map((key) => [key, 'painting'])))
  }, [locationKey])
  const painting = [...painted].filter(([, state]) => state === 'painting').map(([key]) => key)

  // A painting finishes in the background; ask after it until it is done.
  const waiting = painting.join(' ')
  const [restored, setRestored] = useState(false)
  useEffect(() => {
    if (restored) rememberPainting(locationKey, waiting ? waiting.split(' ') : [])
    else setRestored(true)
  }, [locationKey, waiting, restored])
  useEffect(() => {
    if (!waiting) return
    const timer = setInterval(() => {
      for (const key of waiting.split(' ')) {
        void itemArtState(key.slice(key.indexOf(':') + 1)).then((art) => {
          if (art.state === 'painting') return
          setPainted((current) => {
            const next = new Map(current)
            if (art.state === 'done') next.set(key, { src: art.picture, sizes: art.sizes })
            else next.delete(key)
            return next
          })
        })
      }
    }, 4000)
    return () => clearInterval(timer)
  }, [waiting])

  // A made-up item regenerates the names, and their hot update brings a fresh loader with them, so
  // the library loads again when the names object changes.
  const equipmentIndex = equipmentNames
  const magicItemIndex = magicItemNames
  useEffect(() => {
    if (!dmMode) return
    let live = true
    void loadLibrary().then((loaded) => live && setLibrary(loaded))
    return () => {
      live = false
    }
  }, [dmMode, equipmentIndex, magicItemIndex])

  // A save is done once the hot update brings the saved stock back from the file.
  useEffect(() => {
    if (saving && sameShop(shop, draft)) {
      setSaving(false)
      setDraft(undefined)
    }
  }, [shop, draft, saving])
  useEffect(() => {
    if (removing === 'saving' && !shop) setRemoving(undefined)
  }, [shop, removing])

  const candidates = useMemo(() => (library ? candidatesFrom(library.magicItems) : []), [library])

  if (!dmMode) return null
  const shown = draft ?? shop
  const busy = saving || removing === 'saving'
  const editable = canSaveRecords && !busy

  const edit = (next: Shop) => {
    setError(undefined)
    setRemoving(undefined)
    setDraft(orderedShop(next))
  }

  // A location that is not a shop shows only the way to make it one.
  if (!shown) {
    if (!editable) return null
    return (
      <Select
        aria-label="Make this place a shop"
        containerClassName="w-64 max-w-full"
        className="text-muted-foreground border-dashed"
        value=""
        onChange={(event) => edit({ type: event.target.value as ShopType, stock: [] })}
      >
        <option value="">Make this place a shop…</option>
        {SHOP_TYPES.map((type) => (
          <option key={type} value={type}>
            {SHOP_TYPE_LABELS[type]}
          </option>
        ))}
      </Select>
    )
  }

  const pictures = new Map(library?.pictures)
  const freshSizes = new Map<string, ResponsiveImageSizes>()
  for (const [key, picture] of painted) {
    if (picture === 'painting') continue
    pictures.set(key, picture.src)
    if (picture.sizes) freshSizes.set(picture.src, picture.sizes)
  }
  const describe = (line: Pick<StockLine, 'item'> & Partial<StockLine>) =>
    describeStockLine(line, { ...library, pictures }, NAMES)
  const setStock = (stock: StockLine[]) => edit({ ...shown, stock })
  const roll = () => {
    if (!library) return
    const random = seededRandom(seed)
    setSeed((current) => current + 1)
    const assortment = library.assortments[shown.type] ?? []
    const rolled = rollStock({ type: shown.type, size, assortment, candidates, random })
    setStock(rerollStock(shown.stock, locked, rolled))
  }
  const fail = (failure: unknown) => {
    setSaving(false)
    setRemoving(undefined)
    setError((failure as Error).message)
  }
  const save = () => {
    if (!draft) return
    setSaving(true)
    setError(undefined)
    saveRecordEdits('location', locationKey, [
      shop === undefined
        ? { op: 'set', path: ['shop'], value: draft }
        : { op: 'set', path: ['shop'], value: draft, expected: shop },
    ]).catch(fail)
  }
  const remove = () => {
    if (!shop) return
    setRemoving('saving')
    setError(undefined)
    saveRecordEdits('location', locationKey, [
      { op: 'remove', path: ['shop'], expected: shop },
    ]).catch(fail)
  }
  const discard = () => {
    setDraft(undefined)
    setError(undefined)
  }

  const shelves = stockShelves(shown.stock)
  const keptOnReroll = shown.stock.filter((line) => locked.has(stockLineKey(line))).length
  const summary =
    shown.stock.length === 0
      ? 'Empty shelves'
      : `${count(shown.stock.length, 'line', 'lines')}${shelves.magic.length > 0 ? ` · ${shelves.magic.length} magic` : ''}`

  return (
    <section
      aria-label="Shop"
      className="border-border bg-card text-card-foreground rounded-xl border shadow-sm"
      data-shop-panel
    >
      <header className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300">
          <Store className="size-5" aria-hidden />
        </span>
        <div className="min-w-40 flex-1">
          <h2 className="text-lg leading-tight font-semibold">{SHOP_TYPE_LABELS[shown.type]}</h2>
          <p className="text-muted-foreground flex flex-wrap items-center gap-x-1.5 text-sm">
            <span>{summary}</span>
            {shown.keeper ? (
              <span>
                · run by <DmReference reference={shown.keeper} />
              </span>
            ) : null}
          </p>
        </div>
        {canSaveRecords ? (
          <div className="flex min-h-10 items-center gap-2" aria-live="polite">
            {busy ? (
              <p className="text-muted-foreground inline-flex items-center gap-2 text-sm">
                <Loader2 className="size-4 animate-spin" aria-hidden />
                {removing ? 'Removing…' : 'Saving…'}
              </p>
            ) : draft ? (
              <>
                <p className="mr-1 inline-flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                  <span className="size-2 rounded-full bg-current" aria-hidden />
                  {shop ? 'Unsaved changes' : 'Not saved yet'}
                </p>
                <Button variant="ghost" onClick={discard}>
                  Discard
                </Button>
                <Button variant="primary" onClick={save}>
                  Save
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
                <Check className="size-4" aria-hidden /> Saved
              </p>
            )}
          </div>
        ) : null}
      </header>

      {error ? (
        <p
          role="alert"
          className="flex items-start gap-2 border-t border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-700 dark:text-red-300"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>Not saved. {error} Your changes are still here.</span>
        </p>
      ) : null}

      {editable ? (
        <div className="border-border flex flex-wrap items-center gap-3 border-t px-5 py-3">
          <Select
            aria-label="Kind of shop"
            containerClassName="w-48"
            value={shown.type}
            onChange={(event) => edit({ ...shown, type: event.target.value as ShopType })}
          >
            {SHOP_TYPES.map((type) => (
              <option key={type} value={type}>
                {SHOP_TYPE_LABELS[type]}
              </option>
            ))}
          </Select>
          <SegmentedControl className="p-1">
            <legend className="sr-only">Size of the settlement, for rolling stock</legend>
            {SETTLEMENT_SIZES.map((option) => (
              <SegmentedControlItem
                key={option}
                active={size === option}
                onClick={() => setSize(option)}
                label={`Roll for a ${option}`}
                className="h-7.5 px-3"
              >
                {SETTLEMENT_SIZE_LABELS[option]}
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
          <Button disabled={!library} onClick={roll}>
            <Dices className="size-4" aria-hidden />
            {!library ? 'Loading the library…' : shown.stock.length > 0 ? 'Re-roll' : 'Roll stock'}
          </Button>
          {keptOnReroll > 0 ? (
            <p className="text-muted-foreground text-xs">
              Keeps {count(keptOnReroll, 'locked line', 'locked lines')}
            </p>
          ) : null}
        </div>
      ) : null}

      {shown.stock.length > 0 ? (
        <StockList
          stock={shown.stock}
          painting={painting}
          freshSizes={freshSizes}
          describe={describe}
          ready={library !== undefined}
          editing={
            editable
              ? {
                  locked,
                  onLine: (key, line) =>
                    setStock(
                      shown.stock.flatMap((current) =>
                        stockLineKey(current) !== key ? [current] : line ? [line] : [],
                      ),
                    ),
                  onToggleLock: (key) =>
                    setLocked((current) => {
                      const next = new Set(current)
                      if (!next.delete(key)) next.add(key)
                      return next
                    }),
                }
              : undefined
          }
        />
      ) : (
        <p className="text-muted-foreground border-border border-t px-5 py-6 text-sm">
          Nothing on the shelves yet.
          {editable ? ' Roll stock for this kind of shop, or add items one by one below.' : ''}
        </p>
      )}

      {editable ? (
        <footer className="border-border flex flex-wrap items-center gap-3 border-t px-5 py-3">
          <div className="min-w-56 flex-1">
            <AddFromLibrary
              search={(query) => {
                const found = searchStockItems(query, ALL_ITEMS, shown.stock, 8)
                return {
                  more: found.more,
                  matches: found.matches.map(({ item }) => ({ item, view: describe({ item }) })),
                }
              }}
              onAdd={(item) =>
                setStock([
                  ...shown.stock,
                  item.ref === 'magicItem' ? { item, quantity: 1 } : { item },
                ])
              }
              onMakeUp={setMakingUp}
            />
          </div>
          {makingUp === undefined ? (
            <Button onClick={() => setMakingUp('')}>
              <Sparkles className="size-4" aria-hidden />
              Create new item for sale
            </Button>
          ) : null}
          {shop && !draft ? (
            removing === 'asked' ? (
              <div className="flex items-center gap-2 text-sm">
                <span>Remove this shop and its stock?</span>
                <Button variant="ghost" size="sm" onClick={() => setRemoving(undefined)}>
                  Keep it
                </Button>
                <Button
                  size="sm"
                  className="border-red-500/40 text-red-700 hover:bg-red-500/10 dark:text-red-300"
                  onClick={remove}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Button variant="danger" size="sm" onClick={() => setRemoving('asked')}>
                Remove shop
              </Button>
            )
          ) : null}
          {makingUp !== undefined ? (
            <div className="basis-full">
              <NewItemPrompt
                locationKey={locationKey}
                shopType={shown.type}
                initialRequest={makingUp}
                onCancel={() => setMakingUp(undefined)}
                onCreated={(item) => {
                  setMakingUp(undefined)
                  setPainted((current) => new Map(current).set(stockLineKey({ item }), 'painting'))
                  // The server already saved it onto the shop; an open draft gets it too, so saving
                  // the draft keeps it.
                  if (draft)
                    edit({
                      ...draft,
                      stock: [
                        ...draft.stock,
                        item.ref === 'magicItem' ? { item, quantity: 1 } : { item },
                      ],
                    })
                }}
              />
            </div>
          ) : null}
        </footer>
      ) : null}
    </section>
  )
}
