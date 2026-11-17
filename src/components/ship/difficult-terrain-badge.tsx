import { GiStonePile } from 'react-icons/gi'

import { cn } from '#/lib/utils'

/** Marks a destroyed ship compartment as difficult terrain on the DM's controls. */
export function DifficultTerrainBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md bg-red-600 px-1.5 py-0.5 text-xs font-semibold text-white',
        className,
      )}
    >
      <GiStonePile aria-hidden className="size-3.5" />
      Difficult terrain
    </span>
  )
}
