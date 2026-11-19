import { Link } from '@tanstack/react-router'
import { Sword } from 'lucide-react'

import type { Scene } from '#/definitions/scene'
import { startPreset } from '#/lib/dm-encounter'
import { isRunning } from '#/lib/encounter'

import { PresetButtons } from './encounter/preset-buttons'
import { useEncounter } from './encounter/use-encounter-store'
import { useLoadPreset } from './use-load-preset'

/**
 * A scene's starting enemies, loaded into the one encounter: they start the fight, join the
 * running one, or replace it. A scene without them links to the encounter.
 */
export function SceneEncounterStart({ sceneKey, scene }: { sceneKey: string; scene: Scene }) {
  const [encounter] = useEncounter()
  const load = useLoadPreset()
  const preset = startPreset({ ref: 'scene', key: sceneKey }, scene)
  if (!preset)
    return (
      <Link
        to="/dm/encounter"
        className="border-border hover:bg-muted flex w-fit items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
      >
        <Sword className="size-4" /> Open the encounter
      </Link>
    )
  return (
    <div className="grid max-w-xl gap-1.5">
      <p className="text-muted-foreground text-sm">Starting enemies: {preset.creatures.length}</p>
      <PresetButtons
        running={encounter ? isRunning(encounter) : false}
        onLoad={(mode) => load(preset, mode)}
      />
    </div>
  )
}
