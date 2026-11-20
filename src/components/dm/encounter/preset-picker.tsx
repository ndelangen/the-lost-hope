import { Plus, Replace, Swords } from 'lucide-react'
import { useId, useState } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import type { PresetOption, PresetScene } from '#/lib/dm-encounter'
import { cn } from '#/lib/utils'

const BUTTON =
  'focus-visible:ring-ring/50 flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-2 px-3 text-sm font-semibold outline-none focus-visible:ring-3 [&_svg]:size-4 [&_svg]:shrink-0'
const PRIMARY = 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent'
const OUTLINE = 'border-border bg-card hover:bg-muted'

/**
 * The prepared groups of a scene as a short list: each one joins the running fight, or ends it and
 * starts fresh after the DM confirms. With nobody fighting, a group starts the fight.
 */
export function PresetPicker({
  scenes,
  running,
  joinedOf,
  onLoad,
}: {
  scenes: readonly PresetScene[]
  running: boolean
  /** How many times a group has joined this fight already. */
  joinedOf: (option: PresetOption) => number
  onLoad: (option: PresetOption, mode: 'add' | 'replace') => void
}) {
  const selectId = useId()
  const [sceneKey, setSceneKey] = useState(scenes[0]?.ref.key)
  const [confirming, setConfirming] = useState<string>()
  const scene = scenes.find((candidate) => candidate.ref.key === sceneKey) ?? scenes[0]

  if (!scene)
    return (
      <p className="text-muted-foreground text-sm">
        None of the likely scenes has a prepared group. Pick who joins instead.
      </p>
    )

  return (
    <div className="grid gap-3">
      {scenes.length > 1 ? (
        <div className="grid gap-1">
          <label htmlFor={selectId} className="text-muted-foreground text-sm font-semibold">
            Scene
          </label>
          <select
            id={selectId}
            value={scene.ref.key}
            onChange={(event) => {
              setSceneKey(event.currentTarget.value)
              setConfirming(undefined)
            }}
            className="border-border bg-card h-11 rounded-lg border-2 px-3 text-base"
          >
            {scenes.map((option) => (
              <option key={option.ref.key} value={option.ref.key}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm font-semibold">{scene.name}</p>
      )}
      <ul className="grid gap-2">
        {scene.presets.map((option) => {
          const joined = joinedOf(option)
          const asking = confirming === option.key
          return (
            <li
              key={option.key}
              className={cn(
                'grid gap-2 rounded-xl border-2 p-3',
                joined > 0 ? 'border-emerald-500/40' : 'border-border',
              )}
            >
              <div className="grid gap-0.5">
                <p className="flex items-baseline justify-between gap-2 font-semibold">
                  {option.title}
                  {joined > 0 ? (
                    <span className="shrink-0 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      In the fight{joined > 1 ? ` ×${joined}` : ''}
                    </span>
                  ) : null}
                </p>
                <p className="text-muted-foreground text-sm">{option.summary}</p>
                {option.onlyIf ? (
                  <div className="flex items-baseline gap-1.5 text-sm text-amber-900 dark:text-amber-100">
                    <span className="shrink-0 text-xs font-bold uppercase">Only if</span>
                    <ContentRenderer content={option.onlyIf} />
                  </div>
                ) : null}
              </div>
              {!running ? (
                <button
                  type="button"
                  className={cn(BUTTON, PRIMARY)}
                  onClick={() => onLoad(option, 'replace')}
                >
                  <Swords aria-hidden /> Start the fight
                </button>
              ) : asking ? (
                <fieldset className="m-0 grid min-w-0 grid-cols-2 gap-2 border-0 p-0">
                  <legend className="sr-only">End the running fight and start this one?</legend>
                  <button
                    type="button"
                    className={cn(
                      BUTTON,
                      'border-red-500/40 bg-red-500/10 text-red-700 hover:bg-red-500/20 dark:text-red-400',
                    )}
                    onClick={() => {
                      setConfirming(undefined)
                      onLoad(option, 'replace')
                    }}
                  >
                    <Replace aria-hidden /> End this fight, start fresh
                  </button>
                  <button
                    type="button"
                    className={cn(BUTTON, OUTLINE)}
                    onClick={() => setConfirming(undefined)}
                  >
                    Keep fighting
                  </button>
                </fieldset>
              ) : (
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <button
                    type="button"
                    className={cn(BUTTON, PRIMARY)}
                    onClick={() => onLoad(option, 'add')}
                  >
                    <Plus aria-hidden /> Add to the fight
                  </button>
                  <button
                    type="button"
                    className={cn(BUTTON, OUTLINE)}
                    onClick={() => setConfirming(option.key)}
                  >
                    <Replace aria-hidden /> Start fresh
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
