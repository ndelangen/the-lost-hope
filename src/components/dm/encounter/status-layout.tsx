import { Brain, Check, Sparkles, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import { RuleExplanation, RuleTerm } from '#/components/rule-term'
import { HoverPreview } from '#/components/ui/hover-preview'
import { CONDITION_ICONS } from '#/lib/condition-icons'
import {
  describeDuration,
  originName,
  type ActiveCondition,
  type AppliedEffect,
  type DamageReminder,
  type OnDamage,
  type OriginNames,
} from '#/lib/encounter-combat'
import { ruleRef, rules } from '#/lib/rules'
import { cn } from '#/lib/utils'

import { useDensity } from './density'
import { ActionButton } from './icon-button'

/** "Damage: DC 13 Wisdom save ends it." */
export function onDamageWords(onDamage: OnDamage) {
  return onDamage.kind === 'save'
    ? `Damage: DC ${onDamage.dc} ${rules[onDamage.ability].name} save ends it`
    : 'Damage ends it'
}

/** Who it came from, the effect's name being said already: "Cast by Mirela", "From Wolf 1". */
function whoFrom(origin: AppliedEffect['origin'], { nameOf }: OriginNames) {
  if (origin.kind === 'spell') return origin.caster ? `Cast by ${nameOf(origin.caster)}` : ''
  if (origin.kind === 'item') return origin.user ? `Used by ${nameOf(origin.user)}` : ''
  return `From ${nameOf(origin.combatant)}`
}

/** "Mirela", "Mirela and Wolf 1", "Mirela, Wolf 1 and Wolf 2". */
export function listNames(names: readonly string[]) {
  return names.length < 2 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`
}

type Entry =
  | { kind: 'effect'; effect: AppliedEffect; conditions: ActiveCondition[] }
  | { kind: 'condition'; condition: ActiveCondition }

/** Effects with the conditions they brought, then conditions applied on their own. */
export function statusEntries(
  conditions: readonly ActiveCondition[],
  appliedEffects: readonly AppliedEffect[],
): Entry[] {
  const effectIds = new Set(appliedEffects.map(({ id }) => id))
  return [
    ...appliedEffects.map((effect): Entry => ({
      kind: 'effect',
      effect,
      conditions: conditions.filter((held) => held.effect === effect.id),
    })),
    ...conditions
      .filter((held) => !held.effect || !effectIds.has(held.effect))
      .map((condition): Entry => ({ kind: 'condition', condition })),
  ]
}

type ListProps = {
  conditions: readonly ActiveCondition[]
  appliedEffects: readonly AppliedEffect[]
  /** The one thing it concentrates on, and who that spell's effects are on. */
  concentration?: { on: string; targets?: readonly string[] }
  names: OriginNames
  onRemoveCondition: (conditionId: string) => void
  onRemoveEffect?: (effectId: string) => void
  onStopConcentrating: () => void
  /** Saves that damage just called for, answered on the effect's own row. */
  damage?: {
    reminders: readonly DamageReminder[]
    onEnd: (reminder: DamageReminder) => void
    onKeep: (reminder: DamageReminder) => void
  }
}

/**
 * Everything on the creature from this fight. Concentration has one slot of its own, since a
 * creature holds one thing at a time. The rest is one quiet line of chips: a chip opens what it
 * is, why, how it ends and its End button. A save that damage just called for is asked under the
 * line without a tap. `children` join the line after the chips.
 */
export function StatusLine({ children, ...props }: ListProps & { children?: ReactNode }) {
  const focus = useDensity() === 'focus'
  const [open, setOpen] = useState<string>()
  const { names, concentration } = props
  const items = statusEntries(props.conditions, props.appliedEffects).map((entry) => {
    if (entry.kind === 'condition') {
      const held = entry.condition
      const Icon = CONDITION_ICONS[held.condition]
      return {
        id: held.id,
        tone: 'border-amber-500/40 bg-amber-500/10',
        icon: <Icon aria-hidden className="text-amber-600" />,
        label: rules[held.condition].name,
        title: <RuleTerm rule={ruleRef(held.condition)}>{rules[held.condition].name}</RuleTerm>,
        facts: describeDuration(held.duration, names.nameOf),
        text: undefined,
        endLabel: `End ${rules[held.condition].name}`,
        onEnd: () => props.onRemoveCondition(held.id),
        explain: [held.condition],
      }
    }
    const { effect } = entry
    const name = originName(effect.origin, names)
    return {
      id: effect.id,
      tone: 'border-sky-500/40 bg-sky-500/10',
      icon: <Sparkles aria-hidden className="text-sky-600" />,
      label: [name, ...entry.conditions.map((held) => rules[held.condition].name)].join(' · '),
      title: (
        <>
          {name}
          {entry.conditions.map((held) => (
            <span key={held.id} className="text-muted-foreground font-normal">
              {' · '}
              <RuleTerm rule={ruleRef(held.condition)}>{rules[held.condition].name}</RuleTerm>
            </span>
          ))}
        </>
      ),
      facts: [
        whoFrom(effect.origin, names),
        describeDuration(effect.duration, names.nameOf),
        effect.onDamage ? onDamageWords(effect.onDamage) : '',
      ]
        .filter(Boolean)
        .join(' · '),
      text: effect.text,
      endLabel: `End ${name}`,
      onEnd: props.onRemoveEffect ? () => props.onRemoveEffect!(effect.id) : undefined,
      explain: entry.conditions.map((held) => held.condition),
    }
  })
  const shown = items.find((item) => item.id === open)
  const reminders = props.damage?.reminders ?? []
  if (items.length === 0 && !concentration && !children) return null
  return (
    <div className="grid gap-2">
      {concentration ? (
        <div
          className={cn(
            'flex items-center justify-between gap-3 rounded-xl border border-violet-500/40 bg-violet-500/10 pl-3',
            focus ? 'min-h-12 pr-1' : 'min-h-9 pr-0.5',
          )}
        >
          <p className={cn('min-w-0 py-1 font-medium', focus ? 'text-base' : 'text-sm')}>
            <Brain aria-hidden className="mr-2 inline size-5 text-violet-600" />
            <RuleTerm rule={ruleRef('concentration')}>Concentrating</RuleTerm>
            {concentration.on ? ` on ${concentration.on}` : ''}
            <span className="text-muted-foreground font-normal">
              {concentration.targets?.length ? `, held on ${listNames(concentration.targets)}` : ''}
            </span>
          </p>
          <ActionButton
            tone="ghost"
            aria-label="Stop concentrating"
            onClick={props.onStopConcentrating}
            className={focus ? 'h-10' : 'h-8'}
          >
            <X aria-hidden /> Stop
          </ActionButton>
        </div>
      ) : null}
      {items.length || children ? (
        <div className="flex flex-wrap items-center gap-2">
          {items.map((item) => (
            <HoverPreview
              key={item.id}
              interactive
              content={
                <span className="grid max-w-sm gap-2">
                  <span>
                    <strong>{item.label}</strong>
                    {item.facts ? (
                      <span className="text-muted-foreground block text-sm">{item.facts}</span>
                    ) : null}
                    {item.text ? <span className="block text-sm">{item.text}</span> : null}
                  </span>
                  {item.explain.map((condition) => (
                    <RuleExplanation key={condition} rule={ruleRef(condition)} />
                  ))}
                </span>
              }
            >
              <button
                type="button"
                aria-expanded={item.id === open}
                onClick={() => setOpen((current) => (current === item.id ? undefined : item.id))}
                className={cn(
                  'focus-visible:ring-ring/50 inline-flex items-center gap-2 rounded-xl border px-3 font-medium outline-none focus-visible:ring-3',
                  focus ? 'h-12 text-base [&_svg]:size-5' : 'h-9 text-sm [&_svg]:size-4',
                  item.tone,
                  item.id === open && 'ring-ring/60 ring-4',
                )}
              >
                {item.icon}
                {item.label}
              </button>
            </HoverPreview>
          ))}
          {children}
        </div>
      ) : null}
      {shown ? (
        <div
          className={cn('flex items-start justify-between gap-3 rounded-xl border p-3', shown.tone)}
        >
          <div className="min-w-0">
            <p className={cn('font-semibold', focus && 'text-lg')}>{shown.title}</p>
            <p className="text-muted-foreground text-sm">{shown.facts}</p>
            {shown.text ? <p className="text-sm">{shown.text}</p> : null}
            {shown.explain.map((condition) => (
              <div key={condition} className="border-border/60 mt-2 border-t pt-2">
                <RuleExplanation rule={ruleRef(condition)} />
              </div>
            ))}
          </div>
          {shown.onEnd ? (
            <ActionButton aria-label={shown.endLabel} onClick={shown.onEnd} className="shrink-0">
              <X aria-hidden /> End
            </ActionButton>
          ) : null}
        </div>
      ) : null}
      {props.damage
        ? reminders.map((asked) => (
            <div
              key={asked.effect.id}
              role="alert"
              className="flex flex-wrap items-center gap-2 rounded-xl border border-sky-500/70 bg-sky-500/10 p-3"
            >
              <span className={cn('flex-1 font-medium', focus && 'text-lg')}>
                {originName(asked.effect.origin, names)}: took damage,{' '}
                {asked.onDamage.kind === 'save'
                  ? `DC ${asked.onDamage.dc} ${rules[asked.onDamage.ability].name} save`
                  : 'this ends'}
              </span>
              <ActionButton tone="heal" onClick={() => props.damage!.onEnd(asked)}>
                <Check aria-hidden /> {asked.onDamage.kind === 'save' ? 'Saved: end it' : 'End it'}
              </ActionButton>
              <ActionButton onClick={() => props.damage!.onKeep(asked)}>
                {asked.onDamage.kind === 'save' ? 'Failed' : 'Keep it'}
              </ActionButton>
            </div>
          ))
        : null}
    </div>
  )
}
