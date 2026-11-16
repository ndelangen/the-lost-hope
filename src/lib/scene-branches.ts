import type { DmContent } from '#/definitions/content'
import { isEntityRef, type EntityRef } from '#/definitions/kind'
import type { SceneOutcome } from '#/definitions/scene'

/** A scene branch ready to display, with a stable id and how many follow-ups it hides. */
export type SceneBranch = {
  id: string
  when: DmContent
  response: DmContent
  /** The NPCs this branch names, in order of first mention, so the DM can play them in place. */
  npcs: EntityRef<'npc'>[]
  followUps: SceneBranch[]
  /** Every branch under this one, at any depth: what is skipped when this one does not happen. */
  descendantCount: number
}

/** Every NPC a piece of content names, in order of first mention and without repeats. */
export function npcsIn(...contents: DmContent[]): EntityRef<'npc'>[] {
  const seen = new Set<string>()
  const npcs: EntityRef<'npc'>[] = []
  for (const paragraph of contents.flat()) {
    for (const atom of paragraph) {
      if (!isEntityRef(atom) || atom.ref !== 'npc' || seen.has(atom.key)) continue
      seen.add(atom.key)
      npcs.push(atom as EntityRef<'npc'>)
    }
  }
  return npcs
}

/** Give scene branches outline ids (1, 1.1, 1.1.1) and count the follow-ups under each. */
export function buildSceneBranches(outcomes: SceneOutcome[], prefix = ''): SceneBranch[] {
  return outcomes.map((outcome, index) => {
    const id = `${prefix}${index + 1}`
    const followUps = buildSceneBranches(outcome.followUps, `${id}.`)
    return {
      id,
      when: outcome.when,
      response: outcome.response,
      npcs: npcsIn(outcome.when, outcome.response),
      followUps,
      descendantCount: followUps.reduce((sum, child) => sum + 1 + child.descendantCount, 0),
    }
  })
}
