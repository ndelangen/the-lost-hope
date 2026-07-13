import { memo, useState } from 'react'

import { IconCatalogGlyph } from '#/components/icon-catalog-glyph'
import type { IconCatalogEntry, IconClassification } from '#/icon-catalog/types'
import { cn } from '#/lib/utils'

const REVIEW_ACTIONS = [
  { classification: 'useful', shortLabel: 'U', label: 'useful' },
  { classification: 'questionable', shortLabel: 'Q', label: 'questionable' },
  {
    classification: 'marked-for-deletion',
    shortLabel: 'D',
    label: 'marked for deletion',
  },
] as const

const REVIEW_ACTION_STYLES = {
  useful: 'aria-pressed:bg-emerald-600 aria-pressed:text-white',
  questionable: 'aria-pressed:bg-amber-500 aria-pressed:text-amber-950',
  'marked-for-deletion': 'aria-pressed:bg-destructive aria-pressed:text-destructive-foreground',
} as const

export const IconCatalogCard = memo(function IconCatalogCard({
  entry,
  copied,
  onCopy,
  pendingClassification,
  onClassify,
}: {
  entry: IconCatalogEntry
  copied: boolean
  onCopy: (id: string) => void
  pendingClassification?: IconClassification
  onClassify: (id: string, classification: IconClassification) => void
}) {
  const [reviewControlsFocused, setReviewControlsFocused] = useState(false)
  const tooltip = [
    entry.description,
    entry.associatedTerms.length > 0
      ? `Associated: ${entry.associatedTerms.slice(0, 8).join(', ')}`
      : undefined,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <article
      className="group/card border-border bg-card hover:border-primary/50 relative flex h-full min-w-0 flex-col rounded-lg border shadow-sm transition-colors [contain:layout_paint_style]"
      data-icon-id={entry.id}
      title={tooltip}
    >
      <div
        className={cn(
          'bg-card/95 border-border absolute top-1.5 left-1.5 z-10 flex gap-0.5 rounded-md border p-0.5 shadow-sm backdrop-blur transition-opacity group-hover/card:opacity-100',
          reviewControlsFocused ? 'opacity-100' : 'opacity-0',
        )}
        onFocus={() => setReviewControlsFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setReviewControlsFocused(false)
        }}
      >
        {REVIEW_ACTIONS.map(({ classification, shortLabel, label }) => (
          <button
            key={classification}
            type="button"
            className={cn(
              'text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring flex size-6 items-center justify-center rounded text-[0.65rem] font-bold outline-none focus-visible:ring-2',
              REVIEW_ACTION_STYLES[classification],
            )}
            aria-label={`Queue ${entry.id} as ${label}`}
            aria-pressed={pendingClassification === classification}
            aria-keyshortcuts={shortLabel}
            title={`Queue as ${label} (${shortLabel})`}
            onClick={() => onClassify(entry.id, classification)}
          >
            [{shortLabel}]
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 px-2 pt-3 pb-1 text-center">
        <IconCatalogGlyph entry={entry} className="text-primary size-11 shrink-0" />
        <h3 className="line-clamp-2 text-xs leading-tight font-semibold">{entry.label}</h3>
      </div>

      <button
        type="button"
        className="border-border bg-muted/30 hover:bg-muted focus-visible:ring-ring mx-2 mb-2 min-w-0 rounded border px-1.5 py-1 text-left outline-none focus-visible:ring-2"
        onClick={() => onCopy(entry.id)}
        aria-label={`Copy ${entry.id}`}
        title={`Copy ${entry.id}`}
      >
        <code className="text-muted-foreground block truncate text-[0.64rem]">
          {copied ? 'Copied!' : entry.id}
        </code>
      </button>
    </article>
  )
})
