import type { DmContent } from '#/definitions/content'
import { isEntityRef, type EntityRef } from '#/definitions/kind'
import type { SceneOutcome } from '#/definitions/scene'

/** A scene branch ready to display, with a stable id and how many follow-ups it hides. */
export type SceneBranch = {
  id: string
  when: DmContent
  response: DmContent
  /**
   * The NPCs this branch is the first on the page to name, in order of mention, so the DM can
   * play them in place. Later branches that name them only link to them.
   */
  npcs: EntityRef<'npc'>[]
  /**
   * The items with a truth players cannot see that this branch is the first on the page to name,
   * in order of mention.
   */
  items: EntityRef<'item'>[]
  followUps: SceneBranch[]
  /** Every branch under this one, at any depth: what is skipped when this one does not happen. */
  descendantCount: number
}

/**
 * The records that already have their details on the page, as `kind:key`. One set is handed from
 * list to list in reading order, so a record's details appear only where it is first named.
 */
export type Briefed = Set<string>

/**
 * Every record of one kind a piece of content names that passes `wanted` and is not briefed yet,
 * in order of first mention. Each one it returns is briefed from then on.
 */
function firstNamedIn<K extends 'npc' | 'item'>(
  kind: K,
  briefed: Briefed,
  wanted: (ref: EntityRef<K>) => boolean,
  ...contents: DmContent[]
): EntityRef<K>[] {
  const named: EntityRef<K>[] = []
  for (const paragraph of contents.flat()) {
    for (const atom of paragraph) {
      if (!isEntityRef(atom) || atom.ref !== kind) continue
      const ref = atom as EntityRef<K>
      const id = `${kind}:${ref.key}`
      if (briefed.has(id) || !wanted(ref)) continue
      briefed.add(id)
      named.push(ref)
    }
  }
  return named
}

/**
 * Give scene branches outline ids (1, 1.1, 1.1.1), count the follow-ups under each, and list who
 * and what each one is the first to name. `hasSecret` says which items hold a truth players
 * cannot see. `briefed` holds who and what the page has detailed before these branches, and is
 * filled in reading order: a branch, then its follow-ups, then the next branch.
 */
export function buildSceneBranches(
  outcomes: SceneOutcome[],
  hasSecret: (item: EntityRef<'item'>) => boolean,
  prefix = '',
  briefed: Briefed = new Set(),
): SceneBranch[] {
  return outcomes.map((outcome, index) => {
    const id = `${prefix}${index + 1}`
    const npcs = firstNamedIn('npc', briefed, () => true, outcome.when, outcome.response)
    const items = firstNamedIn('item', briefed, hasSecret, outcome.when, outcome.response)
    const followUps = buildSceneBranches(outcome.followUps, hasSecret, `${id}.`, briefed)
    return {
      id,
      when: outcome.when,
      response: outcome.response,
      npcs,
      items,
      followUps,
      descendantCount: followUps.reduce((sum, child) => sum + 1 + child.descendantCount, 0),
    }
  })
}
