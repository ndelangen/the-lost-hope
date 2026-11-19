import arcRecords from '#/data/arcs/_index'
import creatureRecords from '#/data/creatures/_index'
import tableRecord from '#/data/dm/table'
import tokenRecord from '#/data/dm/tokens'
import npcRecords from '#/data/npcs/_index'
import sceneRecords from '#/data/scenes/_index'
import type { Arc, Plot } from '#/definitions/arc'
import type { Creature } from '#/definitions/creature'
import { ENTITY_KINDS, type EntityKind, type EntityRef, isSceneRef } from '#/definitions/kind'
import type { Scene } from '#/definitions/scene'
import type { OwnOrSharedStatBlock, StatBlock } from '#/definitions/stat-block'
import type { Table } from '#/definitions/table'
import type { Tokens } from '#/definitions/tokens'
import { campaignSessions, resolveRef, sessionSlugForEvent } from '#/lib/campaign'
import { collectReferences } from '#/lib/campaign-read-model'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { vesselHull } from '#/lib/ship-decks'
import type { ShipAboard } from '#/lib/ship-rooms'

export const arcs: Readonly<Record<string, Arc>> = arcRecords
export const scenes: Readonly<Record<string, Scene>> = sceneRecords
export const table: Table = tableRecord
export const tokens: Tokens = tokenRecord
export const creatures: Readonly<Record<string, Creature>> = creatureRecords

/** A record's stat block: its own, or the shared creature's it references. */
export function resolveStatBlock(stats: OwnOrSharedStatBlock | undefined): StatBlock | undefined {
  if (!stats || !('ref' in stats)) return stats
  return Object.hasOwn(creatures, stats.key) ? creatures[stats.key]!.stats : undefined
}

export function resolveArc(ref: EntityRef<'arc'>): Arc | undefined {
  return Object.hasOwn(arcs, ref.key) ? arcs[ref.key] : undefined
}

export function resolveScene(ref: EntityRef<'scene'>): Scene | undefined {
  return Object.hasOwn(scenes, ref.key) ? scenes[ref.key] : undefined
}

/**
 * Every record a scene mentions, in order of first mention: its places, cast and opponents, then
 * whatever its setup, notes, outcomes and fight prep link to.
 */
export function sceneMentions(scene: Scene): EntityRef[] {
  const found = collectReferences([
    scene.location,
    scene.alternateLocations,
    scene.battleMaps,
    scene.npcs,
    scene.opponents.map((opponent) => opponent.creature),
    scene.setup,
    scene.beats,
    scene.outcomes,
    scene.combat,
    scene.aboard,
  ])
  const seen = new Set<string>()
  return found.filter((ref) => {
    const id = `${ref.ref}:${ref.key}`
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })
}

/** A plot's NPCs: its own, then its scene's cast, which the plot does not repeat. */
export function plotCast(plot: Plot): EntityRef<'npc'>[] {
  const scene = plot.scene ? resolveScene(plot.scene) : undefined
  const keys = new Set(plot.npcs.map((npc) => npc.key))
  return [...plot.npcs, ...(scene?.npcs ?? []).filter((npc) => !keys.has(npc.key))]
}

/** The vessel a scene is fought aboard, with its layout, when the vessel has one. */
export function sceneShipAboard(scene: Scene): ShipAboard | undefined {
  const vessel = scene.aboard ? vesselHull(scene.aboard.key) : undefined
  return scene.aboard && vessel ? { vessel: scene.aboard, ...vessel } : undefined
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

/** The parent of a location in the full campaign source, including places players have not met. */
export function sourceLocationParent(
  location: EntityRef<'location'>,
): EntityRef<'location'> | undefined {
  const parent = (SOURCE_REGISTRIES.location as Record<string, { parent?: EntityRef }>)[
    location.key
  ]?.parent
  return parent?.ref === 'location' ? (parent as EntityRef<'location'>) : undefined
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

  for (const scene of Object.values(sceneRegistry)) {
    for (const ref of collectSceneReferences(scene)) {
      if (!Object.hasOwn(sceneRegistry, ref.key))
        problems.push(`${scene.name}: unknown scene reference ${ref.key}`)
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

/** The complete source record, DM fields included, behind a player page's slug. */
export function sourceRecordBySlug(kind: EntityKind, slug: string) {
  const entry = Object.entries(
    SOURCE_REGISTRIES[kind] as Readonly<Record<string, { slug: string }>>,
  ).find(([, record]) => record.slug === slug)
  return entry ? { key: entry[0], record: entry[1] } : undefined
}

/** Every `refs.scenes.*` pointer anywhere inside a value, such as a scene's own prose. */
function collectSceneReferences(value: unknown, out: EntityRef<'scene'>[] = []) {
  if (!value || typeof value !== 'object') return out
  if (Array.isArray(value)) {
    for (const item of value) collectSceneReferences(item, out)
    return out
  }
  if (isSceneRef(value)) {
    out.push(value)
    return out
  }
  for (const item of Object.values(value)) collectSceneReferences(item, out)
  return out
}
