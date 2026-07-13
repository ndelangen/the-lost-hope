import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { IconCatalogSearchField } from '#/components/icon-catalog-search-field'
import { IconCatalogVirtualGrid } from '#/components/icon-catalog-virtual-grid'
import { Inline, Stack } from '#/components/ui/layout'
import { SegmentedControl, SegmentedControlItem } from '#/components/ui/segmented-control'
import catalogJson from '#/icon-catalog/catalog.json'
import {
  buildIconClassificationCommand,
  iconClassificationForShortcut,
  type IconClassificationSelectionLists,
} from '#/icon-catalog/classification-command'
import { createIconCatalogSearchIndex, iconCatalogCategories } from '#/icon-catalog/search'
import {
  ICON_CLASSIFICATIONS,
  type IconCatalog,
  type IconCatalogEntry,
  type IconClassification,
  type IconSource,
} from '#/icon-catalog/types'
import { iconCatalogUrlSearchSchema, type IconCatalogUrlSearch } from '#/icon-catalog/url-search'

export const Route = createFileRoute('/_icons')({
  validateSearch: iconCatalogUrlSearchSchema,
  component: IconsPage,
})

type ClassificationFilter = 'all' | IconClassification
type SourceFilter = 'all' | IconSource
type PendingClassifications = Record<IconClassification, ReadonlySet<string>>

const catalog = catalogJson as IconCatalog
const categories = iconCatalogCategories(catalog.entries)
const catalogSearch = createIconCatalogSearchIndex(catalog.entries)
const numberFormatter = new Intl.NumberFormat()

function emptyPendingClassifications(): PendingClassifications {
  return {
    useful: new Set(),
    questionable: new Set(),
    'marked-for-deletion': new Set(),
  }
}
const CLASSIFICATION_LABELS: Readonly<Record<IconClassification, string>> = {
  useful: 'Useful',
  questionable: 'Questionable',
  'marked-for-deletion': 'Marked for deletion',
}

const fullCounts = Object.fromEntries(
  ICON_CLASSIFICATIONS.map((classification) => [
    classification,
    catalog.entries.filter((entry) => entry.classification === classification).length,
  ]),
) as Record<IconClassification, number>

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
  )
}

