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
      <output className="flex max-w-full items-center gap-3 rounded-full bg-amber-400 py-1.5 pr-1.5 pl-4 text-sm font-medium text-amber-950 shadow-lg ring-1 ring-amber-500/60">
        <RefreshCw className="size-4" aria-hidden />
        <span>The app changed. It reloads once you save or discard.</span>
        <button
          type="button"
          className="rounded-full bg-amber-950 px-3 py-1 font-semibold text-amber-50 hover:bg-amber-900"
          onClick={reloadNow}
        >
          Reload now
        </button>
      </output>
    </div>
  )
}
