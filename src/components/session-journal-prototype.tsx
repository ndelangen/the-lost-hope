import { Link } from '@tanstack/react-router'
import { ArrowLeft, Compass, FlaskConical, MapPin, MapPinned, Network, Theater } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityReference } from '#/components/entity-reference'
import { EventReference } from '#/components/event-reference'
import { LocationReference } from '#/components/location-reference'
import { PcReference } from '#/components/pc-reference'
import { PrototypeSwitcher, type PrototypeVariantOption } from '#/components/prototype-switcher'
import { Avatar } from '#/components/ui/avatar'
import { Inline, Stack } from '#/components/ui/layout'
import type { EventMark } from '#/definitions/event'
import { ENTITY_KIND_VISUALS } from '#/lib/entity-kind-visuals'
import { EventMarkIcon } from '#/lib/event-icons'
import { SessionIcon } from '#/lib/session-icons'
import type {
  JournalEvent,
  JournalMention,
  JournalQuestReference,
  SessionJournalPrototypeModel,
} from '#/lib/session-journal-prototype-data'
import { cn } from '#/lib/utils'

import './session-journal-prototype.css'

export const JOURNAL_PROTOTYPE_VARIANTS = [
  { id: 'chronicle', name: 'Illuminated Chronicle' },
  { id: 'atlas', name: 'Cartographer’s Descent' },
  { id: 'reel', name: 'Graphic-Novel Reel' },
  { id: 'evidence', name: 'Evidence Constellation' },
  { id: 'stage', name: 'Living Stage' },
  { id: 'score', name: 'Party Score' },
] as const satisfies readonly PrototypeVariantOption<string>[]

export type JournalPrototypeVariant = (typeof JOURNAL_PROTOTYPE_VARIANTS)[number]['id']

export function parseJournalPrototypeVariant(value: unknown): JournalPrototypeVariant {
  return JOURNAL_PROTOTYPE_VARIANTS.some((variant) => variant.id === value)
    ? (value as JournalPrototypeVariant)
    : 'chronicle'
}

/**
 * PROTOTYPE ONLY: six variants of the session page, switchable with ?variant=.
 * Every variant renders the same complete canonical journal payload.
 */
export function SessionJournalPrototype({
  model,
  variant,
  onVariantChange,
}: {
  model: SessionJournalPrototypeModel
  variant: JournalPrototypeVariant
  onVariantChange: (variant: JournalPrototypeVariant) => void
}) {
  const variants: Record<JournalPrototypeVariant, ReactNode> = {
    chronicle: <IlluminatedChronicle model={model} />,
    atlas: <CartographersDescent model={model} />,
    reel: <GraphicNovelReel model={model} />,
    evidence: <EvidenceConstellation model={model} />,
    stage: <LivingStage model={model} />,
    score: <PartyScore model={model} />,
  }

  return (
    <>
      {variants[variant]}
      <PrototypeSwitcher
        variants={JOURNAL_PROTOTYPE_VARIANTS}
        current={variant}
        onChange={onVariantChange}
      />
    </>
  )
}

function PrototypeBackLink({ className }: { className?: string }) {
  return (
    <Link to="/sessions" className={cn('inline-flex items-center gap-1.5 text-sm', className)}>
      <ArrowLeft className="size-3.5" aria-hidden />
      All sessions
    </Link>
  )
}

function PrototypeStamp({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase',
        className,
      )}
    >
      <FlaskConical className="size-3" aria-hidden /> Prototype reference
    </span>
  )
}

function EventMarkVisual({
  mark,
  className,
  iconClassName,
}: {
  mark: EventMark
  className?: string
  iconClassName?: string
}) {
  return mark.type === 'avatar' ? (
    <Avatar src={mark.url} className={cn('size-12', className)} />
  ) : (
    <span className={cn('inline-flex items-center justify-center', className)}>
      <EventMarkIcon name={mark.name} className={cn('size-5', iconClassName)} />
    </span>
  )
}

function EventHeading({ event, className }: { event: JournalEvent; className?: string }) {
  return (
    <h3 className={className}>
      <EventReference slug={event.slug} label={event.name} unstyled>
        {({ label }) => label}
      </EventReference>
    </h3>
  )
}

function EventLocationLine({
  event,
  className,
  path = false,
}: {
  event: JournalEvent
  className?: string
  path?: boolean
}) {
  if (!event.location) return null
  return (
    <Inline gap="xs" wrap className={className}>
      <LocationReference slug={event.location.slug} label={event.location.name} />
      {path && event.location.path.length > 1 ? (
        <span className="opacity-65">· {event.location.path.slice(0, -1).join(' / ')}</span>
      ) : null}
    </Inline>
  )
}

