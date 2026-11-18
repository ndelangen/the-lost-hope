import { readFileSync } from 'node:fs'

import type { Event } from '#/definitions/event'
import {
  DM_ENTITY_KINDS,
  ENTITY_KINDS,
  type DmEntityKind,
  type EntityKind,
  type EntityRef,
} from '#/definitions/kind'
import { campaignToday, effectEntry, getEntity } from '#/lib/campaign'
import { PLAYER_VISIBLE_KEYS, SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { arcs, creatures, plotCast, scenes, table } from '#/lib/dm-campaign'
import { refText, sourceText } from '#/lib/dm-prep-brief'
import { buildStorylines, campaignSessionsInOrder } from '#/lib/dm-storylines'
import { eventProse } from '#/lib/foretold'
import { DM_FIELDS, stripDmFields } from '#/lib/player-visibility'
import { splitQuestionsMarkdown } from '#/lib/questions'

/**
 * A read-only query layer over the full campaign source for Claude sessions doing story work.
 * Every answer is derived on demand from the campaign data and its `refs.*` links; nothing is
 * copied or stored. Records are always named as `Name (refs.<kind>s.<key>)`, so an answer can be
 * pasted straight into campaign data.
 */

const KNOWLEDGE_KINDS = [...ENTITY_KINDS, ...DM_ENTITY_KINDS] as const
type KnowledgeKind = EntityKind | DmEntityKind
type KnowledgeRef = EntityRef<KnowledgeKind>

type SourceRecord = { name: string; slug: string } & Record<string, unknown>

const ALL_KINDS: ReadonlySet<string> = new Set(KNOWLEDGE_KINDS)
const DM_KINDS: ReadonlySet<string> = new Set(DM_ENTITY_KINDS)

function registry(kind: KnowledgeKind): Readonly<Record<string, SourceRecord>> {
  if (kind === 'arc') return arcs as unknown as Record<string, SourceRecord>
  if (kind === 'scene') return scenes as unknown as Record<string, SourceRecord>
  if (kind === 'creature') return creatures as unknown as Record<string, SourceRecord>
  return SOURCE_REGISTRIES[kind] as unknown as Record<string, SourceRecord>
}

function recordOf(ref: KnowledgeRef): SourceRecord | undefined {
  const records = registry(ref.ref)
  return Object.hasOwn(records, ref.key) ? records[ref.key] : undefined
}

function refId(ref: KnowledgeRef): string {
  return `${ref.ref}:${ref.key}`
}

function name(ref: KnowledgeRef): string {
  return refText(ref)
}

function isKnowledgeRef(value: unknown): value is KnowledgeRef {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof (value as KnowledgeRef).key === 'string' &&
    ALL_KINDS.has((value as KnowledgeRef).ref)
  )
}

function dmFieldsOf(kind: KnowledgeKind): ReadonlySet<string> {
  return new Set<string>(DM_KINDS.has(kind) ? [] : DM_FIELDS[kind as EntityKind])
}

// ─── Resolving what a caller means ──────────────────────────────────────────────────────────────

/**
 * Resolve `refs.npcs.light_13th_marshal`, `npc:light_13th_marshal`, `npcs.light_13th_marshal`, a
 * slug, or a record name. Returns every candidate when a name is ambiguous.
 */
export function resolveQuery(query: string): KnowledgeRef[] {
  const text = query.trim()
  const dotted = /^(?:refs\.)?([a-z]+?)s?[.:]([a-z0-9_-]+)$/u.exec(text)
  if (dotted) {
    const kind = dotted[1] as KnowledgeKind
    const key = dotted[2]!.replaceAll('-', '_')
    if (ALL_KINDS.has(kind) && recordOf({ ref: kind, key })) return [{ ref: kind, key }]
  }

  const wanted = text.toLowerCase()
  const exact: KnowledgeRef[] = []
  const partial: KnowledgeRef[] = []
  for (const kind of KNOWLEDGE_KINDS) {
    for (const [key, record] of Object.entries(registry(kind))) {
      const names = [record.name, record.slug, key, ...aliasesOf(record)].map((n) =>
        n.toLowerCase(),
      )
      if (names.includes(wanted)) exact.push({ ref: kind, key })
      else if (names.some((n) => n.includes(wanted))) partial.push({ ref: kind, key })
    }
  }
  if (exact.length > 0) return exact
  // "swift" means Swift Starblade, not every record whose name mentions him: prefer characters,
  // then other named records, then events, and within that the shortest name when every other
  // candidate's name contains it.
  const characters = new Set(['pc', 'npc', 'beast'])
  const groups = [
    partial.filter((ref) => characters.has(ref.ref)),
    partial.filter((ref) => !characters.has(ref.ref) && ref.ref !== 'event'),
  ]
  const group = groups.find((refs) => refs.length > 0) ?? []
  const nameOf = (ref: KnowledgeRef) => recordOf(ref)!.name.toLowerCase()
  const shortest = group.toSorted((a, b) => nameOf(a).length - nameOf(b).length)[0]
  if (shortest && group.every((ref) => nameOf(ref).includes(nameOf(shortest)))) return [shortest]
  const named = groups.flat()
  return [...named, ...partial.filter((ref) => ref.ref === 'event')].slice(0, 10)
}

