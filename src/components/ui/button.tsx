import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '#/lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border font-semibold whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'border-border bg-background text-foreground hover:bg-accent',
        ghost:
          'border-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        danger:
          'border-transparent text-muted-foreground hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300',
      },
      size: {
        sm: 'h-8 px-2.5 text-xs',
        md: 'h-10 px-4 text-sm',
        icon: 'size-8',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'md' },
  },
)

type ButtonProps = ComponentPropsWithoutRef<'button'> & VariantProps<typeof buttonVariants>

/** The shared button: one action, drawn by how much weight it carries. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
})
