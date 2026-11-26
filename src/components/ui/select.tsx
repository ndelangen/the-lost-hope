import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '#/lib/utils'

type SelectProps = ComponentPropsWithoutRef<'select'> & { containerClassName?: string }

/** A native select drawn like the shared text field, with its own chevron inside the border. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, containerClassName, children, ...props },
  ref,
) {
  return (
    <div className={cn('relative min-w-0', containerClassName)}>
      <select
        ref={ref}
        className={cn(
          'border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/30 h-10 w-full min-w-0 cursor-pointer appearance-none truncate rounded-lg border pr-9 pl-3 text-sm font-medium outline-none transition-[color,box-shadow,border-color] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
        aria-hidden
      />
    </div>
  )
})
