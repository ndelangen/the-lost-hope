import { ChevronDown, Swords } from 'lucide-react'
import { useState } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { FightLineUp } from '#/components/dm/fight-line-up'
import type { SceneFight } from '#/lib/dm-encounter'
import { cn } from '#/lib/utils'

import { PresetButtons } from './preset-buttons'

/** One of the scene's fights, and how many times it has joined this encounter. */
export type FightRow = SceneFight & { joined: number }

/**
 * The scene's prepared groups, one per beat that brings one: who is in each, how to play them, and
 * the buttons that add them to the fight or replace the fight with them.
 */
export function EncounterFights({
  sceneName,
  fights,
  running,
  onLoad,
}: {
  sceneName: string
  fights: readonly FightRow[]
  /** Whether anyone is in the fight, which a group can join or replace. */
  running: boolean
  onLoad: (fight: FightRow, mode: 'add' | 'replace') => void
}) {
  const [open, setOpen] = useState(true)
  const joined = fights.filter((fight) => fight.joined > 0).length

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="border-border bg-card @container rounded-2xl border-2 px-4 py-2 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex h-12 cursor-pointer list-none items-center gap-2 font-semibold">
        <Swords aria-hidden className="text-muted-foreground size-5" />
        Who joins the fight
        <span className="text-muted-foreground font-normal">· {sceneName}</span>
        <span className="text-muted-foreground ml-auto text-sm font-normal tabular-nums">
          {joined} of {fights.length} in
        </span>
        <ChevronDown
          aria-hidden
          className={cn('text-muted-foreground size-5 transition-transform', open && 'rotate-180')}
        />
      </summary>
      <ul className="grid gap-3 pb-2 @xl:grid-cols-2 @5xl:grid-cols-3">
        {fights.map((fight) => (
          <li
            key={fight.key}
            className={cn(
              'flex flex-col gap-3 rounded-xl border p-3',
              fight.joined > 0 ? 'border-emerald-500/40' : 'border-border',
            )}
          >
            <div className="grid gap-1">
              <h3 className="text-base leading-tight font-semibold">{fight.key}</h3>
              {fight.onlyIf ? (
                <div className="flex items-baseline gap-2 text-amber-900 dark:text-amber-100">
                  <span className="shrink-0 text-xs font-bold uppercase">Only if</span>
                  <ContentRenderer content={fight.onlyIf} />
                </div>
              ) : null}
            </div>
            <FightLineUp lineUp={fight} />
            <div className="mt-auto grid gap-2">
              {fight.joined > 0 ? (
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  {fight.joined === 1 ? '1 group' : `${fight.joined} groups`} in the fight so far
                </p>
              ) : null}
              <PresetButtons running={running} onLoad={(mode) => onLoad(fight, mode)} />
            </div>
          </li>
        ))}
      </ul>
    </details>
  )
}
