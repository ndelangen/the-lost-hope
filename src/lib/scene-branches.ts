import type { DmContent } from '#/definitions/content'
import type { SceneOutcome } from '#/definitions/scene'

/** A scene branch ready to display, with a stable id and how many follow-ups it hides. */
export type SceneBranch = {
  id: string
  /** Icon-catalog id depicting what the players do. */
  icon: string
  when: DmContent
  response: DmContent
  followUps: SceneBranch[]
  /** Every branch under this one, at any depth: what is skipped when this one does not happen. */
  descendantCount: number
}

/** Give scene branches outline ids (1, 1.1, 1.1.1) and count the follow-ups under each. */
export function buildSceneBranches(outcomes: SceneOutcome[], prefix = ''): SceneBranch[] {
  return outcomes.map((outcome, index) => {
    const id = `${prefix}${index + 1}`
    const followUps = buildSceneBranches(outcome.followUps, `${id}.`)
    return {
      id,
      icon: outcome.icon,
      when: outcome.when,
      response: outcome.response,
      followUps,
      descendantCount: followUps.reduce((sum, child) => sum + 1 + child.descendantCount, 0),
    }
  })
}

/** Which outcome the DM picked at each fork, by fork key. A fork left out is still undecided. */
export type BranchPicks = Readonly<Record<string, string>>

/** One fork on the path the DM is following: its outcomes, and the one that happened, if decided. */
export type BranchFork = {
  /** The id of the branch this fork follows, or `''` for the first fork. */
  key: string
  options: SceneBranch[]
  picked: SceneBranch | undefined
}

/**
 * The forks the DM has reached, in order: the first one, then the follow-ups of each picked
 * outcome. The path ends at the first undecided fork, or at an outcome with no follow-ups. Picks
 * off the path are kept, so going back to an outcome restores the path that was under it.
 */
export function walkBranchPath(branches: SceneBranch[], picks: BranchPicks): BranchFork[] {
  const path: BranchFork[] = []
  let key = ''
  let options = branches
  while (options.length > 0) {
    const pickedId = Object.hasOwn(picks, key) ? picks[key] : undefined
    const picked = options.find((option) => option.id === pickedId)
    path.push({ key, options, picked })
    if (!picked) break
    key = picked.id
    options = picked.followUps
  }
  return path
}

/** Decide a fork, or leave it undecided again when no outcome is given. */
export function pickBranch(picks: BranchPicks, fork: string, outcome?: string): BranchPicks {
  const { [fork]: _previous, ...rest } = picks
  return outcome === undefined ? rest : { ...rest, [fork]: outcome }
}
