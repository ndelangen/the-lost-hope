import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { EntityReference } from '#/components/entity-reference'
import { Inline, Stack } from '#/components/ui/layout'
import type { EntityKind } from '#/lib/campaign'
import { cn } from '#/lib/utils'

type HomeActionDestination =
  | { to: '/intro' }
  | { entity: { kind: EntityKind; slug: string; label: string } }

type HomeActionCardProps = {
  destination: HomeActionDestination
  eyebrow: string
  icon: LucideIcon
  title: string
  variant: 'primary' | 'secondary'
}

const variantClasses = {
  primary: {
    card: 'border-primary bg-primary text-primary-foreground',
    icon: 'bg-primary-foreground/15 text-primary-foreground',
    eyebrow: 'text-primary-foreground/70',
    illustration: 'text-primary-foreground/10',
  },
  secondary: {
    card: 'border-primary/25 bg-primary/5 text-foreground hover:border-primary/40 hover:bg-primary/10',
    icon: 'bg-primary/10 text-primary',
    eyebrow: 'text-primary/70',
    illustration: 'text-primary/10',
  },
} as const

/** One prominent home-page navigation action with visual variants. */
export function HomeActionCard({
  destination,
  eyebrow,
  icon: Icon,
  title,
  variant,
}: HomeActionCardProps) {
  const visual = variantClasses[variant]
  const className = cn(
    'group relative block min-h-24 overflow-hidden rounded-xl border p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
    visual.card,
  )
  const content = (
    <>
      <Icon
        className={cn(
          'pointer-events-none absolute -right-3 -bottom-4 size-24 rotate-[-10deg] transition-transform group-hover:scale-110',
          visual.illustration,
        )}
        aria-hidden
      />
      <Inline as="span" justify="between" gap="md" className="relative z-10 h-full">
        <Inline as="span" gap="md">
          <Inline
            as="span"
            gap="none"
            justify="center"
            className={cn('size-10 shrink-0 rounded-lg', visual.icon)}
          >
            <Icon className="size-5" />
          </Inline>
          <Stack as="span" gap="2xs" className="min-w-0 text-left">
            <span className={cn('block text-xs', visual.eyebrow)}>{eyebrow}</span>
            <span className="block truncate font-semibold">{title}</span>
          </Stack>
        </Inline>
        <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
      </Inline>
    </>
  )

  if ('to' in destination) {
    return (
      <Link to={destination.to} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <EntityReference
      kind={destination.entity.kind}
      slug={destination.entity.slug}
      label={destination.entity.label}
      unstyled
      wrapperClassName="block"
      className={className}
    >
      {() => content}
    </EntityReference>
  )
}