function IconsPage() {
  const filters = Route.useSearch()
  const navigate = Route.useNavigate()
  const [copiedId, setCopiedId] = useState<string>()
  const [commandCopied, setCommandCopied] = useState(false)
  const [pendingClassifications, setPendingClassifications] = useState<PendingClassifications>(
    emptyPendingClassifications,
  )
  const query = filters.q ?? ''
  const classification: ClassificationFilter = filters.group ?? 'all'
  const source: SourceFilter = filters.source ?? 'all'
  const category = filters.category ?? 'all'

  const updateFilters = useCallback(
    (updates: Partial<IconCatalogUrlSearch>): void => {
      void navigate({
        search: (current) => ({ ...current, ...updates }),
        replace: true,
        resetScroll: false,
      })
    },
    [navigate],
  )

  const filteredEntries = useMemo(
    () =>
      catalogSearch.search({
        query,
        classifications: classification === 'all' ? undefined : [classification],
        sources: source === 'all' ? undefined : [source],
        category: category === 'all' ? undefined : category,
      }),
    [category, classification, query, source],
  )

  const visibleGroups = classification === 'all' ? ICON_CLASSIFICATIONS : [classification]
  const entriesByGroup = useMemo(
    () =>
      Object.fromEntries(
        ICON_CLASSIFICATIONS.map((group) => [
          group,
          filteredEntries.filter((entry) => entry.classification === group),
        ]),
      ) as Record<IconClassification, Array<IconCatalogEntry>>,
    [filteredEntries],
  )
  const pendingLists = useMemo(
    (): IconClassificationSelectionLists => ({
      useful: [...pendingClassifications.useful],
      questionable: [...pendingClassifications.questionable],
      'marked-for-deletion': [...pendingClassifications['marked-for-deletion']],
    }),
    [pendingClassifications],
  )
  const classificationCommand = useMemo(
    () => buildIconClassificationCommand(pendingLists),
    [pendingLists],
  )
  const pendingById = useMemo(
    () =>
      new Map(
        ICON_CLASSIFICATIONS.flatMap((value) =>
          [...pendingClassifications[value]].map((id) => [id, value] as const),
        ),
      ),
    [pendingClassifications],
  )
  const pendingCount = ICON_CLASSIFICATIONS.reduce(
    (total, value) => total + pendingClassifications[value].size,
    0,
  )

  const copyIconId = useCallback((id: string): void => {
    void navigator.clipboard.writeText(id).then(() => setCopiedId(id))
  }, [])

  const updateQuery = useCallback(
    (value: string): void => updateFilters({ q: value || undefined }),
    [updateFilters],
  )

  const queueClassification = useCallback((id: string, target: IconClassification): void => {
    setCommandCopied(false)
    setPendingClassifications((current) => {
      const wasSelected = current[target].has(id)
      const next = Object.fromEntries(
        ICON_CLASSIFICATIONS.map((value) => [value, new Set(current[value])]),
      ) as Record<IconClassification, Set<string>>

      for (const value of ICON_CLASSIFICATIONS) next[value].delete(id)
      if (!wasSelected) next[target].add(id)
      return next
    })
  }, [])

  useEffect(() => {
    function handleClassificationShortcut(event: KeyboardEvent): void {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isTypingTarget(event.target)
      ) {
        return
      }

      const target = iconClassificationForShortcut(event.key)
      if (!target) return

      const hoveredCard = document.querySelector<HTMLElement>('[data-icon-id]:hover')
      const focusedCard =
        document.activeElement instanceof HTMLElement
          ? document.activeElement.closest<HTMLElement>('[data-icon-id]')
          : undefined
      const iconId = hoveredCard?.dataset.iconId ?? focusedCard?.dataset.iconId
      if (!iconId) return

      event.preventDefault()
      queueClassification(iconId, target)
    }

    window.addEventListener('keydown', handleClassificationShortcut)
    return () => window.removeEventListener('keydown', handleClassificationShortcut)
  }, [queueClassification])

  function copyClassificationCommand(): void {
    void navigator.clipboard.writeText(classificationCommand).then(() => setCommandCopied(true))
  }

  function clearPendingClassifications(): void {
    setPendingClassifications(emptyPendingClassifications())
    setCommandCopied(false)
  }

  function selectClassification(value: ClassificationFilter): void {
    updateFilters({ group: value === 'all' ? undefined : value })
  }

  return (
    <Stack gap="xl">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Icon catalog</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {numberFormatter.format(filteredEntries.length)} matches from{' '}
            {numberFormatter.format(catalog.entries.length)} icons · fuzzy search · click an ID to
            copy
          </p>
        </div>
      </header>

      <Stack
        gap="sm"
        className="border-border bg-background/95 z-20 rounded-xl border p-3 shadow-sm backdrop-blur lg:sticky lg:top-14"
      >
        <IconCatalogSearchField query={query} onQueryChange={updateQuery} />

        <div className="flex flex-col gap-2 xl:flex-row xl:items-end">
          <div className="overflow-x-auto xl:flex-1">
            <SegmentedControl className="min-w-max">
              <SegmentedControlItem
                active={classification === 'all'}
                onClick={() => selectClassification('all')}
                label="Show all review groups"
                className="px-3 py-1.5"
              >
                All <span className="text-xs opacity-70">{catalog.entries.length}</span>
              </SegmentedControlItem>
              {ICON_CLASSIFICATIONS.map((value) => (
                <SegmentedControlItem
                  key={value}
                  active={classification === value}
                  onClick={() => selectClassification(value)}
                  label={`Show ${CLASSIFICATION_LABELS[value].toLocaleLowerCase()} icons`}
                  className="px-3 py-1.5"
                >
                  {CLASSIFICATION_LABELS[value]}{' '}
                  <span className="text-xs opacity-70">
                    {numberFormatter.format(fullCounts[value])}
                  </span>
                </SegmentedControlItem>
              ))}
            </SegmentedControl>
          </div>

          <Inline gap="sm" wrap>
            <label className="text-muted-foreground flex min-w-44 flex-1 flex-col gap-1 text-xs font-medium">
              Source
              <select
                className="border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/30 h-9 rounded-lg border px-3 text-sm outline-none focus-visible:ring-2"
                value={source}
                onChange={(event) => {
                  const value = event.target.value as SourceFilter
                  updateFilters({ source: value === 'all' ? undefined : value })
                }}
              >
                <option value="all">All sources</option>
                {catalog.sources.map((catalogSource) => (
                  <option key={catalogSource.id} value={catalogSource.id}>
                    {catalogSource.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-muted-foreground flex min-w-44 flex-1 flex-col gap-1 text-xs font-medium">
              Category
              <select
                className="border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/30 h-9 rounded-lg border px-3 text-sm outline-none focus-visible:ring-2"
                value={category}
                onChange={(event) => {
                  updateFilters({
                    category: event.target.value === 'all' ? undefined : event.target.value,
                  })
                }}
              >
                <option value="all">All categories</option>
                {categories.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </Inline>
        </div>

        <Inline justify="between" gap="sm" wrap className="border-border border-t pt-2">
          <p className="text-muted-foreground text-xs tabular-nums">
            Review queue · [U] {pendingClassifications.useful.size} · [Q]{' '}
            {pendingClassifications.questionable.size} · [D]{' '}
            {pendingClassifications['marked-for-deletion'].size}
          </p>
          <Inline gap="sm">
            <button
              type="button"
              className="border-border hover:bg-muted disabled:text-muted-foreground rounded-md border px-2.5 py-1 text-xs font-medium disabled:pointer-events-none disabled:opacity-50"
              disabled={pendingCount === 0}
              onClick={clearPendingClassifications}
            >
              Clear
            </button>
            <button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground rounded-md px-2.5 py-1 text-xs font-semibold disabled:pointer-events-none"
              disabled={pendingCount === 0}
              onClick={copyClassificationCommand}
            >
              {commandCopied ? 'Copied!' : 'Copy command'}
            </button>
          </Inline>
        </Inline>

        {pendingCount > 0 ? (
          <code className="border-border bg-muted/30 text-muted-foreground max-h-16 overflow-auto rounded-md border px-2 py-1.5 text-xs break-all">
            {classificationCommand}
          </code>
        ) : null}
      </Stack>

      {filteredEntries.length === 0 ? (
        <p className="border-border bg-card text-muted-foreground rounded-xl border p-8 text-center">
          No icons match the current search and filters.
        </p>
      ) : (
        visibleGroups.map((group) => {
          const entries = entriesByGroup[group]
          if (entries.length === 0) return null

          return (
            <Stack as="section" gap="md" key={group} aria-labelledby={`${group}-icons-heading`}>
              <div className="border-border flex items-center justify-between gap-4 border-b pb-2">
                <h2 id={`${group}-icons-heading`} className="text-lg font-semibold tracking-tight">
                  {CLASSIFICATION_LABELS[group]}
                </h2>
                <span className="text-muted-foreground shrink-0 text-sm tabular-nums">
                  {numberFormatter.format(entries.length)}
                </span>
              </div>

              <IconCatalogVirtualGrid
                entries={entries}
                label={CLASSIFICATION_LABELS[group]}
                copiedId={copiedId}
                pendingById={pendingById}
                onCopy={copyIconId}
                onClassify={queueClassification}
              />
            </Stack>
          )
        })
      )}
    </Stack>
  )
}
