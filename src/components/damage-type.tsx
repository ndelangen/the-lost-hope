import type { ReactNode } from 'react'

import { RuleTerm } from '#/components/rule-term'
import { DAMAGE_TYPE_COLORS } from '#/lib/damage-type-colors'
import { RULE_ICONS } from '#/lib/rule-icons'
import { ruleOf, type DamageType as DamageTypeKey, type RuleRef } from '#/lib/rules'
import { damageLabel } from '#/lib/stat-block'
import { cn } from '#/lib/utils'

/** A damage type with its icon and colour; a rules term with an explanation when interactive. */
export function DamageType({
  type,
  interactive = true,
  children,
}: {
  type: RuleRef
  interactive?: boolean
  children?: ReactNode
}) {
  const label = children ?? damageLabel(type)
  if (interactive) return <RuleTerm rule={type}>{label}</RuleTerm>
  const term = ruleOf(type)
  const Icon = term.icon ? RULE_ICONS[term.icon] : undefined
  return (
    <span className={cn('font-semibold', DAMAGE_TYPE_COLORS[type.key as DamageTypeKey])}>
      {Icon ? (
        <Icon aria-hidden className="mr-0.5 inline-block size-[1.1em] align-[-0.2em]" />
      ) : null}
      {label}
    </span>
  )
}
