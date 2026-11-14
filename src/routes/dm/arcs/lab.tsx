import { Link, createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { z } from 'zod'

import { DmStorylineDetail } from '#/components/dm/dm-storyline-detail'
import { arcs } from '#/lib/dm-campaign'
import { assignColumns, buildStorylines, campaignSessionsInOrder } from '#/lib/dm-storylines'
import { cn } from '#/lib/utils'

import { FlowGraph } from './-lab-flow'
import { type LabOptions, LabGraph } from './-lab-graph'
import { LongArcs } from './-lab-long'
import {
  type LabLine,
  branchParents,
  bundleFinished,
  peopleLines,
  relatedColumns,
} from './-lab-model'

/** Prototype: six variants of the arcs graph, built from what other storyline tools do. */
export const Route = createFileRoute('/dm/arcs/lab')({
  validateSearch: z.object({ v: z.number().int().min(1).max(8).catch(1) }),
  head: () => ({
    meta: [
      { title: 'Arc graph variants (prototype) | DM' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: ArcLab,
})

const VARIANTS = [
  {
    id: 1,
    name: 'Interchanges',
    from: 'Subway maps',
    about:
      'A shared event is one station sitting on every line that played it, drawn as a pill across them, instead of a curve from one line to another.',
  },
  {
    id: 2,
    name: 'Branching',
    from: 'Git clients',
    about:
      'An arc that began at an event of an older arc splits off that arc’s line. Columns are chosen so arcs that share events sit next to each other.',
  },
  {
    id: 3,
    name: 'Compact log',
    from: 'git log --graph',
    about:
      'One row per session with every arc played in it, so the whole campaign fits on a screen. Hover a station for its events; icons stand in for names.',
  },
  {
    id: 4,
    name: 'Bundles',
    from: 'StoryFlow',
    about:
      'Finished arcs fold into one thick grey line per region. Open arcs stay separate. Click a bundle to unfold it.',
  },
  {
    id: 5,
    name: 'Who',
    from: 'xkcd movie charts, Aeon Timeline',
    about:
      'One line per active PC and the five NPCs who turn up most. A pill joins whoever ended the session in the same place, so you can see when the party split up.',
  },
  {
    id: 6,
    name: 'Best of',
    from: 'All of the above',
    about:
      'Interchanges, branching, related arcs side by side, and hover cards, on the current layout.',
  },
  {
    id: 7,
    name: 'Flow',
    from: 'xkcd movie charts, StoryFlow',
    about:
      'Arcs have no fixed column. Each session pulls arcs that share an event into a tight group and spaces unrelated ones further apart, so lines drift together while they interact and apart when they stop.',
  },
  {
    id: 8,
    name: 'Long arcs',
    from: 'Your request',
    about:
      'Only open arcs, ranked by how many sessions they have been open, or by how long since they were last played. Slide to choose what counts as long.',
  },
] as const

function ArcLab() {
  const { v } = Route.useSearch()
  const sessions = useMemo(() => campaignSessionsInOrder(), [])
  const base = useMemo(() => buildStorylines(arcs), [])
  const parents = useMemo(() => branchParents(base), [base])
  const people = useMemo(() => peopleLines(sessions), [sessions])
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [selected, setSelected] = useState<string | undefined>()

  let lines: LabLine[] = base
  let columns: ReadonlyMap<string, number> = assignColumns(base)
  let options: LabOptions = { interchange: 'pill', density: 'arc', hoverCards: false }
  if (v === 2) {
    columns = relatedColumns(base)
    options = { interchange: 'curve', density: 'arc', branchParents: parents, hoverCards: false }
  } else if (v === 3) {
    options = { interchange: 'pill', density: 'session', hoverCards: true }
  } else if (v === 4) {
    lines = bundleFinished(base, expanded).toSorted(
      (a, b) => (a.first ?? Infinity) - (b.first ?? Infinity) || (a.last ?? 0) - (b.last ?? 0),
    )
    columns = assignColumns(lines)
    options = { interchange: 'pill', density: 'arc', hoverCards: true }
  } else if (v === 5) {
    lines = people
    columns = assignColumns(people)
    options = { interchange: 'pill', density: 'session', hoverCards: true, clusterBy: 'place' }
  } else if (v === 6) {
    columns = relatedColumns(base)
    options = { interchange: 'pill', density: 'arc', branchParents: parents, hoverCards: true }
  }

  const onSelect = (line: LabLine) => {
    if (line.members) {
      setExpanded((prev) => new Set([...prev, line.key]))
      return
    }
    setSelected((prev) => (prev === line.key ? undefined : line.key))
  }
  const detail = base.find((line) => line.key === selected)
  const variant = VARIANTS[v - 1]!

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-3">
        <h1 className="text-3xl font-bold">Arc graph variants</h1>
        <nav className="flex flex-wrap gap-1 text-sm">
          {VARIANTS.map((option) => (
            <Link
              key={option.id}
              to="/dm/arcs/lab"
              search={{ v: option.id }}
              onClick={() => setSelected(undefined)}
              className={cn(
                'rounded-md border px-2 py-1',
                v === option.id ? 'bg-foreground text-background' : 'hover:bg-muted',
              )}
            >
              {option.id} · {option.name}
            </Link>
          ))}
          <Link to="/dm/arcs" className="text-muted-foreground px-2 py-1 hover:underline">
            Current version
          </Link>
        </nav>
        <div className="border-border bg-card rounded-xl border p-3 text-sm">
          <p className="font-semibold">
            {variant.id} · {variant.name}{' '}
            <span className="text-muted-foreground font-normal">
              · borrowed from {variant.from}
            </span>
          </p>
          <p className="text-muted-foreground">{variant.about}</p>
          {v === 4 && expanded.size > 0 ? (
            <button type="button" onClick={() => setExpanded(new Set())} className="mt-1 underline">
              Fold the bundles again
            </button>
          ) : null}
        </div>
        {v === 7 ? (
          <FlowGraph
            storylines={base}
            sessions={sessions}
            onSelect={onSelect}
            selected={selected}
          />
        ) : v === 8 ? (
          <LongArcs storylines={base} sessions={sessions} onSelect={onSelect} />
        ) : (
          <LabGraph
            key={v}
            lines={lines}
            sessions={sessions}
            columns={columns}
            options={options}
            onSelect={onSelect}
            selected={selected}
          />
        )}
      </div>
      <aside className="order-first min-w-0 xl:sticky xl:top-20 xl:order-none xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto">
        {detail ? (
          <DmStorylineDetail line={detail} storylines={base} />
        ) : (
          <p className="text-muted-foreground text-sm">
            {v === 5
              ? 'Hover a face or a station to see the events.'
              : 'Pick an arc to see its details here.'}
          </p>
        )}
      </aside>
    </div>
  )
}
