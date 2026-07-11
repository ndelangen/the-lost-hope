import type { ReactNode } from 'react'

import { cn } from '#/lib/utils'

import { Inline } from './layout'

export function SegmentedControl({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <Inline
      as="fieldset"
      inline
      gap="xs"
      className={cn('border-border bg-muted/40 rounded-lg border p-1.5', className)}
    >
      {children}
    </Inline>
  )
}

export function SegmentedControlItem({
  active,
  onClick,
  children,
  label,
  className,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        'shrink-0 rounded-md border text-sm font-medium transition-[color,background-color,box-shadow,border-color]',
        'border-transparent shadow-none',
        active
          ? 'bg-background text-foreground border-border/50 shadow-sm'
          : 'text-muted-foreground hover:bg-background/40 hover:text-foreground',
        className,
      )}
    >
      <Inline as="span" inline gap="xs" justify="center">
        {children}
      </Inline>
    </button>
  )
}