function aliasesOf(record: SourceRecord): string[] {
  return Array.isArray(record.aliases) ? (record.aliases as string[]) : []
}

function resolveOne(query: string): KnowledgeRef | string {
  const found = resolveQuery(query)
  if (found.length === 1) return found[0]!
  if (found.length === 0) return `Nothing in canon matches "${query}". Try \`search\`.`
  return [
    `"${query}" is ambiguous. Pass one of these refs:`,
    ...found.map((ref) => `- ${name(ref)}`),
  ].join('\n')
}

// ─── The link graph ─────────────────────────────────────────────────────────────────────────────

type Link = {
  from: KnowledgeRef
  to: KnowledgeRef
  /** The top-level field the reference sits in, e.g. `notes` or `plots`. */
  field: string
  /** True when the reference sits in a DM-only field or record. */
  dmOnly: boolean
}

function collect(value: unknown, out: KnowledgeRef[]): void {
  if (!value || typeof value !== 'object') return
  if (isKnowledgeRef(value)) {
    out.push(value)
    return
  }
  for (const child of Array.isArray(value) ? value : Object.values(value)) collect(child, out)
}

type Graph = {
  outgoing: ReadonlyMap<string, readonly Link[]>
  incoming: ReadonlyMap<string, readonly Link[]>
}

let graphCache: Graph | undefined

function graph(): Graph {
  if (graphCache) return graphCache
  const outgoing = new Map<string, Link[]>()
  const incoming = new Map<string, Link[]>()
  for (const kind of KNOWLEDGE_KINDS) {
    const dmFields = dmFieldsOf(kind)
    for (const [key, record] of Object.entries(registry(kind))) {
      const from = { ref: kind, key }
      const seen = new Set<string>()
      for (const [field, value] of Object.entries(record)) {
        const refs: KnowledgeRef[] = []
        collect(value, refs)
        for (const to of refs) {
          const id = `${refId(to)}|${field}`
          if (seen.has(id) || refId(to) === refId(from)) continue
          seen.add(id)
          const link = { from, to, field, dmOnly: DM_KINDS.has(kind) || dmFields.has(field) }
          outgoing.set(refId(from), [...(outgoing.get(refId(from)) ?? []), link])
          incoming.set(refId(to), [...(incoming.get(refId(to)) ?? []), link])
        }
      }
    }
  }
  graphCache = { outgoing, incoming }
  return graphCache
}

export function linksOf(ref: KnowledgeRef) {
  const g = graph()
  return { outgoing: g.outgoing.get(refId(ref)) ?? [], incoming: g.incoming.get(refId(ref)) ?? [] }
}

// ─── Chronology and visibility ──────────────────────────────────────────────────────────────────

type TimelineEvent = {
  key: string
  session: number
  day: number
  record: SourceRecord & { day: number; location: KnowledgeRef }
}

let chronologyCache: TimelineEvent[] | undefined

/** Every played event in play order: by session, then by the order the session lists them. */
function chronology(): TimelineEvent[] {
  if (chronologyCache) return chronologyCache
  chronologyCache = campaignSessionsInOrder().flatMap((session) =>
    session.events.flatMap((ref) => {
      const record = recordOf(ref) as TimelineEvent['record'] | undefined
      return record ? [{ key: ref.key, session: session.number, day: record.day, record }] : []
    }),
  )
  return chronologyCache
}

function sessionOfEvent(key: string): number | undefined {
  return chronology().find((event) => event.key === key)?.session
}

/** Events, played or off-screen, that reference a record anywhere (including DM fields). */
function eventsInvolving(ref: KnowledgeRef): KnowledgeRef[] {
  return linksOf(ref)
    .incoming.filter((link) => link.from.ref === 'event')
    .map((link) => link.from)
    .filter((event, index, all) => all.findIndex((e) => e.key === event.key) === index)
}

type Visibility =
  | { status: 'player-known'; firstSeen?: KnowledgeRef }
  | { status: 'dm-only'; reason: string }

export function visibilityOf(ref: KnowledgeRef): Visibility {
  if (DM_KINDS.has(ref.ref)) {
    return { status: 'dm-only', reason: `${ref.ref}s are DM prep and never shown to players` }
  }
  const kind = ref.ref as EntityKind
  if (!PLAYER_VISIBLE_KEYS[kind].has(ref.key)) {
    return {
      status: 'dm-only',
      reason:
        kind === 'event'
          ? 'off-screen: no session lists this event'
          : 'the party has not met it: no played event references it outside DM fields',
    }
  }
  if (kind === 'event' || kind === 'pc' || kind === 'session' || kind === 'quest') {
    return { status: 'player-known' }
  }
  const firstSeen = chronology().find((event) =>
    JSON.stringify(stripDmFields('event', event.record)).includes(
      JSON.stringify({ ref: ref.ref, key: ref.key }).slice(1, -1),
    ),
  )
  return {
    status: 'player-known',
    firstSeen: firstSeen ? { ref: 'event', key: firstSeen.key } : undefined,
  }
}

