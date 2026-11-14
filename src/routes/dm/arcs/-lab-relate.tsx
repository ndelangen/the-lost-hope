import { ArcIcon } from '#/lib/arc-icons'
import { resolveSourceRef } from '#/lib/dm-campaign'
import { type Storyline, storylineReferences } from '#/lib/dm-storylines'

import { eventName, relateArcs } from './-lab-model'

const KIND: Record<string, string> = {
  npc: 'NPC',
  pc: 'PC',
  location: 'Place',
  item: 'Item',
  quest: 'Quest',
  organization: 'Group',
  creature: 'Creature',
}

function ArcName({ line }: { line: Storyline }) {
  return (
    <span className="inline-flex items-center gap-1 font-medium" style={{ color: line.color }}>
      <ArcIcon icon={line.arc.icon} />
      {line.arc.name}
    </span>
  )
}

/** Pick two arcs and see everything that already ties them together. */
export function RelateArcs({
  storylines,
  a,
  b,
  onChange,
}: {
  storylines: readonly Storyline[]
  a?: string
  b?: string
  onChange: (a?: string, b?: string) => void
}) {
  const lineA = storylines.find((line) => line.key === a)
  const lineB = storylines.find((line) => line.key === b)
  const relation =
    lineA && lineB ? relateArcs(storylines, lineA, lineB, storylineReferences) : undefined
  const picker = (value: string | undefined, set: (key?: string) => void, label: string) => (
    <select
      aria-label={label}
      value={value ?? ''}
      onChange={(event) => set(event.target.value || undefined)}
      className="border-border bg-background rounded-md border px-2 py-1"
    >
      <option value="">{label}</option>
      {storylines.map((line) => (
        <option key={line.key} value={line.key}>
          {line.arc.name}
        </option>
      ))}
    </select>
  )

  return (
    <div className="border-border bg-card grid gap-3 rounded-xl border p-3 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold">How do these relate?</span>
        {picker(a, (key) => onChange(key, b), 'First arc')}
        <span className="text-muted-foreground">and</span>
        {picker(b, (key) => onChange(a, key), 'Second arc')}
        <span className="text-muted-foreground text-xs">or click two icons in the log</span>
      </div>
      {relation && lineA && lineB ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <section>
            <h3 className="text-muted-foreground text-xs font-semibold uppercase">
              Played together
            </h3>
            {relation.shared.length === 0 ? (
              <p className="text-muted-foreground">Never in the same event.</p>
            ) : (
              <ul>
                {relation.shared.map((event) => (
                  <li key={event}>{eventName(event)}</li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h3 className="text-muted-foreground text-xs font-semibold uppercase">Both touch</h3>
            {relation.common.length === 0 ? (
              <p className="text-muted-foreground">Nothing specific in common.</p>
            ) : (
              <ul>
                {relation.common.slice(0, 10).map(({ ref, arcs }) => (
                  <li key={`${ref.ref}:${ref.key}`}>
                    <span className="text-muted-foreground text-xs">
                      {KIND[ref.ref] ?? ref.ref}
                    </span>{' '}
                    {resolveSourceRef(ref)?.name ?? ref.key}{' '}
                    <span className="text-muted-foreground text-xs">
                      {arcs <= 2 ? 'only these two' : `${arcs} arcs`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h3 className="text-muted-foreground text-xs font-semibold uppercase">
              Linked through another arc
            </h3>
            {relation.bridges.length === 0 ? (
              <p className="text-muted-foreground">No arc crosses both.</p>
            ) : (
              <ul className="grid gap-1">
                {relation.bridges.map(({ line, viaA, viaB }) => (
                  <li key={line.key}>
                    <ArcName line={lineA} /> → <ArcName line={line} /> → <ArcName line={lineB} />
                    <p className="text-muted-foreground text-xs">
                      via {eventName(viaA[0]!)} and {eventName(viaB[0]!)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h3 className="text-muted-foreground text-xs font-semibold uppercase">
              Hooks in what comes next
            </h3>
            {relation.hooks.length === 0 ? (
              <p className="text-muted-foreground">
                Neither arc's open plots mention anything from the other.
              </p>
            ) : (
              <ul>
                {relation.hooks.map(({ from, plot, ref }) => (
                  <li key={`${from.key}-${plot}-${ref.key}`}>
                    <ArcName line={from} />: {plot} brings in{' '}
                    {resolveSourceRef(ref)?.name ?? ref.key}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      ) : null}
    </div>
  )
}
