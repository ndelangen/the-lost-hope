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
  /** The items this branch names that hold a truth players cannot see, in order of first mention. */
  items: EntityRef<'item'>[]
  followUps: SceneBranch[]
  /** Every branch under this one, at any depth: what is skipped when this one does not happen. */
  descendantCount: number
}

/** Every record of one kind a piece of content names, in order of first mention and without repeats. */
function namedIn<K extends 'npc' | 'item'>(kind: K, ...contents: DmContent[]): EntityRef<K>[] {
  const seen = new Set<string>()
  const named: EntityRef<K>[] = []
  for (const paragraph of contents.flat()) {
    for (const atom of paragraph) {
      if (!isEntityRef(atom) || atom.ref !== kind || seen.has(atom.key)) continue
      seen.add(atom.key)
      named.push(atom as EntityRef<K>)
    }
  }
  return named
}

/**
 * Give scene branches outline ids (1, 1.1, 1.1.1), count the follow-ups under each, and list who
 * and what each one names. `hasSecret` says which items hold a truth players cannot see.
 */
export function buildSceneBranches(
  outcomes: SceneOutcome[],
  hasSecret: (item: EntityRef<'item'>) => boolean,
  prefix = '',
): SceneBranch[] {
  return outcomes.map((outcome, index) => {
    const id = `${prefix}${index + 1}`
    const followUps = buildSceneBranches(outcome.followUps, hasSecret, `${id}.`)
    return {
      id,
      when: outcome.when,
      response: outcome.response,
      npcs: namedIn('npc', outcome.when, outcome.response),
      items: namedIn('item', outcome.when, outcome.response).filter(hasSecret),
      followUps,
      descendantCount: followUps.reduce((sum, child) => sum + 1 + child.descendantCount, 0),
    }
  })
}
