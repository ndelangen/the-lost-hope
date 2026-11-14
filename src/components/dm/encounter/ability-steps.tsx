import type { DmStep } from '#/lib/ability-steps'
import type { DerivedStatBlock } from '#/lib/dm-ability-text'
import { cn } from '#/lib/utils'

import { AbilityTextView, type ReferencedAbility } from './ability-text'
import { useDensity } from './density'
import { DamageType, StatParts } from './stat-parts'

/**
 * What the DM does with an ability, as numbered steps. Rules words explain themselves on hover,
 * damage types show their icon and colour, and attacks a step uses (a Multiattack's) unfold
 * underneath so nothing needs looking up.
 */
export function AbilitySteps({
  steps,
  block,
  describe,
  nested = false,
}: {
  steps: readonly DmStep[]
  block: DerivedStatBlock
  describe?: (key: string) => ReferencedAbility | undefined
  nested?: boolean
}) {
  const focus = useDensity() === 'focus'
  return (
    <ol className={cn('grid', focus ? 'gap-2.5' : 'gap-1.5')}>
      {steps.map((step, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- steps are positional
        <li key={index} className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-2.5">
          <span
            aria-hidden
            className={cn(
              'bg-foreground/10 text-foreground grid place-items-center rounded-full font-bold tabular-nums',
              focus ? 'size-7 text-sm' : 'size-5 text-xs',
              nested && 'bg-foreground/5',
            )}
          >
            {index + 1}
          </span>
          <div className="grid gap-2">
            <div className="leading-relaxed">
              {step.parts.map((part, partIndex) => {
                // oxlint-disable-next-line react/no-array-index-key -- parts are positional
                const key = partIndex
                switch (part.kind) {
                  case 'tokens':
                    return (
                      <AbilityTextView
                        key={key}
                        text={part.tokens}
                        block={block}
                        describe={describe}
                      />
                    )
                  case 'damage':
                    return (
                      <span key={key}>
                        <strong className="tabular-nums">{part.amount}</strong>{' '}
                        <DamageType type={part.type} /> damage{' '}
                        <span className="text-muted-foreground tabular-nums">
                          (or roll {part.roll})
                        </span>
                      </span>
                    )
                  case 'value':
                    return (
                      <strong key={key} className="tabular-nums">
                        {part.text}
                      </strong>
                    )
                  default:
                    return <StatParts key={key} parts={[part]} />
                }
              })}
            </div>
            {!nested
              ? step.expand?.map((key) => {
                  const inner = block.steps?.[key]
                  const facts = block.abilities[key]
                  if (!inner || !facts) return null
                  return (
                    <div key={key} className="border-border grid gap-1.5 border-l-2 pl-3">
                      <strong>{facts.name}</strong>
                      {/* Its own "uses its action" step doesn't apply inside a Multiattack. */}
                      <AbilitySteps steps={inner.slice(1)} block={block} nested />
                    </div>
                  )
                })
              : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
