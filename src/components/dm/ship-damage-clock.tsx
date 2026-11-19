import {
  Bell,
  BellOff,
  ChevronDown,
  Dices,
  LifeBuoy,
  Minus,
  Pause,
  Pin,
  PinOff,
  Play,
  Plus,
  RotateCcw,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

import { DifficultTerrainBadge } from '#/components/ship/difficult-terrain-badge'
import { SHIP_DAMAGE_DICE, type ShipDamageDie } from '#/definitions/scene'
import {
  adjustSector,
  brokenSlice,
  estimatedMinutesToBreak,
  formatCountdown,
  hitSector,
  initialShipDamage,
  pauseTimer,
  remainingMs,
  rollDamage,
  rollSlice,
  setDamageDie,
  shipSectors,
  sliceCount,
  sliceStatuses,
  startTimer,
  type ShipSectorView,
  type ShipUnderFire,
  type SliceStatus,
} from '#/lib/ship-damage'
import type { RoomFight, ShipRooms } from '#/lib/ship-rooms'
import { cn } from '#/lib/utils'

import { ActionButton, IconButton } from './encounter/icon-button'
import { ShipRoomFight } from './ship-room-fight'
import { useShipDamage } from './use-ship-damage'

const SIDE_LABEL = { port: 'Port', starboard: 'Starboard' } as const

const SLICE_WARNING: Partial<Record<SliceStatus, string>> = {
  holding: 'Holding by one side',
  threatened: 'A high roll cuts the ship',
  critical: 'Next hit cuts the ship',
  broken: 'Cut in two',
}

/** How a damage die reads on its button: a die of one side is a plain 1. */
function dieLabel(die: ShipDamageDie) {
  return die === 1 ? '1' : `d${die}`
}

function DamageDiePicker({
  value,
  disabled,
  minutes,
  onChange,
}: {
  value: ShipDamageDie
  disabled: boolean
  /** Roughly how long a fresh ship lasts on the chosen die. */
  minutes: number
  onChange: (die: ShipDamageDie) => void
}) {
  return (
    <fieldset disabled={disabled} className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <legend className="sr-only">Damage per hit</legend>
      <span aria-hidden className="text-sm font-semibold">
        Damage per hit
      </span>
      <div className="border-border flex overflow-hidden rounded-xl border-2">
        {SHIP_DAMAGE_DICE.map((die) => (
          <label
            key={die}
            className={cn(
              'border-border has-focus-visible:ring-ring/50 grid h-12 min-w-14 cursor-pointer place-items-center border-l-2 px-3 text-base font-bold tabular-nums first:border-l-0 has-focus-visible:ring-3',
              die === value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
            )}
          >
            <input
              type="radio"
              name="ship-damage-die"
              className="sr-only"
              checked={die === value}
              onChange={() => onChange(die)}
              aria-label={die === 1 ? 'Always 1 damage' : `Roll a d${die}`}
            />
            {dieLabel(die)}
          </label>
        ))}
      </div>
      <span className="text-muted-foreground text-sm">
        {value === 1
          ? 'Every hit deals 1 damage.'
          : `The clock rolls a d${value} for every hit you tap.`}{' '}
        A fresh ship lasts about {minutes} minutes.
      </span>
    </fieldset>
  )
}

/** Three short beeps, so a hit is heard across the table. */
function soundAlarm(context: AudioContext) {
  for (const offset of [0, 0.3, 0.6]) {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.frequency.value = 880
    gain.gain.setValueAtTime(0.25, context.currentTime + offset)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + offset + 0.22)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start(context.currentTime + offset)
    oscillator.stop(context.currentTime + offset + 0.25)
  }
}

