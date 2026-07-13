import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChevronDown, ChevronRight, List, Map } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { LocationReference } from '#/components/location-reference'
import { Grid, Inline, Stack, SwitchLayout } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import { SearchInput } from '#/components/ui/search-input'
import { SegmentedControl, SegmentedControlItem } from '#/components/ui/segmented-control'
import { LOCATION_TYPES, type LocationType } from '#/definitions/location.ts'
import { allEntities } from '#/lib/campaign'
import { LocationIcon, LocationTypeIcon, locationTypeLabel } from '#/lib/location-icons'
import { locationsSearchFromTypes, parseLocationFilter } from '#/lib/locations-search'
import {
  filterLocationDirectory,
  locationDirectoryTree,
  locationMapModel,
  type LocationDirectoryNode,
  type LocationMapModel,
} from '#/lib/locations-view-data'

export type LocationsView = 'map' | 'list'

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
    <SegmentedControl>
      {options.map(({ id, label, icon: Icon }) => (
        <SegmentedControlItem
          key={id}
          active={value === id}
          onClick={() => onChange(id)}
          label={label}
          className="h-8 min-w-8 px-3 py-1.5"
        >
          <Icon className="size-3.5" aria-hidden />
          {label}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
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
    <SegmentedControl>
      {LOCATION_TYPES.map((type) => (
        <SegmentedControlItem
          key={type}
          active={activeTypes.has(type)}
          onClick={() => toggle(type)}
          label={locationTypeLabel(type, true)}
          className="size-8 shrink-0"
        >
          <LocationTypeIcon type={type} />
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  )
}

function TypePill({ type }: { type: LocationType }) {
  return (
    <Pill variant="outline">
      <Inline as="span" inline gap="2xs">
        <LocationTypeIcon type={type} className="size-3" />
        {locationTypeLabel(type)}
      </Inline>
    </Pill>
  )
}

function ActivityPill({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <Pill variant="secondary">
      {count} reference{count === 1 ? '' : 's'}
    </Pill>
  )
}

function CartographerCanvas({ map }: { map: LocationMapModel }) {
  if (map.pins.length === 0) {
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
        viewBox={`0 0 ${map.width} ${map.height}`}
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
        <rect width={map.width} height={map.height} fill="url(#world-grid)" />

        {map.connectors.map((line) => (
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

      {map.pins.map((pin) => (
        <LocationReference
          key={pin.slug}
          slug={pin.slug}
          label={pin.name}
          unstyled
          wrapperClassName="group absolute -translate-x-1/2 -translate-y-1/2"
          wrapperStyle={{ left: `${pin.left}%`, top: `${pin.top}%` }}
          className="block"
        >
          {() => (
            <Stack as="span" gap="2xs" align="center">
              <Inline
                as="span"
                inline
                gap="none"
                justify="center"
                className="bg-background border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground size-7 rounded-full border-2 shadow-sm transition-colors"
              >
                <LocationIcon icon={pin.icon} className="size-3.5" />
              </Inline>
              <span className="text-foreground block max-w-28 text-center text-[11px] leading-tight font-medium">
                {pin.name}
              </span>
            </Stack>
          )}
        </LocationReference>
      ))}

      <p className="text-muted-foreground border-border bg-background/80 absolute right-3 bottom-3 rounded-md border px-2 py-1 text-xs backdrop-blur-sm">
        Map placeholder — pins use campaign coordinates
      </p>
    </div>
  )
}

function TreeNodeRow({
  node,
  depth,
  forceOpen,
}: {
  node: LocationDirectoryNode
  depth: number
  forceOpen: boolean
}) {
  const [open, setOpen] = useState(depth < 1)
  const hasChildren = node.children.length > 0
  const isOpen = forceOpen || open

  return (
    <li>
      <Grid
        gap="2xs"
        template="auto-content"
        align="start"
        className="hover:bg-accent/20 rounded-md py-1.5 pr-2 transition-colors"
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="text-muted-foreground hover:text-foreground shrink-0 translate-y-0.5 rounded p-0.5"
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            {isOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          </button>
        ) : (
          <span className="inline-block w-4.5 shrink-0 translate-y-0.5" aria-hidden />
        )}

        <Stack gap="3xs" className="min-w-0">
          <LocationReference slug={node.slug} label={node.name} unstyled className="block">
            {() => (
              <Inline as="span" gap="sm" wrap>
                <LocationIcon icon={node.icon} className="text-primary/70 size-4" />
                <span className="font-medium">{node.name}</span>
                {node.type ? <TypePill type={node.type} /> : null}
                <ActivityPill count={node.activityCount} />
              </Inline>
            )}
          </LocationReference>
          {node.teaser ? (
            <p className="text-muted-foreground line-clamp-2 text-xs">{node.teaser}</p>
          ) : null}
        </Stack>
      </Grid>

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

function LocationDirectory({
  tree,
  activeTypes,
}: {
  tree: LocationDirectoryNode[]
  activeTypes: Set<LocationType>
}) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(
    () => filterLocationDirectory(tree, query, activeTypes),
    [tree, query, activeTypes],
  )
  const forceOpen = query.trim().length > 0 || activeTypes.size < LOCATION_TYPES.length

  return (
    <Stack gap="lg">
      <SearchInput
        placeholder="Search the location tree…"
        aria-label="Search the location tree"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        containerClassName="max-w-md"
      />

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
    </Stack>
  )
}

function locationsPath(view: LocationsView): '/locations/map' | '/locations/list' {
  return view === 'map' ? '/locations/map' : '/locations/list'
}

export function LocationsScreen({ view }: { view: LocationsView }) {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const activeTypes = useMemo(
    () => parseLocationFilter(search.filter as string | undefined),
    [search.filter],
  )
  const count = allEntities('location').length - 1
  const map = useMemo(
    () => (view === 'map' ? locationMapModel(activeTypes) : undefined),
    [activeTypes, view],
  )
  const tree = useMemo(() => (view === 'list' ? locationDirectoryTree() : undefined), [view])

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
    <Stack gap="xl">
      <Stack as="header" gap="lg">
        <Stack gap="sm">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Locations
          </p>
          <h1 className="text-3xl font-bold tracking-tight">World Atlas</h1>
          <p className="text-muted-foreground">
            {count} places across the campaign world — filter by type, then explore on the map or in
            the list tree.
          </p>
        </Stack>

        <SwitchLayout gap="md" rowAlign="center" rowJustify="between" wrap>
          <TypeFilter activeTypes={activeTypes} onChange={setActiveTypes} />
          <ViewSwitch value={view} onChange={setView} />
        </SwitchLayout>
      </Stack>

      {map ? <CartographerCanvas map={map} /> : null}
      {tree ? <LocationDirectory tree={tree} activeTypes={activeTypes} /> : null}
    </Stack>
  )
}
