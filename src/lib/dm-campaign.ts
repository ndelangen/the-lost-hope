import arcRecords from '#/data/arcs/_index'
import npcRecords from '#/data/npcs/_index'
import sceneRecords from '#/data/scenes/_index'
import type { Arc } from '#/definitions/arc'
import { ENTITY_KINDS, type EntityRef } from '#/definitions/kind'
import type { Scene } from '#/definitions/scene'
import { allEntities, campaignSessions, resolveRef, sessionSlugForEvent } from '#/lib/campaign'
import { collectReferences } from '#/lib/campaign-read-model'

export const arcs: Readonly<Record<string, Arc>> = arcRecords
export const scenes: Readonly<Record<string, Scene>> = sceneRecords

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

export function validateDmReferences(arcRegistry = arcs, sceneRegistry = scenes): string[] {
  const problems: string[] = []
  const slugs = new Set(ENTITY_KINDS.flatMap((kind) => allEntities(kind).map(({ slug }) => slug)))

  for (const record of [...Object.values(arcRegistry), ...Object.values(sceneRegistry)]) {
    if (!record.slug || slugs.has(record.slug))
      problems.push(`Invalid or duplicate slug: ${record.slug}`)
    slugs.add(record.slug)
    for (const ref of collectReferences(record)) {
      if (!resolveRef(ref)) problems.push(`${record.name}: unknown ${ref.ref} reference ${ref.key}`)
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

  for (const npc of Object.values(npcRecords)) {
    for (const ref of collectReferences(npc.motivations)) {
      if (!resolveRef(ref)) problems.push(`${npc.name}: unknown motivation reference ${ref.key}`)
    }
  }

  return problems
}
