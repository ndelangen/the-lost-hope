import type { ComponentProps } from 'react'

import { Badge } from '#/components/ui/badge'
import type { EntityKind } from '#/definitions/kind'
import { ENTITY_KIND_VISUALS } from '#/lib/entity-kind-visuals'
import { cn } from '#/lib/utils'

type EntityKindBadgeProps = ComponentProps<typeof Badge> & {
  kind: EntityKind
}

/** Neutral badge with the shared color marker for one campaign entity kind. */
export function EntityKindBadge({
  kind,
  variant = 'secondary',
  className,
  children,
  ...props
}: EntityKindBadgeProps) {
  const visual = ENTITY_KIND_VISUALS[kind]

  return (
    <Badge
      variant={variant}
      className={cn('gap-1.5 border-transparent', visual.badgeClassName, className)}
      {...props}
    >
      <span
        className={cn('size-1.5 shrink-0 rounded-full bg-current', visual.accentClassName)}
        aria-hidden
      />
      {children}
    </Badge>
  )
}