function SectorTile({
  sector,
  hitPoints,
  rolled,
  locked,
  onHit,
  onAdjust,
  children,
}: {
  sector: ShipSectorView
  hitPoints: number
  /** The die picked this sector's slice, so it is one of the DM's choices for this hit. */
  rolled: boolean
  locked: boolean
  onHit: () => void
  onAdjust: (delta: number) => void
  /** What is in this room, under its damage controls. */
  children?: ReactNode
}) {
  const worn = !sector.destroyed && sector.damage * 2 > hitPoints
  const place = `${sector.name}, ${SIDE_LABEL[sector.side].toLowerCase()} side of slice ${sector.slice + 1}`
  return (
    <div
      className={cn(
        // Its three rows are the rows of the whole side, so the controls of a side line up.
        'bg-card row-span-3 grid min-w-0 grid-cols-[minmax(0,1fr)] grid-rows-subgrid gap-y-0 overflow-hidden rounded-xl border-2',
        sector.destroyed
          ? 'border-red-500/60 bg-red-500/10'
          : worn
            ? 'border-amber-500/70'
            : 'border-border',
        rolled && !sector.destroyed && 'ring-primary ring-4',
      )}
    >
      <button
        type="button"
        onClick={onHit}
        disabled={sector.destroyed || locked}
        aria-label={`Hit ${place}: ${sector.damage} of ${hitPoints} damage`}
        className="hover:bg-muted focus-visible:ring-ring/50 grid min-h-24 content-start gap-2 p-3 text-left transition-colors outline-none focus-visible:ring-3 disabled:pointer-events-none"
      >
        <span
          className={cn(
            'min-w-0 leading-tight font-semibold break-words',
            sector.destroyed && 'line-through opacity-70',
          )}
        >
          {sector.name}
        </span>
        <span aria-hidden className="flex gap-1">
          {Array.from({ length: hitPoints }, (_, at) => (
            <span
              key={at}
              className={cn(
                'h-3 flex-1 rounded-sm',
                at < sector.damage ? 'bg-red-500' : 'bg-muted',
              )}
            />
          ))}
        </span>
        <span className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
          {sector.destroyed ? (
            <DifficultTerrainBadge />
          ) : (
            <span className="tabular-nums">
              {sector.damage}/{hitPoints} damage
            </span>
          )}
          {sector.destroyed ? (
            <span>{sector.escapePods ? 'Pods gone' : 'No escape pods'}</span>
          ) : sector.escapePods ? (
            <span className="flex items-center gap-1">
              <LifeBuoy aria-hidden className="size-3.5" /> Escape pods
            </span>
          ) : (
            <span className="font-semibold text-amber-700 dark:text-amber-400">No escape pods</span>
          )}
        </span>
      </button>
      <div className="border-border grid grid-cols-2 border-t-2">
        <button
          type="button"
          onClick={() => onAdjust(-1)}
          disabled={sector.damage === 0}
          aria-label={`Take 1 damage off ${place}`}
          className="hover:bg-muted text-muted-foreground border-border grid h-11 place-items-center border-r-2 outline-none disabled:opacity-30"
        >
          <Minus aria-hidden className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => onAdjust(1)}
          disabled={sector.destroyed}
          aria-label={`Add 1 damage to ${place}`}
          className="hover:bg-muted text-muted-foreground grid h-11 place-items-center outline-none disabled:opacity-30"
        >
          <Plus aria-hidden className="size-5" />
        </button>
      </div>
      {children ? (
        <div className="border-border grid content-start gap-3 border-t-2 p-2">{children}</div>
      ) : null}
    </div>
  )
}

/** The fights of a scene in the rooms of the ship, and what the DM can do with one. */
export type ShipRoomControls = {
  rooms: ShipRooms
  /** Whether a fight is running, which a room's group can join or replace. */
  running: boolean
  onLoad: (fight: RoomFight, mode: 'add' | 'replace') => void
  /** Open the notes of a fight's beat, on pages that show them. */
  onNotes?: (fight: RoomFight) => void
}

/**
 * The at-the-table tracker for a vessel that breaks up during a fight: a repeating countdown, the
 * ship as a grid of sectors the DM taps after the die picks a slice, and the moment it is cut in
 * two. Pinned, it floats in the corner of every page and starts folded down to its timer.
 */
