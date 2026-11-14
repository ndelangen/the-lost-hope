import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { z } from 'zod'

import { DmArcRelation } from '#/components/dm/dm-arc-relation'
import { DmCastChart } from '#/components/dm/dm-cast-chart'
import { DmFaces } from '#/components/dm/dm-faces'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { DmStorylineDetail } from '#/components/dm/dm-storyline-detail'
import { DmStorylineFlow } from '#/components/dm/dm-storyline-flow'
import { DmStorylineGraph } from '#/components/dm/dm-storyline-graph'
import { DmStorylineLog } from '#/components/dm/dm-storyline-log'
import type { EntityRef } from '#/definitions/kind'
import { compareEntityNames, pcs } from '#/lib/campaign'
import { relateArcs } from '#/lib/dm-arc-relation'
import { arcs, resolveSourceRef } from '#/lib/dm-campaign'
import { buildCast } from '#/lib/dm-cast'
import {
  type Storyline,
  applyStorylineFilters,
  assignColumns,
  branchParents,
  buildStorylines,
  campaignSessionsInOrder,
  focusKey,
  focusOptions,
  parseFocusKey,
} from '#/lib/dm-storylines'
import { cn } from '#/lib/utils'

const RECENT_CHOICES = [undefined, 10, 5, 3] as const
const LONG_CHOICES = [undefined, 5, 10] as const
const QUIET_CHOICES = [undefined, 3, 5] as const

const VIEWS = [
  { id: 'map', label: 'Map', about: 'Where the storylines went, and where they could lead.' },
  { id: 'flow', label: 'Flow', about: 'Which arcs are tangled together, and when they split.' },
  {
    id: 'log',
    label: 'Log',
    about: 'Every session on one screen. Pick two arcs to see what ties them.',
  },
  { id: 'cast', label: 'Cast', about: 'Who turns up when, and who you have not used in a while.' },
] as const
type View = (typeof VIEWS)[number]['id']

const Search = z.object({
  view: z.enum(['map', 'flow', 'log', 'cast']).optional().catch(undefined),
  arc: z.string().optional().catch(undefined),
  with: z.string().optional().catch(undefined),
  focus: z.string().optional().catch(undefined),
  open: z.boolean().optional().catch(undefined),
  recent: z.number().int().positive().optional().catch(undefined),
  long: z.number().int().positive().optional().catch(undefined),
  quiet: z.number().int().positive().optional().catch(undefined),
  hide: z.boolean().optional().catch(undefined),
  everyone: z.boolean().optional().catch(undefined),
  gone: z.boolean().optional().catch(undefined),
})
type Search = z.infer<typeof Search>

