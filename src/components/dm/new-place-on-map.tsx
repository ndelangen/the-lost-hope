import { MapPin, Plus } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

import { useDmMode } from '#/components/dm-mode'
import { LocationMapPlot } from '#/components/location-hierarchy-map'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Select } from '#/components/ui/select'
import { LOCATION_TYPES, type LocationType } from '#/definitions/location'
import { SHOP_TYPES, SHOP_TYPE_LABELS, type ShopType } from '#/definitions/shop'
import { getEntity } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { canSaveRecords, createRecord } from '#/lib/dev-records'
import { sourceLocationMap, type LocationHierarchyMapModel } from '#/lib/location-hierarchy-map'
import { LocationTypeIcon, locationTypeLabel } from '#/lib/location-icons'

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
  const nameField = useRef<HTMLInputElement>(null)
  const hasSpot = at !== undefined

  // Once the spot is chosen the form appears; typing the name is the next thing to do.
  useEffect(() => {
    if (hasSpot) nameField.current?.focus()
  }, [hasSpot])

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
  const cancel = () => {
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
        aria-label={at ? 'Move the new place' : 'Choose where the new place is'}
        className="absolute inset-0 cursor-crosshair ring-2 ring-sky-500/60 outline-none ring-inset focus-visible:ring-4"
        onClick={pick}
      />
      {at ? (
        <span
          className="pointer-events-none absolute grid -translate-x-1/2 -translate-y-[18px] justify-items-center gap-1"
          style={{ left: `${(at[0] / width) * 100}%`, top: `${(at[1] / height) * 100}%` }}
        >
          <span className="bg-background flex size-9 items-center justify-center rounded-full border-2 border-sky-500 text-sky-600 shadow-md ring-4 ring-sky-500/30 dark:text-sky-300">
            <LocationTypeIcon type={type} className="size-4" />
          </span>
          {name.trim() ? (
            <span className="bg-background/95 border-border max-w-48 truncate rounded-md border px-2 py-0.5 text-xs font-semibold shadow-sm">
              {name.trim()}
            </span>
          ) : null}
        </span>
      ) : null}
    </>
  ) : null

  const unmet = shown.points.filter((point) => point.unmet).length
  const footer = !placing ? (
    <div className="flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 py-2">
      <p className="text-muted-foreground flex items-center gap-2 text-xs">
        {unmet > 0 ? (
          <>
            <span
              className="size-3.5 shrink-0 rounded-full border-2 border-dashed border-amber-500"
              aria-hidden
            />
            {unmet === 1 ? '1 place' : `${unmet} places`} the party has not found
          </>
        ) : null}
      </p>
      <Button size="sm" onClick={() => setPlacing(true)}>
        <Plus className="size-3.5" aria-hidden /> New place
      </Button>
    </div>
  ) : !at ? (
    <div className="border-border flex basis-full items-center justify-between gap-4 px-3 py-2 not-first:border-t">
      <p className="inline-flex items-center gap-2 text-sm font-medium">
        <MapPin className="size-4 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
        Click the map where the new place is.
      </p>
      <Button variant="ghost" size="sm" onClick={cancel}>
        Cancel
      </Button>
    </div>
  ) : (
    <form
      className="border-border grid basis-full gap-2 p-3 not-first:border-t"
      onSubmit={(event) => {
        event.preventDefault()
        void create()
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Input
          ref={nameField}
          onKeyDown={(event) => {
            if (event.key === 'Escape') cancel()
          }}
          aria-label="Name of the new place"
          className="h-10 min-w-48 flex-[2]"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name of the new place"
        />
        <Select
          aria-label="Kind of place"
          containerClassName="min-w-36 flex-1"
          value={type}
          onChange={(event) => setType(event.target.value as LocationType)}
        >
          {LOCATION_TYPES.map((option) => (
            <option key={option} value={option}>
              {locationTypeLabel(option)}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Kind of shop"
          containerClassName="min-w-36 flex-1"
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
        <div className="ml-auto flex gap-2">
          <Button variant="ghost" onClick={cancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={saving || !name.trim()}>
            {saving ? 'Creating…' : 'Create place'}
          </Button>
        </div>
      </div>
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-300">
          Not created. {error}
        </p>
      ) : (
        <p className="text-muted-foreground text-xs">
          Click the map again to move it. It opens on its DM page once created.
        </p>
      )}
    </form>
  )

  return <LocationMapPlot map={shown} label={label} overlay={overlay} footer={footer} />
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
