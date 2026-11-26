import { MapPin, Plus, X } from 'lucide-react'
import { useState, type MouseEvent } from 'react'

import { useDmMode } from '#/components/dm-mode'
import { LocationMapPlot } from '#/components/location-hierarchy-map'
import { Input } from '#/components/ui/input'
import { Select } from '#/components/ui/select'
import { LOCATION_TYPES, type LocationType } from '#/definitions/location'
import { SHOP_TYPES, SHOP_TYPE_LABELS, type ShopType } from '#/definitions/shop'
import { getEntity } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { canSaveRecords, createRecord } from '#/lib/dev-records'
import { sourceLocationMap, type LocationHierarchyMapModel } from '#/lib/location-hierarchy-map'
import { locationTypeLabel } from '#/lib/location-icons'

const buttonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold disabled:opacity-50'
const labelClass = 'text-muted-foreground text-xs font-semibold tracking-wider uppercase'

/**
 * A location's map that, in DM mode under local dev, lets the DM click a spot and create a new
 * place there: a child of this location, optionally a shop. Elsewhere it is the plain map.
 */
export function NewPlaceOnMap({
  parentKey,
  map,
  label,
}: {
  parentKey: string | undefined
  map: LocationHierarchyMapModel
  label: string
}) {
  const dmMode = useDmMode()
  const [placing, setPlacing] = useState(false)
  const [at, setAt] = useState<[number, number]>()
  const [name, setName] = useState('')
  const [type, setType] = useState<LocationType>('building')
  const [shop, setShop] = useState<ShopType | ''>('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()

  if (!dmMode || !canSaveRecords || !parentKey) return <LocationMapPlot map={map} label={label} />
  const owner = SOURCE_REGISTRIES.location[parentKey as keyof typeof SOURCE_REGISTRIES.location]
  const shown = owner ? withUnmetPlaces(map, owner) : map

  const { width, height } = shown.asset
  const pick = (event: MouseEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    setAt([
      Math.round(((event.clientX - box.left) / box.width) * width),
      Math.round(((event.clientY - box.top) / box.height) * height),
    ])
  }
  const reset = () => {
    setPlacing(false)
    setAt(undefined)
    setError(undefined)
  }
  const create = async () => {
    if (!at || !name.trim()) return
    setSaving(true)
    setError(undefined)
    try {
      const { slug } = await createRecord('location', {
        name: name.trim(),
        type,
        parent: { ref: 'location', key: parentKey },
        at,
        ...(shop ? { shop: { type: shop, stock: [] } } : {}),
      })
      // A new record regenerates the refs, which reloads the app; open the new place directly.
      window.location.assign(`/dm/locations/${slug}`)
    } catch (failure) {
      setSaving(false)
      setError((failure as Error).message)
    }
  }

  const overlay = placing ? (
    <>
      <button
        type="button"
        aria-label="Choose where the new place is"
        className="absolute inset-0 cursor-crosshair bg-sky-500/5"
        onClick={pick}
      />
      {at ? (
        <span
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full text-sky-600 drop-shadow"
          style={{ left: `${(at[0] / width) * 100}%`, top: `${(at[1] / height) * 100}%` }}
        >
          <MapPin className="size-9 fill-sky-500/30" aria-hidden />
        </span>
      ) : null}
    </>
  ) : null

  return (
    <div className="grid gap-3">
      <LocationMapPlot map={shown} label={label} overlay={overlay} />
      {!placing ? (
        <button type="button" className={`${buttonClass} w-fit`} onClick={() => setPlacing(true)}>
          <Plus className="size-4" aria-hidden /> New place on this map
        </button>
      ) : (
        <form
          className="grid gap-3 rounded-xl border border-dashed border-sky-500/60 bg-sky-500/5 p-4"
          onSubmit={(event) => {
            event.preventDefault()
            void create()
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">
              {at ? 'Name the new place.' : 'Click the map where the new place is.'}
            </p>
            <button
              type="button"
              aria-label="Cancel"
              className="text-muted-foreground hover:text-foreground"
              onClick={reset}
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
          {at ? (
            <div className="flex flex-wrap items-end gap-3">
              <label htmlFor="new-place-name" className="grid min-w-56 flex-1 gap-1.5">
                <span className={labelClass}>Name</span>
                <Input
                  id="new-place-name"
                  className="h-10"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="The Gilded Flask"
                />
              </label>
              <label className="grid w-40 gap-1.5">
                <span className={labelClass}>Kind of place</span>
                <Select
                  value={type}
                  onChange={(event) => setType(event.target.value as LocationType)}
                >
                  {LOCATION_TYPES.map((option) => (
                    <option key={option} value={option}>
                      {locationTypeLabel(option)}
                    </option>
                  ))}
                </Select>
              </label>
              <label className="grid w-48 gap-1.5">
                <span className={labelClass}>Shop</span>
                <Select
                  value={shop}
                  onChange={(event) => setShop(event.target.value as ShopType | '')}
                >
                  <option value="">Not a shop</option>
                  {SHOP_TYPES.map((option) => (
                    <option key={option} value={option}>
                      {SHOP_TYPE_LABELS[option]}
                    </option>
                  ))}
                </Select>
              </label>
              <button
                type="submit"
                disabled={saving || !name.trim()}
                className={`${buttonClass} border-transparent bg-emerald-600 text-white hover:bg-emerald-700`}
              >
                {saving ? 'Creating…' : 'Create place'}
              </button>
            </div>
          ) : null}
          {error ? (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
          ) : null}
        </form>
      )}
    </div>
  )
}

/** The map with the places the party has not met added, so the DM sees everything recorded. */
function withUnmetPlaces(
  map: LocationHierarchyMapModel,
  owner: Parameters<typeof sourceLocationMap>[0],
): LocationHierarchyMapModel {
  const unmet = sourceLocationMap(
    owner,
    SOURCE_REGISTRIES.location,
    (slug) => getEntity('location', slug) !== undefined,
  ).points.filter((point) => point.unmet && !map.points.some(({ slug }) => slug === point.slug))
  return unmet.length === 0 ? map : { ...map, points: [...map.points, ...unmet] }
}
