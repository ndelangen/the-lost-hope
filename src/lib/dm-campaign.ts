import arcRecords from '#/data/arcs/_index'
import tableRecord from '#/data/dm/table'
import npcRecords from '#/data/npcs/_index'
import sceneRecords from '#/data/scenes/_index'
import type { Arc } from '#/definitions/arc'
import { ENTITY_KINDS, type EntityRef } from '#/definitions/kind'
import type { Scene } from '#/definitions/scene'
import type { Table } from '#/definitions/table'
import { campaignSessions, resolveRef, sessionSlugForEvent } from '#/lib/campaign'
import { collectReferences } from '#/lib/campaign-read-model'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'

export const arcs: Readonly<Record<string, Arc>> = arcRecords
export const scenes: Readonly<Record<string, Scene>> = sceneRecords
export const table: Table = tableRecord

export function resolveArc(ref: EntityRef<'arc'>): Arc | undefined {
  return Object.hasOwn(arcs, ref.key) ? arcs[ref.key] : undefined
}

export function resolveScene(ref: EntityRef<'scene'>): Scene | undefined {
  return Object.hasOwn(scenes, ref.key) ? scenes[ref.key] : undefined
}

export function npcMotivations(ref: EntityRef<'npc'>) {
  return Object.hasOwn(npcRecords, ref.key)
    ? npcRecords[ref.key as keyof typeof npcRecords].motivations
    : undefined
}

export function sessionsForArc(arc: Arc) {
  const sessionSlugs = new Set(arc.sessions.map((ref) => resolveRef(ref)?.slug))
  for (const plot of arc.plots) {
    for (const ref of plot.events) {
      const event = resolveRef(ref)
      if (event) sessionSlugs.add(sessionSlugForEvent(event.slug))
    }
  }
  return campaignSessions().filter(({ slug }) => sessionSlugs.has(slug))
}

/** Resolve against the full campaign source, which includes records players have not met. */
export function resolveSourceRef(ref: EntityRef) {
  return Object.hasOwn(SOURCE_REGISTRIES[ref.ref], ref.key)
    ? (
        SOURCE_REGISTRIES[ref.ref] as Record<
          string,
          { slug: string; name: string; avatar?: string }
        >
      )[ref.key]
    : undefined
}

export function validateDmReferences(
  arcRegistry = arcs,
  sceneRegistry = scenes,
  selection: Table = table,
): string[] {
  const problems: string[] = []
  const slugs = new Set(
    ENTITY_KINDS.flatMap((kind) =>
      Object.values(SOURCE_REGISTRIES[kind] as Record<string, { slug: string }>).map(
        ({ slug }) => slug,
      ),
    ),
  )

  for (const record of [...Object.values(arcRegistry), ...Object.values(sceneRegistry)]) {
    if (!record.slug || slugs.has(record.slug))
      problems.push(`Invalid or duplicate slug: ${record.slug}`)
    slugs.add(record.slug)
    for (const ref of collectReferences(record)) {
      if (!resolveSourceRef(ref))
        problems.push(`${record.name}: unknown ${ref.ref} reference ${ref.key}`)
    }
  }

  for (const arc of Object.values(arcRegistry)) {
    const plotSlugs = new Set<string>()
    for (const plot of arc.plots) {
      if (!plot.slug || plotSlugs.has(plot.slug)) {
        problems.push(`${arc.name}: invalid or duplicate plot slug ${plot.slug}`)
      }
      plotSlugs.add(plot.slug)
      if (plot.scene && !Object.hasOwn(sceneRegistry, plot.scene.key)) {
        problems.push(`${arc.name} / ${plot.name}: unknown scene reference ${plot.scene.key}`)
      }
    }
  }

  for (const ref of [...selection.likely, ...selection.pinned]) {
    if (!Object.hasOwn(sceneRegistry, ref.key))
      problems.push(`Table: unknown scene reference ${ref.key}`)
  }

  // DM fields such as `background` and `motivations` only exist in the source, so check every
  // source record here; the player model's integrity test cannot see them.
  for (const kind of ENTITY_KINDS) {
    for (const record of Object.values(SOURCE_REGISTRIES[kind] as Record<string, object>)) {
      for (const ref of collectReferences(record)) {
        if (!resolveSourceRef(ref))
          problems.push(`${kind}: unknown ${ref.ref} reference ${ref.key}`)
      }
    }
  }

  return problems
}
