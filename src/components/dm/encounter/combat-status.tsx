import { Brain, Castle, Check, HeartCrack, HeartPulse, Plus, Skull, X } from 'lucide-react'
import { useState } from 'react'

import type { Effect } from '#/definitions/effect'
import type { ActiveCondition, DeathSaves, DurationChoice } from '#/lib/encounter-combat'
import type { Condition } from '#/lib/rules'
import { cn } from '#/lib/utils'

import { ConditionMarkers, EffectMarkers } from './condition-markers'
import { ConditionPicker } from './condition-picker'
import { useDensity } from './density'
import { ActionButton } from './icon-button'

export type CombatState = {
  conditions: readonly ActiveCondition[]
  concentration?: { on: string }
  dying?: DeathSaves
  stable?: boolean
  dead?: boolean
  /** A creature with tracked HP at 0. */
  down: boolean
  /** Current HP, when known. */
  hp?: number
}

export type CombatStatusActions = {
  addCondition: (condition: Condition, duration: DurationChoice) => void
  removeCondition: (conditionId: string) => void
  setConcentration: (on: string | undefined) => void
  startDying: () => void
  deathSave: (result: 'success' | 'failure', count?: number) => void
  backUp: () => void
  markDead: (dead: boolean) => void
}

/** Conditions, concentration, and what happens at 0 HP, for the selected combatant. */
export function CombatStatus({
  name,
  isPc,
  state,
  combatants,
  activeId,
  nameOf,
  actions,
  lair,
  effects = [],
}: {
  name: string
  isPc: boolean
  state: CombatState
  combatants: readonly { id: string; name: string }[]
  activeId: string | undefined
  nameOf: (id: string) => string
  actions: CombatStatusActions
  /** For creatures with lair actions: whether this fight is in its lair. */
  lair?: { inLair: boolean; onChange: (inLair: boolean) => void }
  /** Campaign effects in force, shown read-only beside the fight's conditions. */
  effects?: readonly Pick<Effect, 'name' | 'icon' | 'rules'>[]
}) {
  const focus = useDensity() === 'focus'
  const [picking, setPicking] = useState(false)
  const [concentrationOn, setConcentrationOn] = useState('')

  return (
    <section aria-label="Conditions and status" className="grid gap-2">
      <ZeroHp name={name} isPc={isPc} state={state} actions={actions} />
      <EffectMarkers effects={effects} />

      <div className="flex flex-wrap items-center gap-2">
        <ConditionMarkers
          conditions={state.conditions}
          concentration={state.concentration}
          nameOf={nameOf}
          onRemove={actions.removeCondition}
        />
        {lair ? (
          <ActionButton
            aria-pressed={lair.inLair}
            onClick={() => lair.onChange(!lair.inLair)}
            className={cn(lair.inLair && 'border-amber-500/60 bg-amber-500/10')}
          >
            <Castle aria-hidden /> {lair.inLair ? 'In its lair' : 'Not in its lair'}
          </ActionButton>
        ) : null}
        <ActionButton
          aria-expanded={picking}
          onClick={() => setPicking((value) => !value)}
          className={cn(picking && 'bg-muted')}
        >
          <Plus aria-hidden /> Condition
        </ActionButton>
        {state.concentration ? (
          <ActionButton onClick={() => actions.setConcentration(undefined)}>
            <X aria-hidden /> Stop concentrating
          </ActionButton>
        ) : (
          <form
            className="flex items-center gap-1"
            onSubmit={(event) => {
              event.preventDefault()
              actions.setConcentration(concentrationOn.trim())
              setConcentrationOn('')
            }}
          >
            <label className="sr-only" htmlFor={`concentration-${name}`}>
              Concentrating on
            </label>
            <input
              id={`concentration-${name}`}
              placeholder="Spell (optional)"
              value={concentrationOn}
              onChange={(event) => setConcentrationOn(event.currentTarget.value)}
              className={cn(
                'border-input bg-background rounded-lg border px-2',
                focus ? 'h-12 w-44 text-base' : 'h-9 w-36 text-sm',
              )}
            />
            <ActionButton type="submit">
              <Brain aria-hidden /> Concentrating
            </ActionButton>
          </form>
        )}
      </div>

      {picking ? (
        <ConditionPicker
          combatants={combatants}
          defaultTurnOf={activeId}
          onApply={(condition, duration) => {
            actions.addCondition(condition, duration)
            setPicking(false)
          }}
        />
      ) : null}
    </section>
  )
}

