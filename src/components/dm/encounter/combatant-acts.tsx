import {
  Brain,
  CircleDot,
  FlaskConical,
  HeartPlus,
  Sword,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

import { parseAmount } from '#/lib/encounter-focus'
import { cn } from '#/lib/utils'

import {
  EndsConcentration,
  ItemEffectPicker,
  SpellEffect,
  type ApplyEffectActions,
} from './apply-effect'
import type { CombatStatusActions } from './combat-status'
import { ConditionPicker } from './condition-picker'
import { ActionButton } from './icon-button'

/** One thing the DM does from the selected combatant's panel. */
type Act = 'damage' | 'heal' | 'condition' | 'spell' | 'item'

const ACTS: Record<
  Act,
  { label: string; short?: string; icon: LucideIcon; tone?: 'danger' | 'heal' }
> = {
  damage: { label: 'Damage', icon: Sword, tone: 'danger' },
  heal: { label: 'Heal', icon: HeartPlus, tone: 'heal' },
  condition: { label: 'Condition', icon: CircleDot },
  spell: { label: 'Cast a spell', short: 'Cast spell', icon: Wand2 },
  item: { label: 'Use an item', short: 'Use item', icon: FlaskConical },
}

export type CombatantActsProps = {
  combatant: { id: string; name: string }
  /** Damage and healing, when its hit points are tracked. */
  onAdjustHp?: (delta: number) => void
  /** Conditions and concentration started by hand. */
  status?: Pick<CombatStatusActions, 'addCondition' | 'setConcentration'>
  /** Its spell save DC, when its stat block says. */
  casterDc?: number
  /** Spells it casts and items it uses, applied to whoever they land on. */
  effects?: ApplyEffectActions
}

function availableActs(props: CombatantActsProps, withHp: boolean): Act[] {
  return [
    ...(withHp && props.onAdjustHp ? (['damage', 'heal'] as const) : []),
    ...(props.status && props.effects ? (['condition'] as const) : []),
    ...(props.effects ? (['spell', 'item'] as const) : []),
  ]
}

/** The picker for one act; `onDone` closes it once the act is applied. */
function ActBody({
  act,
  onDone,
  combatant,
  onAdjustHp,
  status,
  casterDc,
  effects,
}: CombatantActsProps & { act: Act; onDone: () => void }) {
  if (act === 'damage' || act === 'heal')
    return onAdjustHp ? (
      <AmountForm
        key={act}
        kind={act}
        name={combatant.name}
        onApply={(amount) => {
          onAdjustHp(act === 'damage' ? -amount : amount)
          onDone()
        }}
      />
    ) : null
  if (!effects) return null
  if (act === 'spell')
    return (
      <SpellEffect caster={combatant.id} casterDc={casterDc} actions={effects} onDone={onDone} />
    )
  if (act === 'item')
    return <ItemEffectPicker user={combatant.id} actions={effects} onDone={onDone} />
  return status ? (
    <div className="grid gap-2">
      <ConditionPicker
        combatants={effects.combatants}
        defaultTurnOf={effects.activeId}
        onApply={(condition, duration) => {
          status.addCondition(condition, duration)
          onDone()
        }}
      />
      <ConcentrationForm
        name={combatant.name}
        held={effects.holding(combatant.id)}
        onStart={(on) => {
          status.setConcentration(on)
          onDone()
        }}
      />
    </div>
  ) : null
}

/** How much damage or healing: type the number, then one big button says what it will do. */
function AmountForm({
  kind,
  name,
  onApply,
}: {
  kind: 'damage' | 'heal'
  name: string
  onApply: (amount: number) => void
}) {
  const id = useId()
  const [amount, setAmount] = useState('')
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => input.current?.focus(), [])
  const parsed = parseAmount(amount)
  const Icon = ACTS[kind].icon
  return (
    <form
      className="border-border bg-muted/30 flex flex-wrap items-center gap-2 rounded-xl border p-3"
      onSubmit={(event) => {
        event.preventDefault()
        if (parsed !== undefined) onApply(parsed)
      }}
    >
      <label htmlFor={id} className="sr-only">
        {kind === 'damage' ? 'Damage' : 'Healing'} amount for {name}
      </label>
      <input
        id={id}
        ref={input}
        inputMode="numeric"
        autoComplete="off"
        placeholder="How much?"
        value={amount}
        onChange={(event) => setAmount(event.currentTarget.value)}
        className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/30 h-14 w-40 rounded-xl border-2 px-3 text-center text-xl font-semibold tabular-nums outline-none focus-visible:ring-3"
      />
      <ActionButton type="submit" size="lg" tone={ACTS[kind].tone} disabled={parsed === undefined}>
        <Icon aria-hidden />
        {kind === 'damage'
          ? `Deal ${parsed ?? ''} damage`.replace('  ', ' ')
          : `Heal ${parsed ?? ''}`.trim()}
      </ActionButton>
    </form>
  )
}

/** Start concentrating by hand, on something cast outside the tracker. */
function ConcentrationForm({
  name,
  held,
  onStart,
}: {
  name: string
  held: ReturnType<ApplyEffectActions['holding']>
  onStart: (on: string) => void
}) {
  const id = useId()
  const [on, setOn] = useState('')
  return (
    <form
      className="border-border bg-muted/30 grid gap-2 rounded-xl border p-3"
      onSubmit={(event) => {
        event.preventDefault()
        onStart(on.trim())
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={id} className="font-medium">
          Or it starts concentrating on
        </label>
        <input
          id={id}
          autoComplete="off"
          placeholder="Spell (optional)"
          value={on}
          onChange={(event) => setOn(event.currentTarget.value)}
          className="border-input bg-background h-12 w-56 rounded-lg border px-2 text-base"
        />
        <ActionButton type="submit">
          <Brain aria-hidden /> Start
        </ActionButton>
      </div>
      {held ? <EndsConcentration held={held} holder={name} starting="Starting this" /> : null}
    </form>
  )
}

/** Option "Action bar": every action starts from one row; the chosen one opens under it. */
export function ActionBar(props: CombatantActsProps) {
  const [open, setOpen] = useState<Act>()
  const acts = availableActs(props, true)
  if (acts.length === 0) return null
  return (
    <div className="grid gap-2">
      <div
        role="toolbar"
        aria-label={`What happens to or from ${props.combatant.name}`}
        className="grid grid-cols-5 gap-2"
      >
        {acts.map((act) => {
          const { label, short, icon: Icon, tone } = ACTS[act]
          return (
            <ActionButton
              key={act}
              size="lg"
              tone={tone}
              aria-label={label}
              aria-expanded={open === act}
              onClick={() => setOpen((current) => (current === act ? undefined : act))}
              // Icon over word: five tall targets fit one row even in the narrow panel.
              className={cn(
                'h-[4.5rem] min-w-0 flex-col gap-1 px-1 text-base',
                open === act && 'ring-ring/60 ring-4',
              )}
            >
              <Icon aria-hidden /> {short ?? label}
            </ActionButton>
          )
        })}
      </div>
      {open ? <ActBody {...props} key={open} act={open} onDone={() => setOpen(undefined)} /> : null}
    </div>
  )
}
