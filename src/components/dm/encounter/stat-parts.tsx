import { RuleTerm } from '#/components/rule-term'
import { DAMAGE_TYPE_COLORS } from '#/lib/damage-type-colors'
import { RULE_ICONS } from '#/lib/rule-icons'
import { ruleOf, type DamageType as DamageTypeKey, type RuleRef } from '#/lib/rules'
import { damageLabel, type StatPart } from '#/lib/stat-block'
import { cn } from '#/lib/utils'

/**
 * Derived numbers such as "+5, 8 (1d10 + 3) piercing" with rules words explained in place and
 * damage types in their icon and colour. Inside another button, pass `interactive={false}`: the
 * words keep their look but don't open their own explanation.
 */
export function StatParts({
  parts,
  interactive = true,
}: {
  parts: readonly StatPart[]
  interactive?: boolean
}) {
  return (
    <>
      {parts.map((part, index) => {
        // oxlint-disable-next-line react/no-array-index-key -- parts are positional
        const key = index
        switch (part.kind) {
          case 'text':
            return <span key={key}>{part.text}</span>
          case 'value':
            return (
              <span key={key} className="tabular-nums">
                {part.text}
              </span>
            )
          case 'term':
            return interactive ? (
              <RuleTerm key={key} rule={part.rule}>
                {part.label}
              </RuleTerm>
            ) : (
              <span key={key}>{part.label}</span>
            )
          case 'damage':
            return (
              <span key={key} className="tabular-nums">
                {part.amount} ({part.roll})
                {part.type ? (
                  <>
                    {' '}
                    <DamageType type={part.type} interactive={interactive} />
                  </>
                ) : null}
              </span>
            )
        }
      })}
    </>
  )
}

/** A damage type with its icon and colour; a rules term with an explanation when interactive. */
export function DamageType({ type, interactive = true }: { type: RuleRef; interactive?: boolean }) {
  if (interactive) return <RuleTerm rule={type}>{damageLabel(type)}</RuleTerm>
  const term = ruleOf(type)
  const Icon = term.icon ? RULE_ICONS[term.icon] : undefined
  return (
    <span className={cn('font-semibold', DAMAGE_TYPE_COLORS[type.key as DamageTypeKey])}>
      {Icon ? (
        <Icon aria-hidden className="mr-0.5 inline-block size-[1.1em] align-[-0.2em]" />
      ) : null}
      {damageLabel(type)}
    </span>
  )
}
