import {
  Ban,
  ChevronLeft,
  ChevronRight,
  Dices,
  HeartPulse,
  Pause,
  Play,
  Skull,
  Sparkles,
  TriangleExclamationPoint,
} from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'

import { FlowDiagram } from '#/components/dm/flow-diagram'
import { Avatar } from '#/components/ui/avatar'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { resolveSourceRef } from '#/lib/dm-campaign'
import {
  type SimAct,
  type SimReplay,
  type SimRosterEntry,
  actsUntil,
  damageTaken,
  deathSaves,
  fightSummary,
  flowOf,
  keyedLines,
  roomOutcomeLabel,
  turnsOf,
} from '#/lib/sims/fight-sims'
import { cn } from '#/lib/utils'

const SIDE_BAR: Record<string, string> = {
  pc: 'bg-[#2a78d6] dark:bg-[#3987e5]',
  ally: 'bg-[#1baf7a] dark:bg-[#199e70]',
  foe: 'bg-[#eb6834] dark:bg-[#d95926]',
}

const SIDE_LABEL: Record<string, string> = { pc: 'Party', ally: 'Freed soldiers', foe: 'Enemies' }

/** How long one round stays on screen while the replay plays. */
const ROUND_MS = 2500

const stepClass =
  'border-border hover:bg-muted inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm disabled:opacity-40'

function Face({ entry, className }: { entry?: SimRosterEntry; className?: string }) {
  const record = entry ? resolveSourceRef(entry.who) : undefined
  return (
    <Avatar
      src={record?.avatar ?? DEFAULT_AVATAR}
      alt=""
      sizes="24px"
      maxWidth={64}
      className={cn('size-6 shrink-0', className)}
    />
  )
}

/** Three success pips and three failure pips. */
function DeathPips({ ok, fail }: { ok: number; fail: number }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      aria-label={`${ok} successes, ${fail} failures`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={`ok${i}`}
          className={cn('size-2 rounded-full border border-[#0ca30c]', i < ok && 'bg-[#0ca30c]')}
        />
      ))}
      <span className="w-1" />
      {[0, 1, 2].map((i) => (
        <span
          key={`fail${i}`}
          className={cn('size-2 rounded-full border border-[#d03b3b]', i < fail && 'bg-[#d03b3b]')}
        />
      ))}
    </span>
  )
}

const DEATH_RESULT: Record<string, string> = {
  pass: 'success',
  fail: 'failure',
  stable: 'stable',
  dead: 'dies',
  up: 'back up with 1 HP',
}

/** One event of a turn as a short line: target, what, and the result. */
function ActLine({ act }: { act: SimAct }) {
  let icon: ReactNode = null
  let body: ReactNode
  let tone = ''
  switch (act.k) {
    case 'dmg':
      icon = act.crit ? <Sparkles className="size-3.5 text-[#c98500]" /> : null
      body = (
        <>
          <span className="min-w-0">
            {act.by ? '→ ' : ''}
            <span className="font-medium">{act.to}</span>
            {act.what ? <span className="text-muted-foreground"> · {act.what}</span> : null}
            {act.saved ? <span className="text-muted-foreground"> (saved, half)</span> : null}
          </span>
          <span className="ml-auto pl-2 font-semibold whitespace-nowrap tabular-nums">
            {act.crit ? 'CRIT ' : ''}
            {act.dmg}
          </span>
        </>
      )
      break
    case 'miss':
      tone = 'text-muted-foreground'
      body = (
        <>
          <span className="min-w-0">
            → {act.to} · {act.what}
          </span>
          <span className="ml-auto pl-2 whitespace-nowrap">
            {act.how === 'parry' ? 'parried' : act.how === 'shield' ? 'Shield spell' : 'miss'}
          </span>
        </>
      )
      break
    case 'heal':
      icon = <HeartPulse className="size-3.5 text-[#0ca30c]" />
      body = (
        <>
          <span className="min-w-0">
            <span className="font-medium">{act.to}</span>
            <span className="text-muted-foreground"> · {act.what}</span>
          </span>
          <span className="ml-auto pl-2 font-semibold tabular-nums">+{act.amt}</span>
        </>
      )
      break
    case 'down':
      icon = <Skull className="size-3.5" />
      body = <span className="font-semibold">{act.who} goes down</span>
      break
    case 'endure':
      icon = <HeartPulse className="size-3.5" />
      body = <span>{act.who}: Relentless Endurance, stays up at 1 HP</span>
      break
    case 'death':
      icon = <Dices className="size-3.5" />
      body = (
        <>
          <span className="min-w-0">
            Death save: <span className="font-semibold tabular-nums">{act.roll}</span>,{' '}
            {DEATH_RESULT[act.result] ?? act.result}
          </span>
          <span className="ml-auto pl-2">
            <DeathPips ok={act.ok} fail={act.fail} />
          </span>
        </>
      )
      break
    case 'cond':
      body = (
        <span>
          {act.who} is <span className="font-medium">{act.what}</span>
        </span>
      )
      break
    case 'countered':
      icon = <Ban className="size-3.5" />
      body = (
        <span>
          {act.by} stops {act.who}&rsquo;s {act.what}
        </span>
      )
      break
    case 'mistake':
      icon = <TriangleExclamationPoint className="size-3.5 text-[#c98500]" />
      tone = 'text-muted-foreground'
      body = <span>Mistake: {act.what}</span>
      break
    default:
      return null
  }
  return (
    <li className={cn('flex items-center gap-1.5', tone)}>
      <span className="flex w-4 justify-center">{icon}</span>
      <span className="flex min-w-0 flex-1 items-center">{body}</span>
    </li>
  )
}

