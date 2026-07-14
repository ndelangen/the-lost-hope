import type { ComponentProps } from 'react'

import { Pill } from '#/components/ui/pill'
import type { EntityKind } from '#/definitions/kind'
import { ENTITY_KIND_VISUALS } from '#/lib/entity-kind-visuals'
import { cn } from '#/lib/utils'

type EntityKindPillProps = ComponentProps<typeof Pill> & {
  kind: EntityKind
}

/** Pill with the shared color marker for one campaign entity kind. */
export function EntityKindPill({
  kind,
  variant = 'secondary',
  dot = true,
  className,
  children,
  ...props
}: EntityKindPillProps) {
  const visual = ENTITY_KIND_VISUALS[kind]

  return (
    <Pill
      dot={dot}
      variant={variant}
      className={cn('gap-1.5 border-transparent', visual.pillClassName, className)}
      {...props}
    >
      {children}
    </Pill>
  )
}
