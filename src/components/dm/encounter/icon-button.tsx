import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { HoverPreview } from '#/components/ui/hover-preview'
import { cn } from '#/lib/utils'

import { useDensity } from './density'

/** Icon-only sizes: sm for housekeeping, md for encounter actions, lg for turn-critical ones. */
const SIZE = {
  normal: {
    sm: 'size-8 rounded-lg border [&_svg]:size-4',
    md: 'size-9 rounded-lg border [&_svg]:size-[18px]',
    lg: 'size-10 rounded-lg border [&_svg]:size-5',
  },
  focus: {
    sm: 'size-10 rounded-lg border-2 [&_svg]:size-5',
    md: 'size-12 rounded-xl border-2 [&_svg]:size-6',
    lg: 'size-14 rounded-xl border-2 [&_svg]:size-7',
  },
} as const

const ACTION_SIZE = {
  normal: {
    md: 'h-9 rounded-lg border px-3 text-sm [&_svg]:size-4',
    lg: 'h-10 rounded-lg border px-4 text-sm [&_svg]:size-5',
  },
  focus: {
    md: 'h-12 rounded-xl border-2 px-4 text-base [&_svg]:size-6',
    lg: 'h-14 rounded-xl border-2 px-6 text-lg [&_svg]:size-7',
  },
} as const

const TONE = {
  outline: 'border-border bg-card text-foreground hover:bg-muted',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent',
  danger: 'border-red-500/40 bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400',
  heal: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400',
  ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground border-transparent',
} as const

type IconButtonTone = keyof typeof TONE

/** An icon-only control whose name and details appear in a hover/focus tooltip. */
export const IconButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'> & {
    label: string
    tip?: ReactNode
    size?: 'sm' | 'md' | 'lg'
    tone?: IconButtonTone
  }
>(function IconButton(
  { label, tip, size = 'md', tone = 'outline', className, children, ...props },
  ref,
) {
  const density = useDensity()
  return (
    <HoverPreview content={tip ?? label} className="inline-flex">
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn(
          'focus-visible:ring-ring/50 relative inline-flex shrink-0 items-center justify-center outline-none transition-colors focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-35',
          SIZE[density][size],
          TONE[tone],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </HoverPreview>
  )
})

/** A labelled action with an icon, for buttons whose meaning should be read, not guessed. */
export function ActionButton({
  tone = 'outline',
  size = 'md',
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'button'> & {
  tone?: IconButtonTone
  size?: 'md' | 'lg'
}) {
  const density = useDensity()
  return (
    <button
      type="button"
      className={cn(
        'focus-visible:ring-ring/50 inline-flex shrink-0 items-center justify-center gap-2 font-semibold outline-none transition-colors focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-35 [&_svg]:shrink-0',
        ACTION_SIZE[density][size],
        TONE[tone],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
