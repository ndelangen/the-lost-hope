import type { DmContent } from '#/definitions/content'
import { isSceneRef, type EntityRef } from '#/definitions/kind'
import type { Scene, SceneOutcome } from '#/definitions/scene'
import type { Table } from '#/definitions/table'

/** A scene the party is likely to play after this one. */
export type NextScene = {
  scene: EntityRef<'scene'>
  /**
   * The "if" of every branch that leads there, in script order. Empty when the script points
   * there outside a branch, or when the scene is only the next one in the session's selection.
   */
  when: DmContent[]
  /** Whether it is the scene the DM selected to run right after this one. */
  planned: boolean
}

/**
 * Every scene once, in the order the party meets them: the scenes it has left behind, then the
 * ones selected for the next session, then the rest as written.
 */
export function sceneRunningOrder(
  table: Table,
  scenes: Readonly<Record<string, unknown>>,
): string[] {
  const planned = [...table.past, ...table.likely].map((ref) => ref.key)
  return [...new Set([...planned, ...Object.keys(scenes)])].filter((key) =>
    Object.hasOwn(scenes, key),
  )
}

function sceneRefs(...contents: DmContent[]): EntityRef<'scene'>[] {
  return contents.flat(2).filter(isSceneRef)
}

/**
 * The scenes that can follow a scene, most likely first: the one the DM selected to run right
 * after it, then the later scenes its script and branches point at, each with the "if"s that
 * lead there. "Later" follows the running order, so a scene never points back at a past one.
 */
export function nextScenes(
  key: string,
  { scenes, table }: { scenes: Readonly<Record<string, Scene>>; table: Table },
): NextScene[] {
  const scene = scenes[key]
  if (!scene) return []
  const order = sceneRunningOrder(table, scenes)
  const here = order.indexOf(key)

  const found = new Map<string, NextScene>()
  const point = (refs: EntityRef<'scene'>[], when?: DmContent) => {
    for (const ref of refs) {
      if (order.indexOf(ref.key) <= here) continue
      const next = found.get(ref.key) ?? { scene: ref, when: [], planned: false }
      if (when && !next.when.includes(when)) next.when.push(when)
      found.set(ref.key, next)
    }
  }
  const branch = (outcome: SceneOutcome) => {
    point(sceneRefs(outcome.when, outcome.response), outcome.when)
    outcome.followUps.forEach(branch)
  }
  for (const beat of scene.beats) {
    for (const line of beat.lines) {
      point(sceneRefs('say' in line ? line.say : 'do' in line ? line.do : line.note))
    }
    beat.outcomes.forEach(branch)
  }
  scene.outcomes.forEach(branch)

  const planned = [...table.past, ...table.likely]
  const selected = planned.findIndex((ref) => ref.key === key)
  const after = selected >= 0 ? planned[selected + 1] : undefined
  if (!after) return [...found.values()]
  const first = { ...(found.get(after.key) ?? { scene: after, when: [] }), planned: true }
  found.delete(after.key)
  return [first, ...found.values()]
}
