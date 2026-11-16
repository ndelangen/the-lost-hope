import type { Content } from '#/definitions/content'
import type { SceneOutcome } from '#/definitions/scene'

/** A scene branch ready to display, with a stable id and how many follow-ups it hides. */
export type SceneBranch = {
  id: string
  when: Content
  response: Content
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
      when: outcome.when,
      response: outcome.response,
      followUps,
      descendantCount: followUps.reduce((sum, child) => sum + 1 + child.descendantCount, 0),
    }
  })
}
