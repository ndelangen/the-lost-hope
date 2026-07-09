import { Link } from '@tanstack/react-router'

import type { Event } from '#/definitions/event.ts'
import type { Session } from '#/definitions/session.ts'
import { EntityLink } from '@/components/content-renderer'
import { entityHref, eventLocation, sessionDays } from '@/lib/campaign'
import { EventMarkIcon } from '@/lib/event-icons'
import { cn } from '@/lib/utils'

function TimelineBullet({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'ring-background relative flex size-10 shrink-0 items-center justify-center rounded-full ring-4',
        className,
      )}
    >
      {children}
    </div>
  )
}

function DayHeading({ day, date, isFirst }: { day: number; date: Date; isFirst: boolean }) {
  return (
    <h3
      className={cn(
        'bg-background text-muted-foreground sticky top-14 z-20 -mx-4 px-4 py-4 text-base font-semibold tracking-wider uppercase',
        !isFirst && 'border-border border-t',
      )}
    >
      Day {day}
      <span className="text-muted-foreground/70 ml-2 font-normal normal-case">
        · {date.toLocaleDateString(undefined, { dateStyle: 'long' })}
      </span>
    </h3>
  )
}

function EventBullet({ event }: { event: Event }) {
  const { mark } = event

  return (
    <TimelineBullet className="border-border bg-card group-hover:border-primary/50 border transition-transform duration-150 group-hover:scale-105">
      {mark.type === 'avatar' ? (
        <img src={mark.url} alt="" className="size-full rounded-full object-cover" />
      ) : (
        <EventMarkIcon name={mark.name} className="text-muted-foreground size-4" />
      )}
    </TimelineBullet>
  )
}

function EventCard({ event }: { event: Event }) {
  const place = eventLocation(event)
  return (
    <Link to={entityHref('event', event.slug)} className="group flex items-start gap-3">
      <EventBullet event={event} />
      <div className="border-border group-hover:border-primary/40 group-hover:bg-accent/20 min-w-0 flex-1 space-y-1.5 rounded-lg border px-4 py-3 transition-colors">
        <p className="font-medium">{event.name}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-xs">
            {event.date.toLocaleTimeString(undefined, { timeStyle: 'short' })}
          </span>
          {place ? <EntityLink kind="location" slug={place.slug} label={place.name} /> : null}
        </div>
      </div>
    </Link>
  )
}

function DayEvents({ events }: { events: Event[] }) {
  if (events.length === 0) return null

  return (
    <div className="relative">
      <div
        className="border-muted-foreground/25 absolute top-2 bottom-2 left-5 w-0 border-l border-dashed"
        aria-hidden
      />
      <ol className="space-y-3">
        {events.map((event) => (
          <li key={event.slug}>
            <EventCard event={event} />
          </li>
        ))}
      </ol>
    </div>
  )
}

export function SessionTimeline({ session }: { session: Session }) {
  const days = sessionDays(session)

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">Timeline</h2>

      <div className="space-y-6">
        {days.map((day, index) => (
          <div key={`day-${day.day}`} className={cn('space-y-4', index > 0 && 'mt-6')}>
            <DayHeading day={day.day} date={day.date} isFirst={index === 0} />
            <DayEvents events={day.events} />
          </div>
        ))}
      </div>
    </section>
  )
}