function ReferenceCloud({
  mentions,
  className,
  itemClassName,
  avatars = false,
  limit,
}: {
  mentions: JournalMention[]
  className?: string
  itemClassName?: string
  avatars?: boolean
  limit?: number
}) {
  const visible = limit ? mentions.slice(0, limit) : mentions
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {visible.map((mention) => (
        <li key={`${mention.kind}-${mention.slug}`}>
          <EntityReference
            kind={mention.kind}
            slug={mention.slug}
            label={mention.name}
            unstyled
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs',
              itemClassName,
            )}
          >
            {({ label, icon }) => (
              <>
                {avatars && mention.avatar ? (
                  <Avatar src={mention.avatar} className="size-5" />
                ) : (
                  icon
                )}
                <span>{label}</span>
              </>
            )}
          </EntityReference>
        </li>
      ))}
    </ul>
  )
}

function PartyPortraits({
  model,
  className,
  labelClassName,
}: {
  model: SessionJournalPrototypeModel
  className?: string
  labelClassName?: string
}) {
  return (
    <ul
      className={cn('flex flex-wrap gap-3', className)}
      aria-label="Party referenced in this session"
    >
      {model.party.map((pc) => (
        <li key={pc.slug}>
          <PcReference slug={pc.slug} label={pc.name} unstyled>
            {({ label }) => (
              <span className="group flex items-center gap-2">
                <Avatar src={pc.avatar} alt="" className="size-9 ring-2 ring-current/20" />
                <span className={cn('text-xs font-medium', labelClassName)}>{label}</span>
              </span>
            )}
          </PcReference>
        </li>
      ))}
    </ul>
  )
}

function IlluminatedChronicle({ model }: { model: SessionJournalPrototypeModel }) {
  return (
    <article className="journal-prototype journal-chronicle overflow-hidden rounded-[2rem] border border-[#8c6a3d]/30 text-[#30241a] shadow-2xl dark:text-[#f2dfbd]">
      <header className="relative overflow-hidden border-b border-double border-[#8c6a3d]/40 px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute inset-5 rounded-[1.5rem] border border-[#9b753e]/30" />
        <PrototypeBackLink className="absolute top-8 left-8 z-10 text-current/65 hover:text-current" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
          <PrototypeStamp className="border-[#8c6a3d]/50 text-[#7b5629] dark:text-[#d7b57a]" />
          <span className="flex size-20 items-center justify-center rounded-full border-2 border-[#9b753e]/60 bg-[#9b753e]/10 shadow-inner">
            <SessionIcon icon={model.icon} className="size-10 text-[#8c5f24] dark:text-[#e4bf7d]" />
          </span>
          <p className="font-serif text-xs tracking-[0.42em] uppercase">
            Session {model.number} · {model.dateLabel}
          </p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[0.95] font-semibold text-balance sm:text-7xl">
            {model.name}
          </h1>
          <p className="max-w-xl font-serif text-lg italic opacity-70">
            An illuminated account in {model.eventCount} passages
          </p>
          <PartyPortraits model={model} className="mt-4 justify-center" />
        </div>
      </header>

      <nav
        aria-label="Session journal contents"
        className="border-b border-[#8c6a3d]/30 px-6 py-8 sm:px-12"
      >
        <p className="mb-5 text-center font-serif text-sm tracking-[0.3em] uppercase opacity-65">
          Table of passages
        </p>
        <ol className="mx-auto grid max-w-5xl gap-x-10 gap-y-2 sm:grid-cols-2">
          {model.days.flatMap((day) =>
            day.events.map((event) => (
              <li key={event.slug} className="border-b border-dotted border-[#8c6a3d]/30 py-2">
                <a
                  href={`#journal-event-${event.slug}`}
                  className="group flex gap-3 font-serif text-sm"
                >
                  <span className="text-[#986622] italic">{roman(event.index)}.</span>
                  <span className="group-hover:text-[#986622]">{event.name}</span>
                </a>
              </li>
            )),
          )}
        </ol>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-14 sm:px-12">
        {model.days.map((day) => (
          <section key={day.day} aria-labelledby={`chronicle-day-${day.day}`} className="mb-20">
            <div className="mb-12 flex items-center gap-5">
              <span className="h-px flex-1 bg-[#8c6a3d]/35" />
              <h2
                id={`chronicle-day-${day.day}`}
                className="font-serif text-lg tracking-[0.24em] uppercase"
              >
                Campaign day {day.day}
              </h2>
              <span className="h-px flex-1 bg-[#8c6a3d]/35" />
            </div>
            <div className="space-y-20">
              {day.events.map((event) => (
                <article
                  key={event.slug}
                  id={`journal-event-${event.slug}`}
                  className="scroll-mt-24 border-b border-[#8c6a3d]/25 pb-16 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-12"
                >
                  <div className="relative min-w-0">
                    <EventMarkVisual
                      mark={event.mark}
                      className="float-left mr-4 mb-2 size-14 rounded-full border-2 border-[#9b753e]/50 bg-[#9b753e]/10 p-3 text-[#986622]"
                      iconClassName="size-7"
                    />
                    <p className="mb-2 font-serif text-xs tracking-[0.22em] text-[#986622] uppercase">
                      Passage {roman(event.index)}
                    </p>
                    <EventHeading
                      event={event}
                      className="font-serif text-3xl leading-tight font-semibold text-balance"
                    />
                    <EventLocationLine
                      event={event}
                      path
                      className="mt-3 font-serif text-xs opacity-65"
                    />
                    <ContentRenderer
                      content={event.notes}
                      className="mt-7 gap-5 font-serif text-[1.04rem] leading-8 [&_a]:font-semibold [&_a]:text-[#8a5b20] dark:[&_a]:text-[#e2b66e]"
                    />
                  </div>
                  <aside
                    className="mt-8 border-l border-[#8c6a3d]/30 pl-5 lg:mt-0"
                    aria-label="Marginalia"
                  >
                    <p className="mb-3 font-serif text-[10px] tracking-[0.24em] uppercase opacity-55">
                      Marginalia
                    </p>
                    <ReferenceCloud
                      mentions={event.mentions}
                      className="flex-col items-start"
                      itemClassName="border-[#8c6a3d]/25 bg-[#fff8e8]/40 font-serif dark:bg-black/10"
                      limit={6}
                    />
                  </aside>
                </article>
              ))}
            </div>
          </section>
        ))}
        <p className="text-center font-serif text-sm tracking-[0.3em] uppercase opacity-55">
          Here ends the session
        </p>
      </div>
    </article>
  )
}

