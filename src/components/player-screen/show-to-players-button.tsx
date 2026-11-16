import { MonitorCheck, MonitorUp } from 'lucide-react'

import {
  playerScreenShowing,
  samePlayerScreenImage,
  togglePlayerScreen,
  type PlayerScreenImage,
} from '#/lib/player-screen-state'
import { cn } from '#/lib/utils'

import { usePlayerScreen } from './use-player-screen'

/**
 * Puts one picture on the players' monitor. Pressed again while it is showing, it returns the
 * screen to what was there before.
 */
export function ShowToPlayersButton({
  selection,
  tone = 'overlay',
  className,
}: {
  selection: PlayerScreenImage
  /** `overlay` sits on top of artwork; `card` sits on a page or card background. */
  tone?: 'overlay' | 'card'
  className?: string
}) {
  const [state, update] = usePlayerScreen()
  const onScreen = samePlayerScreenImage(selection, playerScreenShowing(state))
  return (
    <button
      type="button"
      onClick={() => update((current) => togglePlayerScreen(current, selection))}
      aria-pressed={onScreen}
      title={onScreen ? 'Put back what was showing before' : undefined}
      className={cn(
        'flex h-12 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors',
        onScreen
          ? 'bg-emerald-600 text-white ring-1 ring-emerald-300/40 hover:bg-emerald-700'
          : tone === 'overlay'
            ? 'bg-black/55 text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/75'
            : 'border-border bg-background hover:bg-muted border',
        className,
      )}
    >
      {onScreen ? (
        <MonitorCheck className="size-5" aria-hidden />
      ) : (
        <MonitorUp className="size-5" aria-hidden />
      )}
      {onScreen ? 'On player screen' : 'Show to players'}
    </button>
  )
}