function Tile({ label, value, detail }: { label: string; value: ReactNode; detail?: string }) {
  return (
    <div className="bg-muted/40 grid content-start gap-0.5 rounded-lg p-2.5">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="text-xl font-semibold tabular-nums">{value}</span>
      {detail ? <span className="text-muted-foreground text-xs">{detail}</span> : null}
    </div>
  )
}

/** Steps through one simulated run room by room and round by round. */
export function FightSimReplay({ replay }: { replay: SimReplay }) {
  const [roomIndex, setRoomIndex] = useState(0)
  const [frameIndex, setFrameIndex] = useState(1)
  const [playing, setPlaying] = useState(false)
  const room = replay.rooms[roomIndex] ?? replay.rooms[0]
  const frame = room.frames[frameIndex] ?? room.frames[0]
  const lastFrame = frameIndex >= room.frames.length - 1
  const lastRoom = roomIndex >= replay.rooms.length - 1

  useEffect(() => {
    setRoomIndex(0)
    setFrameIndex(1)
    setPlaying(false)
  }, [replay])

  const next = () => {
    if (!lastFrame) setFrameIndex(frameIndex + 1)
    else if (!lastRoom) {
      setRoomIndex(roomIndex + 1)
      setFrameIndex(1)
    } else setPlaying(false)
  }
  const previous = () => {
    if (frameIndex > 1) setFrameIndex(frameIndex - 1)
    else if (roomIndex > 0) {
      setRoomIndex(roomIndex - 1)
      setFrameIndex(replay.rooms[roomIndex - 1].frames.length - 1)
    }
  }

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(next, ROUND_MS)
    return () => window.clearTimeout(timer)
  })

  const byName = new Map(room.roster.map((entry) => [entry.name, entry]))
  const round = fightSummary(frame.acts, room.roster)
  const soFar = fightSummary(actsUntil(room, frameIndex), room.roster)
  const taken = damageTaken(frame.acts)
  const saves = deathSaves(actsUntil(room, frameIndex))
  const turns = turnsOf(frame.acts)
  const before = room.frames[Math.max(0, frameIndex - 1)]

  const sides = (['pc', 'ally', 'foe'] as const)
    .map((side) => ({
      side,
      rows: room.roster
        .map((entry, index) => ({ entry, hp: frame.hp[index], was: before.hp[index][0] }))
        .filter((row) => row.entry.side === side),
    }))
    .filter((group) => group.rows.length > 0)

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Rooms in this run">
        {replay.rooms.map((r, index) => (
          <button
            key={r.room}
            type="button"
            role="tab"
            aria-selected={index === roomIndex}
            onClick={() => {
              setRoomIndex(index)
              setFrameIndex(1)
            }}
            className={cn(
              'border-border rounded-md border px-2.5 py-1 text-sm',
              index === roomIndex ? 'bg-foreground text-background' : 'hover:bg-muted',
            )}
          >
            {index + 1}. {r.room}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={stepClass}
          onClick={previous}
          disabled={frameIndex <= 1 && roomIndex === 0}
        >
          <ChevronLeft className="size-4" /> Back
        </button>
        <button type="button" className={stepClass} onClick={() => setPlaying(!playing)}>
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" className={stepClass} onClick={next} disabled={lastFrame && lastRoom}>
          Next <ChevronRight className="size-4" />
        </button>
        <span className="text-sm font-medium">
          Round {frame.round} of {room.frames.length - 1}
        </span>
        {lastFrame ? (
          <span className="text-muted-foreground text-sm">· {roomOutcomeLabel(room.outcome)}</span>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Tile
          label="Party dealt"
          value={round.party.damage}
          detail={`${round.party.hits} hits, ${round.party.misses} misses · room so far ${soFar.party.damage}`}
        />
        <Tile
          label="Enemies dealt"
          value={round.foes.damage}
          detail={`${round.foes.hits} hits, ${round.foes.misses} misses · room so far ${soFar.foes.damage}`}
        />
        <Tile
          label="Crits"
          value={
            <span>
              {round.party.crits}
              <span className="text-muted-foreground text-sm font-normal"> party</span> ·{' '}
              {round.foes.crits}
              <span className="text-muted-foreground text-sm font-normal"> enemies</span>
            </span>
          }
          detail={`room so far ${soFar.party.crits} · ${soFar.foes.crits}`}
        />
        <Tile
          label="Went down"
          value={round.downs.length === 0 ? '–' : round.downs.join(', ')}
          detail={`healing this round: party ${round.party.healing}, enemies ${round.foes.healing}`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="grid content-start gap-3">
          {sides.map((group) => (
            <div key={group.side} className="grid gap-1.5">
              <h4 className="text-muted-foreground text-xs font-medium uppercase">
                {SIDE_LABEL[group.side]}
              </h4>
              {group.rows.map(({ entry, hp: [hp, max, temp, conditions], was }) => {
                const lost = taken.get(entry.name) ?? 0
                const save = saves.get(entry.name)
                return (
                  <div
                    key={entry.name}
                    className={cn('grid gap-1', hp === 0 && !save && 'opacity-50')}
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                      <Face entry={entry} />
                      <span className="font-medium">{entry.name}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {hp}/{max}
                        {temp > 0 ? ` +${temp}` : ''}
                      </span>
                      {lost > 0 ? (
                        <span className="font-semibold text-[#d03b3b] tabular-nums">−{lost}</span>
                      ) : null}
                      {save ? <DeathPips ok={save.ok} fail={save.fail} /> : null}
                      {conditions
                        .filter((c) => c !== 'down')
                        .map((condition) => (
                          <span key={condition} className="bg-muted rounded px-1.5 text-xs">
                            {condition}
                          </span>
                        ))}
                    </div>
                    <div className="bg-muted relative h-2 overflow-hidden rounded-full" aria-hidden>
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-[#d03b3b]/40"
                        style={{ width: `${(Math.max(was, hp) / max) * 100}%` }}
                      />
                      <div
                        className={cn(
                          'absolute inset-y-0 left-0 rounded-full transition-[width] duration-500',
                          SIDE_BAR[entry.side],
                        )}
                        style={{ width: `${(hp / max) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="grid content-start gap-1">
          <div className="text-muted-foreground flex justify-between text-xs font-medium uppercase">
            <span>Dealt by</span>
            <span>Who hit whom this round</span>
            <span>Taken by</span>
          </div>
          <FlowDiagram
            width={440}
            links={flowOf(frame.acts, room.roster)}
            label={`Who hit whom in round ${frame.round}`}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <h4 className="text-muted-foreground text-xs font-medium uppercase">Turn by turn</h4>
        <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {turns.map((turn, index) => {
            const entry = byName.get(turn.who)
            return (
              <li
                // a creature takes one turn a round, so its name and place are unique
                key={`${turn.who}-${index}`}
                className={cn(
                  'border-border grid content-start gap-1 rounded-lg border p-2 text-sm',
                  entry?.side !== 'foe'
                    ? 'border-l-4 border-l-[#2a78d6]'
                    : 'border-l-4 border-l-[#eb6834]',
                )}
              >
                <div className="flex items-center gap-2">
                  <Face entry={entry} />
                  <span className="font-semibold">{turn.who}</span>
                </div>
                {turn.acts.length === 0 ? (
                  <p className="text-muted-foreground text-xs">Moves or does nothing that hurts.</p>
                ) : (
                  <ul className="grid gap-0.5 text-xs">
                    {turn.acts.map((act, i) => (
                      <ActLine key={`${act.k}-${i}`} act={act} />
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <details className="text-sm">
        <summary className="text-muted-foreground cursor-pointer">
          Full log of this round, with every die roll
        </summary>
        <ol className="bg-muted/40 mt-2 max-h-[28rem] overflow-y-auto rounded-lg p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
          {keyedLines(frame.events).map(({ key, line }) => (
            <li key={key}>{line}</li>
          ))}
        </ol>
      </details>
    </div>
  )
}
