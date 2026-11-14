import type { ReactNode } from 'react'

import { EntityReference } from '#/components/entity-reference'
import { ArcIcon } from '#/lib/arc-icons'
import type { ArcRelation } from '#/lib/dm-arc-relation'
import { resolveSourceRef } from '#/lib/dm-campaign'
import type { Storyline } from '#/lib/dm-storylines'

const KIND_LABEL: Partial<Record<string, string>> = {
  npc: 'NPC',
  location: 'Place',
  item: 'Item',
  quest: 'Quest',
  organization: 'Group',
  beast: 'Creature',
}

function ArcName({ line }: { line: Storyline }) {
  return (
    <span className="inline-flex items-center gap-1 font-medium" style={{ color: line.color }}>
      <ArcIcon icon={line.arc.icon} />
      {line.arc.name}
    </span>
  )
}

function EventName({ eventKey }: { eventKey: string }) {
  const record = resolveSourceRef({ ref: 'event', key: eventKey })
  return record ? <EntityReference kind="event" slug={record.slug} /> : <>{eventKey}</>
}

function Section({
  title,
  empty,
  children,
}: {
  title: string
  empty?: string
  children: ReactNode
}) {
  return (
    <section className="grid content-start gap-1">
      <h3 className="text-muted-foreground text-xs font-semibold uppercase">{title}</h3>
      {empty ? <p className="text-muted-foreground">{empty}</p> : children}
    </section>
  )
}

/** Everything that already ties two arcs together: shared events, common records, bridges, hooks. */
export function DmArcRelation({
  a,
  b,
  relation,
}: {
  a: Storyline
  b: Storyline
  relation: ArcRelation
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Section
        title="Played together"
        empty={relation.shared.length === 0 ? 'Never in the same event.' : undefined}
      >
        <ul className="grid gap-0.5">
          {relation.shared.map((event) => (
            <li key={event}>
              <EventName eventKey={event} />
            </li>
          ))}
        </ul>
      </Section>
      <Section
        title="Both touch"
        empty={relation.common.length === 0 ? 'Nothing specific in common.' : undefined}
      >
        <ul className="grid gap-0.5">
          {relation.common.slice(0, 10).map(({ ref, arcs }) => (
            <li key={`${ref.ref}:${ref.key}`}>
              <span className="text-muted-foreground text-xs">
                {KIND_LABEL[ref.ref] ?? ref.ref}
              </span>{' '}
              {resolveSourceRef(ref)?.name ?? ref.key}{' '}
              <span className="text-muted-foreground text-xs">
                {arcs <= 2 ? 'only these two arcs' : `${arcs} arcs`}
              </span>
            </li>
          ))}
        </ul>
      </Section>
      <Section
        title="Linked through another arc"
        empty={relation.bridges.length === 0 ? 'No arc crosses both.' : undefined}
      >
        <ul className="grid gap-2">
          {relation.bridges.map(({ line, viaA, viaB }) => (
            <li key={line.key}>
              <ArcName line={a} /> → <ArcName line={line} /> → <ArcName line={b} />
              <p className="text-muted-foreground text-xs">
                via <EventName eventKey={viaA[0]!} />
                {viaB[0] === viaA[0] ? null : (
                  <>
                    {' '}
                    and <EventName eventKey={viaB[0]!} />
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </Section>
      <Section
        title="Hooks in what comes next"
        empty={
          relation.hooks.length === 0
            ? 'Neither arc’s open plots bring in anything from the other yet.'
            : undefined
        }
      >
        <ul className="grid gap-0.5">
          {relation.hooks.map(({ from, plot, ref }) => (
            <li key={`${from.key}-${plot}-${ref.key}`}>
              <ArcName line={from} />: {plot} brings in {resolveSourceRef(ref)?.name ?? ref.key}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
