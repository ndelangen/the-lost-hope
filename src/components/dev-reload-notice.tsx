import { RefreshCw } from 'lucide-react'

import { useHeldReload } from '#/lib/dev-reload-guard'

/**
 * In local dev, says when the app changed underneath unsaved work and will reload once it is
 * saved. It sits at the top centre of the page, in the flow, so it pushes the page down rather
 * than covering it, and stays in view under the header while scrolling.
 */
export function DevReloadNotice() {
  const { waiting, reloadNow } = useHeldReload()
  if (!waiting) return null
  return (
    <div className="sticky top-16 z-20 mb-3 flex justify-center">
      <output className="border-border bg-card text-foreground flex max-w-full items-center gap-3 rounded-full border px-4 py-2 text-sm shadow-lg">
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
    </div>
  )
}