/** Death saves for a PC at 0 HP; down or dead for anyone else. */
function ZeroHp({
  name,
  isPc,
  state,
  actions,
}: {
  name: string
  isPc: boolean
  state: CombatState
  actions: CombatStatusActions
}) {
  const focus = useDensity() === 'focus'

  if (state.dead)
    return (
      <Banner tone="dead" icon={<Skull aria-hidden />} title={`${name} is dead`}>
        <ActionButton onClick={() => actions.markDead(false)}>Undo</ActionButton>
      </Banner>
    )

  if (!isPc && state.down)
    return (
      <Banner
        tone="dead"
        icon={<HeartCrack aria-hidden />}
        title={`${name} is down at 0 HP`}
        note="Skipped in turn order. Heal it to bring it back."
      >
        <ActionButton onClick={() => actions.markDead(true)}>
          <Skull aria-hidden /> Dead
        </ActionButton>
      </Banner>
    )

  if (!isPc) return null

  if (state.stable)
    return (
      <Banner
        tone="stable"
        icon={<HeartPulse aria-hidden />}
        title={`${name} is stable at 0 HP`}
        note="Unconscious, but no more death saves. Regains 1 HP after 1d4 hours."
      >
        <ActionButton onClick={actions.backUp}>Back up</ActionButton>
      </Banner>
    )

  // A PC with HP above 0 isn't dying; the button appears at 0 HP or when HP isn't tracked.
  if (!state.dying && state.hp !== undefined && state.hp > 0) return null

  if (!state.dying)
    return (
      <div>
        <ActionButton onClick={actions.startDying}>
          <HeartCrack aria-hidden /> Down at 0 HP
        </ActionButton>
      </div>
    )

  const pips = (count: number, filled: string) =>
    [0, 1, 2].map((index) => (
      <span
        key={index}
        className={cn(
          'inline-block rounded-full border-2',
          focus ? 'size-5' : 'size-3.5',
          index < count ? filled : 'border-border',
        )}
      />
    ))

  return (
    <Banner
      tone="dying"
      icon={<HeartCrack aria-hidden />}
      title={`${name} is dying`}
      note="Roll d20 at the start of its turn: 10+ succeeds, 1 is two failures, 20 regains 1 HP. Damage at 0 HP is a failure; a melee hit from within 5 ft. is a critical, so two. Any healing brings it back up."
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1" aria-label={`${state.dying.successes} successes`}>
          <Check aria-hidden className="size-4 text-emerald-600" />
          {pips(state.dying.successes, 'border-emerald-600 bg-emerald-600')}
        </span>
        <span className="flex items-center gap-1" aria-label={`${state.dying.failures} failures`}>
          <X aria-hidden className="size-4 text-red-600" />
          {pips(state.dying.failures, 'border-red-600 bg-red-600')}
        </span>
        <ActionButton tone="heal" onClick={() => actions.deathSave('success')}>
          Success
        </ActionButton>
        <ActionButton tone="danger" onClick={() => actions.deathSave('failure')}>
          Failure
        </ActionButton>
        <ActionButton tone="danger" onClick={() => actions.deathSave('failure', 2)}>
          Two failures
        </ActionButton>
        <ActionButton onClick={actions.backUp}>Back up</ActionButton>
      </div>
    </Banner>
  )
}

const BANNER_TONE = {
  dying: 'border-red-500/50 bg-red-500/10',
  dead: 'border-border bg-muted/60',
  stable: 'border-emerald-500/50 bg-emerald-500/10',
} as const

function Banner({
  tone,
  icon,
  title,
  note,
  children,
}: {
  tone: keyof typeof BANNER_TONE
  icon: React.ReactNode
  title: string
  note?: string
  children?: React.ReactNode
}) {
  const focus = useDensity() === 'focus'
  return (
    <output className={cn('grid gap-2 rounded-xl border p-3', BANNER_TONE[tone], focus && 'p-4')}>
      <p
        className={cn(
          'flex items-center gap-2 font-semibold',
          focus ? 'text-lg [&_svg]:size-6' : '[&_svg]:size-5',
        )}
      >
        {icon} {title}
      </p>
      {note ? <p className="text-muted-foreground text-sm">{note}</p> : null}
      {children}
    </output>
  )
}
