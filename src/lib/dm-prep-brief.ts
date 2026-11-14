import { type DmEntityKind, type EntityKind, type EntityRef, isEntityRef } from '#/definitions/kind'
import {
  arcs,
  npcMotivations,
  resolveArc,
  resolveScene,
  resolveSourceRef,
  table,
} from '#/lib/dm-campaign'
import {
  type Storyline,
  type StorylineSession,
  buildStorylines,
  campaignSessionsInOrder,
} from '#/lib/dm-storylines'

/** How a record is written in a brief: its name, then the generated ref to use in data. */
function refText(ref: EntityRef<EntityKind | DmEntityKind>): string {
  const name =
    ref.ref === 'scene'
      ? resolveScene({ ref: 'scene', key: ref.key })?.name
      : ref.ref === 'arc'
        ? resolveArc({ ref: 'arc', key: ref.key })?.name
        : resolveSourceRef({ ref: ref.ref, key: ref.key })?.name
  return `${name ?? ref.key} (refs.${ref.ref}s.${ref.key})`
}

/** Campaign `Content` as plain text, naming every reference with its ref, DM-only records included. */
export function sourceText(content: unknown): string {
  if (content === undefined || content === null) return ''
  if (typeof content === 'string') return content
  if (isEntityRef(content)) return refText(content)
  if (Array.isArray(content)) {
    // A paragraph is an array of strings and refs; a Content value is an array of paragraphs.
    return content.every((part) => typeof part === 'string' || isEntityRef(part))
      ? content.map(sourceText).join('')
      : content.map(sourceText).filter(Boolean).join('\n')
  }
  return ''
}

function indent(text: string, by = '    ') {
  return text
    .split('\n')
    .map((line) => by + line)
    .join('\n')
}

function arcSection(line: Storyline, latest: number): string {
  const { arc } = line
  const quiet = latest - (line.last ?? latest)
  const out = [
    `### ${arc.name} (refs.arcs.${line.key})`,
    '',
    `Played S${line.first}–S${line.last}${quiet > 0 ? `, quiet for ${quiet} sessions` : ''}.`,
    '',
    sourceText(arc.direction),
  ]
  if (arc.notes) out.push('', `DM notes: ${sourceText(arc.notes)}`)
  const lastStop = line.stops.at(-1)
  if (lastStop) {
    out.push('', `Last played in S${lastStop.session}:`)
    for (const event of lastStop.events) {
      out.push(`- ${refText({ ref: 'event', key: event })}`)
    }
  }
  out.push('', 'Open plots:')
  for (const plot of line.next) {
    out.push(`- **${plot.name}** (plot slug \`${plot.slug}\`)`)
    if (plot.hook) out.push(indent(`Hook: ${sourceText(plot.hook)}`))
    if (plot.notes) out.push(indent(`Notes: ${sourceText(plot.notes)}`))
    if (plot.scene) out.push(indent(`Scene: ${refText(plot.scene)}`))
    for (const npc of plot.npcs) {
      const motivations = npcMotivations(npc)
      out.push(
        indent(`NPC: ${refText(npc)}${motivations ? ` wants ${sourceText(motivations)}` : ''}`),
      )
    }
  }
  return out.join('\n')
}

function sceneSection(ref: EntityRef<'scene'>, pinned: boolean): string {
  const scene = resolveScene(ref)
  if (!scene) return `- ${ref.key} (missing)`
  return [
    `- **${scene.name}** (refs.scenes.${ref.key})${pinned ? ', pinned' : ''} at ${refText(scene.location)}`,
    indent(sourceText(scene.setup)),
  ].join('\n')
}

/**
 * The prep a session import reads before the notes: every open arc with its open plots, hooks,
 * scenes and NPC motivations, plus the scenes the DM selected and pinned. Everything is named with
 * the generated ref to use in campaign data. Derived from arcs, scenes and the table; nothing is
 * stored.
 */
export function buildPrepBrief(
  storylines: readonly Storyline[] = buildStorylines(arcs),
  sessions: readonly StorylineSession[] = campaignSessionsInOrder(),
): string {
  const latest = sessions.at(-1)
  const open = storylines
    .filter((line) => line.next.length > 0)
    .toSorted((a, b) => (b.last ?? 0) - (a.last ?? 0))
  const out = [
    '# DM prep brief',
    '',
    `Generated from campaign data after S${latest?.number} (${latest?.name}). Use it to recognise the threads in play; the notes decide what actually happened.`,
    '',
    '## Selected scenes',
    '',
    ...table.likely.map((ref) => sceneSection(ref, false)),
    ...table.pinned
      .filter((ref) => !table.likely.some((other) => other.key === ref.key))
      .map((ref) => sceneSection(ref, true)),
    '',
    `## Open arcs (${open.length})`,
  ]
  for (const line of open) out.push('', arcSection(line, latest?.number ?? 0))
  return `${out.join('\n')}\n`
}
