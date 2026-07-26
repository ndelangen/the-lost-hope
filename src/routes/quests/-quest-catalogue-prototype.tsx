// PROTOTYPE — Three variants of /quests, switchable via ?variant=, on the existing route.
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Compass,
  ListChecks,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect } from 'react'

import { EntityReference } from '#/components/entity-reference'
import { Card } from '#/components/ui/card'
import { Grid, Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import type { EntityCardItem } from '#/lib/entity-page-data'
import { QuestIcon } from '#/lib/quest-icons'
import { cn } from '#/lib/utils'

export type QuestPrototypeItem = EntityCardItem & {
  icon: string
  questType: 'mystery' | 'mission'
  status: 'open' | 'resolved'
  campaignDaysAgo?: number
}

type Variant = 'A' | 'B' | 'C'

const VARIANTS: Array<{ key: Variant; name: string }> = [
  { key: 'A', name: 'Stacked chapters' },
  { key: 'B', name: 'Active board' },
  { key: 'C', name: 'Field index' },
]

function byRecentActivity(left: QuestPrototypeItem, right: QuestPrototypeItem): number {
  return (
    (left.campaignDaysAgo ?? Number.POSITIVE_INFINITY) -
      (right.campaignDaysAgo ?? Number.POSITIVE_INFINITY) || left.name.localeCompare(right.name)
  )
}

function byName(left: QuestPrototypeItem, right: QuestPrototypeItem): number {
  return left.name.localeCompare(right.name)
}

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
  )
}

function progressLabel(item: QuestPrototypeItem): string {
  return item.meta ?? 'No linked progress'
}

function splitItems(items: QuestPrototypeItem[]) {
  return {
    mysteries: items
      .filter((item) => item.status === 'open' && item.questType === 'mystery')
      .toSorted(byRecentActivity),
    missions: items
      .filter((item) => item.status === 'open' && item.questType === 'mission')
      .toSorted(byRecentActivity),
    resolved: items.filter((item) => item.status === 'resolved').toSorted(byName),
  }
}

function QuestLink({
  item,
  className,
  children,
}: {
  item: QuestPrototypeItem
  className?: string
  children: React.ReactNode
}) {
  return (
    <EntityReference
      kind="quest"
      slug={item.slug}
      unstyled
      wrapperClassName="block"
      className={cn(
        'group block rounded-xl focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:outline-none',
        className,
      )}
    >
      {() => children}
    </EntityReference>
  )
}

function PrototypeHeader({
  items,
  eyebrow,
  description,
}: {
  items: QuestPrototypeItem[]
  eyebrow: string
  description: string
}) {
  const open = items.filter((item) => item.status === 'open')
  const mysteryCount = open.filter((item) => item.questType === 'mystery').length
  const missionCount = open.filter((item) => item.questType === 'mission').length
  return (
    <Stack as="header" gap="md">
      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        {eyebrow}
      </p>
      <Stack gap="sm">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Quests</h1>
        <p className="text-muted-foreground max-w-2xl">{description}</p>
      </Stack>
      <Inline gap="sm" wrap>
        <Pill variant="outline" dot>
          {mysteryCount} open mysteries
        </Pill>
        <Pill variant="outline" dot>
          {missionCount} open missions
        </Pill>
        <Pill variant="success" dot>
          {items.length - open.length} resolved
        </Pill>
      </Inline>
    </Stack>
  )
}

function ChapterCard({ item }: { item: QuestPrototypeItem }) {
  return (
    <QuestLink item={item} className="h-full">
      <Card className="relative h-full overflow-hidden p-5 transition-colors group-hover:border-rose-400/60 group-hover:bg-rose-500/5">
        <QuestIcon
          icon={item.icon}
          className="absolute -right-3 -bottom-4 size-20 rotate-[-8deg] text-rose-300 opacity-[0.08] transition-all group-hover:scale-110 group-hover:opacity-[0.17]"
          aria-hidden
        />
        <Stack gap="md" className="relative">
          <Inline gap="md" align="start">
            <span className="rounded-lg border border-rose-400/20 bg-rose-500/10 p-2 text-rose-300">
              <QuestIcon icon={item.icon} className="size-5" aria-hidden />
            </span>
            <Stack gap="xs" className="min-w-0">
              <h3 className="leading-snug font-semibold text-balance">{item.name}</h3>
              <Inline gap="xs" className="text-muted-foreground text-xs">
                <Clock3 className="size-3.5" aria-hidden />
                {progressLabel(item)}
              </Inline>
            </Stack>
          </Inline>
        </Stack>
      </Card>
    </QuestLink>
  )
}

