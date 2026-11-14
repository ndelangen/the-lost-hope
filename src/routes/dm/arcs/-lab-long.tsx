import { useState } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { ArcIcon } from '#/lib/arc-icons'
import type { Storyline, StorylineSession } from '#/lib/dm-storylines'
import { cn } from '#/lib/utils'

/** How long an open arc has run, and how long since it was last played. */
export function arcAges(storylines: readonly Storyline[], latest: number) {
  return storylines
    .filter((line) => line.next.length > 0 && line.first !== undefined)
    .map((line) => ({
      line,
      age: latest - line.first! + 1,
      quiet: latest - (line.last ?? line.first!),
    }))
}

/** Open arcs ranked by how long they have been open, or how long they have been left alone. */
export function LongArcs({
  storylines,
  sessions,
  onSelect,
}: {
  storylines: readonly Storyline[]
  sessions: readonly StorylineSession[]
  onSelect: (line: Storyline) => void
}) {
  const latest = sessions.at(-1)?.number ?? 0
  const [minAge, setMinAge] = useState(5)
  const [sort, setSort] = useState<'age' | 'quiet'>('age')
  const all = arcAges(storylines, latest)
  const shown = all
    .filter(({ age }) => age >= minAge)
    .toSorted((a, b) => (sort === 'age' ? b.age - a.age : b.quiet - a.quiet) || b.age - a.age)

  return (
    <div className="grid gap-3">
      <div className="border-border bg-card flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border p-3 text-sm">
        <label className="flex items-center gap-2">
          Open for at least
          <input
            type="range"
            min={1}
            max={latest}
            value={minAge}
            onChange={(event) => setMinAge(Number(event.target.value))}
          />
          <span className="w-20 font-medium">{minAge} sessions</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Sort by</span>
          {(['age', 'quiet'] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={sort === option}
              onClick={() => setSort(option)}
              className={cn(
                'rounded-md border px-2 py-0.5',
                sort === option ? 'bg-foreground text-background' : 'hover:bg-muted',
              )}
            >
              {option === 'age' ? 'Longest open' : 'Longest untouched'}
            </button>
          ))}
        </div>
        <span className="text-muted-foreground text-xs">
          {shown.length} of {all.length} open arcs
        </span>
      </div>

      <ul className="grid gap-2">
        {shown.map(({ line, age, quiet }) => (
          <li
            key={line.key}
            className="border-border bg-card grid gap-2 rounded-xl border border-l-4 p-3"
            style={{ borderLeftColor: line.color }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <button
                type="button"
                onClick={() => onSelect(line)}
                className="flex items-center gap-1.5 font-semibold hover:underline"
                style={{ color: line.color }}
              >
                <ArcIcon icon={line.arc.icon} />
                {line.arc.name}
              </button>
              <span className="text-muted-foreground text-xs">
                open since S{line.first} · <b className="text-foreground">{age} sessions</b> · last
                played S{line.last} ·{' '}
                <b className={cn(quiet >= 5 ? 'text-amber-600' : 'text-foreground')}>
                  {quiet === 0 ? 'played last session' : `${quiet} sessions quiet`}
                </b>
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              {sessions.map((session) => {
                const played = line.stops.some((stop) => stop.session === session.number)
                const running = session.number >= line.first!
                return (
                  <span
                    key={session.key}
                    title={`S${session.number}`}
                    className={cn(
                      'h-3 flex-1 rounded-sm',
                      !played && (running ? 'bg-muted' : 'bg-muted/20'),
                    )}
                    style={played ? { background: line.color } : undefined}
                  />
                )
              })}
            </div>
            {line.next.map((plot) => (
              <div key={plot.slug} className="text-sm">
                <span className="font-medium">Next: {plot.name}</span>
                {plot.hook ? (
                  <div className="text-muted-foreground">
                    <ContentRenderer content={plot.hook} />
                  </div>
                ) : null}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
