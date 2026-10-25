import { useState } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityReference } from '#/components/entity-reference'
import { Pill } from '#/components/ui/pill'
import { COLLECTION_LABELS } from '#/lib/campaign'
import {
  historyWithPerson,
  type ContextConnection,
  type ContextHistoryEntry,
  type ContextSource,
  type EntityContextData,
} from '#/lib/entity-context-data'
import { cn } from '#/lib/utils'

const controlClass =
  'border-border bg-background rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring'

/** Explore a record's sourced history and explicit connections without interpreting its prose. */
export function EntityContext({ data }: { data: EntityContextData }) {
  const [selectedPerson, setSelectedPerson] = useState('')
  const [newestFirst, setNewestFirst] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [map, setMap] = useState(false)
  const person = data.people.find(
    (candidate) => `${candidate.kind}:${candidate.slug}` === selectedPerson,
  )
  const filteredHistory = historyWithPerson(data.history, person)
  const orderedHistory = newestFirst ? filteredHistory.toReversed() : filteredHistory
  const visibleHistory = showAll ? orderedHistory : orderedHistory.slice(0, 6)
  const firstDay = data.history[0]?.day
  const lastDay = data.history.at(-1)?.day

  return (
    <section id="history-and-connections" className="border-border scroll-mt-8 border-t pt-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-primary mb-2 text-xs font-semibold tracking-wider uppercase">
            Campaign context
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">History and connections</h2>
        </div>
        {firstDay !== undefined ? (
          <p className="text-muted-foreground text-sm">
            {data.history.length} recorded {data.history.length === 1 ? 'event' : 'events'} ·{' '}
            {firstDay === lastDay ? `Day ${firstDay}` : `Days ${firstDay}–${lastDay}`}
          </p>
        ) : null}
      </div>

      <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">History</h3>
            {data.history.length > 1 ? (
              <button
                type="button"
                className={controlClass}
                onClick={() => setNewestFirst(!newestFirst)}
              >
                {newestFirst ? 'Newest first' : 'Oldest first'} <span aria-hidden="true">↕</span>
              </button>
            ) : null}
          </div>
          {data.people.length > 0 && data.history.length > 0 ? (
            <div className="bg-muted/40 mb-6 rounded-xl p-4">
              <label htmlFor="context-person" className="mb-2 block text-sm font-medium">
                Explore shared history
              </label>
              <select
                id="context-person"
                className={`${controlClass} w-full min-w-0`}
                value={selectedPerson}
                onChange={(event) => {
                  setSelectedPerson(event.target.value)
                  setShowAll(false)
                }}
              >
                <option value="">All recorded events</option>
                {data.people.map((candidate) => (
                  <option
                    key={`${candidate.kind}:${candidate.slug}`}
                    value={`${candidate.kind}:${candidate.slug}`}
                  >
                    {candidate.name}
                  </option>
                ))}
              </select>
              <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                {person
                  ? 'Both are referenced in these events. This does not establish that they met or were present together.'
                  : 'Event mentions include reports, recollections and claims. A mention does not establish presence.'}
              </p>
            </div>
          ) : null}
          <div aria-live="polite">
            {person ? (
              <p className="text-muted-foreground mb-5 text-sm">
                {filteredHistory.length} {filteredHistory.length === 1 ? 'event' : 'events'} also
                mentioning <EntityReference {...person} />
              </p>
            ) : null}
            {visibleHistory.length ? (
              <ol className="border-border ml-2 space-y-7 border-l pl-6">
                {visibleHistory.map((entry) => (
                  <HistoryEntry key={entry.event.slug} entry={entry} />
                ))}
              </ol>
            ) : (
              <p className="text-muted-foreground rounded-xl border border-dashed p-5 text-sm">
                {person
                  ? 'No shared event mentions are recorded.'
                  : 'No linked events are recorded for this entry.'}
              </p>
            )}
          </div>
          {orderedHistory.length > 6 ? (
            <button
              type="button"
              className={`${controlClass} mt-6 w-full`}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show fewer events' : `Show all ${orderedHistory.length} events`}
            </button>
          ) : null}

          {data.sources.length ? (
            <section className="mt-9">
              <h3 className="mb-2 text-lg font-semibold">Elsewhere in the archive</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Linked records and the passages that connect them.
              </p>
              <div className="space-y-3">
                {data.sources.map((source) => (
                  <SourceRecord
                    key={`${source.entity.kind}:${source.entity.slug}`}
                    source={source}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="min-w-0 space-y-8">
          <section className="border-border bg-card rounded-xl border p-5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">Connections</h3>
              {data.connections.length ? (
                <div
                  className="border-border inline-flex rounded-lg border p-0.5"
                  aria-label="Connection display"
                >
                  <button
                    type="button"
                    aria-pressed={!map}
                    className={cn(
                      'rounded-md px-2.5 py-1.5 text-xs',
                      !map && 'bg-primary text-primary-foreground',
                    )}
                    onClick={() => setMap(false)}
                  >
                    List
                  </button>
                  <button
                    type="button"
                    aria-pressed={map}
                    className={cn(
                      'rounded-md px-2.5 py-1.5 text-xs',
                      map && 'bg-primary text-primary-foreground',
                    )}
                    onClick={() => setMap(true)}
                  >
                    Map
                  </button>
                </div>
              ) : null}
            </div>
            <p className="text-muted-foreground mb-5 text-xs leading-relaxed">
              Relationships recorded in memberships, locations and item records.
            </p>
            {map && data.connections.length ? (
              <fieldset className="mb-0" aria-label={`Connection map for ${data.entity.name}`}>
                <div className="bg-primary/10 border-primary/20 mb-0 rounded-lg border px-3 py-3 text-sm font-medium">
                  {data.entity.name}
                </div>
                <ul className="border-border ml-4 space-y-4 border-l pt-5 pl-5">
                  {data.connections.map((connection) => (
                    <li
                      key={connection.id}
                      className="before:bg-border relative before:absolute before:top-5 before:-left-5 before:h-px before:w-5"
                    >
                      <Connection connection={connection} />
                    </li>
                  ))}
                </ul>
              </fieldset>
            ) : data.connections.length ? (
              <ul className="space-y-4">
                {data.connections.map((connection) => (
                  <li key={connection.id}>
                    <Connection connection={connection} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">
                No structured relationships recorded. Prose mentions appear in the history and
                source passages.
              </p>
            )}
          </section>

          {data.threads.length ? (
            <section>
              <h3 className="mb-2 text-lg font-semibold">Story threads</h3>
              <p className="text-muted-foreground mb-4 text-xs leading-relaxed">
                Mysteries and missions explicitly linked to this record.
              </p>
              <div className="space-y-3">
                {data.threads.map((source) => (
                  <SourceRecord key={source.entity.slug} source={source} />
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </section>
  )
}

function HistoryEntry({ entry }: { entry: ContextHistoryEntry }) {
  const reason = {
    mentioned: 'Mentioned in this event',
    location: 'Event at this location',
    session: 'Event in this session',
    linked: 'Linked event',
  }[entry.reason]
  return (
    <li className="before:border-background before:bg-primary relative min-w-0 before:absolute before:top-1.5 before:-left-[1.875rem] before:size-3 before:rounded-full before:border-2">
      <div className="text-muted-foreground mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span className="text-primary font-semibold">Day {entry.day}</span>
        {entry.session ? (
          <EntityReference
            kind="session"
            slug={entry.session.slug}
            label={`Session ${entry.session.number ?? ''}`}
          />
        ) : null}
        {entry.location ? <EntityReference {...entry.location} /> : null}
      </div>
      <h4 className="mb-3 text-base leading-snug font-medium">
        <EntityReference {...entry.event} unstyled className="hover:text-primary" />
      </h4>
      <div className="border-border bg-card rounded-xl border p-4">
        <p className="text-muted-foreground mb-3 text-[11px] font-medium tracking-wide uppercase">
          {reason}
        </p>
        <ContentRenderer content={entry.passages.slice(0, 1)} />
        {entry.passages.length > 1 ? (
          <details className="mt-3">
            <summary className="text-primary cursor-pointer text-xs">
              {entry.passages.length - 1} more source passages
            </summary>
            <ContentRenderer className="mt-3" content={entry.passages.slice(1)} />
          </details>
        ) : null}
        <p className="mt-3 text-xs">
          <EntityReference {...entry.event} label="Open full event" />
        </p>
      </div>
    </li>
  )
}

function Connection({ connection }: { connection: ContextConnection }) {
  return (
    <div className="min-w-0">
      <p className="text-muted-foreground mb-1 text-xs">{connection.label}</p>
      <div className="text-sm font-medium">
        <EntityReference {...connection.target} />
      </div>
      <details className="mt-1.5">
        <summary className="text-muted-foreground cursor-pointer text-xs">Source</summary>
        <p className="mt-2 text-xs">
          Recorded on <EntityReference {...connection.source} />
        </p>
      </details>
    </div>
  )
}

function SourceRecord({ source }: { source: ContextSource }) {
  return (
    <div className="border-border bg-card min-w-0 rounded-xl border p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
          {source.quest?.type ?? COLLECTION_LABELS[source.entity.kind]}
        </span>
        {source.quest ? (
          <Pill variant={source.quest.status === 'open' ? 'warning' : 'success'}>
            {source.quest.status}
          </Pill>
        ) : null}
      </div>
      <div className="text-sm font-medium">
        <EntityReference {...source.entity} />
      </div>
      <details className="mt-3">
        <summary className="text-primary cursor-pointer text-xs">
          Why it is linked · {source.passages.length} source{' '}
          {source.passages.length === 1 ? 'passage' : 'passages'}
        </summary>
        <p className="text-muted-foreground mt-3 mb-2 text-xs">
          From <EntityReference {...source.record} />
        </p>
        <ContentRenderer content={source.passages} />
      </details>
    </div>
  )
}
