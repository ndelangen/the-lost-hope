import { Construction, Skull, Users } from 'lucide-react'
import { useMemo } from 'react'

import { Avatar } from '#/components/ui/avatar'
import { refs } from '#/data/generated/refs'
import { ITEM_STATUS_LABELS } from '#/definitions/item'
import type { EntityRef } from '#/definitions/kind'
import { sortedEvents } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import {
  fleetRoster,
  lastSeenAt,
  markersAboard,
  type FleetMarker,
  type FleetShip,
  type FleetSide,
  type FleetSighting,
} from '#/lib/fleet-roster'
import { ItemIcon } from '#/lib/item-icons'
import { OrganizationIcon } from '#/lib/organization-icons'
import { cn } from '#/lib/utils'

type Tone = { text: string; bar: string; ring: string; glow: string }

/** The owner's side reads as cool and loyal; any side that seized ships reads as hostile. */
const OWNER_TONE: Tone = {
  text: 'text-sky-300',
  bar: 'bg-sky-400',
  ring: 'ring-sky-400/40',
  glow: 'shadow-[0_0_60px_rgb(56_189_248/0.25)]',
}
const RIVAL_TONE: Tone = {
  text: 'text-red-400',
  bar: 'bg-red-500',
  ring: 'ring-red-500/40',
  glow: 'shadow-[0_0_60px_rgb(239_68_68/0.25)]',
}

function resolveNamed(ref: EntityRef) {
  const registry: Readonly<Record<string, object>> = SOURCE_REGISTRIES[ref.ref]
  const record = Object.hasOwn(registry, ref.key)
    ? (registry[ref.key] as { name: string; icon?: string; avatar?: string })
    : undefined
  return record ? { name: record.name, icon: record.icon, avatar: record.avatar } : undefined
}

/**
 * An organization's fleet on the player screen, readable from across the table: who controls each
 * ship, which ships were lost, and what is still being built.
 */
/** Who the roster pins to a ship: the party, and the fleet's commander. */
const TRACKED_NPCS = [refs.npcs.onana_tempest]

function fleetSightings(): FleetSighting[] {
  const events = sortedEvents().map((event) => event.data)
  const sightings: FleetSighting[] = []
  const partyAt = events[0]?.location
  if (partyAt?.ref === 'location') {
    sightings.push({ id: 'party', label: 'The party', location: partyAt.key })
  }
  for (const ref of TRACKED_NPCS) {
    const npc = resolveNamed(ref) as { name: string; avatar?: string } | undefined
    const location = lastSeenAt(ref, events)
    if (npc && location) {
      sightings.push({
        id: `npc:${ref.key}`,
        label: npc.name.split(' ')[0]!,
        avatar: npc.avatar,
        location,
      })
    }
  }
  return sightings
}

export function FleetRosterOnScreen({ owner }: { owner: string }) {
  const roster = useMemo(
    () =>
      fleetRoster(
        owner,
        SOURCE_REGISTRIES.item,
        resolveNamed,
        markersAboard(fleetSightings(), SOURCE_REGISTRIES.location),
      ),
    [owner],
  )
  if (!roster) return null

  const fleet = roster.sides.flatMap((side, index) =>
    side.ships.map((ship) => ({ ship, tone: index === 0 ? OWNER_TONE : RIVAL_TONE })),
  )
  const inService = roster.sides.reduce((sum, side) => sum + side.inService, 0)
  const lost = roster.sides.reduce((sum, side) => sum + side.lost, 0)

  return (
    <div className="absolute inset-0 flex flex-col gap-[3vh] overflow-hidden bg-[radial-gradient(ellipse_at_top,rgb(30_58_95)_0%,rgb(8_12_24)_65%)] px-[5vw] py-[5vh]">
      <header className="flex flex-wrap items-end justify-between gap-x-[3vw] gap-y-[1vh]">
        <div>
          <p className="text-[clamp(0.9rem,1.8vh,1.5rem)] font-semibold tracking-[0.3em] text-white/50 uppercase">
            Fleet roster
          </p>
          <h1 className="text-[clamp(2rem,6vh,5rem)] leading-none font-bold tracking-tight">
            {roster.owner.name} battle-cruisers
          </h1>
        </div>
        <p className="text-[clamp(1rem,2.6vh,2rem)] text-white/70 tabular-nums">
          {fleet.length} ships · <span className="text-white">{inService} in service</span> ·{' '}
          <span className="text-white/50">{lost} lost</span>
        </p>
      </header>

      <ol aria-label="Control of every ship" className="flex h-[1.6vh] min-h-3 gap-[0.3vw]">
        {fleet.map(({ ship, tone }) => (
          <li
            key={ship.key}
            title={ship.name}
            className={cn(
              'flex-1 rounded-full',
              tone.bar,
              ship.status === 'destroyed' && 'opacity-25',
            )}
          />
        ))}
      </ol>

      <div
        className="grid min-h-0 flex-1 gap-[3vw]"
        style={{ gridTemplateColumns: `repeat(${roster.sides.length}, minmax(0, 1fr))` }}
      >
        {roster.sides.map((side, index) => (
          <FleetSideColumn
            key={side.key}
            side={side}
            tone={index === 0 ? OWNER_TONE : RIVAL_TONE}
          />
        ))}
      </div>

      {roster.building.length > 0 ? (
        <footer className="flex flex-wrap items-center gap-x-[2vw] gap-y-[1vh] rounded-2xl bg-amber-400/10 px-[2vw] py-[1.5vh] text-[clamp(1rem,2.6vh,2rem)] ring-1 ring-amber-400/30">
          <span className="flex items-center gap-[0.8vw] font-semibold text-amber-300">
            <Construction className="size-[1.2em]" aria-hidden />
            {ITEM_STATUS_LABELS['under-construction']}
          </span>
          {roster.building.map((ship) => (
            <span key={ship.key} className="flex items-center gap-[0.6vw]">
              <ItemIcon icon={ship.icon} className="size-[1.1em] text-amber-200" />
              {ship.name}
            </span>
          ))}
        </footer>
      ) : null}
    </div>
  )
}

