import type { Arc } from '#/definitions/arc'
import type { Scene } from '#/definitions/scene'
import type { Table } from '#/definitions/table'

import { type ScenePlot, plotsByScene } from './dm-dashboard'

export type OverviewScene = {
  key: string
  scene: Scene
  pinned: boolean
  plots: readonly ScenePlot[]
}

export type ArcSceneGroup = {
  /** Undefined for scenes no plot points at. */
  arc?: { key: string; arc: Arc }
  scenes: readonly OverviewScene[]
}

/**
 * Every scene grouped by the arc it serves. Scenes run in the order the DM plans to run them (the
 * next session's selection first, then the rest as written), and arcs follow their first scene.
 * A scene serving several arcs sits under the first, so each scene is listed once. Scenes no plot
 * points at come last.
 */
export function scenesByArc({
  table,
  scenes,
  arcs,
}: {
  table: Table
  scenes: Readonly<Record<string, Scene>>
  arcs: Readonly<Record<string, Arc>>
}): ArcSceneGroup[] {
  const plots = plotsByScene(arcs)
  const pinned = new Set(table.pinned.map((ref) => ref.key))
  const keys = [...new Set([...table.likely.map((ref) => ref.key), ...Object.keys(scenes)])]

  const groups = new Map<string, { key: string; arc: Arc; scenes: OverviewScene[] }>()
  const unlinked: OverviewScene[] = []
  for (const key of keys) {
    const scene = scenes[key]
    if (!scene) continue
    const item = { key, scene, pinned: pinned.has(key), plots: plots.get(key) ?? [] }
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
