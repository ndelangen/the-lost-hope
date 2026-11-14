import { useState } from 'react'

import { DmFaces } from '#/components/dm/dm-faces'
import type { StorylineSession } from '#/lib/dm-storylines'
import { cn } from '#/lib/utils'

import { type LabLine, eventName } from './-lab-model'

/**
 * Who turns up when: one row per person, one column per session, the way writers keep a character
 * appearance chart. The right column says when someone was last seen, so a forgotten NPC stands out.
 */
export function WhoGrid({
  people,
  sessions,
}: {
  people: readonly LabLine[]
  sessions: readonly StorylineSession[]
}) {
  const [sort, setSort] = useState<'present' | 'absent'>('present')
  const [show, setShow] = useState<'all' | 'npc'>('npc')
  const latest = sessions.at(-1)?.number ?? 0
  const rows = people
    .filter((line) => show === 'all' || line.person?.ref === 'npc')
    .map((line) => ({
      line,
      count: line.stops.reduce((sum, stop) => sum + stop.events.length, 0),
      quiet: latest - (line.last ?? 0),
    }))
    .toSorted((a, b) =>
      sort === 'present' ? b.count - a.count : b.quiet - a.quiet || b.count - a.count,
    )
  const most = Math.max(1, ...people.flatMap((line) => line.stops.map((s) => s.events.length)))

  const toggle = <T extends string>(
    value: T,
    set: (v: T) => void,
    options: readonly [T, string][],
  ) => (
    <div className="flex items-center gap-1">
      {options.map(([option, label]) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => set(option)}
          className={cn(
            'rounded-md border px-2 py-0.5',
            value === option ? 'bg-foreground text-background' : 'hover:bg-muted',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )

  return (
    <div className="grid gap-3">
      <div className="border-border bg-card flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border p-3 text-sm">
        {toggle(show, setShow, [
          ['npc', 'NPCs'],
          ['all', 'Everyone'],
        ])}
        {toggle(sort, setSort, [
          ['present', 'Most present'],
          ['absent', 'Longest gone'],
        ])}
      </div>
      <div className="overflow-x-auto">
        <table className="text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs">
              <th className="sr-only">Person</th>
              {sessions.map((session) => (
                <th
                  key={session.key}
                  title={session.name}
                  className="font-mono text-[10px] font-normal"
                >
                  {session.number}
                </th>
              ))}
              <th className="pl-3 text-left font-normal">Last seen</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ line, quiet }) => (
              <tr key={line.key}>
                <th className="py-0.5 pr-3 text-left font-normal">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    {line.person ? <DmFaces people={[line.person]} size="xs" /> : null}
                    {line.arc.name}
                  </span>
                </th>
                {sessions.map((session) => {
                  const stop = line.stops.find((s) => s.session === session.number)
                  return (
                    <td key={session.key} className="p-0.5">
                      <span
                        aria-label={
                          stop
                            ? `S${session.number}: ${stop.events.length} events`
                            : `S${session.number}: absent`
                        }
                        title={
                          stop
                            ? `S${session.number}: ${stop.events.map(eventName).join(' · ')}`
                            : `S${session.number}`
                        }
                        className={cn('block h-4 w-3.5 rounded-sm', !stop && 'bg-muted/50')}
                        style={
                          stop
                            ? {
                                background: line.color,
                                opacity: 0.35 + (0.65 * stop.events.length) / most,
                              }
                            : undefined
                        }
                      />
                    </td>
                  )
                })}
                <td
                  className={cn(
                    'pl-3 text-xs whitespace-nowrap',
                    quiet >= 5 ? 'text-amber-600 font-medium' : 'text-muted-foreground',
                  )}
                >
                  S{line.last}
                  {quiet === 0 ? ' · last session' : ` · ${quiet} sessions ago`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
