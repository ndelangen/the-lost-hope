import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'

import { HoverPreview } from '#/components/ui/hover-preview'
import { RULE_CATEGORIES } from '#/definitions/rule'
import { DAMAGE_TYPE_COLORS } from '#/lib/damage-type-colors'
import { RULE_ICONS } from '#/lib/rule-icons'
import { ruleOf, ruleTextSegments, ruleUrl, type DamageType, type RuleRef } from '#/lib/rules'
import { cn } from '#/lib/utils'

/**
 * A D&D rules term explained in place: hover, focus, or tap shows what it means and links to the
 * full rule in the free official rules. Children are how the term reads here, e.g. `AC`.
 */
export function RuleTerm({
  rule,
  children,
  className,
}: {
  rule: RuleRef
  children?: ReactNode
  className?: string
}) {
  const term = ruleOf(rule)
  const Icon = term.icon ? RULE_ICONS[term.icon] : undefined
  const color =
    term.category === 'damageType' ? DAMAGE_TYPE_COLORS[rule.key as DamageType] : undefined
  return (
    <HoverPreview interactive content={<RuleExplanation rule={rule} />}>
      <button
        type="button"
        className={cn(
          'focus-visible:ring-ring/50 cursor-help rounded-sm underline decoration-dotted underline-offset-4 outline-none focus-visible:ring-3',
          color ? `${color} font-semibold decoration-current/60` : 'decoration-muted-foreground/70',
          className,
        )}
      >
        {Icon ? (
          <Icon aria-hidden className="mr-0.5 inline-block size-[1.1em] align-[-0.2em]" />
        ) : null}
        {children ?? term.name}
      </button>
    </HoverPreview>
  )
}

/** What a rules term means, with the terms it builds on named and a link to the full rule. */
export function RuleExplanation({ rule }: { rule: RuleRef }) {
  const term = ruleOf(rule)
  const url = ruleUrl(term)
  return (
    <span className="grid gap-1.5 py-0.5 text-sm leading-snug font-normal">
      <span className="flex items-baseline justify-between gap-3">
        <strong className="text-base">
          {term.name}
          {term.short ? <span className="text-muted-foreground"> ({term.short})</span> : null}
        </strong>
        <span className="text-muted-foreground text-xs">{RULE_CATEGORIES[term.category]}</span>
      </span>
      <span>
        {ruleTextSegments(term.summary).map((segment, index) =>
          segment.kind === 'text' ? (
            // oxlint-disable-next-line react/no-array-index-key -- segments are positional
            <span key={index}>{segment.text}</span>
          ) : (
            // oxlint-disable-next-line react/no-array-index-key -- segments are positional
            <strong key={index} className="font-semibold">
              {segment.label}
            </strong>
          ),
        )}
      </span>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-primary inline-flex items-center gap-1 text-xs font-medium underline underline-offset-2"
        >
          Full rule in the free D&amp;D Basic Rules <ExternalLink aria-hidden className="size-3" />
        </a>
      ) : null}
    </span>
  )
}
