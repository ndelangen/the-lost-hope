import { useRouter, useRouterState } from '@tanstack/react-router'
import { RefreshCw } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { applyChanges, useWaitingChanges } from '#/lib/dev-reload-guard'

/**
 * In local dev, says when code changes are waiting and lets the DM take them in now. Going to
 * another page takes them in too. It sits at the top centre of the page, in the flow, so it pushes
 * the page down rather than covering it, and stays in view under the header while scrolling.
 */
export function DevReloadNotice() {
  const { waiting, apply, reloadNow } = useWaitingChanges()
  useApplyOnNavigation()
  if (waiting === 'nothing') return null
  const unsaved = waiting === 'reload-after-unsaved'
  return (
    <div className="sticky top-16 z-20 mb-3 flex justify-center">
      <output className="flex max-w-full items-center gap-3 rounded-full bg-amber-400 py-1.5 pr-1.5 pl-4 text-sm font-medium text-amber-950 shadow-lg ring-1 ring-amber-500/60">
        <RefreshCw className="size-4" aria-hidden />
        <span>
          {unsaved
            ? 'The app changed. It reloads once you save or discard.'
            : 'The app changed. It updates when you go to another page.'}
        </span>
        <button
          type="button"
          className="rounded-full bg-amber-950 px-3 py-1 font-semibold text-amber-50 hover:bg-amber-900"
          onClick={unsaved ? reloadNow : apply}
        >
          {unsaved ? 'Reload now' : 'Update now'}
        </button>
      </output>
    </div>
  )
}

/**
 * Takes waiting changes in when the DM goes to another page, and reloads the route's data once
 * changes have landed, so a page whose record just arrived finds it.
 */
function useApplyOnNavigation() {
  const router = useRouter()
  const href = useRouterState({ select: (state) => state.location.href })
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    applyChanges()
  }, [href])

  useEffect(() => {
    const hot = import.meta.hot
    if (!hot) return
    const onUpdated = () => void router.invalidate()
    hot.on('vite:afterUpdate', onUpdated)
    return () => hot.off('vite:afterUpdate', onUpdated)
  }, [router])
}
