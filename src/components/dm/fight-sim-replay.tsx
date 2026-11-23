import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Avatar } from '#/components/ui/avatar'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { resolveSourceRef } from '#/lib/dm-campaign'
import { type SimReplay, keyedLines, roomOutcomeLabel } from '#/lib/sims/fight-sims'
import { cn } from '#/lib/utils'

const SIDE_BAR: Record<string, string> = {
  pc: 'bg-[#2a78d6] dark:bg-[#3987e5]',
  ally: 'bg-[#1baf7a] dark:bg-[#199e70]',
  foe: 'bg-[#eb6834] dark:bg-[#d95926]',
}

const SIDE_LABEL: Record<string, string> = { pc: 'Party', ally: 'Freed soldiers', foe: 'Enemies' }

/** How long one round stays on screen while the replay plays. */
const ROUND_MS = 1800

const stepClass =
  'border-border hover:bg-muted inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm disabled:opacity-40'

/** Steps through one simulated run room by room and round by round: hit points and what happened. */
export function FightSimReplay({ replay }: { replay: SimReplay }) {
  const [roomIndex, setRoomIndex] = useState(0)
  const [frameIndex, setFrameIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const room = replay.rooms[roomIndex] ?? replay.rooms[0]
  const frame = room.frames[frameIndex] ?? room.frames[0]
  const lastFrame = frameIndex >= room.frames.length - 1
  const lastRoom = roomIndex >= replay.rooms.length - 1

  useEffect(() => {
    setRoomIndex(0)
    setFrameIndex(0)
    setPlaying(false)
  }, [replay])

  const next = () => {
    if (!lastFrame) setFrameIndex(frameIndex + 1)
    else if (!lastRoom) {
      setRoomIndex(roomIndex + 1)
      setFrameIndex(0)
    } else setPlaying(false)
  }
  const previous = () => {
    if (frameIndex > 0) setFrameIndex(frameIndex - 1)
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

  const sides = (['pc', 'ally', 'foe'] as const)
    .map((side) => ({
      side,
      rows: room.roster
        .map((entry, index) => ({ entry, hp: frame.hp[index] }))
        .filter((row) => row.entry.side === side),
    }))
    .filter((group) => group.rows.length > 0)

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Rooms in this run">
        {replay.rooms.map((r, index) => (
          <button
            key={r.room}
            type="button"
            role="tab"
            aria-selected={index === roomIndex}
            onClick={() => {
              setRoomIndex(index)
              setFrameIndex(0)
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
          disabled={frameIndex === 0 && roomIndex === 0}
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
        <span className="text-muted-foreground text-sm">
          {frame.round === 0
            ? 'Start of the fight'
            : `Round ${frame.round} of ${room.frames.length - 1}`}
          {lastFrame ? ` · ${roomOutcomeLabel(room.outcome)}` : ''}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="grid content-start gap-3">
          {sides.map((group) => (
            <div key={group.side} className="grid gap-1.5">
              <h4 className="text-muted-foreground text-xs font-medium uppercase">
                {SIDE_LABEL[group.side]}
              </h4>
              {group.rows.map(({ entry, hp: [hp, max, temp, conditions] }) => {
                const record = resolveSourceRef(entry.who)
                return (
                  <div key={entry.name} className={cn('grid gap-1', hp === 0 && 'opacity-50')}>
                    <div className="flex items-center gap-2 text-sm">
                      <Avatar
                        src={record?.avatar ?? DEFAULT_AVATAR}
                        alt=""
                        sizes="24px"
                        maxWidth={64}
                        className="size-6"
                      />
                      <span className="font-medium">{entry.name}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {hp}/{max}
                        {temp > 0 ? ` +${temp}` : ''}
                      </span>
                      {conditions.map((condition) => (
                        <span key={condition} className="bg-muted rounded px-1.5 text-xs">
                          {condition}
                        </span>
                      ))}
                    </div>
                    <div className="bg-muted h-2 overflow-hidden rounded-full" aria-hidden>
                      <div
                        className={cn(
                          'h-full rounded-full transition-[width] duration-500',
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
        <ol className="bg-muted/40 max-h-[28rem] overflow-y-auto rounded-lg p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
          {keyedLines(frame.events).map(({ key, line }) => (
            <li key={key} className={cn(/\*\*|DOWN|MISTAKE/.test(line) && 'font-semibold')}>
              {line}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
