import type { DmContent } from '#/definitions/content'
import type { SceneBeat, SceneLine } from '#/definitions/scene'

import { fightLineUp, type FightLineUp } from './dm-encounter'
import { resolveGroupSave, type GroupSave } from './group-save'
import { buildSceneBranches, type SceneBranch } from './scene-branches'

/** A beat of a scene's script ready to display, numbered in playing order. */
export type ScriptBeat = {
  /** Its place in the script, from 1. */
  number: number
  title: string
  /** When the beat is played. Only optional beats have one, and only they can be skipped. */
  onlyIf: DmContent | undefined
  lines: SceneLine[]
  /** A save everyone listed makes during this beat, tracked roll by roll. */
  groupSave: GroupSave | undefined
  /** Who joins the fight when this beat is played. */
  fight: FightLineUp | undefined
  /** The "if" branches that belong to this moment. */
  branches: SceneBranch[]
  /** The scene's illustrations shown at this moment, each with its place in the scene's list. */
  pictures: { src: string; index: number }[]
}

/** One beat ready to display, with its place in the script. */
export function buildScriptBeat(
  beat: SceneBeat,
  number: number,
  illustrations: readonly string[] = [],
): ScriptBeat {
  return {
    number,
    title: beat.title,
    onlyIf: beat.onlyIf,
    lines: beat.lines,
    groupSave: beat.groupSave ? resolveGroupSave(beat.groupSave) : undefined,
    fight: beat.fight ? fightLineUp(beat.fight) : undefined,
    branches: buildSceneBranches(beat.outcomes, `${number}.`),
    pictures: beat.illustrations.map((src) => ({ src, index: illustrations.indexOf(src) })),
  }
}

/** Number a scene's beats and prepare each one's branches and pictures. */
export function buildSceneScript(
  beats: SceneBeat[],
  illustrations: readonly string[] = [],
): ScriptBeat[] {
  return beats.map((beat, index) => buildScriptBeat(beat, index + 1, illustrations))
}

/** What became of a beat at the table. A beat without a status is still to play. */
export type BeatStatus = 'done' | 'skipped'

/** How far the DM is through one scene's script: the status of each beat that has one, by number. */
export type ScriptProgress = Readonly<Partial<Record<number, BeatStatus>>>

/** Mark a beat played or skipped, or put it back to play with `undefined`. */
export function setBeatStatus(
  progress: ScriptProgress,
  beat: number,
  status: BeatStatus | undefined,
): ScriptProgress {
  const { [beat]: _previous, ...rest } = progress
  return status ? { ...rest, [beat]: status } : rest
}

/** The beat to play now: the first one that is neither played nor skipped. */
export function currentBeat(script: ScriptBeat[], progress: ScriptProgress): number | undefined {
  return script.find((beat) => progress[beat.number] === undefined)?.number
}

/** Stored progress read back, keeping only real statuses of beats the script still has. */
export function parseScriptProgress(raw: string | null, beats: number): ScriptProgress {
  if (!raw) return {}
  let stored: unknown
  try {
    stored = JSON.parse(raw)
  } catch {
    return {}
  }
  if (typeof stored !== 'object' || stored === null) return {}
  const progress: Partial<Record<number, BeatStatus>> = {}
  for (const [key, status] of Object.entries(stored)) {
    const beat = Number(key)
    if (!Number.isInteger(beat) || beat < 1 || beat > beats) continue
    if (status === 'done' || status === 'skipped') progress[beat] = status
  }
  return progress
}