export const Route = createFileRoute('/dm/arcs/')({
  validateSearch: Search,
  head: () => ({
    meta: [{ title: 'Arcs | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: ArcsIndex,
})

const OPTION_GROUPS: { kind: EntityRef['ref']; label: string }[] = [
  { kind: 'npc', label: 'NPCs' },
  { kind: 'location', label: 'Places' },
  { kind: 'quest', label: 'Quests' },
  { kind: 'item', label: 'Items' },
  { kind: 'organization', label: 'Organizations' },
  { kind: 'beast', label: 'Creatures' },
  { kind: 'pc', label: 'Player characters' },
]

function ArcsIndex() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setSearch = (patch: Partial<Search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), resetScroll: false })

  const view: View = search.view ?? 'map'
  const base = useMemo(() => {
    const storylines = buildStorylines(arcs)
    return {
      storylines,
      sessions: campaignSessionsInOrder(),
      options: focusOptions(storylines),
      parents: branchParents(storylines),
    }
  }, [])
  const latest = base.sessions.at(-1)?.number ?? 0
  const focus = search.focus ? parseFocusKey(search.focus) : undefined
  const { matching, sessions } = applyStorylineFilters(base.storylines, base.sessions, {
    focus,
    openOnly: search.open,
    recent: search.recent,
    longerThan: search.long,
    quietFor: search.quiet,
  })
  const shown = search.hide
    ? base.storylines.filter((line) => matching.has(line.key))
    : base.storylines.filter(
        (line) =>
          matching.has(line.key) ||
          !search.recent ||
          line.next.length > 0 ||
          (line.last ?? 0) >= (sessions[0]?.number ?? 0),
      )
  const dimmed = new Set(shown.filter((line) => !matching.has(line.key)).map((line) => line.key))
  const columns = assignColumns(shown)
  const [hovered, setHovered] = useState<string | undefined>()
  const selected = base.storylines.find((line) => line.arc.slug === search.arc)
  const compared = base.storylines.find((line) => line.arc.slug === search.with)
  const filtered = Boolean(focus || search.open || search.recent || search.long || search.quiet)
  const cast = useMemo(() => buildCast(sessions), [sessions])
  const castShown = cast
    .filter((member) => search.everyone || member.person.ref === 'npc')
    .toSorted((a, b) => (search.gone ? a.last - b.last : 0) || b.events - a.events)

  const toggleArc = (line: Storyline) =>
    setSearch({ arc: line.arc.slug === search.arc ? undefined : line.arc.slug })
  // In the log, a second pick is compared with the first; a third starts over.
  const pickToCompare = (line: Storyline) => {
    const slug = line.arc.slug
    if (!search.arc || (search.arc && search.with)) setSearch({ arc: slug, with: undefined })
    else if (slug !== search.arc) setSearch({ with: slug })
  }

  const activePcs = Object.entries(pcs)
    .filter(([, pc]) => pc.status === 'active')
    .map(([key]) => ({ ref: 'pc' as const, key }))

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-3">
        <h1 className="text-3xl font-bold">Arcs</h1>

        <nav aria-label="Views" className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="border-border flex overflow-hidden rounded-md border text-sm">
            {VIEWS.map((option) => (
              <Link
                key={option.id}
                to="/dm/arcs"
                search={(prev) => ({ ...prev, view: option.id === 'map' ? undefined : option.id })}
                resetScroll={false}
                aria-current={view === option.id ? 'page' : undefined}
                className={cn(
                  'px-3 py-1',
                  view === option.id ? 'bg-foreground text-background' : 'hover:bg-muted',
                )}
              >
                {option.label}
              </Link>
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            {VIEWS.find((option) => option.id === view)!.about}
          </span>
        </nav>

        <div className="border-border bg-card grid gap-3 rounded-xl border p-3 text-sm">
          {view === 'cast' ? null : (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground w-16 shrink-0">Follow</span>
              {activePcs.map((pc) => {
                const active = search.focus === focusKey(pc)
                return (
                  <button
                    key={pc.key}
                    type="button"
                    onClick={() => setSearch({ focus: active ? undefined : focusKey(pc) })}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full border py-0.5 pr-2.5 pl-0.5',
                      active ? 'bg-foreground text-background' : 'hover:bg-muted',
                    )}
                  >
                    <DmFaces people={[pc]} />
                    {resolveSourceRef(pc)?.name.split(' ')[0]}
                  </button>
                )
              })}
              <select
                aria-label="Follow anyone or anywhere"
                value={search.focus && !search.focus.startsWith('pc:') ? search.focus : ''}
                onChange={(event) => setSearch({ focus: event.target.value || undefined })}
                className="border-border bg-background max-w-56 rounded-md border px-2 py-1"
              >
                <option value="">Anyone or anywhere…</option>
                {OPTION_GROUPS.filter((group) => group.kind !== 'pc').map((group) => {
                  const options = base.options
                    .filter((ref) => ref.ref === group.kind)
                    .map((ref) => ({
                      key: focusKey(ref),
                      name: resolveSourceRef(ref)?.name ?? ref.key,
                    }))
                    .toSorted((a, b) => compareEntityNames(a.name, b.name))
                  return options.length > 0 ? (
                    <optgroup key={group.kind} label={group.label}>
                      {options.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.name}
                        </option>
                      ))}
                    </optgroup>
                  ) : null
                })}
              </select>
              {focus && !search.focus?.startsWith('pc:') ? (
                <span className="font-medium">{resolveSourceRef(focus)?.name}</span>
              ) : null}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {view === 'cast' ? (
              <>
                <Segmented
                  label="Show"
                  options={[
                    {
                      label: 'NPCs',
                      active: !search.everyone,
                      onClick: () => setSearch({ everyone: undefined }),
                    },
                    {
                      label: 'Everyone',
                      active: Boolean(search.everyone),
                      onClick: () => setSearch({ everyone: true }),
                    },
                  ]}
                />
                <Segmented
                  label="Sort"
                  options={[
                    {
                      label: 'Most present',
                      active: !search.gone,
                      onClick: () => setSearch({ gone: undefined }),
                    },
                    {
                      label: 'Longest gone',
                      active: Boolean(search.gone),
                      onClick: () => setSearch({ gone: true }),
                    },
                  ]}
                />
              </>
            ) : (
              <>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={search.open ?? false}
                    onChange={(event) => setSearch({ open: event.target.checked || undefined })}
                  />
                  Only arcs still open
                </label>
                <Segmented
                  label="Running for"
                  options={LONG_CHOICES.map((value) => ({
                    label: value ? `${value}+ sessions` : 'Any',
                    active: search.long === value,
                    onClick: () => setSearch({ long: value }),
                  }))}
                />
                <Segmented
                  label="Untouched for"
                  options={QUIET_CHOICES.map((value) => ({
                    label: value ? `${value}+ sessions` : 'Any',
                    active: search.quiet === value,
                    onClick: () => setSearch({ quiet: value }),
                  }))}
                />
              </>
            )}
            <Segmented
              label="Sessions"
              options={RECENT_CHOICES.map((value) => ({
                label: value ? `Last ${value}` : 'All',
                active: search.recent === value,
                onClick: () => setSearch({ recent: value }),
              }))}
            />
            {view === 'cast' ? null : (
              <Segmented
                label="Others"
                options={[
                  {
                    label: 'Fade',
                    active: !search.hide,
                    onClick: () => setSearch({ hide: undefined }),
                  },
                  {
                    label: 'Hide',
                    active: Boolean(search.hide),
                    onClick: () => setSearch({ hide: true }),
                  },
                ]}
              />
            )}
            {filtered ? (
              <Link
                to="/dm/arcs"
                search={{ view: search.view, arc: search.arc, with: search.with }}
                resetScroll={false}
                className="text-muted-foreground flex items-center gap-1 hover:underline"
              >
                <X className="size-3.5" /> Clear
              </Link>
            ) : null}
          </div>
          <p className="text-muted-foreground text-xs">
            {view === 'cast'
              ? `${castShown.length} people`
              : `${matching.size} of ${base.storylines.length} arcs`}
            {sessions.length < base.sessions.length
              ? ` · sessions ${sessions[0]?.number}–${sessions.at(-1)?.number}`
              : ''}
          </p>
        </div>

        {view === 'log' ? (
          <div className="border-border bg-card grid gap-3 rounded-xl border p-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">How do these relate?</span>
              {(['arc', 'with'] as const).map((param, index) => (
                <select
                  key={param}
                  aria-label={index === 0 ? 'First arc' : 'Second arc'}
                  value={search[param] ?? ''}
                  onChange={(event) => setSearch({ [param]: event.target.value || undefined })}
                  className="border-border bg-background max-w-64 rounded-md border px-2 py-1"
                >
                  <option value="">{index === 0 ? 'First arc…' : 'Second arc…'}</option>
                  {base.storylines.map((line) => (
                    <option key={line.key} value={line.arc.slug}>
                      {line.arc.name}
                    </option>
                  ))}
                </select>
              ))}
              {selected && compared ? null : (
                <span className="text-muted-foreground text-xs">or click two arcs in the log</span>
              )}
            </div>
            {selected && compared ? (
              <DmArcRelation
                a={selected}
                b={compared}
                relation={relateArcs(base.storylines, selected, compared)}
              />
            ) : null}
          </div>
        ) : null}

        {view === 'cast' ? (
          <DmCastChart cast={castShown} sessions={sessions} latest={latest} />
        ) : shown.length === 0 ? (
          <p className="text-muted-foreground">No arcs match these filters.</p>
        ) : view === 'flow' ? (
          <DmStorylineFlow
            storylines={shown}
            sessions={sessions}
            focus={hovered ?? selected?.key}
            dimmed={dimmed}
            onFocus={setHovered}
            onPick={toggleArc}
          />
        ) : view === 'log' ? (
          <DmStorylineLog
            storylines={shown}
            sessions={sessions}
            columns={columns}
            focus={hovered}
            dimmed={dimmed}
            picked={[selected?.key, compared?.key].filter((key) => key !== undefined)}
            onFocus={setHovered}
            onPick={pickToCompare}
          />
        ) : (
          <DmStorylineGraph
            storylines={shown}
            sessions={sessions}
            columns={columns}
            parents={base.parents}
            focus={hovered ?? selected?.key}
            dimmed={dimmed}
            onFocus={setHovered}
            selectedSlug={search.arc}
          />
        )}
      </div>
      <aside className="order-first grid min-w-0 content-start gap-4 xl:sticky xl:top-20 xl:order-none xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto">
        <DmQuickLinks stackAt="xl" />
        {selected ? (
          <DmStorylineDetail line={selected} storylines={base.storylines} />
        ) : (
          <p className="text-muted-foreground text-sm">
            Pick an arc to see where it was played, which arcs it crossed, and where it could go
            next.
          </p>
        )}
      </aside>
    </div>
  )
}

function Segmented({
  label,
  options,
}: {
  label: string
  options: { label: string; active: boolean; onClick: () => void }[]
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{label}</span>
      <div className="border-border flex overflow-hidden rounded-md border">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            aria-pressed={option.active}
            onClick={option.onClick}
            className={cn(
              'px-2 py-0.5',
              option.active ? 'bg-foreground text-background' : 'hover:bg-muted',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
