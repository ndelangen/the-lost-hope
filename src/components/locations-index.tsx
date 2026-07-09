import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { ChevronDown, ChevronRight, List, Map, Search } from 'lucide-react'
import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { Badge } from '#/components/ui/badge'
import {
  LOCATION_TYPES,
  LOCATION_TYPE_LABELS,
  type Location,
  type LocationType,
} from '#/definitions/location.ts'
import {
  allEntities,
  contentToText,
  entityLink,
  locationAbsolutePosition,
  locationActivityCount,
  locationParent,
  locationTree,
  mapPlottableLocations,
  type LocationEntity,
  type LocationTreeNode,
} from '#/lib/campaign'
import { LocationIcon, LocationTypeIcon, locationTypeLabel } from '#/lib/location-icons'
import { locationsSearchFromTypes, parseLocationFilter } from '#/lib/locations-search'
import { cn } from '#/lib/utils'

export type LocationsView = 'map' | 'list'

const MAP_WIDTH = 1000
const MAP_HEIGHT = 500
const MAP_PADDING = 48

function locationTeaser(location: Location): string {
  return location.notes ? contentToText(location.notes) : ''
}

function locationTypeOf(entity: LocationEntity): LocationType | undefined {
  const data = entity.data as Location
  return 'type' in data ? data.type : undefined
}

function matchesType(entity: LocationEntity, activeTypes: Set<LocationType>): boolean {
  const type = locationTypeOf(entity)
  return type ? activeTypes.has(type) : true
}

function SegmentedBar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <fieldset
      className={cn(
        'border-border bg-muted/40 inline-flex gap-1.5 rounded-lg border p-1.5',
        className,
      )}
    >
      {children}
    </fieldset>
  )
}

function SegmentButton({
  active,
  onClick,
  children,
  label,
  className,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md border text-sm font-medium transition-[color,background-color,box-shadow,border-color]',
        'border-transparent shadow-none',
        active
          ? 'bg-background text-foreground border-border/50 shadow-sm'
          : 'text-muted-foreground hover:bg-background/40 hover:text-foreground',
        className,
      )}
    >
      {children}
    </button>
  )
}

function ViewSwitch({
  value,
  onChange,
}: {
  value: LocationsView
  onChange: (mode: LocationsView) => void
}) {
  const options: { id: LocationsView; label: string; icon: typeof Map }[] = [
    { id: 'map', label: 'Map', icon: Map },
    { id: 'list', label: 'List', icon: List },
  ]

  return (
    <SegmentedBar>
      {options.map(({ id, label, icon: Icon }) => (
        <SegmentButton
          key={id}
          active={value === id}
          onClick={() => onChange(id)}
          label={label}
          className="h-8 min-w-8 gap-1.5 px-3 py-1.5"
        >
          <Icon className="size-3.5" aria-hidden />
          {label}
        </SegmentButton>
      ))}
    </SegmentedBar>
  )
}

function TypeFilter({
  activeTypes,
  onChange,
}: {
  activeTypes: Set<LocationType>
  onChange: (types: Set<LocationType>) => void
}) {
  function toggle(type: LocationType) {
    const next = new Set(activeTypes)
    if (next.has(type)) next.delete(type)
    else next.add(type)
    onChange(next)
  }

  return (
    <SegmentedBar>
      {LOCATION_TYPES.map((type) => (
        <SegmentButton
          key={type}
          active={activeTypes.has(type)}
          onClick={() => toggle(type)}
          label={locationTypeLabel(type, true)}
          className="size-8 shrink-0"
        >
          <LocationTypeIcon type={type} />
        </SegmentButton>
      ))}
    </SegmentedBar>
  )
}

function TypeBadge({ type }: { type: LocationType }) {
  return (
    <Badge variant="outline" className="gap-1">
      <LocationTypeIcon type={type} className="size-3" />
      {locationTypeLabel(type)}
    </Badge>
  )
}

function ActivityBadge({ slug }: { slug: string }) {
  const count = locationActivityCount(slug)
  if (count === 0) return null
  return (
    <Badge variant="secondary">
      {count} reference{count === 1 ? '' : 's'}
    </Badge>
  )
}

