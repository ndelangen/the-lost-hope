import { MonitorCheck, MonitorUp } from 'lucide-react'

import { samePlayerScreenImage, type PlayerScreenImage } from '#/lib/player-screen-state'
import { cn } from '#/lib/utils'

import { usePlayerScreen } from './use-player-screen'

/** Puts one picture on the players' monitor, or shows that it is already there. */
export function ShowToPlayersButton({
  selection,
  className,
}: {
  selection: PlayerScreenImage
  className?: string
}) {
  const [{ showing }, update] = usePlayerScreen()
  const onScreen = samePlayerScreenImage(selection, showing)
  return (
    <button
      type="button"
      onClick={() => update((state) => ({ ...state, showing: onScreen ? null : selection }))}
      aria-pressed={onScreen}
      className={cn(
        'flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 backdrop-blur transition-colors',
        onScreen
          ? 'bg-emerald-500/90 text-white ring-emerald-300/40 hover:bg-emerald-600'
          : 'bg-black/55 text-white ring-white/20 hover:bg-black/75',
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
