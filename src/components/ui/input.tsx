import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '#/lib/utils'

/** Shared text-field appearance and interaction states. */
export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 h-9 w-full min-w-0 rounded-lg border px-3 py-1 text-sm outline-none transition-[color,box-shadow,border-color] focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
})
