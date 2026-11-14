import type { Arc } from '#/definitions/arc'
import type { EntityRef } from '#/definitions/kind'
import type { Scene } from '#/definitions/scene'
import type { Table } from '#/definitions/table'

import { collectReferences } from './campaign-read-model'

export type ScenePlot = { arc: Arc; arcKey: string; plot: Arc['plots'][number] }

export type DashboardScene = {
  key: string
  scene: Scene
  pinned: boolean
  plots: readonly ScenePlot[]
}

export type DashboardLocationGroup = {
  location: EntityRef<'location'>
  party: readonly EntityRef<'pc'>[]
  scenes: readonly DashboardScene[]
}

/** The plots that prepared each scene, keyed by scene key. A scene can serve several arcs. */
export function plotsByScene(arcs: Readonly<Record<string, Arc>>): Map<string, ScenePlot[]> {
  const byScene = new Map<string, ScenePlot[]>()
  for (const [arcKey, arc] of Object.entries(arcs)) {
    for (const plot of arc.plots) {
      if (!plot.scene) continue
      const plots = byScene.get(plot.scene.key) ?? []
      plots.push({ arc, arcKey, plot })
      byScene.set(plot.scene.key, plots)
    }
  }
  return byScene
}

type PlayedEvent = { location: EntityRef; refs: readonly EntityRef[] }

/**
 * Where each PC was last seen: the location of the most recent played event that references
 * them. `events` must be ordered newest first.
 */
export function lastKnownLocations(
  pcs: readonly EntityRef<'pc'>[],
  events: readonly PlayedEvent[],
): Map<string, EntityRef<'location'>> {
  const locations = new Map<string, EntityRef<'location'>>()
  const wanted = new Set(pcs.map((pc) => pc.key))
  for (const event of events) {
    if (locations.size === wanted.size) break
    for (const ref of event.refs) {
      if (ref.ref !== 'pc' || !wanted.has(ref.key) || locations.has(ref.key)) continue
      locations.set(ref.key, event.location as EntityRef<'location'>)
    }
  }
  return locations
}

export function playedEvent(event: { location: EntityRef; notes: unknown }): PlayedEvent {
  return { location: event.location, refs: collectReferences(event.notes) }
}

/**
 * Group the DM's selected scenes by location for the dashboard. Each scene appears once, pinned
 * or not. Locations where the party is come first, in party order; other locations follow in
 * selection order.
 */
export function buildDashboard({
  table,
  scenes,
  arcs,
  party,
}: {
  table: Table
  scenes: Readonly<Record<string, Scene>>
  arcs: Readonly<Record<string, Arc>>
  party: ReadonlyMap<string, EntityRef<'location'>>
}): DashboardLocationGroup[] {
  const plots = plotsByScene(arcs)
  const pinned = new Set(table.pinned.map((ref) => ref.key))
  const keys = [...new Set([...table.likely, ...table.pinned].map((ref) => ref.key))]

  const groups = new Map<
    string,
    { location: EntityRef<'location'>; party: EntityRef<'pc'>[]; scenes: DashboardScene[] }
  >()
  const groupFor = (location: EntityRef<'location'>) => {
    const group = groups.get(location.key) ?? { location, party: [], scenes: [] }
    groups.set(location.key, group)
    return group
  }

  for (const [pcKey, location] of party) groupFor(location).party.push({ ref: 'pc', key: pcKey })

  for (const key of keys) {
    const scene = scenes[key]
    if (!scene) continue
    groupFor(scene.location).scenes.push({
      key,
      scene,
      pinned: pinned.has(key),
      plots: plots.get(key) ?? [],
    })
  }

  return [...groups.values()].filter((group) => group.scenes.length > 0 || group.party.length > 0)
}
