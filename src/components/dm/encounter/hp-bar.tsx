import { hpBand } from '#/lib/encounter-focus'
import { cn } from '#/lib/utils'

const BAND_CLASS = {
  healthy: 'bg-emerald-500',
  bloodied: 'bg-amber-500',
  down: 'bg-red-600',
} as const

/** A thin bar showing the share of HP left; green, amber when bloodied, red when down. */
export function HpBar({ fraction, className }: { fraction: number; className?: string }) {
  return (
    <div aria-hidden className={cn('bg-muted h-1.5 overflow-hidden rounded-full', className)}>
      <div
        className={cn('h-full rounded-full transition-[width]', BAND_CLASS[hpBand(fraction)])}
        style={{ width: `${Math.max(fraction, 0.02) * 100}%` }}
      />
    </div>
  )
}
