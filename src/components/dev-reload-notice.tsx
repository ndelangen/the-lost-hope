import { RefreshCw } from 'lucide-react'

import { useHeldReload } from '#/lib/dev-reload-guard'

/**
 * In local dev, says when the app changed underneath unsaved work and will reload once it is
 * saved. It sits just above the player-screen dock, so the two never cover each other.
 */
export function DevReloadNotice() {
  const { waiting, reloadNow } = useHeldReload()
  if (!waiting) return null
  return (
    <output className="border-border bg-card text-foreground fixed right-4 bottom-24 z-[160] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border px-4 py-2 text-sm shadow-lg">
      <RefreshCw className="text-muted-foreground size-4" aria-hidden />
      <span>The app changed. It reloads once you save or discard.</span>
      <button
        type="button"
        className="text-primary font-medium underline-offset-4 hover:underline"
        onClick={reloadNow}
      >
        Reload now
      </button>
    </output>
  )
}
