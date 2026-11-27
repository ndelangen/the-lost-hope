import { MonitorOff, Trash } from 'lucide-react'

import { resolvePlayerScreenImage } from '#/lib/player-screen'
import { playerScreenHistoryFrames } from '#/lib/player-screen-dock'
import type { PlayerScreenState } from '#/lib/player-screen-state'
import { cn } from '#/lib/utils'

import { GROUP_LABEL, ScreenThumb } from './parts'

/** Everything the player screen has shown, newest first, to show any of it again. */
export function HistoryList({
  state,
  onJump,
  onClear,
}: {
  state: PlayerScreenState
  onJump: (index: number) => void
  onClear: () => void
}) {
  const frames = playerScreenHistoryFrames(state).toReversed()
  const empty = state.history.length < 2 && !state.history[0]
  return (
    <section aria-label="Shown so far" className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-muted-foreground text-xs">
          Newest first. The players have seen these, so a click shows one again straight away.
        </p>
        <button
          type="button"
          onClick={onClear}
          disabled={state.history.length < 2}
          className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <Trash className="size-3.5" aria-hidden />
          Clear history
        </button>
      </div>
      {empty ? (
        <p className="text-muted-foreground py-4 text-center text-sm">Nothing shown yet.</p>
      ) : (
        <ol className="flex flex-col">
          {frames.map(({ index, selection, place }) => {
            const resolved = selection ? resolvePlayerScreenImage(selection) : undefined
            const name = resolved?.name ?? (selection ? 'Missing picture' : 'Blank screen')
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => onJump(index)}
                  aria-current={place === 'live' ? 'true' : undefined}
                  aria-label={place === 'live' ? `${name}, showing now` : `Show ${name} again`}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md p-1 text-left',
                    place === 'live' ? 'bg-emerald-500/10' : 'hover:bg-muted',
                    place === 'ahead' && 'opacity-60',
                  )}
                >
                  <ScreenThumb picture={resolved} className="h-9 w-14 rounded" />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{name}</span>
                  {place === 'live' ? (
                    <span className="shrink-0 rounded bg-emerald-600 px-1.5 py-0.5 text-[11px] font-bold tracking-wider text-white uppercase">
                      Live
                    </span>
                  ) : resolved ? (
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {place === 'ahead' ? 'Stepped back from · ' : ''}
                      {GROUP_LABEL[resolved.group]}
                    </span>
                  ) : selection ? (
                    <span className="text-muted-foreground shrink-0 text-xs">Picture is gone</span>
                  ) : (
                    <MonitorOff className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
                  )}
                </button>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
