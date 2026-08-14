import { MapPin } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityReference } from '#/components/entity-reference'
import { EventReference } from '#/components/event-reference'
import { LocationReference } from '#/components/location-reference'
import { Avatar } from '#/components/ui/avatar'
import { Inline, Stack } from '#/components/ui/layout'
import type { EventMark } from '#/definitions/event'
import { ENTITY_KIND_VISUALS } from '#/lib/entity-kind-visuals'
import { EventMarkIcon } from '#/lib/event-icons'
import type {
  SessionJournalDay,
  SessionJournalEvent,
  SessionJournalQuest,
  SessionJournalReference,
} from '#/lib/session-journal-data'
import { cn } from '#/lib/utils'

const JOURNAL_COPY_COLORS = cn(
  '[&_[data-entity-kind=session]]:text-blue-600 dark:[&_[data-entity-kind=session]]:text-blue-300',
  '[&_[data-entity-kind=event]]:text-amber-600 dark:[&_[data-entity-kind=event]]:text-amber-300',
  '[&_[data-entity-kind=location]]:text-emerald-600 dark:[&_[data-entity-kind=location]]:text-emerald-300',
  '[&_[data-entity-kind=npc]]:text-violet-600 dark:[&_[data-entity-kind=npc]]:text-violet-300',
  '[&_[data-entity-kind=beast]]:text-orange-600 dark:[&_[data-entity-kind=beast]]:text-orange-300',
  '[&_[data-entity-kind=pc]]:text-cyan-600 dark:[&_[data-entity-kind=pc]]:text-cyan-300',
  '[&_[data-entity-kind=quest]]:text-rose-600 dark:[&_[data-entity-kind=quest]]:text-rose-300',
  '[&_[data-entity-kind=organization]]:text-teal-600 dark:[&_[data-entity-kind=organization]]:text-teal-300',
  '[&_[data-entity-kind=item]]:text-fuchsia-600 dark:[&_[data-entity-kind=item]]:text-fuchsia-300',
)

