import { Info, Minus, Plus } from 'lucide-react'

import { IconButton } from '#/components/dm/encounter/icon-button'
import { RuleExplanation, RuleTerm } from '#/components/rule-term'
import { HoverPreview } from '#/components/ui/hover-preview'
import { refs } from '#/data/generated/refs'
import { CONDITION_ICONS } from '#/lib/condition-icons'
import { CONDITION_KEYS, ruleRef, rules, type Condition } from '#/lib/rules'
import { cn } from '#/lib/utils'

/**
 * Every condition as a switch the player turns on and off, each with its rule one tap away, and
 * the Exhaustion level beneath them.
 */
export function ConditionPanel({
  active,
  onToggle,
  exhaustion,
  onExhaustion,
}: {
  active: ReadonlySet<Condition>
  onToggle: (condition: Condition) => void
  exhaustion: number
  onExhaustion: (level: number) => void
}) {
  return (
    <div className="border-border bg-muted/30 grid gap-3 rounded-2xl border p-3">
      <ul className="grid grid-cols-2 gap-1.5">
        {CONDITION_KEYS.map((condition) => {
          const Icon = CONDITION_ICONS[condition]
          const on = active.has(condition)
          return (
            <li key={condition} className="flex">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onToggle(condition)}
                className={cn(
                  'flex h-12 min-w-0 flex-1 items-center gap-2 rounded-l-xl border-2 border-r-0 px-2.5 text-left text-sm font-semibold [&_svg]:size-5 [&_svg]:shrink-0',
                  on
                    ? 'border-amber-500 bg-amber-500/20 text-amber-900 dark:text-amber-200'
                    : 'border-border bg-card',
                )}
              >
                <Icon aria-hidden />
                <span className="truncate">{rules[condition].name}</span>
              </button>
              <HoverPreview interactive content={<RuleExplanation rule={ruleRef(condition)} />}>
                <button
                  type="button"
                  aria-label={`What ${rules[condition].name} does`}
                  className={cn(
                    'text-muted-foreground grid h-12 w-10 place-items-center rounded-r-xl border-2',
                    on ? 'border-amber-500 bg-amber-500/20' : 'border-border bg-card',
                  )}
                >
                  <Info aria-hidden className="size-4" />
                </button>
              </HoverPreview>
            </li>
          )
        })}
      </ul>
      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold">
          <RuleTerm rule={refs.rules.exhaustion} /> level
        </span>
        <div className="flex items-center gap-2">
          <IconButton
            label="One Exhaustion level less"
            disabled={exhaustion === 0}
            onClick={() => onExhaustion(exhaustion - 1)}
          >
            <Minus aria-hidden />
          </IconButton>
          <span className="w-6 text-center text-xl font-bold tabular-nums">{exhaustion}</span>
          <IconButton
            label="One Exhaustion level more"
            disabled={exhaustion === 6}
            onClick={() => onExhaustion(exhaustion + 1)}
          >
            <Plus aria-hidden />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