function visibilityLine(ref: KnowledgeRef): string {
  const visibility = visibilityOf(ref)
  if (visibility.status === 'dm-only') return `DM-ONLY (${visibility.reason})`
  return visibility.firstSeen
    ? `Player-known (first met in ${eventLabel(visibility.firstSeen.key)})`
    : 'Player-known'
}

function eventLabel(key: string): string {
  const record = recordOf({ ref: 'event', key }) as TimelineEvent['record'] | undefined
  if (!record) return key
  const session = sessionOfEvent(key)
  return `${session ? `S${session}` : 'off-screen'}, day ${record.day}: ${name({ ref: 'event', key })}`
}

// ─── Rendering records ──────────────────────────────────────────────────────────────────────────

const NOISE_FIELDS = new Set(['slug', 'avatar', 'image', 'icon', 'illustration', 'map', 'mark'])

function renderValue(value: unknown): string {
  if (value === undefined || value === null) return ''
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (isKnowledgeRef(value) || (value as { ref?: unknown }).ref === 'rule') return sourceText(value)
  if (isMembership(value)) {
    return `${value.rank}, ${sourceText(value.organization)}${value.status === 'active' ? '' : ` (${value.status})`}`
  }
  if (Array.isArray(value)) {
    const text = sourceText(value)
    if (text) return text
    return value.map((item) => `- ${renderValue(item).replaceAll('\n', '\n  ')}`).join('\n')
  }
  return Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => {
      const text = renderValue(v)
      return text.includes('\n') ? `${k}:\n  ${text.replaceAll('\n', '\n  ')}` : `${k}: ${text}`
    })
    .join('\n')
}

function isMembership(
  value: unknown,
): value is { organization: KnowledgeRef; rank: string; status: string } {
  return !!value && typeof value === 'object' && 'organization' in value && 'rank' in value
}

function statSummary(record: SourceRecord): string | undefined {
  const stats = record.stats as { ref?: string; key?: string; cr?: string } | undefined
  if (!stats) return undefined
  if (stats.ref === 'creature') return `shared stat block ${name(stats as KnowledgeRef)}`
  return `own stat block, CR ${stats.cr ?? '?'}`
}

function renderRecord(ref: KnowledgeRef, record: SourceRecord, includeDm: boolean): string {
  const dmFields = dmFieldsOf(ref.ref)
  const lines: string[] = []
  for (const [field, value] of Object.entries(record)) {
    if (NOISE_FIELDS.has(field) || field === 'name' || field === 'stats') continue
    if (value === undefined || (Array.isArray(value) && value.length === 0)) continue
    const dm = DM_KINDS.has(ref.ref) || dmFields.has(field)
    if (dm && !includeDm) continue
    const text = renderValue(value)
    if (!text) continue
    const label = dm && !DM_KINDS.has(ref.ref) ? `${field} [DM-only]` : field
    lines.push(text.includes('\n') ? `${label}:\n${indent(text)}` : `${label}: ${text}`)
  }
  const stats = statSummary(record)
  if (stats && includeDm) lines.push(`stats [DM-only]: ${stats}`)
  return lines.join('\n')
}

function indent(text: string, by = '  '): string {
  return text
    .split('\n')
    .map((line) => by + line)
    .join('\n')
}

function groupLinks(found: readonly Link[], side: 'from' | 'to'): string {
  const byKind = new Map<string, string[]>()
  for (const link of found) {
    const target = link[side]
    const label = `${target.ref === 'event' ? eventLabel(target.key) : name(target)} via ${link.field}${link.dmOnly ? ' [DM-only]' : ''}`
    byKind.set(target.ref, [...(byKind.get(target.ref) ?? []), label])
  }
  return [...byKind.entries()]
    .map(
      ([kind, labels]) => `${kind}s (${labels.length}):\n${labels.map((l) => `- ${l}`).join('\n')}`,
    )
    .join('\n')
}

// ─── Tools ──────────────────────────────────────────────────────────────────────────────────────

