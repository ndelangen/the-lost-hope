import {
  Bell,
  BellOff,
  ChevronDown,
  Dices,
  LifeBuoy,
  Minus,
  Pause,
  Play,
  Plus,
  RotateCcw,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { SHIP_DAMAGE_DICE, type SceneShipDamage, type ShipDamageDie } from '#/definitions/scene'
import {
  adjustSector,
  brokenSlice,
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
  type SliceStatus,
} from '#/lib/ship-damage'
import { cn } from '#/lib/utils'

import { ActionButton, IconButton } from './encounter/icon-button'
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
  onChange,
}: {
  value: ShipDamageDie
  disabled: boolean
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
          : `The clock rolls a d${value} for every hit you tap.`}
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
}: {
  sector: ShipSectorView
  hitPoints: number
  /** The die picked this sector's slice, so it is one of the DM's choices for this hit. */
  rolled: boolean
  locked: boolean
  onHit: () => void
  onAdjust: (delta: number) => void
}) {
  const worn = !sector.destroyed && sector.damage * 2 > hitPoints
  const place = `${sector.name}, ${SIDE_LABEL[sector.side].toLowerCase()} side of slice ${sector.slice + 1}`
  return (
    <div
      className={cn(
        'bg-card grid min-w-0 grid-rows-[1fr_auto] overflow-hidden rounded-xl border-2',
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
        className="hover:bg-muted focus-visible:ring-ring/50 grid min-h-24 grid-rows-[1fr_auto_auto] gap-2 p-3 text-left transition-colors outline-none focus-visible:ring-3 disabled:pointer-events-none"
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
            <span className="font-semibold text-red-600 uppercase dark:text-red-400">
              Destroyed
            </span>
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
    </div>
  )
}

/**
 * The at-the-table tracker for a vessel that breaks up during a fight: a repeating countdown, the
 * ship as a grid of sectors the DM taps after the die picks a slice, and the moment it is cut in
 * two.
 */
export function ShipDamageClock({
  sceneKey,
  vesselName,
  ship,
}: {
  sceneKey: string
  vesselName: string
  ship: SceneShipDamage
}) {
  const audio = useRef<AudioContext | null>(null)
  const [sound, setSound] = useState(true)
  const soundOn = useRef(sound)
  soundOn.current = sound
  const [rolled, setRolled] = useState<number>()
  const [lastHit, setLastHit] = useState<string>()
  const [confirmReset, setConfirmReset] = useState(false)
  const [open, setOpen] = useState(true)

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
      className="border-border bg-card grid gap-4 rounded-2xl border-2 p-4"
    >
      <header className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="grid gap-0.5">
          <h2 className="text-lg leading-tight font-bold">Ship damage · {vesselName}</h2>
          <p className="text-muted-foreground text-sm">
            A hit every {formatCountdown(ship.everySeconds * 1000)}. Roll a {die} for the slice,
            then tap the side you choose. {ship.sectorHitPoints} damage destroys a sector.
          </p>
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
          onChange={(die) => update((current) => setDamageDie(current, die))}
        />
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
        {(['port', 'starboard'] as const).map((side) => [
          <span
            key={side}
            className="text-muted-foreground rotate-180 self-center text-xs font-semibold tracking-wide uppercase [writing-mode:vertical-rl]"
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
              />
            )),
        ])}
      </div>
    </section>
  )
}
