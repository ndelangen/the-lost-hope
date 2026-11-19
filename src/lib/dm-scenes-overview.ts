import type { Arc } from '#/definitions/arc'
import type { EntityRef } from '#/definitions/kind'
import type { Scene } from '#/definitions/scene'
import type { Table } from '#/definitions/table'

import { type ScenePlot, plotsByScene } from './dm-dashboard'
import { sceneRunningOrder } from './scene-flow'

type LocationRef = EntityRef<'location'>
type ParentOf = (location: LocationRef) => LocationRef | undefined

export type OverviewScene = {
  key: string
  scene: Scene
  /** Position from 1: among the past scenes for a past one, in the running order ahead otherwise. */
  position: number
  /** Whether the party has left this scene behind. */
  past: boolean
  /** Whether the DM selected this scene for the next session. */
  likely: boolean
  pinned: boolean
  plots: readonly ScenePlot[]
  /** Where the scene happens, from the region down, without the world at the top. */
  trail: readonly LocationRef[]
}

/**
 * Every scene once, in running order: the scenes the party has left behind, then the next
 * session's selection, then the rest in the order they were written.
 */
export function scenesInRunningOrder({
  table,
  scenes,
  arcs,
  parentOf,
}: {
  table: Table
  scenes: Readonly<Record<string, Scene>>
  arcs: Readonly<Record<string, Arc>>
  parentOf: ParentOf
}): OverviewScene[] {
  const plots = plotsByScene(arcs)
  const past = new Set(table.past.map((ref) => ref.key))
  const likely = new Set(table.likely.map((ref) => ref.key))
  const pinned = new Set(table.pinned.map((ref) => ref.key))
  const count = { past: 0, ahead: 0 }
  return sceneRunningOrder(table, scenes).map((key) => {
    const scene = scenes[key]!
    const isPast = past.has(key)
    return {
      key,
      scene,
      position: isPast ? ++count.past : ++count.ahead,
      past: isPast,
      likely: likely.has(key),
      pinned: pinned.has(key),
      plots: plots.get(key) ?? [],
      trail: placeTrail(scene.location, parentOf),
    }
  })
}

/** The places that hold a location, outermost first, ending at the location itself. The world is left out. */
export function placeTrail(location: LocationRef, parentOf: ParentOf): LocationRef[] {
  const trail = [location]
  for (let parent = parentOf(location); parent && parentOf(parent); parent = parentOf(parent)) {
    trail.unshift(parent)
  }
  return trail
}

type ArcSceneGroup = {
  /** Undefined for scenes no plot points at. */
  arc?: { key: string; arc: Arc }
  scenes: readonly OverviewScene[]
}

/**
 * Scenes grouped by the arc they serve, arcs ordered by their first scene in the running order.
 * A scene serving several arcs sits under the first, so each scene is listed once. Scenes no plot
 * points at come last.
 */
export function groupScenesByArc(scenes: readonly OverviewScene[]): ArcSceneGroup[] {
  const groups = new Map<string, { key: string; arc: Arc; scenes: OverviewScene[] }>()
  const unlinked: OverviewScene[] = []
  for (const item of scenes) {
    const first = item.plots[0]
    if (!first) {
      unlinked.push(item)
      continue
    }
    const group = groups.get(first.arcKey) ?? { key: first.arcKey, arc: first.arc, scenes: [] }
    group.scenes.push(item)
    groups.set(first.arcKey, group)
  }
  return [
    ...[...groups.values()].map(({ key, arc, scenes: list }) => ({
      arc: { key, arc },
      scenes: list,
    })),
    ...(unlinked.length > 0 ? [{ scenes: unlinked }] : []),
  ]
}

type PlaceSceneGroup = {
  /** The settlement or site the scenes happen in. */
  place: LocationRef
  /** The places holding it, outermost first. */
  region: readonly LocationRef[]
  scenes: readonly OverviewScene[]
}

/**
 * Scenes grouped by the settlement or site they happen in: the second step of the place trail
 * (Skynet inside the Three Sky Kingdoms), so rooms and districts join their town instead of
 * nesting another level. Groups follow the running order of their first scene.
 */
export function groupScenesByPlace(scenes: readonly OverviewScene[]): PlaceSceneGroup[] {
  const groups = new Map<
    string,
    { place: LocationRef; region: LocationRef[]; scenes: OverviewScene[] }
  >()
  for (const item of scenes) {
    const depth = Math.min(1, item.trail.length - 1)
    const place = item.trail[depth]!
    const group = groups.get(place.key) ?? {
      place,
      region: item.trail.slice(0, depth),
      scenes: [],
    }
    group.scenes.push(item)
    groups.set(place.key, group)
  }
  return [...groups.values()]
}

/** The part of a scene's trail below its group's place, such as the inn inside Skynet. */
export function trailBelow(item: OverviewScene, place: LocationRef): LocationRef[] {
  const index = item.trail.findIndex((step) => step.key === place.key)
  return index === -1 ? [...item.trail] : item.trail.slice(index + 1)
}