export function overview(): string {
  const events = chronology()
  const latest = events.at(-1)
  const sessions = campaignSessionsInOrder()
  const lastSession = sessions.at(-1)
  const pcs = Object.entries(SOURCE_REGISTRIES.pc).map(
    ([key, pc]) => `- ${name({ ref: 'pc', key })}: ${pc.status}`,
  )
  const storylines = buildStorylines(arcs)
  const openArcs = storylines
    .filter((line) => line.next.length > 0)
    .toSorted((a, b) => (b.last ?? 0) - (a.last ?? 0))
    .map(
      (line) =>
        `- ${name({ ref: 'arc', key: line.key })}: ${line.next.length} open plot(s), last played ${line.last ? `S${line.last}` : 'never'}`,
    )
  const openQuests = Object.entries(SOURCE_REGISTRIES.quest)
    .filter(([, quest]) => quest.status === 'open')
    .map(([key]) => `- ${name({ ref: 'quest', key })}`)
  const effects = Object.entries(SOURCE_REGISTRIES.effect).flatMap(([key, effect]) => {
    const entity = getEntity('effect', effect.slug)
    return entity && effectEntry(entity).status === 'active'
      ? [`- ${name({ ref: 'effect', key })} on ${name(effect.on)}`]
      : []
  })
  const unmet = (['npc', 'location', 'organization', 'item', 'beast'] as const).map(
    (kind) =>
      `${kind}s ${Object.keys(SOURCE_REGISTRIES[kind]).filter((key) => !PLAYER_VISIBLE_KEYS[kind].has(key)).length}`,
  )

  return [
    '# The Lost Hope: where the campaign stands',
    '',
    'Everything below is settled canon from the campaign data. Ideas brainstormed in chat are not canon until they are written into the data.',
    '',
    `Campaign day ${campaignToday()}. Latest session: S${lastSession?.number} ${lastSession?.name} (refs.sessions.${lastSession?.key}).`,
    latest ? `The party was last at ${name(latest.record.location)}.` : '',
    '',
    '## Party',
    ...pcs,
    '',
    '## Last 8 events',
    ...events.slice(-8).map((event) => `- ${eventLabel(event.key)}`),
    '',
    '## Lasting effects in force',
    ...(effects.length > 0 ? effects : ['- none']),
    '',
    `## Open arcs (${openArcs.length})`,
    ...openArcs,
    '',
    `## Open quests (${openQuests.length})`,
    ...openQuests,
    '',
    '## Prepared for next session',
    ...table.likely.map((ref) => `- likely: ${name(ref)}`),
    ...table.pinned.map((ref) => `- pinned: ${name(ref)}`),
    '',
    `DM-only records the party has not met: ${unmet.join(', ')}. Use \`list\` with visibility "dm-only" to see them.`,
  ]
    .filter((line, index, all) => line !== '' || all[index - 1] !== '')
    .join('\n')
}

export function getRecord(query: string, includeDm = true): string {
  const ref = resolveOne(query)
  if (typeof ref === 'string') return ref
  const record = recordOf(ref)!
  const { outgoing, incoming } = linksOf(ref)
  const out = [
    `# ${name(ref)}`,
    `kind: ${ref.ref}`,
    `visibility: ${visibilityLine(ref)}`,
    renderRecord(ref, record, includeDm),
  ]
  if (ref.ref !== 'event' && ref.ref !== 'session') {
    const involved = eventsInvolving(ref).filter((e) => sessionOfEvent(e.key) !== undefined)
    if (involved.length > 0) {
      out.push(
        '',
        `## Played events involving it (${involved.length}, latest last)`,
        ...involved
          .toSorted((a, b) => playOrder(a.key) - playOrder(b.key))
          .slice(-10)
          .map((event) => `- ${eventLabel(event.key)}`),
      )
    }
  }
  out.push(
    '',
    `Links: ${outgoing.length} outgoing, ${incoming.length} incoming. Use \`links\` for the full list.`,
  )
  return out.join('\n')
}

function playOrder(eventKey: string): number {
  const index = chronology().findIndex((event) => event.key === eventKey)
  return index === -1 ? Number.POSITIVE_INFINITY : index
}

export function links(query: string, direction: 'both' | 'incoming' | 'outgoing' = 'both'): string {
  const ref = resolveOne(query)
  if (typeof ref === 'string') return ref
  const { outgoing, incoming } = linksOf(ref)
  const out = [`# Links of ${name(ref)}`]
  if (direction !== 'incoming') {
    out.push('', `## It references (${outgoing.length})`, groupLinks(outgoing, 'to') || '- none')
  }
  if (direction !== 'outgoing') {
    out.push('', `## Referenced by (${incoming.length})`, groupLinks(incoming, 'from') || '- none')
  }
  return out.join('\n')
}

export function search(
  query: string,
  options: { kinds?: KnowledgeKind[]; visibility?: 'all' | 'player-known' | 'dm-only' } = {},
): string {
  const words = query.toLowerCase().split(/\s+/u).filter(Boolean)
  if (words.length === 0) return 'Give a search query.'
  const hits: { ref: KnowledgeRef; rank: number; snippet: string }[] = []
  for (const kind of options.kinds ?? KNOWLEDGE_KINDS) {
    for (const [key, record] of Object.entries(registry(kind))) {
      const ref = { ref: kind, key }
      const visibility = visibilityOf(ref).status
      if (options.visibility && options.visibility !== 'all' && visibility !== options.visibility) {
        continue
      }
      const text = renderRecord(ref, record, true)
      const haystack = `${record.name}\n${text}`.toLowerCase()
      if (!words.every((word) => haystack.includes(word))) continue
      const inName = words.every((word) => record.name.toLowerCase().includes(word))
      const at = haystack.indexOf(words[0]!)
      const snippet = `${record.name}\n${text}`
        .slice(Math.max(0, at - 60), at + 140)
        .replaceAll('\n', ' ')
      hits.push({ ref, rank: inName ? 0 : 1, snippet })
    }
  }
  if (hits.length === 0) return `No canon matches "${query}".`
  return [
    `# ${hits.length} match(es) for "${query}"`,
    ...hits
      .toSorted((a, b) => a.rank - b.rank)
      .slice(0, 30)
      .map(
        ({ ref, snippet }) =>
          `- ${name(ref)} [${ref.ref}, ${visibilityOf(ref).status}]\n  …${snippet.trim()}…`,
      ),
  ].join('\n')
}

