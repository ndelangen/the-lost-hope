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

export type DashboardLocationNode = {
  location: EntityRef<'location'>
  party: readonly EntityRef<'pc'>[]
  scenes: readonly DashboardScene[]
  children: readonly DashboardLocationNode[]
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

type Node = {
  location: EntityRef<'location'>
  party: EntityRef<'pc'>[]
  scenes: DashboardScene[]
  children: Node[]
  rank: number
}

/** A branch ranks by the earliest location placed anywhere inside it. */
function rankOf(node: Node): number {
  return Math.min(node.rank, ...node.children.map((child) => rankOf(child)))
}

function finish(list: readonly Node[]): DashboardLocationNode[] {
  return list
    .map((node) => ({ node, rank: rankOf(node) }))
    .toSorted((a, b) => a.rank - b.rank)
    .map(({ node }) => ({
      location: node.location,
      party: node.party,
      scenes: node.scenes,
      children: finish(node.children),
    }))
}

/**
 * Arrange the DM's selected scenes and the party in the location tree. Each scene appears once,
 * under the location it happens in, and every ancestor of that location is a node too, so the
 * inn sits inside Skynet inside the Three Sky Kingdoms. The top of the tree (the world) is left
 * out. Branches holding the party come first, in party order; the rest follow in selection order.
 */
export function buildDashboard({
  table,
  scenes,
  arcs,
  party,
  parentOf,
}: {
  table: Table
  scenes: Readonly<Record<string, Scene>>
  arcs: Readonly<Record<string, Arc>>
  party: ReadonlyMap<string, EntityRef<'location'>>
  parentOf: (location: EntityRef<'location'>) => EntityRef<'location'> | undefined
}): DashboardLocationNode[] {
  const plots = plotsByScene(arcs)
  const pinned = new Set(table.pinned.map((ref) => ref.key))
  const keys = [...new Set([...table.likely, ...table.pinned].map((ref) => ref.key))]

  const nodes = new Map<string, Node>()
  const roots: Node[] = []
  let order = 0

  const nodeFor = (location: EntityRef<'location'>): Node => {
    const existing = nodes.get(location.key)
    if (existing) return existing
    const node: Node = { location, party: [], scenes: [], children: [], rank: order++ }
    nodes.set(location.key, node)
    const parent = parentOf(location)
    if (parent && parentOf(parent)) nodeFor(parent).children.push(node)
    else roots.push(node)
    return node
  }

  for (const [pcKey, location] of party) nodeFor(location).party.push({ ref: 'pc', key: pcKey })
  for (const key of keys) {
    const scene = scenes[key]
    if (!scene) continue
    nodeFor(scene.location).scenes.push({
      key,
      scene,
      pinned: pinned.has(key),
      plots: plots.get(key) ?? [],
    })
  }

  return finish(roots)
}
