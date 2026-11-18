import { useCallback, useEffect, useState } from 'react'

import {
  parseScriptProgress,
  setBeatStatus,
  type BeatStatus,
  type ScriptProgress,
} from '#/lib/scene-script'

const STORAGE_PREFIX = 'the-lost-hope:dm-scene-script:'

/**
 * How far the DM is through one scene's script, kept in the DM's browser so a reload at the table
 * does not lose the place. It loads after mount, so every beat is still to play on the first frame.
 */
export function useSceneScript(sceneKey: string, beats: number) {
  const [progress, setProgress] = useState<ScriptProgress>({})

  useEffect(() => {
    try {
      setProgress(parseScriptProgress(localStorage.getItem(STORAGE_PREFIX + sceneKey), beats))
    } catch {
      setProgress({})
    }
  }, [sceneKey, beats])

  const store = useCallback(
    (next: ScriptProgress) => {
      setProgress(next)
      try {
        localStorage.setItem(STORAGE_PREFIX + sceneKey, JSON.stringify(next))
      } catch {
        // The script still works for this visit without storage.
      }
    },
    [sceneKey],
  )

  const mark = useCallback(
    (beat: number, status: BeatStatus | undefined) => store(setBeatStatus(progress, beat, status)),
    [progress, store],
  )
  const startOver = useCallback(() => store({}), [store])

  return { progress, mark, startOver }
}