export function list(kind: KnowledgeKind, visibility: 'all' | 'player-known' | 'dm-only' = 'all') {
  const rows = Object.keys(registry(kind)).flatMap((key) => {
    const ref = { ref: kind, key }
    const status = visibilityOf(ref).status
    if (visibility !== 'all' && status !== visibility) return []
    return [`- ${name(ref)} [${status}]`]
  })
  return [`# ${kind}s (${rows.length}, ${visibility})`, ...rows].join('\n')
}

export function timeline(
  options: {
    fromDay?: number
    toDay?: number
    session?: number
    involving?: string
    detail?: boolean
    limit?: number
    includeOffscreen?: boolean
  } = {},
): string {
  let involving: Set<string> | undefined
  let heading = 'Timeline'
  if (options.involving) {
    const ref = resolveOne(options.involving)
    if (typeof ref === 'string') return ref
    involving = new Set(eventsInvolving(ref).map((event) => event.key))
    heading = `Timeline involving ${name(ref)}`
  }
  const played = chronology().filter(
    (event) =>
      (options.fromDay === undefined || event.day >= options.fromDay) &&
      (options.toDay === undefined || event.day <= options.toDay) &&
      (options.session === undefined || event.session === options.session) &&
      (!involving || involving.has(event.key)),
  )
  const limit = options.limit ?? 40
  const shown = played.slice(-limit)
  const out = [
    `# ${heading}: ${played.length} played event(s)${played.length > shown.length ? `, showing the latest ${shown.length}` : ''}`,
    'Order is play order (session, then the order within it). Day is the in-world campaign day.',
  ]
  let lastSession: number | undefined
  for (const event of shown) {
    if (event.session !== lastSession) {
      const session = campaignSessionsInOrder().find((s) => s.number === event.session)
      out.push('', `## S${event.session}: ${session?.name ?? ''}`)
      lastSession = event.session
    }
    out.push(
      `- day ${event.day}: ${name({ ref: 'event', key: event.key })} at ${name(event.record.location)}`,
    )
    if (options.detail) {
      out.push(indent(sourceText(eventProse(event.record as unknown as Event)), '    '))
      if (event.record.background) {
        out.push(indent(`[DM-only background] ${sourceText(event.record.background)}`, '    '))
      }
    }
  }
  if (options.includeOffscreen) {
    const offscreen = Object.entries(SOURCE_REGISTRIES.event).filter(
      ([key]) => sessionOfEvent(key) === undefined && (!involving || involving.has(key)),
    )
    out.push('', `## Off-screen events, DM-only (${offscreen.length})`)
    for (const [key, event] of offscreen) {
      out.push(`- day ${event.day}: ${name({ ref: 'event', key })}`)
      if (options.detail) out.push(indent(sourceText(eventProse(event)), '    '))
    }
  }
  return out.join('\n')
}

/** NPCs relevant to a record: itself, the NPCs it references, residents, and members. */
function npcsAround(ref: KnowledgeRef): KnowledgeRef[] {
  if (ref.ref === 'npc') return [ref]
  const found = new Map<string, KnowledgeRef>()
  for (const link of linksOf(ref).outgoing) {
    if (link.to.ref === 'npc') found.set(link.to.key, link.to)
  }
  if (ref.ref === 'arc') {
    for (const link of linksOf(ref).outgoing) {
      if (link.to.ref !== 'scene') continue
      for (const inner of linksOf(link.to).outgoing) {
        if (inner.to.ref === 'npc') found.set(inner.to.key, inner.to)
      }
    }
  }
  for (const [key, npc] of Object.entries(SOURCE_REGISTRIES.npc)) {
    const memberships = [...(npc.memberships ?? []), ...(npc.secretMemberships ?? [])]
    if (
      (ref.ref === 'location' && npc.location?.key === ref.key) ||
      (ref.ref === 'organization' && memberships.some((m) => m.organization.key === ref.key))
    ) {
      found.set(key, { ref: 'npc', key })
    }
  }
  return [...found.values()]
}

