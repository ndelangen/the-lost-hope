import { Check, ChevronDown, Swords } from 'lucide-react'
import { useState } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { FightLineUp } from '#/components/dm/fight-line-up'
import type { SceneFight } from '#/lib/dm-encounter'
import { cn } from '#/lib/utils'

import { ActionButton } from './icon-button'

/** One of the scene's fights, and how many times it has joined this encounter. */
export type FightRow = SceneFight & { joined: number }

/**
 * The scene's fights, one per beat that brings one: who is in each, how to play them, and the
 * button that puts them in this encounter's roster.
 */
export function EncounterFights({
  sceneName,
  fights,
  onJoin,
}: {
  sceneName: string
  fights: readonly FightRow[]
  onJoin: (fight: FightRow) => void
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
              {fight.joined > 0 && fight.repeats ? (
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  {fight.joined === 1 ? '1 group' : `${fight.joined} groups`} in the fight so far
                </p>
              ) : null}
              {fight.joined > 0 && !fight.repeats ? (
                <p className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500/10 font-semibold text-emerald-700 dark:text-emerald-400">
                  <Check aria-hidden className="size-5" /> In the fight
                </p>
              ) : (
                <ActionButton
                  tone={fight.joined > 0 ? 'outline' : 'primary'}
                  className="h-12 w-full rounded-xl text-base"
                  onClick={() => onJoin(fight)}
                >
                  <Swords aria-hidden />
                  {fight.joined > 0 ? 'Bring in another group' : 'Bring into the fight'}
                </ActionButton>
              )}
            </div>
          </li>
        ))}
      </ul>
    </details>
  )
}