export function SessionJournal({ days }: { days: SessionJournalDay[] }) {
  const events = days.flatMap((day) => day.events)

  return (
    <Stack as="section" gap="2xl" aria-labelledby="session-journal-heading">
      <div>
        <h2 id="session-journal-heading" className="text-lg font-semibold">
          Journal
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Every recorded event and note from this session, in order.
        </p>
      </div>

      <nav aria-label="Journal contents" className="border-border border-y py-4">
        <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
          Contents
        </p>
        <ol className="flex flex-wrap gap-2">
          {events.map((event) => (
            <li key={event.slug}>
              <a
                href={`#journal-event-${event.slug}`}
                className="border-border hover:bg-muted focus-visible:ring-ring inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="font-semibold">{event.index}</span>
                <span className="text-muted-foreground max-w-40 truncate">{event.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Stack gap="3xl">
        {days.map((day) => (
          <section key={day.day} aria-labelledby={`journal-day-${day.day}`}>
            <header className="border-border mb-8 border-b pb-3">
              <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                {day.events.length} recorded {day.events.length === 1 ? 'event' : 'events'}
              </p>
              <h3 id={`journal-day-${day.day}`} className="mt-1 text-2xl font-bold">
                Campaign day {day.day}
              </h3>
            </header>

            <Stack gap="xl">
              {day.events.map((event) => (
                <div key={event.slug}>
                  {event.transition ? <JournalMovement transition={event.transition} /> : null}
                  <JournalEvent event={event} />
                </div>
              ))}
            </Stack>
          </section>
        ))}
      </Stack>
    </Stack>
  )
}

function JournalMovement({ transition }: { transition: { slug: string; name: string } }) {
  return (
    <div className="border-border bg-muted/30 mx-auto mb-6 flex max-w-xl items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm">
      <MapPin className={cn('size-4', ENTITY_KIND_VISUALS.location.accentClassName)} aria-hidden />
      <span className="text-muted-foreground">The party moved to</span>
      <LocationReference
        slug={transition.slug}
        label={transition.name}
        unstyled
        className={cn('font-semibold', ENTITY_KIND_VISUALS.location.accentClassName)}
      />
    </div>
  )
}

function JournalEvent({ event }: { event: SessionJournalEvent }) {
  const headingId = `journal-event-heading-${event.slug}`
  const hasReferences = event.references.length > 0

  return (
    <article
      id={`journal-event-${event.slug}`}
      aria-labelledby={headingId}
      className="border-border bg-card/30 scroll-mt-20 overflow-hidden rounded-xl border"
    >
      <div className={cn('grid', hasReferences && 'lg:grid-cols-[minmax(0,1fr)_13rem]')}>
        <div className="min-w-0">
          <header className="border-border border-b p-5 sm:p-6">
            <Inline gap="lg" align="start">
              <JournalEventMark mark={event.mark} />
              <div className="min-w-0">
                <h4
                  id={headingId}
                  className="text-xl leading-tight font-bold text-balance sm:text-2xl"
                >
                  <EventReference slug={event.slug} label={event.name} unstyled>
                    {({ label }) => label}
                  </EventReference>
                </h4>
                {event.location ? (
                  <LocationReference
                    slug={event.location.slug}
                    label={event.location.name}
                    unstyled
                    className={cn(
                      'mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline',
                      ENTITY_KIND_VISUALS.location.accentClassName,
                    )}
                  >
                    {({ label, icon }) => (
                      <>
                        {icon}
                        <span>{label}</span>
                      </>
                    )}
                  </LocationReference>
                ) : null}
              </div>
            </Inline>
          </header>

          <div className="p-5 sm:p-6">
            <ContentRenderer
              content={event.notes}
              className={cn(
                'gap-5 text-base leading-7 [&_a]:font-semibold [&_a]:underline [&_a]:decoration-current/25 [&_a]:underline-offset-4',
                JOURNAL_COPY_COLORS,
              )}
            />
            <JournalQuests quests={event.quests} />
          </div>
        </div>

        {hasReferences ? <JournalReferences references={event.references} /> : null}
      </div>
    </article>
  )
}

function JournalEventMark({ mark }: { mark: EventMark }) {
  if (mark.type === 'avatar') {
    return (
      <Avatar
        src={mark.url}
        sizes="(min-width: 640px) 64px, 56px"
        maxWidth={128}
        className={cn(
          'size-14 border-2 shadow-sm sm:size-16',
          ENTITY_KIND_VISUALS.event.borderClassName,
        )}
      />
    )
  }

  return (
    <span
      className={cn(
        'flex size-14 shrink-0 items-center justify-center rounded-xl border shadow-sm sm:size-16',
        ENTITY_KIND_VISUALS.event.borderClassName,
        ENTITY_KIND_VISUALS.event.surfaceClassName,
        ENTITY_KIND_VISUALS.event.accentClassName,
      )}
    >
      <EventMarkIcon name={mark.name} className="size-7 sm:size-8" />
    </span>
  )
}

function JournalReferences({ references }: { references: SessionJournalReference[] }) {
  return (
    <aside
      className="border-border bg-muted/10 border-t p-4 lg:border-t-0 lg:border-l"
      aria-label="References in this event"
    >
      <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
        In this event
      </p>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {references.map((reference) => {
          const visual = ENTITY_KIND_VISUALS[reference.kind]
          const kindLabel =
            reference.kind === 'pc' ? 'Party' : reference.kind === 'npc' ? 'NPC' : 'Beast'

          return (
            <li key={`${reference.kind}-${reference.slug}`}>
              <EntityReference
                kind={reference.kind}
                slug={reference.slug}
                label={reference.name}
                unstyled
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-2.5 py-2',
                  visual.borderClassName,
                  visual.surfaceClassName,
                  visual.hoverClassName,
                )}
              >
                {({ label }) => (
                  <>
                    <Avatar
                      src={reference.avatar}
                      sizes="32px"
                      maxWidth={64}
                      className={cn('size-8 border-2', visual.borderClassName)}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold">{label}</span>
                      <span
                        className={cn(
                          'block text-[10px] font-semibold uppercase',
                          visual.accentClassName,
                        )}
                      >
                        {kindLabel}
                      </span>
                    </span>
                  </>
                )}
              </EntityReference>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

function JournalQuests({ quests }: { quests: SessionJournalQuest[] }) {
  if (quests.length === 0) return null

  return (
    <div className="border-border mt-6 border-t pt-4">
      <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
        Quests & mysteries
      </p>
      <ul className="flex flex-wrap gap-2">
        {quests.map((quest) => (
          <li key={quest.slug}>
            <EntityReference
              kind="quest"
              slug={quest.slug}
              label={quest.name}
              unstyled
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs',
                ENTITY_KIND_VISUALS.quest.borderClassName,
                ENTITY_KIND_VISUALS.quest.surfaceClassName,
                ENTITY_KIND_VISUALS.quest.hoverClassName,
              )}
            >
              {({ label, icon }) => (
                <>
                  <span className={ENTITY_KIND_VISUALS.quest.accentClassName}>{icon}</span>
                  <span className="font-semibold">{label}</span>
                  <span className="text-muted-foreground capitalize">· {quest.type}</span>
                </>
              )}
            </EntityReference>
          </li>
        ))}
      </ul>
    </div>
  )
}
