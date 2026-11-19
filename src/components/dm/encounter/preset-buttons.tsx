import { Plus, Replace, Swords, X } from 'lucide-react'
import { useState } from 'react'

import { cn } from '#/lib/utils'

const BUTTON =
  'focus-visible:ring-ring/50 flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 px-3 py-1.5 leading-tight font-semibold outline-none focus-visible:ring-3 [&_svg]:size-5 [&_svg]:shrink-0'
const PRIMARY = 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent'
const OUTLINE = 'border-border bg-card hover:bg-muted'

/**
 * Load a prepared group into the one encounter. With nobody fighting it starts the fight. While a
 * fight runs, the group can join it, or replace it after the DM confirms.
 */
export function PresetButtons({
  running,
  onLoad,
  stack = false,
}: {
  running: boolean
  onLoad: (mode: 'add' | 'replace') => void
  /** Stack the buttons, for narrow places such as a ship's sector. */
  stack?: boolean
}) {
  const [confirming, setConfirming] = useState(false)
  const layout = cn('flex gap-2', stack && 'flex-col')

  if (!running)
    return (
      <div className={layout}>
        <button type="button" className={cn(BUTTON, PRIMARY)} onClick={() => onLoad('replace')}>
          <Swords aria-hidden /> Start the fight
        </button>
      </div>
    )

  if (confirming)
    return (
      <fieldset className={cn(layout, 'm-0 min-w-0 border-0 p-0')}>
        <legend className="sr-only">Replace the running fight?</legend>
        <button
          type="button"
          className={cn(
            BUTTON,
            'border-red-500/40 bg-red-500/10 text-red-700 hover:bg-red-500/20 dark:text-red-400',
          )}
          onClick={() => {
            setConfirming(false)
            onLoad('replace')
          }}
        >
          <Replace aria-hidden /> Yes, end the fight and start this
        </button>
        <button type="button" className={cn(BUTTON, OUTLINE)} onClick={() => setConfirming(false)}>
          <X aria-hidden /> Keep fighting
        </button>
      </fieldset>
    )

  return (
    <div className={layout}>
      <button type="button" className={cn(BUTTON, PRIMARY)} onClick={() => onLoad('add')}>
        <Plus aria-hidden /> Add to the fight
      </button>
      <button
        type="button"
        className={cn(BUTTON, OUTLINE, !stack && 'flex-none')}
        onClick={() => setConfirming(true)}
      >
        <Replace aria-hidden /> Replace
      </button>
    </div>
  )
}