function CartographerCanvas({ activeTypes }: { activeTypes: Set<LocationType> }) {
  const plottable = useMemo(
    () => mapPlottableLocations().filter((entity) => matchesType(entity, activeTypes)),
    [activeTypes],
  )

  const visibleSlugs = useMemo(() => new Set(plottable.map((entity) => entity.slug)), [plottable])

  const bounds = useMemo(() => {
    const positions = plottable
      .map((entity) => locationAbsolutePosition(entity.data as Location))
      .filter((pos): pos is [number, number] => pos !== undefined)

    if (positions.length === 0) {
      return { minX: 0, minY: 0, maxX: 900, maxY: 400 }
    }

    const xs = positions.map(([x]) => x)
    const ys = positions.map(([, y]) => y)
    return {
      minX: Math.min(...xs),
      minY: Math.min(...ys),
      maxX: Math.max(...xs),
      maxY: Math.max(...ys),
    }
  }, [plottable])

  const scaleX = (x: number) => {
    const range = bounds.maxX - bounds.minX || 1
    return MAP_PADDING + ((x - bounds.minX) / range) * (MAP_WIDTH - MAP_PADDING * 2)
  }

  const scaleY = (y: number) => {
    const range = bounds.maxY - bounds.minY || 1
    return MAP_PADDING + ((y - bounds.minY) / range) * (MAP_HEIGHT - MAP_PADDING * 2)
  }

  const connectors = plottable.flatMap((entity) => {
    const loc = entity.data as Location
    const parent = locationParent(loc)
    if (!parent || parent.slug === 'world' || !visibleSlugs.has(parent.slug)) return []

    const childPos = locationAbsolutePosition(loc)
    const parentPos = locationAbsolutePosition(parent)
    if (!childPos || !parentPos) return []

    return [
      {
        key: `${parent.slug}-${entity.slug}`,
        x1: scaleX(parentPos[0]),
        y1: scaleY(parentPos[1]),
        x2: scaleX(childPos[0]),
        y2: scaleY(childPos[1]),
      },
    ]
  })

  const pins = plottable.flatMap((entity) => {
    const loc = entity.data as Location
    const type = locationTypeOf(entity)
    const pos = locationAbsolutePosition(loc)
    if (!pos || !type) return []

    const cx = scaleX(pos[0])
    const cy = scaleY(pos[1])
    return [{ entity, loc, left: (cx / MAP_WIDTH) * 100, top: (cy / MAP_HEIGHT) * 100 }]
  })

  if (plottable.length === 0) {
    return (
      <p className="text-muted-foreground border-border rounded-lg border px-4 py-8 text-center text-sm">
        No locations match the selected types.
      </p>
    )
  }

  return (
    <div className="border-border relative overflow-hidden rounded-xl border bg-gradient-to-br from-amber-50/80 via-stone-100/90 to-amber-100/60 dark:from-amber-950/30 dark:via-stone-900/50 dark:to-amber-900/20">
      {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- an inline <svg> cannot be an <img>; role="img" + aria-label is the correct pattern */}
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="w-full"
        role="img"
        aria-label="Campaign world map with location pins"
      >
        <defs>
          <pattern id="world-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-amber-900/25 dark:text-amber-200/15"
            />
          </pattern>
        </defs>
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#world-grid)" />

        {connectors.map((line) => (
          <line
            key={line.key}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            className="stroke-primary/25"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        ))}
      </svg>
      {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}

      {pins.map(({ entity, loc, left, top }) => (
        <Link
          key={entity.slug}
          {...entityLink('location', entity.slug)}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${left}%`, top: `${top}%` }}
        >
          <span className="bg-background border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground mx-auto flex size-7 items-center justify-center rounded-full border-2 shadow-sm transition-colors">
            <LocationIcon icon={loc.icon} className="size-3.5" />
          </span>
          <span className="text-foreground mt-1 block max-w-28 text-center text-[11px] leading-tight font-medium">
            {loc.name}
          </span>
        </Link>
      ))}

      <p className="text-muted-foreground border-border bg-background/80 absolute right-3 bottom-3 rounded-md border px-2 py-1 text-xs backdrop-blur-sm">
        Map placeholder — pins use campaign coordinates
      </p>
    </div>
  )
}

function filterTree(
  nodes: LocationTreeNode[],
  query: string,
  activeTypes: Set<LocationType>,
): LocationTreeNode[] {
  const q = query.trim().toLowerCase()

  return nodes.flatMap((node) => {
    const loc = node.data as Location
    const teaser = locationTeaser(loc)
    const type = locationTypeOf(node)
    const typeLabel = type ? LOCATION_TYPE_LABELS[type] : ''
    const typeMatch = type ? activeTypes.has(type) : true

    const textMatch =
      !q ||
      loc.name.toLowerCase().includes(q) ||
      teaser.toLowerCase().includes(q) ||
      typeLabel.toLowerCase().includes(q)

    const filteredChildren = filterTree(node.children, query, activeTypes)
    const visible = (typeMatch && textMatch) || filteredChildren.length > 0

    if (visible) {
      return [{ ...node, children: filteredChildren }]
    }
    return []
  })
}

function TreeNodeRow({
  node,
  depth,
  forceOpen,
}: {
  node: LocationTreeNode
  depth: number
  forceOpen: boolean
}) {
  const [open, setOpen] = useState(depth < 1)
  const loc = node.data as Location
  const type = locationTypeOf(node)
  const teaser = locationTeaser(loc)
  const hasChildren = node.children.length > 0
  const isOpen = forceOpen || open

  return (
    <li>
      <div
        className="hover:bg-accent/20 flex items-start gap-1 rounded-md py-1.5 pr-2 transition-colors"
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="text-muted-foreground hover:text-foreground mt-0.5 shrink-0 rounded p-0.5"
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            {isOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          </button>
        ) : (
          <span className="mt-0.5 inline-block w-4.5 shrink-0" aria-hidden />
        )}

        <div className="min-w-0 flex-1">
          <Link
            {...entityLink('location', node.slug)}
            className="flex flex-wrap items-center gap-2"
          >
            <LocationIcon icon={loc.icon} className="text-primary/70 size-4" />
            <span className="font-medium">{loc.name}</span>
            {type ? <TypeBadge type={type} /> : null}
            <ActivityBadge slug={node.slug} />
          </Link>
          {teaser ? (
            <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">{teaser}</p>
          ) : null}
        </div>
      </div>

      {hasChildren && isOpen ? (
        <ul>
          {node.children.map((child) => (
            <TreeNodeRow key={child.slug} node={child} depth={depth + 1} forceOpen={forceOpen} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

function LocationDirectory({ activeTypes }: { activeTypes: Set<LocationType> }) {
  const [query, setQuery] = useState('')
  const tree = useMemo(() => locationTree(), [])
  const filtered = useMemo(() => filterTree(tree, query, activeTypes), [tree, query, activeTypes])
  const forceOpen = query.trim().length > 0 || activeTypes.size < LOCATION_TYPES.length

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <input
          type="search"
          placeholder="Search the location tree…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-input bg-background focus-visible:ring-ring w-full rounded-md border py-2 pr-3 pl-9 text-sm outline-none focus-visible:ring-2"
        />
      </div>

      <div className="border-border rounded-lg border">
        <div className="border-border bg-muted/30 text-muted-foreground border-b px-4 py-2 text-xs font-semibold tracking-wider uppercase">
          World
        </div>
        {filtered.length > 0 ? (
          <ul className="py-2">
            {filtered.map((node) => (
              <TreeNodeRow key={node.slug} node={node} depth={0} forceOpen={forceOpen} />
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground px-4 py-6 text-center text-sm">
            No locations match your filters.
          </p>
        )}
      </div>
    </div>
  )
}

function locationsPath(view: LocationsView): '/locations/map' | '/locations/list' {
  return view === 'map' ? '/locations/map' : '/locations/list'
}

export function LocationsIndex({ view }: { view: LocationsView }) {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const activeTypes = useMemo(
    () => parseLocationFilter(search.filter as string | undefined),
    [search.filter],
  )
  const count = allEntities('location').length - 1

  const setActiveTypes = useCallback(
    (types: Set<LocationType>) => {
      navigate({
        to: locationsPath(view),
        search: locationsSearchFromTypes(types),
      })
    },
    [navigate, view],
  )

  const setView = useCallback(
    (nextView: LocationsView) => {
      if (nextView === view) return
      navigate({
        to: locationsPath(nextView),
        search: locationsSearchFromTypes(activeTypes),
      })
    },
    [activeTypes, navigate, view],
  )

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <div>
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Locations
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">World Atlas</h1>
          <p className="text-muted-foreground mt-2">
            {count} places across the campaign world — filter by type, then explore on the map or in
            the list tree.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <TypeFilter activeTypes={activeTypes} onChange={setActiveTypes} />
          <ViewSwitch value={view} onChange={setView} />
        </div>
      </header>

      {view === 'map' ? <CartographerCanvas activeTypes={activeTypes} /> : null}
      {view === 'list' ? <LocationDirectory activeTypes={activeTypes} /> : null}
    </div>
  )
}
