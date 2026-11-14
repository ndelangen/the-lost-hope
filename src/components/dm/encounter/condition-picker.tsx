import { useState } from 'react'

import { CONDITION_ICONS } from '#/lib/condition-icons'
import type { AbilityId, DurationChoice } from '#/lib/encounter-combat'
import { ABILITY_KEYS, CONDITION_KEYS, plainRuleText, rules, type Condition } from '#/lib/rules'
import { cn } from '#/lib/utils'

import { useDensity } from './density'

const DURATIONS = [
  { kind: 'until-removed', label: 'Until removed' },
  { kind: 'end-of-turn', label: 'End of next turn' },
  { kind: 'start-of-turn', label: 'Start of next turn' },
  { kind: 'rounds', label: 'Rounds' },
  { kind: 'save-ends', label: 'Save ends' },
] as const

/**
 * Pick how long a condition lasts, then the condition: one click applies it. Turn-based durations
 * count from the chosen combatant's turn, defaulting to whoever is acting now.
 */
export function ConditionPicker({
  combatants,
  defaultTurnOf,
  onApply,
}: {
  combatants: readonly { id: string; name: string }[]
  defaultTurnOf: string | undefined
  onApply: (condition: Condition, duration: DurationChoice) => void
}) {
  const focus = useDensity() === 'focus'
  const [kind, setKind] = useState<DurationChoice['kind']>('until-removed')
  const [of, setOf] = useState(defaultTurnOf ?? combatants[0]?.id ?? '')
  const [rounds, setRounds] = useState(1)
  const [dc, setDc] = useState(13)
  const [ability, setAbility] = useState<AbilityId>('con')

  const choice = (): DurationChoice => {
    if (kind === 'end-of-turn' || kind === 'start-of-turn') return { kind, of }
    if (kind === 'rounds') return { kind, rounds, of }
    if (kind === 'save-ends') return { kind, dc, ability }
    return { kind }
  }
  const control = cn(
    'border-input bg-background rounded-lg border px-2 text-sm',
    focus ? 'h-11 text-base' : 'h-8',
  )

  return (
    <div className="border-border bg-muted/30 grid gap-3 rounded-xl border p-3">
      <fieldset className="m-0 grid min-w-0 gap-2 border-0 p-0">
        <legend className="text-muted-foreground mb-1 text-xs font-semibold uppercase">
          How long
        </legend>
        <div className="flex flex-wrap gap-1">
          {DURATIONS.map((option) => (
            <button
              key={option.kind}
              type="button"
              aria-pressed={kind === option.kind}
              onClick={() => setKind(option.kind)}
              className={cn(
                'rounded-lg border px-3 font-medium',
                focus ? 'h-11 text-base' : 'h-8 text-sm',
                kind === option.kind
                  ? 'bg-primary text-primary-foreground border-transparent'
                  : 'border-border bg-card hover:bg-muted',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        {kind === 'end-of-turn' || kind === 'start-of-turn' || kind === 'rounds' ? (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {kind === 'rounds' ? (
              <>
                <input
                  aria-label="Rounds"
                  type="number"
                  min={1}
                  value={rounds}
                  onChange={(event) =>
                    setRounds(Math.max(1, event.currentTarget.valueAsNumber || 1))
                  }
                  className={cn(control, 'w-16 text-center')}
                />
                <span>rounds, ending at the start of</span>
              </>
            ) : (
              <span>{kind === 'end-of-turn' ? 'Ends at the end of' : 'Ends at the start of'}</span>
            )}
            <select
              aria-label="Whose turn"
              value={of}
              onChange={(event) => setOf(event.currentTarget.value)}
              className={control}
            >
              {combatants.map((combatant) => (
                <option key={combatant.id} value={combatant.id}>
                  {combatant.name}
                </option>
              ))}
            </select>
            <span>’s {kind === 'rounds' ? 'turn' : 'next turn'}</span>
          </div>
        ) : null}
        {kind === 'save-ends' ? (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span>DC</span>
            <input
              aria-label="Save DC"
              type="number"
              min={1}
              value={dc}
              onChange={(event) => setDc(Math.max(1, event.currentTarget.valueAsNumber || 1))}
              className={cn(control, 'w-16 text-center')}
            />
            <select
              aria-label="Saving throw ability"
              value={ability}
              onChange={(event) => setAbility(event.currentTarget.value as AbilityId)}
              className={control}
            >
              {ABILITY_KEYS.map((id) => ({ id, label: rules[id].short ?? rules[id].name })).map(
                (option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ),
              )}
            </select>
            <span>save at the end of each of its turns</span>
          </div>
        ) : null}
      </fieldset>

      <fieldset className="m-0 grid min-w-0 gap-2 border-0 p-0">
        <legend className="text-muted-foreground mb-1 text-xs font-semibold uppercase">
          Condition
        </legend>
        <div className={cn('grid gap-1.5', focus ? 'grid-cols-3 xl:grid-cols-5' : 'grid-cols-2')}>
          {CONDITION_KEYS.map((condition) => {
            const Icon = CONDITION_ICONS[condition]
            return (
              <button
                key={condition}
                type="button"
                title={plainRuleText(rules[condition].summary)}
                onClick={() => onApply(condition, choice())}
                className={cn(
                  'border-border bg-card hover:bg-amber-500/10 hover:border-amber-500/50 flex items-center gap-2 rounded-lg border px-2.5 text-left capitalize',
                  focus ? 'h-12 text-base [&_svg]:size-5' : 'h-8 text-sm [&_svg]:size-4',
                )}
              >
                <Icon aria-hidden />
                {rules[condition].name}
              </button>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
