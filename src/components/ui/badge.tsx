import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '#/lib/utils'

import { Inline } from './layout'

const badgeVariants = cva(
  'w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-border text-foreground',
        success: 'border-transparent bg-emerald-600/15 text-emerald-700 dark:text-emerald-300',
        warning: 'border-transparent bg-amber-500/15 text-amber-800 dark:text-amber-200',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export function Badge({
  className,
  variant,
  children,
  ...props
}: Omit<React.ComponentProps<'span'>, 'ref'> & VariantProps<typeof badgeVariants>) {
  return (
    <Inline
      as="span"
      inline
      gap="none"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Inline>
  )
}
