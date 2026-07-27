import { CheckCircle2, CircleHelp, Clock3, ListChecks } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { EntityReference } from '#/components/entity-reference'
import { Inline, Stack } from '#/components/ui/layout'
import type { QuestCatalogueData, QuestCatalogueItem } from '#/lib/quest-catalogue-data'
import { QuestIcon } from '#/lib/quest-icons'
import { cn } from '#/lib/utils'

type SummaryItem = {
  label: string
  count: number
  icon: LucideIcon
}

function QuestCatalogueRow({ item, resolved }: { item: QuestCatalogueItem; resolved: boolean }) {
  return (
    <li>
      <EntityReference
        kind="quest"
        slug={item.slug}
        unstyled
        wrapperClassName="block"
        className="group block focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:outline-none"
      >
        {() => (
          <div
            className={cn(
              'grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 px-4 py-3 transition-colors group-hover:bg-muted/40 sm:grid-cols-[auto_minmax(0,1fr)_auto]',
              resolved && 'bg-muted/15 text-muted-foreground',
            )}
          >
            {resolved ? (
              <CheckCircle2 className="mt-0.5 size-4 text-emerald-500/80" aria-hidden />
            ) : (
              <QuestIcon icon={item.icon} className="mt-0.5 size-4 text-rose-300" aria-hidden />
            )}
            <span className="text-sm font-medium">{item.name}</span>
            <Inline
              as="span"
              gap="xs"
              className="text-muted-foreground col-start-2 text-xs sm:col-start-auto"
            >
              {resolved ? null : <Clock3 className="size-3.5" aria-hidden />}
              {resolved ? item.typeLabel : item.progressText}
            </Inline>
          </div>
        )}
      </EntityReference>
    </li>
  )
}

function QuestCatalogueSection({
  id,
  title,
  description,
  items,
  resolved = false,
}: {
  id: string
  title: string
  description: string
  items: QuestCatalogueItem[]
  resolved?: boolean
}) {
  return (
    <Stack as="section" gap="sm" aria-labelledby={id}>
      <Inline gap="md" justify="between" align="end">
        <Stack gap="2xs">
          <h2 id={id} className={cn('text-lg font-semibold', resolved && 'text-muted-foreground')}>
            {title}
          </h2>
          <p className="text-muted-foreground text-xs">{description}</p>
        </Stack>
        <span className="text-muted-foreground font-mono text-xs">{items.length}</span>
      </Inline>
      <ul className="border-border divide-border divide-y overflow-hidden rounded-xl border">
        {items.length > 0 ? (
          items.map((item) => <QuestCatalogueRow key={item.slug} item={item} resolved={resolved} />)
        ) : (
          <li className="text-muted-foreground px-4 py-5 text-sm">No entries.</li>
        )}
      </ul>
    </Stack>
  )
}

export function QuestCatalogue({ data }: { data: QuestCatalogueData }) {
  const summary: SummaryItem[] = [
    { label: 'Questions to unravel', count: data.mysteries.length, icon: CircleHelp },
    { label: 'Commitments to complete', count: data.missions.length, icon: ListChecks },
    { label: 'Closed records', count: data.resolved.length, icon: CheckCircle2 },
  ]

  return (
    <Stack gap="3xl">
      <Stack as="header" gap="md">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Campaign index
        </p>
        <Stack gap="sm">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Quests</h1>
          <p className="text-muted-foreground max-w-2xl">
            A compact reference-first catalogue for scanning every thread quickly, ordered
            alphabetically inside each section.
          </p>
        </Stack>
      </Stack>

      <dl className="border-border bg-border grid gap-px overflow-hidden rounded-xl border sm:grid-cols-3">
        {summary.map(({ label, count, icon: Icon }) => (
          <div key={label} className="bg-card p-4">
            <Inline gap="sm">
              <Icon className="text-muted-foreground size-4" aria-hidden />
              <Stack gap="3xs">
                <dt className="text-muted-foreground text-xs">{label}</dt>
                <dd className="text-xl font-semibold">{count}</dd>
              </Stack>
            </Inline>
          </div>
        ))}
      </dl>

      <QuestCatalogueSection
        id="quest-mysteries"
        title="Mysteries"
        description="Alphabetical · unanswered story questions"
        items={data.mysteries}
      />
      <QuestCatalogueSection
        id="quest-missions"
        title="Missions"
        description="Alphabetical · concrete party commitments"
        items={data.missions}
      />
      <QuestCatalogueSection
        id="quest-resolved"
        title="Resolved"
        description="Alphabetical · campaign archive"
        items={data.resolved}
        resolved
      />
    </Stack>
  )
}
