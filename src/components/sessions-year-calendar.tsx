import { EntityKindBadge } from '#/components/entity-kind-badge'
import { SessionReference } from '#/components/session-reference'
import { Card } from '#/components/ui/card'
import { Grid, Inline, Inset, Stack } from '#/components/ui/layout'
import { ENTITY_KIND_VISUALS } from '#/lib/entity-kind-visuals'
import type {
  SessionCalendarDay,
  SessionCalendarMonth,
  SessionCalendarYear,
} from '#/lib/session-calendar'
import { compactSessionCalendarRows } from '#/lib/session-calendar'
import { cn } from '#/lib/utils'

const SESSION_VISUAL = ENTITY_KIND_VISUALS.session

const WEEKDAYS = [
  { key: 'monday', label: 'M' },
  { key: 'tuesday', label: 'T' },
  { key: 'wednesday', label: 'W' },
  { key: 'thursday', label: 'T' },
  { key: 'friday', label: 'F' },
  { key: 'saturday', label: 'S' },
  { key: 'sunday', label: 'S' },
] as const

export function SessionsYearCalendar({
  years,
  sessionCount,
}: {
  years: SessionCalendarYear[]
  sessionCount: number
}) {
  return (
    <Stack gap="2xl">
      <Stack as="header" gap="sm">
        <p
          className={cn(
            'text-xs font-semibold tracking-wider uppercase',
            SESSION_VISUAL.accentClassName,
          )}
        >
          Sessions
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Session calendar</h1>
        <p className="text-muted-foreground">
          {sessionCount} sessions across {years.length} campaign{' '}
          {years.length === 1 ? 'year' : 'years'}. Highlighted dates open the session recap.
        </p>
      </Stack>

      {years.map((year) => (
        <Stack as="section" gap="lg" key={year.year}>
          <Inline justify="between" gap="md" align="baseline">
            <h2 className="text-2xl font-semibold tracking-tight">{year.year}</h2>
            <EntityKindBadge kind="session">
              {year.sessionCount} {year.sessionCount === 1 ? 'session' : 'sessions'}
            </EntityKindBadge>
          </Inline>

          <Stack gap="md">
            {compactSessionCalendarRows(year.months).map((row) =>
              row.kind === 'quiet' ? (
                <QuietPeriod
                  fromMonth={row.fromMonth}
                  throughMonth={row.throughMonth}
                  key={`${row.fromMonth}-${row.throughMonth}`}
                />
              ) : (
                <Grid gap="md" mdTemplate={3} align="start" key={row.months[0].index}>
                  {row.months.map((month) => (
                    <MonthCalendar key={month.index} month={month} />
                  ))}
                </Grid>
              ),
            )}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

function QuietPeriod({ fromMonth, throughMonth }: { fromMonth: string; throughMonth: string }) {
  return (
    <Inset
      block="sm"
      inline="lg"
      className="border-border bg-muted/20 rounded-xl border border-dashed"
    >
      <p className="text-muted-foreground text-center text-sm">
        No sessions in {fromMonth} through {throughMonth}
      </p>
    </Inset>
  )
}

function MonthCalendar({ month }: { month: SessionCalendarMonth }) {
  return (
    <Card
      className={cn('overflow-hidden', month.sessionCount > 0 && SESSION_VISUAL.borderClassName)}
    >
      <Inset
        inline="lg"
        block="md"
        className={month.sessionCount > 0 ? SESSION_VISUAL.surfaceClassName : undefined}
      >
        <Inline justify="between" gap="sm">
          <h3 className="font-semibold">{month.label}</h3>
          {month.sessionCount > 0 ? (
            <EntityKindBadge kind="session">{month.sessionCount}</EntityKindBadge>
          ) : null}
        </Inline>
      </Inset>

      <Inset inline="md" block="sm" className="border-border border-t">
        <Grid template={7} gap="3xs">
          {WEEKDAYS.map((weekday) => (
            <Inline
              as="span"
              gap="none"
              justify="center"
              className="text-muted-foreground h-6 text-[10px] font-semibold"
              key={weekday.key}
              aria-hidden
            >
              {weekday.label}
            </Inline>
          ))}
          {month.weeks.flat().map((day) => (
            <CalendarDay day={day} key={`${month.index}-${day.slot}`} />
          ))}
        </Grid>
      </Inset>
    </Card>
  )
}

function CalendarDay({ day }: { day: SessionCalendarDay }) {
  if (day.day === null) return <span className="aspect-square" aria-hidden />

  const session = day.sessions[0]
  if (!session) {
    return (
      <Inline
        as="span"
        gap="none"
        justify="center"
        className="text-muted-foreground aspect-square text-xs tabular-nums"
      >
        {day.day}
      </Inline>
    )
  }

  return (
    <SessionReference
      slug={session.slug}
      label={session.name}
      unstyled
      wrapperClassName="block"
      className={cn(
        'group block aspect-square rounded-md transition-[filter] hover:brightness-95 focus-visible:ring-2 focus-visible:outline-none',
        SESSION_VISUAL.badgeClassName,
        SESSION_VISUAL.ringClassName,
      )}
    >
      {() => (
        <Stack as="span" gap="none" align="center" justify="center" className="h-full leading-none">
          <span className="text-xs font-semibold tabular-nums">{day.day}</span>
          <span className="mt-1 text-[9px] font-bold tracking-wide uppercase">
            S{session.number}
          </span>
          <span className="sr-only">{session.name}</span>
        </Stack>
      )}
    </SessionReference>
  )
}
