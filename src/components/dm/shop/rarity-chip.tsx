import { cn } from '#/lib/utils'

/** The usual rarity colours, so a rare item stands out on a long shelf. */
const RARITY_TONES: Readonly<Record<string, string>> = {
  common: 'bg-muted text-muted-foreground',
  uncommon: 'bg-emerald-600/15 text-emerald-700 dark:text-emerald-300',
  rare: 'bg-sky-600/15 text-sky-700 dark:text-sky-300',
  'very rare': 'bg-violet-600/15 text-violet-700 dark:text-violet-300',
  legendary: 'bg-amber-500/20 text-amber-800 dark:text-amber-200',
}

/** A magic item's rarity as a small coloured label. */
export function RarityChip({ rarity, className }: { rarity: string; className?: string }) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-full px-2 py-0.5 text-[11px] leading-4 font-semibold whitespace-nowrap capitalize',
        RARITY_TONES[rarity] ?? RARITY_TONES.common,
        className,
      )}
    >
      {rarity}
    </span>
  )
}
