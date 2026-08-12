import { EventReference } from '#/components/event-reference'
import { LocationReference } from '#/components/location-reference'
import { Avatar } from '#/components/ui/avatar'
import { Grid, Inline, Inset, Stack } from '#/components/ui/layout'
import type { SessionTimelineDay } from '#/lib/entity-page-data'
import { DAY_MARK_ICON, EventMarkIcon } from '#/lib/event-icons'
import { cn } from '#/lib/utils'

function TimelineBullet({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Inline
      as="span"
      gap="none"
      justify="center"
      className={cn('ring-background relative size-10 shrink-0 rounded-full ring-4', className)}
    >
      {children}
    </Inline>
  )
}

function DayHeading({ day, isFirst }: { day: number; isFirst: boolean }) {
  return (
    <Inset
      as="div"
      block="sm"
      className={cn(
        'bg-background text-muted-foreground sticky top-14 z-20 text-base font-semibold tracking-wider uppercase',
        !isFirst && 'border-border border-t',
      )}
    >
      <Inline as="h3" gap="md">
        <TimelineBullet className="border-2 border-amber-400/70 bg-amber-50 shadow-sm dark:bg-amber-950/50">
          <EventMarkIcon name={DAY_MARK_ICON} className="size-4 text-amber-500" />
        </TimelineBullet>
        <span>day {day}</span>
      </Inline>
    </Inset>
  )
}

function EventBullet({ mark }: { mark: SessionTimelineDay['events'][number]['mark'] }) {
  return (
    <TimelineBullet className="border-border bg-card group-hover:border-primary/50 border transition-transform duration-150 group-hover:scale-105">
      {mark.type === 'avatar' ? (
        <Avatar src={mark.url} className="size-full rounded-full" />
      ) : (
        <EventMarkIcon name={mark.name} className="text-muted-foreground size-4" />
      )}
    </TimelineBullet>
  )
}

function EventCard({ event }: { event: SessionTimelineDay['events'][number] }) {
  return (
    <Grid gap="md" template="auto-content" align="start" className="group relative">
      <EventBullet mark={event.mark} />
      <Stack
        gap="xs"
        className="border-border group-hover:border-primary/40 group-hover:bg-accent/20 min-w-0 rounded-lg border px-4 py-3 transition-colors"
      >
        <p className="font-medium">
          <EventReference
            slug={event.slug}
            label={event.name}
            unstyled
            className="after:absolute after:inset-0"
          >
            {({ label }) => label}
          </EventReference>
        </p>
        <Inline gap="sm" wrap>
          {event.locationSlug ? (
            <span className="relative z-10">
              <LocationReference slug={event.locationSlug} />
            </span>
          ) : null}
        </Inline>
      </Stack>
    </Grid>
  )
}

function DayEvents({ events }: { events: SessionTimelineDay['events'] }) {
  if (events.length === 0) return null

  return (
    <div className="relative">
      <div
        className="border-muted-foreground/25 absolute top-2 bottom-2 left-5 w-0 border-l border-dashed"
        aria-hidden
      />
      <Stack as="ol" gap="md">
        {events.map((event) => (
          <li key={event.slug}>
            <EventCard event={event} />
          </li>
        ))}
      </Stack>
    </div>
  )
}

export function SessionTimeline({ days }: { days: SessionTimelineDay[] }) {
  return (
    <Stack as="section" gap="xl">
      <h2 className="text-lg font-semibold">Timeline</h2>

      <Stack gap="xl">
        {days.map((day, index) => (
          <Stack key={`day-${day.day}`} gap="lg">
            <DayHeading day={day.day} isFirst={index === 0} />
            <DayEvents events={day.events} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