function CartographersDescent({ model }: { model: SessionJournalPrototypeModel }) {
  const events = model.days.flatMap((day) => day.events)
  return (
    <article className="journal-prototype journal-atlas overflow-hidden rounded-[2rem] border border-cyan-100/10 text-[#f3e5bd] shadow-2xl">
      <header className="border-b border-[#e5c981]/20 px-6 py-10 sm:px-10">
        <Inline justify="between" align="start" gap="lg" wrap>
          <Stack gap="lg" className="max-w-3xl">
            <PrototypeBackLink className="text-[#e5c981]/65 hover:text-[#e5c981]" />
            <PrototypeStamp className="w-fit border-[#e5c981]/30 text-[#e5c981]" />
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.26em] text-cyan-200/70 uppercase">
                Expedition log · session {model.number}
              </p>
              <h1 className="text-4xl leading-none font-black tracking-tight text-balance sm:text-6xl">
                {model.name}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-cyan-50/65">
                {model.dateLabel} · {model.eventCount} waypoints · route follows visit order, not
                distance
              </p>
            </div>
          </Stack>
          <span className="flex size-24 items-center justify-center rounded-full border border-[#e5c981]/30 bg-[#e5c981]/10">
            <Compass className="size-12 text-[#e5c981]" aria-hidden />
          </span>
        </Inline>
      </header>

      <div className="grid lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="border-b border-[#e5c981]/20 bg-[#071d22]/70 p-6 lg:border-r lg:border-b-0">
          <nav aria-label="Expedition waypoints" className="lg:sticky lg:top-20">
            <Inline
              gap="xs"
              className="mb-5 text-xs font-bold tracking-[0.2em] text-[#e5c981] uppercase"
            >
              <MapPinned className="size-4" /> Route log
            </Inline>
            <ol className="relative space-y-1 before:absolute before:top-3 before:bottom-3 before:left-[0.7rem] before:w-px before:bg-[#e5c981]/35">
              {events.map((event) => (
                <li key={event.slug} className="relative">
                  <a
                    href={`#journal-event-${event.slug}`}
                    className="group grid grid-cols-[1.4rem_1fr] gap-2 rounded-lg px-1 py-2 text-left hover:bg-white/5"
                  >
                    <span className="z-10 mt-0.5 flex size-5 items-center justify-center rounded-full border border-[#e5c981]/50 bg-[#0a282d] text-[9px] font-bold text-[#e5c981]">
                      {event.index}
                    </span>
                    <span>
                      <span className="block text-xs font-semibold text-cyan-50/90 group-hover:text-white">
                        {event.location?.name ?? event.name}
                      </span>
                      <span className="mt-0.5 block text-[10px] text-cyan-100/45">
                        {event.location?.scene}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0 px-5 py-10 sm:px-10">
          {model.days.map((day) => (
            <section key={day.day} aria-labelledby={`atlas-day-${day.day}`} className="mb-16">
              <Inline gap="md" className="mb-8">
                <span className="flex size-12 items-center justify-center rounded-full border border-[#e5c981]/35 bg-[#e5c981]/10">
                  <Compass className="size-5 text-[#e5c981]" />
                </span>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.22em] text-cyan-100/45 uppercase">
                    Expedition chapter
                  </p>
                  <h2 id={`atlas-day-${day.day}`} className="text-2xl font-black">
                    Campaign day {day.day}
                  </h2>
                </div>
              </Inline>
              <div className="space-y-10">
                {day.events.map((event) => (
                  <article
                    key={event.slug}
                    id={`journal-event-${event.slug}`}
                    className="scroll-mt-24 overflow-hidden rounded-2xl border border-cyan-100/15 bg-[#0d3035]/85 shadow-xl"
                  >
                    <div className="border-b border-cyan-100/10 bg-[#e5c981]/8 px-5 py-4 sm:px-7">
                      <Inline gap="md" align="start">
                        <EventMarkVisual
                          mark={event.mark}
                          className="size-11 rounded-xl border border-[#e5c981]/30 bg-[#e5c981]/10 p-2 text-[#e5c981]"
                        />
                        <Stack gap="xs" className="min-w-0">
                          <p className="text-[10px] font-bold tracking-[0.2em] text-[#e5c981]/70 uppercase">
                            Waypoint {event.index}
                          </p>
                          <EventHeading
                            event={event}
                            className="text-xl leading-tight font-bold text-balance sm:text-2xl"
                          />
                          <EventLocationLine
                            event={event}
                            path
                            className="text-xs text-cyan-100/55"
                          />
                        </Stack>
                      </Inline>
                    </div>
                    {event.location ? (
                      <div className="border-b border-dashed border-cyan-100/10 px-5 py-4 sm:px-7">
                        <p className="mb-2 text-[9px] font-bold tracking-[0.22em] text-cyan-100/40 uppercase">
                          Location ancestry
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          {event.location.path.map((name, index) => (
                            <span
                              key={`${event.slug}-${name}`}
                              className="inline-flex items-center gap-2 text-xs text-cyan-50/70"
                            >
                              {index > 0 ? <span className="text-[#e5c981]/50">→</span> : null}
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <div className="px-5 py-6 sm:px-7 sm:py-8">
                      <ContentRenderer
                        content={event.notes}
                        className="gap-5 text-[0.98rem] leading-7 text-cyan-50/85 [&_a]:font-semibold [&_a]:text-[#f4d98e]"
                      />
                      <ReferenceCloud
                        mentions={event.mentions}
                        className="mt-7"
                        itemClassName="border-cyan-100/15 bg-cyan-50/5 text-cyan-50/70"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
          <p className="pb-4 text-center text-xs font-bold tracking-[0.24em] text-[#e5c981]/60 uppercase">
            Expedition complete
          </p>
        </div>
      </div>
    </article>
  )
}

const REEL_CLASSES = [
  'bg-gradient-to-br from-violet-950 via-slate-950 to-black lg:mr-20',
  'bg-gradient-to-br from-rose-950 via-zinc-950 to-black lg:ml-24',
  'bg-gradient-to-br from-cyan-950 via-slate-950 to-black',
  'bg-gradient-to-br from-amber-950 via-stone-950 to-black lg:mx-12',
] as const

function GraphicNovelReel({ model }: { model: SessionJournalPrototypeModel }) {
  return (
    <article className="journal-prototype journal-reel overflow-hidden rounded-[2rem] border border-white/10 px-4 py-6 text-white shadow-2xl sm:px-8 sm:py-10">
      <header className="relative mx-auto mb-12 max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/55 px-6 py-12 sm:px-12 sm:py-20">
        <div className="absolute -top-20 -right-16 size-72 rounded-full bg-violet-500/20 blur-3xl" />
        <PrototypeBackLink className="relative text-white/55 hover:text-white" />
        <div className="relative mt-12 max-w-4xl">
          <PrototypeStamp className="mb-5 border-fuchsia-300/30 text-fuchsia-200" />
          <p className="mb-3 text-xs font-black tracking-[0.3em] text-fuchsia-300 uppercase">
            Issue {model.number} · {model.dateLabel}
          </p>
          <h1 className="text-5xl leading-[0.85] font-black tracking-[-0.06em] text-balance uppercase sm:text-8xl">
            {model.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-white/55">
            A continuous vertical reel in {model.eventCount} scenes. Scroll—nothing waits behind a
            panel.
          </p>
        </div>
      </header>

      <nav aria-label="Scene index" className="mx-auto mb-10 max-w-6xl overflow-x-auto pb-3">
        <ol className="flex min-w-max gap-2">
          {model.days.flatMap((day) =>
            day.events.map((event) => (
              <li key={event.slug}>
                <a
                  href={`#journal-event-${event.slug}`}
                  className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-black hover:border-fuchsia-300/50 hover:bg-fuchsia-400/10"
                >
                  {event.index}
                </a>
              </li>
            )),
          )}
        </ol>
      </nav>

      <div className="mx-auto max-w-6xl space-y-8 pb-10">
        {model.days.map((day) => (
          <section key={day.day} aria-labelledby={`reel-day-${day.day}`} className="space-y-8">
            <div className="flex min-h-48 items-end overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-fuchsia-600/25 via-violet-500/10 to-transparent p-7 sm:p-10">
              <div>
                <p className="text-xs font-black tracking-[0.35em] text-fuchsia-300 uppercase">
                  Chapter break
                </p>
                <h2
                  id={`reel-day-${day.day}`}
                  className="mt-2 text-5xl font-black tracking-tighter uppercase sm:text-7xl"
                >
                  Day {day.day}
                </h2>
              </div>
            </div>
            {day.events.map((event) => (
              <article
                key={event.slug}
                id={`journal-event-${event.slug}`}
                className={cn(
                  'journal-reel-panel relative scroll-mt-24 overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:min-h-[34rem]',
                  REEL_CLASSES[(event.index - 1) % REEL_CLASSES.length],
                )}
              >
                <div className="pointer-events-none absolute -right-10 -bottom-12 opacity-[0.09]">
                  <EventMarkVisual
                    mark={event.mark}
                    className="size-72 rounded-full"
                    iconClassName="size-64"
                  />
                </div>
                <div
                  className={cn(
                    'relative grid min-h-[26rem] gap-8',
                    event.index % 3 === 0
                      ? 'lg:grid-cols-[minmax(0,1fr)_0.7fr]'
                      : event.index % 3 === 1
                        ? 'lg:grid-cols-[0.7fr_minmax(0,1fr)]'
                        : 'lg:grid-cols-1',
                  )}
                >
                  <div
                    className={cn(
                      'flex flex-col justify-between gap-8',
                      event.index % 3 === 1 && 'lg:order-2',
                    )}
                  >
                    <div>
                      <Inline gap="md" align="start">
                        <span className="text-6xl leading-none font-black text-white/15">
                          {String(event.index).padStart(2, '0')}
                        </span>
                        <EventMarkVisual
                          mark={event.mark}
                          className="size-14 rounded-2xl border border-white/15 bg-white/10 p-3"
                          iconClassName="size-8"
                        />
                      </Inline>
                      <EventHeading
                        event={event}
                        className="mt-8 max-w-3xl text-3xl leading-[0.95] font-black tracking-tight text-balance uppercase sm:text-5xl"
                      />
                      <EventLocationLine
                        event={event}
                        className="mt-5 text-xs font-bold tracking-wide text-white/55 uppercase"
                      />
                    </div>
                    <ReferenceCloud
                      mentions={event.mentions}
                      itemClassName="border-white/15 bg-black/20 text-white/65 backdrop-blur"
                      avatars
                      limit={7}
                    />
                  </div>
                  <div
                    className={cn(
                      'relative rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-sm sm:p-8',
                      event.index % 3 === 1 && 'lg:order-1',
                    )}
                  >
                    <ContentRenderer
                      content={event.notes}
                      className="gap-5 text-base leading-7 text-white/85 [&_a]:font-bold [&_a]:text-fuchsia-200"
                    />
                  </div>
                </div>
              </article>
            ))}
          </section>
        ))}
        <div className="py-16 text-center">
          <p className="text-5xl font-black tracking-tighter uppercase sm:text-7xl">
            To be continued…
          </p>
        </div>
      </div>
    </article>
  )
}

function EvidenceConstellation({ model }: { model: SessionJournalPrototypeModel }) {
  return (
    <article className="journal-prototype journal-evidence overflow-hidden rounded-[2rem] border border-black/20 px-4 py-6 text-[#251b17] shadow-2xl sm:px-8 sm:py-10">
      <header className="journal-evidence-paper relative mx-auto mb-8 max-w-6xl rotate-[-0.35deg] border border-black/15 px-6 py-10 shadow-2xl sm:px-12">
        <span
          className="absolute top-4 right-5 size-3 rounded-full bg-red-800 shadow-inner"
          aria-hidden
        />
        <PrototypeBackLink className="text-[#251b17]/55 hover:text-[#8f1e24]" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <PrototypeStamp className="mb-5 rotate-[-2deg] border-red-900/40 text-red-900" />
            <p className="font-mono text-xs font-bold tracking-[0.22em] text-red-900 uppercase">
              Case file · session {model.number}
            </p>
            <h1 className="mt-2 max-w-4xl font-mono text-4xl leading-none font-black tracking-tight uppercase sm:text-6xl">
              {model.name}
            </h1>
            <p className="mt-4 font-mono text-sm text-black/55">
              Opened {model.dateLabel} · {model.eventCount} docket entries
            </p>
          </div>
          <Network className="size-24 text-red-950/20" aria-hidden />
        </div>
      </header>

      <nav
        aria-label="Case docket"
        className="mx-auto mb-10 max-w-6xl rounded-xl border border-black/20 bg-[#2f2019]/70 p-4 shadow-inner"
      >
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {model.days.flatMap((day) =>
            day.events.map((event) => (
              <li key={event.slug}>
                <a
                  href={`#journal-event-${event.slug}`}
                  className="flex items-start gap-3 rounded-lg border border-[#e8dec8]/10 bg-black/15 p-3 font-mono text-xs text-[#f1e5cf]/80 hover:bg-black/25"
                >
                  <span className="rounded bg-red-900 px-1.5 py-0.5 text-[9px] font-black text-white">
                    E-{String(event.index).padStart(2, '0')}
                  </span>
                  <span>{event.name}</span>
                </a>
              </li>
            )),
          )}
        </ol>
      </nav>

      <div className="relative mx-auto max-w-6xl pb-12 before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-6 before:w-px before:bg-red-900/40 sm:before:left-10">
        {model.days.map((day) => (
          <section key={day.day} aria-labelledby={`evidence-day-${day.day}`} className="mb-14">
            <h2
              id={`evidence-day-${day.day}`}
              className="relative z-10 mb-7 inline-block rotate-[-1deg] bg-red-900 px-4 py-2 font-mono text-sm font-black tracking-[0.2em] text-white uppercase shadow-lg"
            >
              Campaign day {day.day}
            </h2>
            <div className="space-y-10 sm:pl-8">
              {day.events.map((event) => (
                <article
                  key={event.slug}
                  id={`journal-event-${event.slug}`}
                  className={cn(
                    'journal-evidence-paper relative scroll-mt-24 border border-black/15 p-5 shadow-2xl sm:p-8',
                    event.index % 2 === 0 ? 'rotate-[0.35deg]' : 'rotate-[-0.35deg]',
                  )}
                >
                  <span
                    className="absolute -top-2 left-8 size-4 rounded-full border border-red-950/60 bg-red-800 shadow"
                    aria-hidden
                  />
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
                    <div className="min-w-0">
                      <Inline gap="md" align="start">
                        <EventMarkVisual
                          mark={event.mark}
                          className="size-12 rounded border border-black/20 bg-[#eee3ce] p-2"
                          iconClassName="size-7"
                        />
                        <div>
                          <p className="font-mono text-[10px] font-black tracking-[0.2em] text-red-900 uppercase">
                            Docket E-{String(event.index).padStart(2, '0')}
                          </p>
                          <EventHeading
                            event={event}
                            className="mt-1 font-mono text-2xl leading-tight font-black uppercase"
                          />
                          <EventLocationLine
                            event={event}
                            path
                            className="mt-2 font-mono text-xs text-black/55"
                          />
                        </div>
                      </Inline>
                      <ContentRenderer
                        content={event.notes}
                        className="mt-7 gap-5 text-[0.98rem] leading-7 text-black/80 [&_a]:font-bold [&_a]:text-red-900"
                      />
                    </div>
                    <aside
                      className="border-t border-dashed border-black/25 pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6"
                      aria-label="Evidence referenced in this entry"
                    >
                      <p className="mb-3 font-mono text-[10px] font-black tracking-[0.18em] text-red-900 uppercase">
                        Evidence in this entry
                      </p>
                      <ReferenceCloud
                        mentions={event.mentions}
                        className="flex-col items-start"
                        itemClassName="border-black/15 bg-[#fffaf0]/70 font-mono text-black/70 shadow-sm"
                        avatars
                      />
                    </aside>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
        <div className="journal-evidence-paper ml-8 rotate-[-1deg] border border-black/15 p-6 text-center font-mono text-sm font-black tracking-[0.22em] text-red-900 uppercase shadow-xl">
          File remains open
        </div>
      </div>
    </article>
  )
}

function LivingStage({ model }: { model: SessionJournalPrototypeModel }) {
  return (
    <article className="journal-prototype journal-stage overflow-hidden rounded-[2rem] border border-rose-100/10 text-[#fff2d5] shadow-2xl">
      <header className="relative border-b border-amber-200/15 px-6 py-12 text-center sm:px-12 sm:py-20">
        <PrototypeBackLink className="absolute top-8 left-8 text-amber-100/55 hover:text-amber-100" />
        <div className="mx-auto max-w-4xl">
          <PrototypeStamp className="mb-6 border-amber-200/25 text-amber-200" />
          <p className="text-xs font-bold tracking-[0.35em] text-amber-200/70 uppercase">
            The Lost Hope Players present
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-none font-bold text-balance sm:text-7xl">
            {model.name}
          </h1>
          <p className="mt-5 font-serif text-lg text-amber-100/60 italic">
            A performance in {model.days.length} act{model.days.length === 1 ? '' : 's'} and{' '}
            {model.eventCount} scenes
          </p>
          <div className="mx-auto mt-9 max-w-3xl border-y border-amber-200/15 py-5">
            <p className="mb-4 text-[10px] font-bold tracking-[0.25em] text-amber-200/55 uppercase">
              Playbill · {model.dateLabel}
            </p>
            <PartyPortraits
              model={model}
              className="justify-center"
              labelClassName="text-amber-50/75"
            />
          </div>
        </div>
      </header>

      <nav
        aria-label="Scenes"
        className="border-b border-amber-200/15 bg-black/15 px-5 py-5 sm:px-10"
      >
        <ol className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2">
          {model.days.flatMap((day) =>
            day.events.map((event) => (
              <li key={event.slug}>
                <a
                  href={`#journal-event-${event.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-black/15 px-3 py-1.5 text-xs text-amber-50/65 hover:border-amber-200/40 hover:text-amber-50"
                >
                  <Theater className="size-3.5" /> Scene {event.index}
                </a>
              </li>
            )),
          )}
        </ol>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
        {model.days.map((day) => (
          <section key={day.day} aria-labelledby={`stage-day-${day.day}`} className="mb-20">
            <div className="mb-10 text-center">
              <p className="text-[10px] font-bold tracking-[0.32em] text-amber-200/55 uppercase">
                Act {model.days.findIndex((entry) => entry.day === day.day) + 1}
              </p>
              <h2 id={`stage-day-${day.day}`} className="mt-2 font-serif text-4xl font-bold">
                Campaign day {day.day}
              </h2>
            </div>
            <div className="space-y-12">
              {day.events.map((event) => (
                <article
                  key={event.slug}
                  id={`journal-event-${event.slug}`}
                  className="journal-stage-floor relative scroll-mt-24 overflow-hidden rounded-t-[4rem] rounded-b-2xl border border-amber-100/15 shadow-2xl"
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-rose-950 to-transparent sm:w-16" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-rose-950 to-transparent sm:w-16" />
                  <header className="relative border-b border-amber-100/10 px-7 pt-10 pb-7 text-center sm:px-16">
                    <p className="text-[10px] font-bold tracking-[0.28em] text-amber-200/55 uppercase">
                      Scene {event.index} · {event.location?.scene ?? 'Unknown set'}
                    </p>
                    <EventHeading
                      event={event}
                      className="mx-auto mt-3 max-w-4xl font-serif text-3xl leading-tight font-bold text-balance sm:text-4xl"
                    />
                    <EventLocationLine
                      event={event}
                      className="mt-4 justify-center text-xs text-amber-100/45"
                    />
                  </header>
                  <div className="relative grid gap-8 px-6 py-8 sm:px-12 lg:grid-cols-[10rem_minmax(0,1fr)] lg:px-16 lg:py-12">
                    <aside aria-label="References in this entry">
                      <EventMarkVisual
                        mark={event.mark}
                        className="mx-auto size-20 rounded-full border-2 border-amber-200/25 bg-amber-100/10 p-4 shadow-[0_0_45px_rgba(255,220,150,0.15)]"
                        iconClassName="size-10"
                      />
                      <p className="mt-5 text-center text-[9px] font-bold tracking-[0.2em] text-amber-200/45 uppercase">
                        In this entry
                      </p>
                      <ReferenceCloud
                        mentions={event.mentions.filter((mention) =>
                          ['pc', 'npc', 'beast'].includes(mention.kind),
                        )}
                        className="mt-3 justify-center lg:flex-col lg:items-center"
                        itemClassName="border-amber-100/10 bg-white/5 text-amber-50/65"
                        avatars
                        limit={6}
                      />
                    </aside>
                    <ContentRenderer
                      content={event.notes}
                      className="gap-5 font-serif text-[1.05rem] leading-8 text-amber-50/85 [&_a]:font-semibold [&_a]:text-amber-200"
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
        <div className="py-12 text-center">
          <Theater className="mx-auto size-12 text-amber-200/45" />
          <p className="mt-4 font-serif text-2xl text-amber-100/65 italic">Curtain</p>
        </div>
      </div>
    </article>
  )
}

function PartyScore({ model }: { model: SessionJournalPrototypeModel }) {
  const allEvents = model.days.flatMap((day) => day.events)

  return (
    <article className="journal-prototype journal-score bg-background text-foreground">
      <header className="border-border border-b pb-10">
        <PrototypeBackLink className="text-current/50 hover:text-current" />
        <div className="mt-10">
          <PrototypeStamp className="mb-5 border-stone-500/35 text-current/65" />
          <p className="text-muted-foreground text-xs font-bold tracking-[0.28em] uppercase">
            Session {model.number} · {model.dateLabel}
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-none font-black tracking-tight text-balance sm:text-7xl">
            {model.name}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-6">
            The complete journal: {model.eventCount} recorded events across {model.days.length}{' '}
            campaign {model.days.length === 1 ? 'day' : 'days'}, with every note shown in order.
          </p>
        </div>
        <div className="border-border mt-9 border-y py-5">
          <p className="text-muted-foreground mb-4 text-[10px] font-bold tracking-[0.24em] uppercase">
            Party
          </p>
          <PartyPortraits model={model} />
        </div>
      </header>

      <nav aria-label="Journal contents" className="border-border border-b py-5">
        <ol className="mx-auto flex max-w-6xl flex-wrap gap-2">
          {model.days.flatMap((day) =>
            day.events.map((event) => (
              <li key={event.slug}>
                <a
                  href={`#journal-event-${event.slug}`}
                  className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs"
                >
                  <span className="font-bold">{event.index}</span>
                  <span className="text-muted-foreground max-w-36 truncate">{event.name}</span>
                </a>
              </li>
            )),
          )}
        </ol>
      </nav>

      <div className="mx-auto max-w-6xl py-12">
        {model.days.map((day, dayIndex) => (
          <section key={day.day} aria-labelledby={`score-day-${day.day}`} className="mb-20">
            <Inline gap="lg" className="border-border mb-10 border-b-2 pb-4">
              <span className="text-muted-foreground font-serif text-5xl">{dayIndex + 1}</span>
              <div>
                <p className="text-muted-foreground text-[10px] font-bold tracking-[0.24em] uppercase">
                  {day.events.length} recorded {day.events.length === 1 ? 'event' : 'events'}
                </p>
                <h2 id={`score-day-${day.day}`} className="font-serif text-3xl font-bold">
                  Campaign day {day.day}
                </h2>
              </div>
            </Inline>
            <div className="space-y-10">
              {day.events.map((event) => {
                const previousEvent = allEvents[event.index - 2]
                const eventReferences = event.mentions.filter((mention) =>
                  ['pc', 'npc', 'beast'].includes(mention.kind),
                )
                const movedToNewParent =
                  previousEvent?.location?.parentSlug &&
                  event.location?.parentSlug &&
                  previousEvent.location.parentSlug !== event.location.parentSlug

                return (
                  <Fragment key={event.slug}>
                    {movedToNewParent && event.location?.parentSlug ? (
                      <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border border-emerald-300/70 bg-emerald-50/60 px-5 py-3 text-sm shadow-sm dark:border-emerald-800 dark:bg-emerald-950/20">
                        <MapPin className="size-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
                        <span className="text-muted-foreground">The party moved to</span>
                        <LocationReference
                          slug={event.location.parentSlug}
                          label={event.location.parentName}
                          className="font-semibold text-emerald-700 dark:text-emerald-300"
                        />
                      </div>
                    ) : null}

                    <article
                      id={`journal-event-${event.slug}`}
                      className="border-border bg-card/35 scroll-mt-24 overflow-hidden rounded-xl border shadow-sm"
                    >
                      <div
                        className={cn(
                          'grid',
                          eventReferences.length > 0 && 'lg:grid-cols-[minmax(0,1fr)_13rem]',
                        )}
                      >
                        <div className="min-w-0">
                          <header className="journal-score-staff border-border border-b p-5 sm:p-7">
                            <Inline gap="lg" align="start">
                              <EventMarkVisual
                                mark={event.mark}
                                className={cn(
                                  'size-16 shrink-0 border shadow-sm',
                                  event.mark.type === 'avatar'
                                    ? 'rounded-full border-2 p-0'
                                    : 'rounded-2xl p-3',
                                  ENTITY_KIND_VISUALS.event.borderClassName,
                                  event.mark.type === 'icon' && [
                                    ENTITY_KIND_VISUALS.event.surfaceClassName,
                                    ENTITY_KIND_VISUALS.event.accentClassName,
                                  ],
                                )}
                                iconClassName="size-8"
                              />
                              <div className="min-w-0">
                                <p className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
                                  Event {event.index}
                                </p>
                                <EventHeading
                                  event={event}
                                  className="mt-1 font-serif text-2xl leading-tight font-bold text-balance sm:text-3xl"
                                />
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
                          <div className="p-5 sm:p-7">
                            <ContentRenderer
                              content={event.notes}
                              className="journal-score-copy gap-5 text-[0.98rem] leading-7 [&_a]:font-semibold [&_a]:underline [&_a]:decoration-current/25 [&_a]:underline-offset-4"
                            />
                            <ScoreQuestReferences quests={event.quests} />
                          </div>
                        </div>
                        {eventReferences.length > 0 ? (
                          <ScoreEventReferences references={eventReferences} />
                        ) : null}
                      </div>
                    </article>
                  </Fragment>
                )
              })}
            </div>
          </section>
        ))}
        <div className="border-border border-t py-12 text-center">
          <p className="text-muted-foreground text-xs font-bold tracking-[0.24em] uppercase">
            End of session
          </p>
        </div>
      </div>
    </article>
  )
}

function ScoreEventReferences({ references }: { references: JournalMention[] }) {
  return (
    <aside
      className="journal-score-staff border-border border-t p-5 lg:border-t-0 lg:border-l"
      aria-label="References in this event"
    >
      <p className="text-muted-foreground mb-4 text-[9px] font-bold tracking-[0.2em] uppercase">
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
                  'flex items-center gap-2.5 rounded-lg border px-2.5 py-2',
                  visual.borderClassName,
                  visual.surfaceClassName,
                  visual.hoverClassName,
                )}
              >
                {({ label, icon }) => (
                  <>
                    {reference.avatar ? (
                      <Avatar
                        src={reference.avatar}
                        className={cn('size-8 border-2', visual.borderClassName)}
                      />
                    ) : (
                      icon
                    )}
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold">{label}</span>
                      <span
                        className={cn(
                          'block text-[9px] font-bold uppercase',
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

function ScoreQuestReferences({ quests }: { quests: JournalQuestReference[] }) {
  if (quests.length === 0) return null

  return (
    <div className="border-border mt-7 border-t pt-4">
      <p className="text-muted-foreground mb-3 text-[9px] font-bold tracking-[0.22em] uppercase">
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

function roman(value: number): string {
  const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
  return numerals[value - 1] ?? String(value)
}