function npcMotiveSheet(ref: KnowledgeRef): string {
  const npc = recordOf(ref) as SourceRecord & {
    motivations?: unknown
    background?: unknown
    memberships?: unknown[]
    secretMemberships?: unknown[]
    location?: KnowledgeRef
    notes?: unknown
  }
  const out = [`### ${name(ref)}`, `visibility: ${visibilityLine(ref)}`]
  if (npc.notes) out.push(`known to players: ${sourceText(npc.notes)}`)
  if (npc.location) out.push(`home: ${name(npc.location)}`)
  out.push(
    `motivations [DM-only]: ${npc.motivations ? sourceText(npc.motivations) : 'NOT ESTABLISHED (open for the DM to decide)'}`,
  )
  if (npc.background) out.push(`background [DM-only]: ${sourceText(npc.background)}`)
  if (npc.memberships?.length) out.push(`memberships: ${renderValue(npc.memberships)}`)
  if (npc.secretMemberships?.length) {
    out.push(`secret memberships [DM-only]: ${renderValue(npc.secretMemberships)}`)
  }
  const last = eventsInvolving(ref)
    .filter((event) => sessionOfEvent(event.key) !== undefined)
    .toSorted((a, b) => playOrder(a.key) - playOrder(b.key))
    .at(-1)
  out.push(`last seen: ${last ? eventLabel(last.key) : 'never in play'}`)
  return out.join('\n')
}

export function motives(query: string): string {
  const ref = resolveOne(query)
  if (typeof ref === 'string') return ref
  const npcs = npcsAround(ref)
  if (npcs.length === 0) return `No NPCs are linked to ${name(ref)}.`
  return [
    `# Motives around ${name(ref)} (${npcs.length} NPC(s))`,
    'Established motivations and secrets. A suggestion must not contradict these unless the DM changes them.',
    ...npcs.map(npcMotiveSheet),
  ].join('\n\n')
}

/**
 * Who has met a record: the characters named alongside it in the same played events, from the
 * player-facing part of each event. Being named together is evidence of a meeting, not proof.
 */
export function met(query: string): string {
  const ref = resolveOne(query)
  if (typeof ref === 'string') return ref
  const marker = JSON.stringify(ref).slice(1, -1)
  const together = new Map<string, { ref: KnowledgeRef; events: string[] }>()
  for (const event of chronology()) {
    const shown = stripDmFields('event', event.record)
    if (!JSON.stringify(shown).includes(marker)) continue
    const named: KnowledgeRef[] = []
    collect(shown, named)
    for (const other of named) {
      if (!['pc', 'npc', 'beast'].includes(other.ref) || refId(other) === refId(ref)) continue
      const entry = together.get(refId(other)) ?? { ref: other, events: [] }
      if (!entry.events.includes(event.key)) entry.events.push(event.key)
      together.set(refId(other), entry)
    }
  }
  if (together.size === 0) return `No played event names ${name(ref)} together with a character.`
  const rows = [...together.values()].toSorted(
    (a, b) => b.events.length - a.events.length || name(a.ref).localeCompare(name(b.ref)),
  )
  return [
    `# Who has met ${name(ref)} (${rows.length})`,
    'Characters named in the same played events (player-facing notes only). Being named together is not always a meeting, for example the Father on an order; read the first event when it matters.',
    ...rows.map(({ ref: other, events }) => {
      const first = eventLabel(events[0]!)
      const last = events.length > 1 ? `; latest ${eventLabel(events.at(-1)!)}` : ''
      return `- ${name(other)} [${other.ref}${other.ref === 'pc' ? `, ${String(recordOf(other)!.status)}` : ''}]: ${events.length} event(s), first ${first}${last}`
    }),
  ].join('\n')
}

export function arc(query?: string): string {
  const storylines = buildStorylines(arcs)
  if (!query) {
    return [
      '# Arcs',
      ...storylines.map(
        (line) =>
          `- ${name({ ref: 'arc', key: line.key })}: ${line.next.length} open / ${line.arc.plots.length} plots, played ${line.first ? `S${line.first}–S${line.last}` : 'never'}`,
      ),
    ].join('\n')
  }
  const ref = resolveOne(query)
  if (typeof ref === 'string') return ref
  if (ref.ref !== 'arc') return `${name(ref)} is a ${ref.ref}, not an arc. Use \`get\`.`
  const line = storylines.find((l) => l.key === ref.key)!
  const out = [
    `# ${name(ref)}`,
    `Played ${line.first ? `S${line.first}–S${line.last}` : 'never'}.`,
    '',
    `Direction: ${sourceText(line.arc.direction)}`,
  ]
  if (line.arc.notes) out.push('', `Notes: ${sourceText(line.arc.notes)}`)
  if (line.arc.quests.length) out.push('', `Quests: ${line.arc.quests.map(name).join(', ')}`)
  if (line.crossings.length) {
    out.push(
      '',
      `Crosses: ${line.crossings.map((c) => `${name({ ref: 'arc', key: c.arcKey })} (${c.events.length} shared events)`).join(', ')}`,
    )
  }
  for (const plot of line.arc.plots) {
    out.push('', `## Plot: ${plot.name} [${plot.status}]`)
    if (plot.hook) out.push(`hook: ${sourceText(plot.hook)}`)
    if (plot.notes) out.push(`notes: ${sourceText(plot.notes)}`)
    if (plot.scene) out.push(`scene: ${name(plot.scene)}`)
    const cast = plotCast(plot)
    if (cast.length) out.push(`npcs: ${cast.map(name).join(', ')}`)
    for (const event of plot.events) out.push(`- played: ${eventLabel(event.key)}`)
  }
  return out.join('\n')
}