export function ShipDamageClock({
  sceneKey,
  vesselName,
  ship,
  pinned,
  onPinChange,
  roomControls,
}: {
  sceneKey: string
  vesselName: string
  ship: ShipUnderFire
  pinned: boolean
  onPinChange: (pinned: boolean) => void
  /** The scene's fights by room, each with its buttons to load it into the encounter. */
  roomControls?: ShipRoomControls
}) {
  const audio = useRef<AudioContext | null>(null)
  const [sound, setSound] = useState(true)
  const soundOn = useRef(sound)
  soundOn.current = sound
  const [rolled, setRolled] = useState<number>()
  const [lastHit, setLastHit] = useState<string>()
  const [confirmReset, setConfirmReset] = useState(false)
  const [open, setOpen] = useState(!pinned)
  const [deckKey, setDeckKey] = useState<string>()
  const decks = roomControls?.rooms.decks ?? []
  const deck = decks.find(({ deck: ref }) => ref.key === deckKey) ?? decks[0]
  const roomFight = (fight: RoomFight, layout: 'tile' | 'bar') =>
    roomControls ? (
      <ShipRoomFight
        key={fight.key}
        fight={fight}
        layout={layout}
        running={roomControls.running}
        onLoad={(mode) => roomControls.onLoad(fight, mode)}
        onNotes={roomControls.onNotes ? () => roomControls.onNotes?.(fight) : undefined}
      />
    ) : null

  // Browsers only allow sound after a click. The first click anywhere prepares the alarm, so a
  // clock that moved to the dock or came back after a reload still beeps.
  useEffect(() => {
    const prepare = () => {
      try {
        audio.current ??= new AudioContext()
        void audio.current.resume()
      } catch {
        // No audio: the banner still shows the hit.
      }
    }
    addEventListener('pointerdown', prepare, { once: true })
    return () => removeEventListener('pointerdown', prepare)
  }, [])

  const onHitDue = useCallback(() => {
    if (soundOn.current && audio.current) soundAlarm(audio.current)
  }, [])
  const { state, now, update, reset } = useShipDamage(sceneKey, ship, onHitDue)

  useEffect(() => {
    if (!confirmReset) return
    const timer = setTimeout(() => setConfirmReset(false), 4000)
    return () => clearTimeout(timer)
  }, [confirmReset])

  const shown = state ?? initialShipDamage(ship)
  const owed = shown.owed
  // A hit needs the grid, so it opens by itself when one is due.
  useEffect(() => {
    if (owed > 0) setOpen(true)
  }, [owed])
  const sectors = shipSectors(ship, shown)
  const statuses = sliceStatuses(ship, shown)
  const broken = brokenSlice(ship, shown)
  const critical = statuses.indexOf('critical')
  const threatened = statuses.indexOf('threatened')
  const running = shown.endsAt !== undefined
  const slices = sliceCount(ship)
  const die = `d${slices}`
  const locked = !state || broken !== undefined

  const start = () => {
    // Browsers only allow sound after a click, so the alarm is prepared here.
    try {
      audio.current ??= new AudioContext()
      void audio.current.resume()
    } catch {
      // No audio: the banner still shows the hit.
    }
    update((current, at) => startTimer(current, at))
  }
  const hit = (sector: ShipSectorView) => {
    const damage = rollDamage(shown.damageDie, Math.random())
    const destroyed = sector.damage + damage >= ship.sectorHitPoints
    setRolled(undefined)
    setLastHit(
      `${sector.name} takes ${damage} damage${shown.damageDie === 1 ? '' : ` on the d${shown.damageDie}`}${destroyed ? ' and is destroyed' : ''}.`,
    )
    update((current) => hitSector(current, ship, sector.index, damage))
  }

  const choices =
    rolled === undefined
      ? []
      : sectors.filter((sector) => sector.slice === rolled && !sector.destroyed)
  const rollText =
    rolled === undefined
      ? undefined
      : choices.length === 1
        ? `Rolled ${rolled + 1}: only ${choices[0]?.name} is left there. Tap it.`
        : `Rolled ${rolled + 1}: tap ${choices.map((sector) => sector.name).join(' or ')}.`

  return (
    <section
      aria-label={`Ship damage for ${vesselName}`}
      className={cn(
        'border-border bg-card grid rounded-2xl border-2',
        pinned ? 'gap-3 p-3 shadow-2xl' : 'gap-4 p-4',
        // Folded down in the dock it is one bar; opened it is wide enough for the sectors.
        pinned && (open ? 'w-[min(52rem,calc(100vw-2rem))]' : 'w-fit max-w-[calc(100vw-2rem)]'),
      )}
    >
      <header className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="grid gap-0.5">
          <h2 className="text-lg leading-tight font-bold">Ship damage · {vesselName}</h2>
          {pinned && !open ? null : (
            <p className="text-muted-foreground text-sm">
              A hit every {formatCountdown(ship.everySeconds * 1000)}. Roll a {die} for the slice,
              then tap the side you choose. {ship.sectorHitPoints} damage destroys a sector.
            </p>
          )}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <output
            aria-label="Time until the next hit"
            className={cn(
              'min-w-[4ch] text-right font-mono text-4xl font-bold tabular-nums',
              !running && 'text-muted-foreground',
            )}
          >
            {formatCountdown(remainingMs(shown, now))}
          </output>
          {running ? (
            <ActionButton
              size="lg"
              onClick={() => update((current, at) => pauseTimer(current, at))}
            >
              <Pause aria-hidden /> Pause
            </ActionButton>
          ) : (
            <ActionButton tone="primary" size="lg" onClick={start} disabled={locked}>
              <Play aria-hidden /> Start
            </ActionButton>
          )}
          <ActionButton
            size="lg"
            onClick={() => {
              setLastHit(undefined)
              setRolled(rollSlice(ship, Math.random()))
            }}
            disabled={locked}
          >
            <Dices aria-hidden /> Roll the {die}
          </ActionButton>
          <IconButton
            size="lg"
            label={sound ? 'Mute the alarm' : 'Unmute the alarm'}
            onClick={() => setSound((on) => !on)}
          >
            {sound ? <Bell aria-hidden /> : <BellOff aria-hidden />}
          </IconButton>
          {confirmReset ? (
            <ActionButton
              tone="danger"
              size="lg"
              onClick={() => {
                reset()
                setRolled(undefined)
                setLastHit(undefined)
                setConfirmReset(false)
              }}
            >
              <RotateCcw aria-hidden /> Really reset?
            </ActionButton>
          ) : (
            <IconButton
              size="lg"
              label="Reset the ship and the timer"
              onClick={() => setConfirmReset(true)}
            >
              <RotateCcw aria-hidden />
            </IconButton>
          )}
          <IconButton
            size="lg"
            label={pinned ? 'Unpin: put the clock back on its page' : 'Pin to every page'}
            tip={pinned ? 'Unpin' : 'Pin: keep it on screen on every page, also in combat focus'}
            aria-pressed={pinned}
            onClick={() => onPinChange(!pinned)}
          >
            {pinned ? <PinOff aria-hidden /> : <Pin aria-hidden />}
          </IconButton>
          <IconButton
            size="lg"
            label={open ? 'Hide the sectors' : 'Show the sectors'}
            aria-expanded={open}
            onClick={() => setOpen((shown) => !shown)}
          >
            <ChevronDown aria-hidden className={cn('transition-transform', open && 'rotate-180')} />
          </IconButton>
        </div>
      </header>

      <div aria-live="polite" className="grid gap-2 empty:hidden">
        {broken !== undefined ? (
          <p className="rounded-xl border-2 border-red-500/60 bg-red-500/15 px-4 py-3 text-lg font-bold text-red-700 dark:text-red-300">
            Cut in two at {ship.port[broken]?.name} and {ship.starboard[broken]?.name}. {vesselName}{' '}
            is lost.
          </p>
        ) : (
          <>
            {shown.owed > 0 ? (
              <p className="animate-pulse rounded-xl border-2 border-amber-500/70 bg-amber-500/15 px-4 py-3 text-lg font-bold text-amber-800 dark:text-amber-200">
                Hit! Roll a {die} for the slice and tap the side you choose.
                {shown.owed > 1 ? ` ${shown.owed} hits are waiting.` : ''}
              </p>
            ) : null}
            {critical !== -1 ? (
              <p className="rounded-xl border-2 border-red-500/60 bg-red-500/10 px-4 py-2 font-semibold text-red-700 dark:text-red-300">
                One more hit on slice {critical + 1} cuts the ship in two. Time for the escape pods.
              </p>
            ) : threatened !== -1 ? (
              <p className="rounded-xl border-2 border-red-500/60 bg-red-500/10 px-4 py-2 font-semibold text-red-700 dark:text-red-300">
                A high roll on slice {threatened + 1} cuts the ship in two. Time for the escape
                pods.
              </p>
            ) : null}
            {rollText ? <p className="px-1 font-semibold">{rollText}</p> : null}
          </>
        )}
        {lastHit ? <p className="px-1 font-semibold">{lastHit}</p> : null}
      </div>

      {open ? (
        <DamageDiePicker
          value={shown.damageDie}
          disabled={locked}
          minutes={estimatedMinutesToBreak(ship, shown.damageDie)}
          onChange={(die) => update((current) => setDamageDie(current, die))}
        />
      ) : null}

      {open && decks.length > 1 ? (
        <fieldset className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <legend className="sr-only">Deck</legend>
          <span aria-hidden className="text-sm font-semibold">
            Deck
          </span>
          <div className="border-border flex overflow-hidden rounded-xl border-2">
            {decks.map(({ deck: ref, name }) => (
              <label
                key={ref.key}
                className={cn(
                  'border-border has-focus-visible:ring-ring/50 grid h-12 cursor-pointer place-items-center border-l-2 px-4 text-base font-bold first:border-l-0 has-focus-visible:ring-3',
                  ref.key === deck?.deck.key
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted',
                )}
              >
                <input
                  type="radio"
                  name="ship-deck"
                  className="sr-only"
                  checked={ref.key === deck?.deck.key}
                  onChange={() => setDeckKey(ref.key)}
                />
                {name}
              </label>
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            The damage is the same ship on every deck.
          </span>
        </fieldset>
      ) : null}

      <div
        hidden={!open}
        className={cn('items-stretch gap-2', open && 'grid')}
        style={{ gridTemplateColumns: `auto repeat(${slices}, minmax(0, 1fr))` }}
      >
        <span />
        {statuses.map((status, slice) => (
          <div key={slice} className="grid min-w-0 gap-1">
            <div className="flex items-center gap-2">
              <span
                aria-label={`Slice ${slice + 1}`}
                className={cn(
                  'grid size-8 shrink-0 place-items-center rounded-lg text-lg font-bold tabular-nums',
                  rolled === slice
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-foreground text-background',
                )}
              >
                {slice + 1}
              </span>
              <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                {slice === 0 ? 'Bow' : slice === slices - 1 ? 'Stern' : ''}
              </span>
            </div>
            <span
              className={cn(
                'min-h-4 text-xs leading-4 font-semibold',
                status === 'holding'
                  ? 'text-amber-700 dark:text-amber-400'
                  : 'text-red-600 dark:text-red-400',
              )}
            >
              {SLICE_WARNING[status]}
            </span>
          </div>
        ))}
        {/* Starboard on top, as on the deck maps with the bow to the left. */}
        {(['starboard', 'port'] as const).map((side) => [
          <span
            key={side}
            className="text-muted-foreground row-span-3 rotate-180 self-center text-xs font-semibold tracking-wide uppercase [writing-mode:vertical-rl]"
          >
            {SIDE_LABEL[side]}
          </span>,
          ...sectors
            .filter((sector) => sector.side === side)
            .map((sector) => (
              <SectorTile
                key={sector.index}
                sector={sector}
                hitPoints={ship.sectorHitPoints}
                rolled={rolled === sector.slice}
                locked={locked}
                onHit={() => hit(sector)}
                onAdjust={(delta) =>
                  update((current) => adjustSector(current, ship, sector.index, delta))
                }
              >
                {deck?.bySector.get(sector.index)?.map((fight) => roomFight(fight, 'tile'))}
              </SectorTile>
            )),
        ])}
      </div>

      {open && roomControls && (deck?.deckWide.length || roomControls.rooms.anywhere.length) ? (
        <div className="grid gap-2">
          {deck?.deckWide.length ? (
            <div className="grid gap-2">
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                Anywhere on this deck
              </p>
              {deck.deckWide.map((fight) => roomFight(fight, 'bar'))}
            </div>
          ) : null}
          {roomControls.rooms.anywhere.length ? (
            <div className="grid gap-2">
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                Wherever the party is
              </p>
              {roomControls.rooms.anywhere.map((fight) => roomFight(fight, 'bar'))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
