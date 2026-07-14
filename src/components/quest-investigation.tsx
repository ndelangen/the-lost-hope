import { CalendarDays, CircleQuestionMark, History } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EventReference } from '#/components/event-reference'
import { LocationReference } from '#/components/location-reference'
import { Center, Grid, Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import type { Content } from '#/definitions/content'
import type { Quest } from '#/definitions/quest'
import type { QuestClueEntry, QuestDetailData } from '#/lib/quest-detail-data'
import { cn } from '#/lib/utils'

function clueCountLabel(count: number): string {
  return `${count} ${count === 1 ? 'entry' : 'entries'}`
}

function campaignDayAgeLabel(daysAgo: number): string {
  if (daysAgo === 0) return 'current campaign day'
  return `${daysAgo} campaign ${daysAgo === 1 ? 'day' : 'days'} ago`
}

function QuestTrailEntry({ entry, last }: { entry: QuestClueEntry; last: boolean }) {
  return (
    <li className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 pb-8 last:pb-0">
      <div
        className={cn(
          'relative flex justify-center',
          !last &&
            'after:bg-border after:absolute after:top-9 after:-bottom-8 after:left-1/2 after:w-px after:-translate-x-1/2',
        )}
        aria-hidden
      >
        <span className="bg-background relative z-10 flex size-9 items-center justify-center rounded-full border border-rose-300/70 font-mono text-xs font-semibold text-rose-700 tabular-nums dark:border-rose-300/30 dark:text-rose-300">
          {String(entry.position).padStart(2, '0')}
        </span>
      </div>
      <Stack gap="sm" className="border-border bg-card/50 rounded-xl border p-4">
        <Inline
          gap="sm"
          wrap
          className="text-muted-foreground text-xs font-medium tracking-wide uppercase"
        >
          {entry.source ? (
            <>
              <Inline as="span" inline gap="xs">
                <CalendarDays className="size-3.5" aria-hidden />
                Day {entry.source.day}
              </Inline>
              {entry.source.sessionNumber ? (
                <span>Session {entry.source.sessionNumber}</span>
              ) : null}
              {entry.source.locationSlug ? (
                <LocationReference slug={entry.source.locationSlug} />
              ) : null}
            </>
          ) : (
            <Inline as="span" inline gap="xs">
              <History className="size-3.5" aria-hidden />
              Party note
            </Inline>
          )}
        </Inline>
        <ContentRenderer content={entry.content} className="text-[0.95rem]" />
      </Stack>
    </li>
  )
}

function InvestigationTrail({ entries }: { entries: QuestClueEntry[] }) {
  return (
    <Stack as="section" gap="xl" aria-labelledby="investigation-trail-heading">
      <Inline gap="md" align="end" justify="between">
        <Stack gap="2xs">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Ordered record
          </p>
          <h2 id="investigation-trail-heading" className="text-xl font-semibold">
            Investigation trail
          </h2>
        </Stack>
        <Pill variant="outline">{clueCountLabel(entries.length)}</Pill>
      </Inline>
      {entries.length > 0 ? (
        <ol>
          {entries.map((entry, index) => (
            <QuestTrailEntry
              key={entry.position}
              entry={entry}
              last={index === entries.length - 1}
            />
          ))}
        </ol>
      ) : (
        <p className="text-muted-foreground text-sm">No discoveries are recorded yet.</p>
      )}
    </Stack>
  )
}

function OpenQuestions({
  entries,
  status,
}: {
  entries: QuestClueEntry[]
  status: Quest['status']
}) {
  return (
    <Stack
      as="section"
      gap="lg"
      className="rounded-xl border border-rose-300/50 bg-rose-50/50 p-5 dark:border-rose-300/20 dark:bg-rose-950/20"
      aria-labelledby="open-questions-heading"
    >
      <Inline gap="sm" align="start">
        <CircleQuestionMark
          className="mt-0.5 size-5 shrink-0 text-rose-600 dark:text-rose-300"
          aria-hidden
        />
        <Stack gap="2xs">
          <p className="text-xs font-semibold tracking-wider text-rose-700/80 uppercase dark:text-rose-200/70">
            {status === 'open' ? 'Still unresolved' : 'Questions closed'}
          </p>
          <h2 id="open-questions-heading" className="font-semibold">
            {entries.length === 1 ? 'Open question' : 'Open questions'}
          </h2>
        </Stack>
      </Inline>
      {entries.length > 0 ? (
        <Stack as="ol" gap="lg">
          {entries.map((entry) => (
            <li key={entry.position}>
              <Stack gap="sm">
                <span className="font-mono text-xs font-semibold text-rose-700/70 dark:text-rose-200/60">
                  NOTE {String(entry.position).padStart(2, '0')}
                </span>
                <ContentRenderer content={entry.content} className="text-[0.95rem]" />
              </Stack>
            </li>
          ))}
        </Stack>
      ) : (
        <p className="text-muted-foreground text-sm">
          No unresolved question is written into this thread yet.
        </p>
      )}
    </Stack>
  )
}

function ThreadState({ detail }: { detail: QuestDetailData }) {
  const latest = detail.latestActivity

  return (
    <Stack as="section" gap="lg" className="border-border bg-muted/20 rounded-xl border p-5">
      <Inline gap="sm">
        <History className="text-muted-foreground size-5" aria-hidden />
        <h2 className="font-semibold">Thread state</h2>
      </Inline>
      <Grid as="dl" gap="sm" template={2}>
        <Stack as="div" gap="3xs">
          <dt className="text-muted-foreground text-xs uppercase">Case notes</dt>
          <dd className="text-lg font-semibold tabular-nums">{detail.totalClues}</dd>
        </Stack>
        <Stack as="div" gap="3xs">
          <dt className="text-muted-foreground text-xs uppercase">Linked events</dt>
          <dd className="text-lg font-semibold tabular-nums">{detail.linkedEventCount}</dd>
        </Stack>
      </Grid>
      {latest ? (
        <Stack gap="sm" className="border-border border-t pt-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Latest linked event
          </p>
          <EventReference slug={latest.eventSlug} wrapperClassName="block" />
          <p className="text-muted-foreground text-sm">
            Day {latest.day} · {campaignDayAgeLabel(latest.campaignDaysAgo)}
          </p>
        </Stack>
      ) : null}
    </Stack>
  )
}

export function QuestInvestigation({
  detail,
  conclusion,
  status,
}: {
  detail: QuestDetailData
  conclusion: Content
  status: Quest['status']
}) {
  return (
    <Stack gap="2xl">
      {detail.summary ? (
        <Stack as="section" gap="sm" className="border-l-2 border-rose-400 pl-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Thread focus
          </p>
          <ContentRenderer content={detail.summary} className="text-base" />
        </Stack>
      ) : null}
      {status === 'resolved' ? (
        <Center maxWidth="3xl">
          <InvestigationTrail entries={detail.discoveries} />
        </Center>
      ) : (
        <Grid gap="xl" lgTemplate="content-aside" lgAlign="start">
          <InvestigationTrail entries={detail.discoveries} />
          <Stack as="aside" gap="lg" className="lg:sticky lg:top-20">
            <OpenQuestions entries={detail.openQuestions} status={status} />
            <ThreadState detail={detail} />
          </Stack>
        </Grid>
      )}
      {conclusion.length > 0 ? (
        <Stack
          as="section"
          gap="md"
          className="rounded-xl border border-emerald-300/50 bg-emerald-50/50 p-5 dark:border-emerald-300/20 dark:bg-emerald-950/20"
        >
          <p className="text-xs font-semibold tracking-wider text-emerald-700 uppercase dark:text-emerald-300">
            Outcome
          </p>
          <ContentRenderer content={conclusion} />
        </Stack>
      ) : null}
    </Stack>
  )
}
