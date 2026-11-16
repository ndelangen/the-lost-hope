import { Link } from '@tanstack/react-router'
import { Eye, EyeOff, LayoutDashboard } from 'lucide-react'

import { cn } from '#/lib/utils'

const segmentClass =
  'focus-visible:ring-ring/50 inline-flex h-9 items-center gap-2 px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none'

/** The header's DM controls: a link to the DM dashboard and the DM mode switch, joined. */
export function DmControls({
  dmMode,
  onToggleDmMode,
}: {
  dmMode: boolean
  onToggleDmMode: () => void
}) {
  const label = dmMode ? 'Hide DM-only fields' : 'Show DM-only fields'
  return (
    <div className="border-border inline-flex shrink-0 overflow-hidden rounded-md border">
      <Link
        to="/dm"
        className={cn(segmentClass, 'text-muted-foreground hover:bg-muted hover:text-foreground')}
        activeProps={{ className: 'bg-muted text-foreground' }}
        title="DM dashboard"
        aria-label="DM dashboard"
      >
        <LayoutDashboard className="size-4" aria-hidden />
        <span className="hidden md:inline">DM</span>
      </Link>
      <button
        type="button"
        onClick={onToggleDmMode}
        aria-pressed={dmMode}
        aria-label={label}
        title={label}
        className={cn(
          segmentClass,
          'border-border border-l',
          dmMode
            ? 'bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-300'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        {dmMode ? (
          <Eye className="size-4" aria-hidden />
        ) : (
          <EyeOff className="size-4" aria-hidden />
        )}
        <span className="hidden md:inline">{dmMode ? 'DM mode on' : 'DM mode'}</span>
      </button>
    </div>
  )
}