// ─── Checking a proposed idea against canon ─────────────────────────────────────────────────────

const ALIAS_STOPWORDS = new Set(['the', 'old', 'mr', 'mrs', 'sir', 'lord', 'captain', 'madame'])

let mentionIndexCache: { pattern: RegExp; ref: KnowledgeRef; label: string }[] | undefined

/**
 * Names that identify a record in free text: full names and aliases (case-insensitive), plus the
 * first word of a character's name when it is distinctive (case-sensitive, so "Light" the marshal
 * does not match "light" the word).
 */
function mentionIndex() {
  if (mentionIndexCache) return mentionIndexCache
  const entries: { pattern: RegExp; ref: KnowledgeRef; label: string }[] = []
  const firstWords = new Map<string, KnowledgeRef[]>()
  for (const kind of KNOWLEDGE_KINDS) {
    if (kind === 'event' || kind === 'session' || kind === 'creature') continue
    for (const [key, record] of Object.entries(registry(kind))) {
      const ref = { ref: kind, key }
      for (const label of [record.name, ...aliasesOf(record)]) {
        if (label.length < 3) continue
        entries.push({ pattern: wordPattern(label, 'iu'), ref, label })
      }
      if (kind === 'npc' || kind === 'pc' || kind === 'beast') {
        const first = record.name.split(/[\s,]+/u)[0]!.replace(/["“”]/gu, '')
        if (
          first.length >= 3 &&
          first !== record.name &&
          !ALIAS_STOPWORDS.has(first.toLowerCase())
        ) {
          firstWords.set(first, [...(firstWords.get(first) ?? []), ref])
        }
      }
    }
  }
  for (const [word, refs] of firstWords) {
    if (refs.length === 1)
      entries.push({ pattern: wordPattern(word, 'u'), ref: refs[0]!, label: word })
  }
  mentionIndexCache = entries
  return entries
}

function wordPattern(label: string, flags: string): RegExp {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&').replaceAll('’', "['’]")
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, flags)
}

export function mentionsIn(text: string): KnowledgeRef[] {
  const found = new Map<string, KnowledgeRef>()
  for (const { pattern, ref } of mentionIndex()) {
    if (pattern.test(text)) found.set(refId(ref), ref)
  }
  return [...found.values()]
}

/** Words that mean a record may no longer be as it was: a character's fate, a place's or thing's. */
const CHARACTER_FATE =
  /\b(dies|died|dead|killed|kills|slain|captured|imprisoned|transform(?:s|ed)|leaves the party|retires?)\b/iu
const THING_FATE =
  /\b(destroy(?:s|ed)?|burn(?:s|ed)? down|ruins?|lost|stolen|broken|shatter(?:s|ed))\b/iu

/** A sentence of an event that names the record and says something drastic happened to its kind. */
function stateChangeIn(event: KnowledgeRef, ref: KnowledgeRef): string | undefined {
  const fate = ['pc', 'npc', 'beast'].includes(ref.ref) ? CHARACTER_FATE : THING_FATE
  if (!['pc', 'npc', 'beast', 'location', 'item'].includes(ref.ref)) return undefined
  const eventRecord = recordOf(event)!
  const marker = `(refs.${ref.ref}s.${ref.key})`
  const text = [eventRecord.name, sourceText(eventProse(eventRecord as Event))].join('. ')
  return text
    .split(/(?<=[.!?])\s+/u)
    .find((sentence) => sentence.includes(marker) && fate.test(sentence))
}

function openPlotsMentioning(ref: KnowledgeRef): string[] {
  return Object.entries(arcs).flatMap(([arcKey, arcRecord]) =>
    arcRecord.plots.flatMap((plot) => {
      if (plot.status !== 'open') return []
      const refs: KnowledgeRef[] = []
      collect(plot, refs)
      if (plot.scene) collect(scenes[plot.scene.key], refs)
      return refs.some((r) => refId(r) === refId(ref))
        ? [`${plot.name} in ${name({ ref: 'arc', key: arcKey })}`]
        : []
    }),
  )
}