function ChapterSection({
  icon,
  title,
  description,
  items,
}: {
  icon: React.ReactNode
  title: string
  description: string
  items: QuestPrototypeItem[]
}) {
  return (
    <Stack as="section" gap="lg">
      <Inline gap="md" align="start">
        <span className="bg-muted rounded-xl p-2.5">{icon}</span>
        <Stack gap="2xs">
          <Inline gap="sm" align="baseline">
            <h2 className="text-xl font-semibold">{title}</h2>
            <span className="text-muted-foreground text-sm">{items.length}</span>
          </Inline>
          <p className="text-muted-foreground text-sm">{description}</p>
        </Stack>
      </Inline>
      {items.length > 0 ? (
        <Grid gap="lg" smTemplate={2}>
          {items.map((item) => (
            <ChapterCard key={item.slug} item={item} />
          ))}
        </Grid>
      ) : (
        <p className="text-muted-foreground rounded-xl border border-dashed p-6 text-sm">
          Nothing open here.
        </p>
      )}
    </Stack>
  )
}

function VariantA({ items }: { items: QuestPrototypeItem[] }) {
  const groups = splitItems(items)
  return (
    <Stack gap="4xl">
      <PrototypeHeader
        items={items}
        eyebrow="Quest journal"
        description="Follow the questions still unfolding, keep promises in view, and revisit the stories the party has closed."
      />
      <ChapterSection
        icon={<CircleHelp className="size-5 text-violet-300" aria-hidden />}
        title="Mysteries"
        description="Questions and story threads waiting to be understood."
        items={groups.mysteries}
      />
      <ChapterSection
        icon={<Compass className="size-5 text-amber-300" aria-hidden />}
        title="Missions"
        description="Concrete commitments the party can act on."
        items={groups.missions}
      />
      <Stack as="section" gap="lg" className="border-border border-t pt-8">
        <Inline gap="md" align="start">
          <span className="bg-muted/50 text-muted-foreground rounded-xl p-2.5">
            <Archive className="size-5" aria-hidden />
          </span>
          <Stack gap="2xs">
            <Inline gap="sm" align="baseline">
              <h2 className="text-muted-foreground text-xl font-semibold">Resolved</h2>
              <span className="text-muted-foreground text-sm">{groups.resolved.length}</span>
            </Inline>
            <p className="text-muted-foreground text-sm">
              Completed records, kept for the campaign history.
            </p>
          </Stack>
        </Inline>
        <Grid gap="md" smTemplate={2}>
          {groups.resolved.map((item) => (
            <QuestLink key={item.slug} item={item}>
              <div className="border-border bg-muted/20 text-muted-foreground group-hover:bg-muted/40 rounded-xl border px-4 py-3 transition-colors">
                <Inline gap="md">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-400" aria-hidden />
                  <span className="text-sm font-medium">{item.name}</span>
                </Inline>
              </div>
            </QuestLink>
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}

function BoardRow({ item, compact = false }: { item: QuestPrototypeItem; compact?: boolean }) {
  return (
    <QuestLink item={item}>
      <div
        className={cn(
          'border-border bg-card rounded-xl border transition-all group-hover:-translate-y-0.5 group-hover:border-rose-400/50',
          compact ? 'p-4' : 'p-5',
        )}
      >
        <Inline gap="md" align="start">
          <QuestIcon
            icon={item.icon}
            className={cn(
              'shrink-0 text-rose-300',
              compact ? 'size-4 translate-y-0.5' : 'size-5 translate-y-0.5',
            )}
            aria-hidden
          />
          <Stack gap="xs" className="min-w-0">
            <h3 className={cn('font-semibold leading-snug', compact && 'text-sm')}>{item.name}</h3>
            <span className="text-muted-foreground text-xs">{progressLabel(item)}</span>
          </Stack>
        </Inline>
      </div>
    </QuestLink>
  )
}

function VariantB({ items }: { items: QuestPrototypeItem[] }) {
  const groups = splitItems(items)
  return (
    <Stack gap="3xl">
      <PrototypeHeader
        items={items}
        eyebrow="Active board"
        description="A working view that gives the larger mystery backlog room while keeping concrete missions close at hand."
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,0.75fr)]">
        <Stack as="section" gap="lg">
          <Inline gap="sm" justify="between" align="end">
            <Stack gap="2xs">
              <h2 className="text-2xl font-semibold">Mysteries</h2>
              <p className="text-muted-foreground text-sm">Most recent trail first</p>
            </Stack>
            <Pill variant="secondary">{groups.mysteries.length}</Pill>
          </Inline>
          <Grid gap="md" smTemplate={2}>
            {groups.mysteries.map((item) => (
              <BoardRow key={item.slug} item={item} />
            ))}
          </Grid>
        </Stack>
        <Stack
          as="section"
          gap="lg"
          className="h-fit rounded-2xl border border-amber-400/20 bg-amber-500/[0.04] p-5 lg:sticky lg:top-6"
        >
          <Inline gap="sm" justify="between" align="end">
            <Stack gap="2xs">
              <h2 className="text-xl font-semibold">Missions</h2>
              <p className="text-muted-foreground text-sm">Promises to act on</p>
            </Stack>
            <Pill variant="warning">{groups.missions.length}</Pill>
          </Inline>
          <Stack gap="md">
            {groups.missions.length > 0 ? (
              groups.missions.map((item) => <BoardRow key={item.slug} item={item} compact />)
            ) : (
              <p className="text-muted-foreground rounded-xl border border-dashed p-4 text-sm">
                No open missions.
              </p>
            )}
          </Stack>
        </Stack>
      </div>
      <Stack as="section" gap="md" className="border-border border-t pt-7">
        <Inline gap="sm" justify="between">
          <Inline gap="sm">
            <Archive className="text-muted-foreground size-4" aria-hidden />
            <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Resolved archive
            </h2>
          </Inline>
          <span className="text-muted-foreground text-xs">{groups.resolved.length} record</span>
        </Inline>
        {groups.resolved.map((item) => (
          <QuestLink key={item.slug} item={item}>
            <Inline
              gap="md"
              justify="between"
              className="text-muted-foreground group-hover:bg-muted/40 rounded-lg px-3 py-2 text-sm transition-colors"
            >
              <Inline gap="sm">
                <CheckCircle2 className="size-4 text-emerald-500/80" aria-hidden />
                <span>{item.name}</span>
              </Inline>
              <span className="text-xs">Mission</span>
            </Inline>
          </QuestLink>
        ))}
      </Stack>
    </Stack>
  )
}

function IndexRow({ item, resolved = false }: { item: QuestPrototypeItem; resolved?: boolean }) {
  return (
    <li>
      <QuestLink item={item} className="rounded-none">
        <div
          className={cn(
            'border-border grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 border-b px-4 py-3 transition-colors group-hover:bg-muted/40 sm:grid-cols-[auto_minmax(0,1fr)_auto]',
            resolved && 'bg-muted/15 text-muted-foreground',
          )}
        >
          {resolved ? (
            <CheckCircle2 className="mt-0.5 size-4 text-emerald-500/80" aria-hidden />
          ) : (
            <QuestIcon icon={item.icon} className="mt-0.5 size-4 text-rose-300" aria-hidden />
          )}
          <span className="text-sm font-medium">{item.name}</span>
          <Inline gap="xs" className="text-muted-foreground col-start-2 text-xs sm:col-start-auto">
            {!resolved ? <Clock3 className="size-3.5" aria-hidden /> : null}
            {resolved ? item.questType : progressLabel(item)}
          </Inline>
        </div>
      </QuestLink>
    </li>
  )
}

function IndexSection({
  title,
  description,
  items,
  resolved = false,
}: {
  title: string
  description: string
  items: QuestPrototypeItem[]
  resolved?: boolean
}) {
  return (
    <Stack as="section" gap="sm">
      <Inline gap="md" justify="between" align="end">
        <Stack gap="2xs">
          <h2 className={cn('text-lg font-semibold', resolved && 'text-muted-foreground')}>
            {title}
          </h2>
          <p className="text-muted-foreground text-xs">{description}</p>
        </Stack>
        <span className="text-muted-foreground font-mono text-xs">{items.length}</span>
      </Inline>
      <ul className="border-border overflow-hidden rounded-xl border">
        {items.length > 0 ? (
          items.map((item) => <IndexRow key={item.slug} item={item} resolved={resolved} />)
        ) : (
          <li className="text-muted-foreground px-4 py-5 text-sm">No entries.</li>
        )}
      </ul>
    </Stack>
  )
}

function VariantC({ items }: { items: QuestPrototypeItem[] }) {
  const groups = splitItems(items)
  const mysteries = groups.mysteries.toSorted(byName)
  const missions = groups.missions.toSorted(byName)
  const stats: Array<{ label: string; count: number; Icon: LucideIcon }> = [
    { label: 'Questions to unravel', count: mysteries.length, Icon: CircleHelp },
    { label: 'Commitments to complete', count: missions.length, Icon: ListChecks },
    { label: 'Closed records', count: groups.resolved.length, Icon: CheckCircle2 },
  ]
  return (
    <Stack gap="3xl">
      <PrototypeHeader
        items={items}
        eyebrow="Campaign index"
        description="A compact reference-first catalogue for scanning every thread quickly, ordered alphabetically inside each section."
      />
      <div className="border-border bg-border grid gap-px overflow-hidden rounded-xl border sm:grid-cols-3">
        {stats.map(({ label, count, Icon }) => (
          <div key={label} className="bg-card p-4">
            <Inline gap="sm">
              <Icon className="text-muted-foreground size-4" aria-hidden />
              <Stack gap="3xs">
                <span className="text-muted-foreground text-xs">{label}</span>
                <span className="text-xl font-semibold">{count}</span>
              </Stack>
            </Inline>
          </div>
        ))}
      </div>
      <IndexSection
        title="Mysteries"
        description="Alphabetical · unanswered story questions"
        items={mysteries}
      />
      <IndexSection
        title="Missions"
        description="Alphabetical · concrete party commitments"
        items={missions}
      />
      <IndexSection
        title="Resolved"
        description="Alphabetical · campaign archive"
        items={groups.resolved}
        resolved
      />
    </Stack>
  )
}

function PrototypeSwitcher({
  current,
  onChange,
}: {
  current: Variant
  onChange: (variant: Variant) => void
}) {
  const index = VARIANTS.findIndex((variant) => variant.key === current)
  const cycle = (direction: -1 | 1) => {
    const next = VARIANTS[(index + direction + VARIANTS.length) % VARIANTS.length]
    onChange(next.key)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return
      if (event.key === 'ArrowLeft') cycle(-1)
      if (event.key === 'ArrowRight') cycle(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const selected = VARIANTS[index]
  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <Inline
        gap="xs"
        className="rounded-full border border-white/15 bg-zinc-950 p-1.5 text-white shadow-2xl"
      >
        <button
          type="button"
          aria-label="Previous prototype variant"
          onClick={() => cycle(-1)}
          className="rounded-full p-2 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>
        <span className="min-w-40 px-3 text-center text-xs font-semibold">
          {selected.key} — {selected.name}
        </span>
        <button
          type="button"
          aria-label="Next prototype variant"
          onClick={() => cycle(1)}
          className="rounded-full p-2 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </Inline>
    </div>
  )
}

export function QuestCataloguePrototype({
  items,
  variant,
  onVariantChange,
}: {
  items: QuestPrototypeItem[]
  variant: Variant
  onVariantChange: (variant: Variant) => void
}) {
  return (
    <>
      {variant === 'A' ? <VariantA items={items} /> : null}
      {variant === 'B' ? <VariantB items={items} /> : null}
      {variant === 'C' ? <VariantC items={items} /> : null}
      {!import.meta.env.PROD ? (
        <PrototypeSwitcher current={variant} onChange={onVariantChange} />
      ) : null}
    </>
  )
}