function FleetSideColumn({ side, tone }: { side: FleetSide; tone: Tone }) {
  return (
    <section
      aria-label={side.name}
      className={cn(
        'flex min-h-0 flex-col gap-[2vh] rounded-3xl bg-black/40 p-[2vw] ring-1',
        tone.ring,
        tone.glow,
      )}
    >
      <header className="flex items-center justify-between gap-[1vw]">
        <h2
          className={cn(
            'flex min-w-0 items-center gap-[0.8vw] text-[clamp(1.5rem,4vh,3.5rem)] leading-tight font-bold',
            tone.text,
          )}
        >
          <OrganizationIcon icon={side.icon} className="size-[1em]" />
          <span className="truncate">{side.name}</span>
        </h2>
        <p className="shrink-0 text-right text-[clamp(1rem,2.4vh,1.9rem)] leading-tight tabular-nums">
          <span className="font-bold text-white">{side.inService}</span>
          <span className="text-white/60"> in service</span>
          <br />
          <span className="text-white/50">{side.lost} lost</span>
        </p>
      </header>
      <ul className="grid min-h-0 auto-rows-fr gap-[1vh]">
        {side.ships.map((ship) => (
          <FleetShipRow key={ship.key} ship={ship} tone={tone} />
        ))}
      </ul>
    </section>
  )
}

function FleetShipRow({ ship, tone }: { ship: FleetShip; tone: Tone }) {
  const lost = ship.status === 'destroyed'
  return (
    <li
      className={cn(
        'flex min-h-0 items-center gap-[1vw] rounded-xl px-[1vw] text-[clamp(1rem,2.6vh,2.1rem)]',
        lost ? 'bg-white/[0.03] text-white/35' : 'bg-white/10 text-white',
      )}
    >
      <ItemIcon
        icon={ship.icon}
        className={cn('size-[1.2em]', lost ? 'text-white/30' : tone.text)}
      />
      <span className={cn('min-w-0 flex-1 truncate font-medium', lost && 'line-through')}>
        {ship.name}
      </span>
      {ship.aboard.map((marker) => (
        <AboardMarker key={marker.id} marker={marker} />
      ))}
      {lost ? (
        <span className="flex shrink-0 items-center gap-[0.4vw] text-[0.7em] tracking-wider uppercase">
          <Skull className="size-[1.1em]" aria-hidden />
          {ITEM_STATUS_LABELS.destroyed}
        </span>
      ) : null}
    </li>
  )
}

/** A pin on a ship row: who is aboard, as a portrait when there is one. */
function AboardMarker({ marker }: { marker: FleetMarker }) {
  return (
    <span className="flex shrink-0 items-center gap-[0.5vw] rounded-full bg-emerald-400 py-[0.2vh] pr-[0.9vw] pl-[0.2vw] text-[0.75em] font-semibold text-black shadow-[0_0_30px_rgb(52_211_153/0.5)]">
      {marker.avatar ? (
        <Avatar
          src={marker.avatar}
          sizes="64px"
          maxWidth={128}
          loading="eager"
          className="size-[1.6em]"
        />
      ) : (
        <span className="grid size-[1.6em] place-items-center rounded-full bg-black/15">
          <Users className="size-[1em]" aria-hidden />
        </span>
      )}
      {marker.label}
    </span>
  )
}