function factSheet(ref: KnowledgeRef): string {
  const record = recordOf(ref)!
  const out = [`### ${name(ref)} [${ref.ref}]`, `visibility: ${visibilityLine(ref)}`]
  const warnings: string[] = []

  if (ref.ref === 'pc') {
    out.push(`status: ${String(record.status)}`)
    if (record.status !== 'active')
      warnings.push(`${record.name} is ${String(record.status)}, not an active PC.`)
  }
  if (ref.ref === 'npc') {
    out.push(npcMotiveSheet(ref).split('\n').slice(2).join('\n'))
  } else {
    if (record.notes) out.push(`known to players: ${sourceText(record.notes)}`)
    if (record.background) out.push(`background [DM-only]: ${sourceText(record.background)}`)
    if (ref.ref === 'arc' || ref.ref === 'scene') out.push(renderRecord(ref, record, true))
  }
  if (visibilityOf(ref).status === 'dm-only' && !DM_KINDS.has(ref.ref)) {
    warnings.push(
      `The party has not met ${record.name}. Using it is a first introduction; its DM-only background stays hidden until an event reveals it.`,
    )
  }

  const played = eventsInvolving(ref)
    .filter((event) => sessionOfEvent(event.key) !== undefined)
    .toSorted((a, b) => playOrder(a.key) - playOrder(b.key))
  if (played.length > 0) {
    out.push(`played events (${played.length}, latest 5):`)
    for (const event of played.slice(-5)) out.push(`- ${eventLabel(event.key)}`)
  }
  for (const event of played) {
    const sentence = stateChangeIn(event, ref)
    if (sentence) warnings.push(`Possible state change in ${eventLabel(event.key)}: "${sentence}"`)
  }

  const effects = Object.entries(SOURCE_REGISTRIES.effect).flatMap(([key, effect]) => {
    if (effect.on.ref !== ref.ref || effect.on.key !== ref.key) return []
    const entity = getEntity('effect', effect.slug)
    const status = entity ? effectEntry(entity).status : 'unknown'
    return [`${name({ ref: 'effect', key })} (${status})`]
  })
  if (effects.length > 0) out.push(`effects: ${effects.join(', ')}`)

  const plots = openPlotsMentioning(ref)
  if (plots.length > 0) out.push(`open plots: ${plots.join('; ')}`)

  if (warnings.length > 0) out.push('WATCH OUT:', ...warnings.map((w) => `- ${w}`))
  return out.join('\n')
}

type QuestionItem = { section: string; text: string }

/** Each open question in QUESTIONS.md with the section it is filed under. */
function questionItems(): QuestionItem[] {
  let source: string
  try {
    source = readFileSync(new URL('../../QUESTIONS.md', import.meta.url), 'utf8')
  } catch {
    return []
  }
  const items: QuestionItem[] = []
  let section = ''
  for (const block of splitQuestionsMarkdown(source)) {
    for (const part of block.markdown.split(/\n(?=## |- \*\*)/u)) {
      if (part.startsWith('## ')) {
        section = part.split('\n')[0]!.slice(3)
        if (section.startsWith('How to')) section = ''
      } else if (part.startsWith('- **') && section) {
        items.push({ section, text: part.trim() })
      }
    }
  }
  return items
}

function openQuestionsAbout(refs: readonly KnowledgeRef[]): string[] {
  const names = refs.map((ref) => recordOf(ref)!.name.toLowerCase())
  return questionItems()
    .filter((item) => names.some((n) => item.text.toLowerCase().includes(n)))
    .map((item) => item.text.split('\n')[0]!)
}

/**
 * Gather the canon an idea touches so it can be judged: every record it names (or is told about),
 * with visibility, motivations, secrets, recent events, effects, and open plots, plus warnings for
 * the usual conflicts. The judgement itself stays with the caller.
 */
export function checkIdea(idea: string, involves: readonly string[] = []): string {
  const refs = new Map<string, KnowledgeRef>()
  const unresolved: string[] = []
  for (const query of involves) {
    const ref = resolveOne(query)
    if (typeof ref === 'string') unresolved.push(ref)
    else refs.set(refId(ref), ref)
  }
  for (const ref of mentionsIn(idea)) refs.set(refId(ref), ref)

  const latest = chronology().at(-1)
  const out = [
    '# Canon check',
    `Idea: ${idea}`,
    '',
    `Now: campaign day ${campaignToday()}, after S${latest?.session}. The party was last at ${latest ? name(latest.record.location) : 'an unknown place'}.`,
    'Only settled campaign data counts as canon. Check the idea against each record below: does it contradict an event, a motivation, a secret, an effect, or where someone is? Does it reveal something the party has not met yet?',
  ]
  if (refs.size === 0) {
    out.push(
      '',
      'The idea names no known record. Pass `involves` with refs or names to check against.',
    )
  }
  for (const ref of refs.values()) out.push('', factSheet(ref))

  const questions = openQuestionsAbout([...refs.values()])
  if (questions.length > 0) {
    out.push(
      '',
      '## Open canon questions on these records (unknown, do not assume an answer)',
      ...questions,
    )
  }
  if (unresolved.length > 0) out.push('', '## Could not resolve', ...unresolved)
  return out.join('\n')
}

export function openQuestions(filter?: string): string {
  const items = questionItems().filter(
    (item) => !filter || item.text.toLowerCase().includes(filter.toLowerCase()),
  )
  const out = [`# ${items.length} open canon question(s)${filter ? ` mentioning "${filter}"` : ''}`]
  let section = ''
  for (const item of items) {
    if (item.section !== section) out.push('', `## ${(section = item.section)}`)
    out.push(item.text)
  }
  return out.join('\n')
}
