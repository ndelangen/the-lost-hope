import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '#/lib/utils'

import { Inline } from './layout'

const pillVariants = cva(
  'w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-border text-foreground',
        success: 'border-transparent bg-emerald-600/15 text-emerald-700 dark:text-emerald-300',
        warning: 'border-transparent bg-amber-500/15 text-amber-800 dark:text-amber-200',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

export function Pill({
  className,
  variant,
  dot = false,
  children,
  ...props
}: Omit<React.ComponentProps<'span'>, 'ref'> &
  VariantProps<typeof pillVariants> & {
    dot?: boolean
  }) {
  return (
    <Inline
      as="span"
      inline
      gap="none"
      justify="center"
      className={cn(pillVariants({ variant }), dot && 'gap-1.5', className)}
      {...props}
    >
      {dot ? <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden /> : null}
      {children}
    </Inline>
  )
}
