import { Sparkles, Target, TriangleAlert, Wand2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Avatar } from '#/components/ui/avatar'
import { equipmentBooks, equipmentNames } from '#/data/generated/equipment-names'
import { magicItemBooks, magicItemNames } from '#/data/generated/magic-item-names'
import { spellBooks, spellNames } from '#/data/generated/spell-names'
import type { EntityRef } from '#/definitions/kind'
import type { Ability } from '#/definitions/stat-block'
import { withStages } from '#/definitions/status-effect'
import { CONDITION_ICONS } from '#/lib/condition-icons'
import type { DerivedStatBlock } from '#/lib/dm-ability-text'
import {
  abilityLeavesEffect,
  suggestFromAbility,
  suggestFromAbilityEffect,
  suggestFromSpell,
  suggestFromItemEffect,
  suggestFromSpellEffect,
  type EffectSuggestion,
} from '#/lib/effect-suggestion'
import {
  EACH_TARGET,
  type AbilityId,
  type DurationChoice,
  type EffectApplication,
  type EffectOrigin,
  type OnDamage,
} from '#/lib/encounter-combat'
import { loadEquipment } from '#/lib/library-equipment'
import { loadMagicItem } from '#/lib/library-magic-items'
import { loadSpell } from '#/lib/load-spell'
import { ABILITY_KEYS, CONDITION_KEYS, plainRuleText, rules, type Condition } from '#/lib/rules'
import { cn } from '#/lib/utils'

import { useDurationDraft } from './condition-picker'
import { useDensity } from './density'
import { ActionButton } from './icon-button'
import { listNames } from './status-layout'

type Combatant = {
  id: string
  name: string
  /** Player characters list first among targets. */
  isPc?: boolean
  avatar?: string
}

/** What the encounter page does with an applied effect. */
export type ApplyEffectActions = {
  combatants: readonly Combatant[]
  activeId: string | undefined
  /** Apply to each target; `concentrate` also marks the caster as concentrating on the spell. */
  apply: (
    targets: readonly string[],
    application: EffectApplication,
    concentrate?: { caster: string; on: string; spell: EntityRef<'spell'> },
  ) => void
  /**
   * What a combatant concentrates on now, and who that spell's effects are on. A creature holds one
   * thing at a time, so starting another ends this.
   */
  holding: (combatant: string) => HeldConcentration | undefined
}

export type HeldConcentration = { on: string; targets: readonly string[] }

/** Said before concentration switches: "Casting this ends Hideous Laughter on Cassian Veyl." */
export function EndsConcentration({
  held,
  holder,
  starting = 'Casting this',
}: {
  held: HeldConcentration
  /** Who is concentrating. */
  holder: string
  starting?: string
}) {
  const focus = useDensity() === 'focus'
  return (
    <p
      role="alert"
      className={cn(
        'flex items-start gap-2 rounded-lg border border-amber-500/60 bg-amber-500/15 px-3 py-2 font-medium',
        focus ? 'text-base' : 'text-sm',
      )}
    >
      <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-600" />
      <span>
        {starting} ends {held.on || `what ${holder} is concentrating on`}
        {held.targets.length ? ` on ${listNames(held.targets)}` : ''}.{' '}
        <span className="text-muted-foreground font-normal">
          {holder} concentrates on one thing at a time.
        </span>
      </span>
    </p>
  )
}

const toggle = <T,>(list: readonly T[], value: T) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value]

const noTargets: readonly string[] = []

/** Player characters first, then everyone else, each in initiative order. */
const pcsFirst = (combatants: readonly Combatant[]) => [
  ...combatants.filter(({ isPc }) => isPc),
  ...combatants.filter(({ isPc }) => !isPc),
]

const chip = (focus: boolean, pressed: boolean) =>
  cn(
    'inline-flex items-center gap-1.5 rounded-lg border px-2.5 font-medium capitalize',
    focus ? 'h-11 text-base [&_svg]:size-5' : 'h-8 text-sm [&_svg]:size-4',
    pressed
      ? 'border-amber-500/60 bg-amber-500/15 text-amber-900 dark:text-amber-200'
      : 'border-border bg-card hover:bg-muted',
  )

/**
 * Check and apply a spell or ability's effect: who it lands on, its conditions, what else it does,
 * and how long it lasts. Everything starts from what the rules text says and stays editable.
 */
/** "1 minute (10 rounds)", "until the end of each target’s next turn", "save ends: DC 13 Wisdom". */
function describeChoice(choice: DurationChoice, nameOf: (id: string) => string) {
  switch (choice.kind) {
    case 'until-removed':
      return 'until removed'
    case 'end-of-turn':
      return `until the end of ${nameOf(choice.of)}’s next turn`
    case 'start-of-turn':
      return `until the start of ${nameOf(choice.of)}’s next turn`
    case 'rounds':
      return choice.rounds % 10 === 0
        ? `${choice.rounds / 10} minute${choice.rounds === 10 ? '' : 's'}`
        : `${choice.rounds} round${choice.rounds === 1 ? '' : 's'}`
    case 'save-ends':
      return `save ends: DC ${choice.dc} ${rules[choice.ability].name}`
  }
}

function EffectForm({
  title,
  origin,
  suggestion,
  actions,
  initialTargets = noTargets,
  caster,
  spell,
  known = false,
  maxTargets,
  onDone,
}: {
  title: string
  origin: EffectOrigin
  suggestion: EffectSuggestion
  /**
   * The effect is the source's own data, not a guess: it applies as it is, asking only on whom.
   * Its details can still be opened and changed.
   */
  known?: boolean
  /** How many creatures it can land on, when the source says: one target, or two within range. */
  maxTargets?: number
  actions: ApplyEffectActions
  initialTargets?: readonly string[]
  caster?: string
  /** The spell, when the caster may be concentrating on it. */
  spell?: { ref: EntityRef<'spell'>; name: string }
  onDone: () => void
}) {
  const focus = useDensity() === 'focus'
  const [targets, setTargets] = useState<readonly string[]>(initialTargets)
  const [conditions, setConditions] = useState<readonly Condition[]>(suggestion.conditions)
  const [allConditions, setAllConditions] = useState(false)
  const [text, setText] = useState(suggestion.text ?? '')
  const [concentrate, setConcentrate] = useState(Boolean(suggestion.concentration && caster))
  const [onDamage, setOnDamage] = useState<OnDamage['kind'] | 'nothing'>(
    suggestion.onDamage?.kind ?? 'nothing',
  )
  const [damageDc, setDamageDc] = useState(
    suggestion.onDamage?.kind === 'save' ? suggestion.onDamage.dc : 13,
  )
  const [damageAbility, setDamageAbility] = useState<AbilityId>(
    suggestion.onDamage?.kind === 'save' ? suggestion.onDamage.ability : 'wis',
  )
  const duration = useDurationDraft({
    combatants: actions.combatants,
    initial: suggestion.duration,
    defaultTurnOf: caster ?? actions.activeId,
    eachTarget: true,
  })
  const shown = allConditions
    ? CONDITION_KEYS
    : CONDITION_KEYS.filter(
        (key) =>
          suggestion.conditions.includes(key) ||
          suggestion.candidates.includes(key) ||
          conditions.includes(key),
      )
  const legend = 'text-muted-foreground mb-1 text-xs font-semibold uppercase'
  const [editing, setEditing] = useState(!known)
  const nameOf = (id: string) =>
    id === EACH_TARGET ? 'each target' : (actions.combatants.find((c) => c.id === id)?.name ?? id)
  const summary = [
    describeChoice(suggestion.duration, nameOf),
    suggestion.onDamage
      ? suggestion.onDamage.kind === 'save'
        ? `damage: DC ${suggestion.onDamage.dc} ${rules[suggestion.onDamage.ability].name} save ends it`
        : 'damage ends it'
      : '',
    suggestion.successes ? `${suggestion.successes} saves to end it` : '',
    suggestion.becomes
      ? `${suggestion.becomes.failures === 1 ? 'a failed save' : `${suggestion.becomes.failures} failed saves`}: ${suggestion.becomes.name}`
      : '',
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <form
      aria-label={`Apply ${title}`}
      className="border-border bg-card grid gap-3 rounded-xl border p-3"
      onSubmit={(event) => {
        event.preventDefault()
        if (targets.length === 0) return
        actions.apply(
          targets,
          {
            origin,
            conditions,
            text: text.trim() || undefined,
            duration: duration.choice(),
            ...(onDamage === 'save'
              ? { onDamage: { kind: 'save', dc: damageDc, ability: damageAbility } }
              : onDamage === 'ends'
                ? { onDamage: { kind: 'ends' } }
                : {}),
            ...(suggestion.successes ? { successes: suggestion.successes } : {}),
            ...(suggestion.becomes ? { becomes: suggestion.becomes } : {}),
            ...(suggestion.outlastsConcentration ? { outlastsConcentration: true } : {}),
          },
          concentrate && caster && spell ? { caster, on: spell.name, spell: spell.ref } : undefined,
        )
        onDone()
      }}
    >
      <p className={cn('font-semibold', focus && 'text-lg')}>
        <Sparkles aria-hidden className="mr-1.5 inline size-4 text-amber-600" />
        {title}
      </p>

      <fieldset className="m-0 grid min-w-0 gap-1 border-0 p-0">
        <legend className={legend}>
          On whom
          {maxTargets ? ` · ${maxTargets === 1 ? 'one creature' : `up to ${maxTargets}`}` : ''}
        </legend>
        <div className="flex flex-wrap gap-1">
          {pcsFirst(actions.combatants).map((combatant) => (
            <button
              key={combatant.id}
              type="button"
              aria-pressed={targets.includes(combatant.id)}
              onClick={() =>
                setTargets((current) =>
                  // One target: picking another moves it. Up to n: the oldest pick gives way.
                  current.includes(combatant.id) || !maxTargets || current.length < maxTargets
                    ? toggle(current, combatant.id)
                    : [...current.slice(current.length - maxTargets + 1), combatant.id],
                )
              }
              className={cn(
                chip(focus, targets.includes(combatant.id)),
                'normal-case',
                combatant.avatar && 'pl-1',
              )}
            >
              {combatant.avatar ? (
                <Avatar
                  src={combatant.avatar}
                  sizes="32px"
                  maxWidth={64}
                  className={focus ? 'size-8' : 'size-6'}
                />
              ) : null}
              {combatant.name}
            </button>
          ))}
        </div>
      </fieldset>

      {editing ? (
        <>
          <fieldset className="m-0 grid min-w-0 gap-1 border-0 p-0">
            <legend className={legend}>Conditions</legend>
            <div className="flex flex-wrap gap-1">
              {shown.map((condition) => {
                const Icon = CONDITION_ICONS[condition]
                return (
                  <button
                    key={condition}
                    type="button"
                    title={plainRuleText(rules[condition].summary)}
                    aria-pressed={conditions.includes(condition)}
                    onClick={() => setConditions((current) => toggle(current, condition))}
                    className={chip(focus, conditions.includes(condition))}
                  >
                    <Icon aria-hidden />
                    {rules[condition].name}
                  </button>
                )
              })}
              <button
                type="button"
                aria-expanded={allConditions}
                onClick={() => setAllConditions((value) => !value)}
                className="text-muted-foreground px-2 text-sm underline-offset-4 hover:underline"
              >
                {allConditions ? 'Fewer' : shown.length ? 'Other conditions' : 'Add a condition'}
              </button>
            </div>
          </fieldset>

          <label className="grid gap-1">
            <span className={legend}>What else it does</span>
            <textarea
              value={text}
              rows={text.length > 120 ? 3 : 2}
              placeholder="e.g. Its speed is 0. It can’t regain hit points."
              onChange={(event) => setText(event.currentTarget.value)}
              className={cn(
                'border-input bg-background rounded-lg border px-2 py-1.5',
                focus ? 'text-base' : 'text-sm',
              )}
            />
          </label>

          {duration.fields}

          <fieldset className="m-0 grid min-w-0 gap-1 border-0 p-0">
            <legend className={legend}>When it takes damage</legend>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <select
                aria-label="When it takes damage"
                value={onDamage}
                onChange={(event) =>
                  setOnDamage(event.currentTarget.value as OnDamage['kind'] | 'nothing')
                }
                className={cn(
                  'border-input bg-background rounded-lg border px-2',
                  focus ? 'h-11 text-base' : 'h-8',
                )}
              >
                <option value="nothing">Nothing changes</option>
                <option value="save">It repeats a save</option>
                <option value="ends">The effect ends</option>
              </select>
              {onDamage === 'save' ? (
                <>
                  <span>DC</span>
                  <input
                    aria-label="Save DC when it takes damage"
                    type="number"
                    min={1}
                    value={damageDc}
                    onChange={(event) =>
                      setDamageDc(Math.max(1, event.currentTarget.valueAsNumber || 1))
                    }
                    className={cn(
                      'border-input bg-background w-16 rounded-lg border px-2 text-center',
                      focus ? 'h-11 text-base' : 'h-8',
                    )}
                  />
                  <select
                    aria-label="Saving throw ability when it takes damage"
                    value={damageAbility}
                    onChange={(event) => setDamageAbility(event.currentTarget.value as AbilityId)}
                    className={cn(
                      'border-input bg-background rounded-lg border px-2',
                      focus ? 'h-11 text-base' : 'h-8',
                    )}
                  >
                    {ABILITY_KEYS.map((id) => (
                      <option key={id} value={id}>
                        {rules[id].name}
                      </option>
                    ))}
                  </select>
                </>
              ) : null}
            </div>
          </fieldset>
        </>
      ) : (
        <div className="bg-muted/40 grid gap-1 rounded-lg px-3 py-2">
          <p className={cn('font-medium', focus && 'text-lg')}>
            {conditions.length
              ? conditions.map((condition) => rules[condition].name).join(' and ')
              : 'No condition'}
            <span className="text-muted-foreground font-normal"> · {summary}</span>
          </p>
          {text ? <p className="text-sm">{text}</p> : null}
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-muted-foreground justify-self-start text-sm underline-offset-4 hover:underline"
          >
            Change details
          </button>
        </div>
      )}

      {suggestion.concentration && caster ? (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={concentrate}
            onChange={(event) => setConcentrate(event.currentTarget.checked)}
          />
          The caster is concentrating on {spell?.name}
        </label>
      ) : null}
      {concentrate && caster && actions.holding(caster) ? (
        <EndsConcentration held={actions.holding(caster)!} holder={nameOf(caster)} />
      ) : null}

      <div className="flex flex-wrap gap-2">
        <ActionButton
          tone="primary"
          type="submit"
          disabled={targets.length === 0 || (conditions.length === 0 && !text.trim())}
        >
          <Wand2 aria-hidden />
          {targets.length > 1 ? `Apply to ${targets.length}` : 'Apply'}
        </ActionButton>
        <ActionButton type="button" onClick={onDone}>
          Cancel
        </ActionButton>
      </div>
    </form>
  )
}

/**
 * Under an open ability: apply what it does to whoever it hits. Effects the stat block defines
 * are applied as written, one button each; otherwise the text gives a first guess.
 */
export function AbilityEffect({
  ability,
  block,
  source,
  sourceName,
  actions,
}: {
  ability: Ability
  block: DerivedStatBlock
  source: string
  sourceName: string
  actions: ApplyEffectActions
}) {
  const [open, setOpen] = useState<string>()
  const choices = useMemo(
    () =>
      ability.effects?.length
        ? withStages(ability.effects).map(({ effect }) => ({
            key: effect.key,
            label: effect.name,
            suggestion: suggestFromAbilityEffect(effect, ability, block, source),
          }))
        : [{ key: '', label: 'effect', suggestion: suggestFromAbility(ability, block, source) }],
    [ability, block, source],
  )
  // Without recorded effects, offer the button only when the text puts a condition on someone:
  // a one-off like being pushed or forced to move leaves nothing to track.
  if (
    // `[]`: checked, it leaves nothing lasting.
    ability.effects?.length === 0 ||
    (!ability.effects &&
      (!abilityLeavesEffect(ability) || choices[0]!.suggestion.conditions.length === 0))
  )
    return null
  const chosen = choices.find((choice) => choice.key === open)
  if (!chosen)
    return (
      <div className="flex flex-wrap gap-2">
        {choices.map((choice) => (
          <ActionButton key={choice.key} onClick={() => setOpen(choice.key)}>
            <Target aria-hidden /> Put {choice.key ? choice.label : 'its effect'} on a target
          </ActionButton>
        ))}
      </div>
    )
  return (
    <EffectForm
      key={`${ability.key}-${chosen.key}`}
      title={
        chosen.key
          ? `${chosen.label}, from ${sourceName}’s ${ability.name}`
          : `${sourceName}’s ${ability.name}`
      }
      origin={{
        kind: 'ability',
        combatant: source,
        ability: ability.key,
        ...(chosen.key ? { effect: chosen.key } : {}),
      }}
      suggestion={chosen.suggestion}
      known={Boolean(chosen.key)}
      maxTargets={
        ability.save && 'creatures' in ability.save.target
          ? ability.save.target.creatures
          : ability.attack && !ability.save
            ? 1
            : undefined
      }
      actions={actions}
      onDone={() => setOpen(undefined)}
    />
  )
}

/** One entry per spell name, preferring the SRD 5.2.1 printing where several books have it. */
const spellChoices = (() => {
  const byName = new Map<string, string>()
  for (const [key, name] of Object.entries(spellNames)) {
    const current = byName.get(name)
    if (!current || (spellBooks[key] === 'srd-5-2-1' && spellBooks[current] !== 'srd-5-2-1'))
      byName.set(name, key)
  }
  return [...byName]
    .map(([name, key]) => ({ name, key }))
    .toSorted((a, b) => a.name.localeCompare(b.name))
})()

/**
 * A spell's effect on this combatant: say who cast it and its save DC, find the spell, then check
 * and apply what it does. The form is filled once, when the spell is picked; going back to the
 * search picks again with a new caster or DC.
 */
export function SpellEffect({
  target,
  caster: fixedCaster,
  casterDc,
  actions,
  onDone,
}: {
  /** Who it lands on to start with; the DM picks in the form when not given. */
  target?: string
  /** The caster, when the spell is cast from its own panel. */
  caster?: string
  /** That caster's spell save DC, when its stat block says. */
  casterDc?: number
  actions: ApplyEffectActions
  onDone: () => void
}) {
  const focus = useDensity() === 'focus'
  const [query, setQuery] = useState('')
  // Opened to search: the cursor starts in the search box.
  const search = useRef<HTMLInputElement>(null)
  useEffect(() => search.current?.focus(), [])
  const [caster, setCaster] = useState(fixedCaster ?? actions.activeId ?? '')
  // A spell with no effect in the library can still be described by hand.
  const [byHand, setByHand] = useState(false)
  const [dc, setDc] = useState(casterDc ?? 13)
  const [picked, setPicked] = useState<
    | { state: 'loading'; name: string }
    | { state: 'missing'; name: string }
    | {
        state: 'ready'
        name: string
        spell: EntityRef<'spell'>
        /** The spell's own effects, or one first guess from its text. */
        options: { key: string; label: string; suggestion: EffectSuggestion }[]
        chosen?: string
      }
  >()

  const pick = (choice: { key: string; name: string }) => {
    const spell: EntityRef<'spell'> = { ref: 'spell', key: choice.key }
    setByHand(false)
    setPicked({ state: 'loading', name: choice.name })
    void loadSpell(spell).then((loaded) =>
      setPicked((current) =>
        current?.name !== choice.name
          ? current
          : loaded
            ? {
                state: 'ready',
                name: choice.name,
                spell,
                options: loaded.effects?.length
                  ? withStages(loaded.effects).map(({ effect, outlastsConcentration }) => ({
                      key: effect.key,
                      label: effect.name,
                      suggestion: {
                        ...suggestFromSpellEffect(effect, loaded, {
                          caster: caster || undefined,
                          dc,
                        }),
                        ...(outlastsConcentration ? { outlastsConcentration } : {}),
                      },
                    }))
                  : [
                      {
                        key: '',
                        label: choice.name,
                        suggestion: suggestFromSpell(loaded, { caster: caster || undefined, dc }),
                      },
                    ],
                ...(loaded.effects && loaded.effects.length > 1
                  ? {}
                  : { chosen: loaded.effects?.[0]?.key ?? '' }),
              }
            : { state: 'missing', name: choice.name },
      ),
    )
  }

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const starts = spellChoices.filter((spell) => spell.name.toLowerCase().startsWith(q))
    const contains = spellChoices.filter(
      (spell) => !spell.name.toLowerCase().startsWith(q) && spell.name.toLowerCase().includes(q),
    )
    return [...starts, ...contains].slice(0, 8)
  }, [query])

  const control = cn(
    'border-input bg-background rounded-lg border px-2',
    focus ? 'h-11 text-base' : 'h-8 text-sm',
  )
  const casterName = actions.combatants.find(({ id }) => id === caster)?.name

  const option =
    picked?.state === 'ready'
      ? picked.options.find((candidate) => candidate.key === picked.chosen)
      : undefined
  if (picked?.state === 'ready' && !option)
    return (
      <div className="grid gap-2">
        <p className="text-sm">{picked.name} can leave one of these. Which one?</p>
        <div className="flex flex-wrap gap-2">
          {picked.options.map((candidate) => (
            <ActionButton
              key={candidate.key}
              onClick={() => setPicked({ ...picked, chosen: candidate.key })}
            >
              <Sparkles aria-hidden /> {candidate.label}
            </ActionButton>
          ))}
          <ActionButton type="button" onClick={() => setPicked(undefined)}>
            Choose another spell
          </ActionButton>
        </div>
      </div>
    )
  if (picked?.state === 'ready' && option && !option.key && !byHand)
    return (
      <div className="border-border bg-muted/30 grid gap-2 rounded-xl border p-3">
        <p>
          <strong>{picked.name}</strong> leaves no lasting effect on a creature in the library’s
          data: roll its damage or healing and you’re done.
        </p>
        <div className="flex flex-wrap gap-2">
          <ActionButton onClick={() => setByHand(true)}>Describe an effect by hand</ActionButton>
          <ActionButton onClick={() => setPicked(undefined)}>Choose another spell</ActionButton>
        </div>
      </div>
    )
  if (picked?.state === 'ready' && option)
    return (
      <div className="grid gap-2">
        <div>
          <ActionButton type="button" onClick={() => setPicked(undefined)}>
            Choose another spell
          </ActionButton>
        </div>
        <EffectForm
          key={option.key}
          title={[
            option.key && option.label !== picked.name
              ? `${option.label}, from ${picked.name}`
              : picked.name,
            casterName ? `cast by ${casterName}` : '',
          ]
            .filter(Boolean)
            .join(', ')}
          origin={{
            kind: 'spell',
            spell: picked.spell,
            ...(caster ? { caster } : {}),
            ...(option.key ? { effect: option.key } : {}),
          }}
          suggestion={option.suggestion}
          known={Boolean(option.key)}
          actions={actions}
          initialTargets={target ? [target] : undefined}
          caster={caster || undefined}
          spell={{ ref: picked.spell, name: picked.name }}
          onDone={onDone}
        />
      </div>
    )

  return (
    <div className="border-border bg-muted/30 grid gap-3 rounded-xl border p-3">
      {fixedCaster ? null : (
        <label className="flex flex-wrap items-center gap-2 text-sm">
          <span>Cast by</span>
          <select
            value={caster}
            onChange={(event) => setCaster(event.currentTarget.value)}
            className={control}
          >
            <option value="">Someone outside the fight</option>
            {actions.combatants.map((combatant) => (
              <option key={combatant.id} value={combatant.id}>
                {combatant.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="grid gap-1">
        {/* The search leads; the save DC sits beside it, already filled from the stat block. */}
        <div className="flex items-center gap-2">
          <input
            ref={search}
            aria-label="Find a spell"
            aria-describedby="spell-effect-results"
            placeholder="Find a spell: Hold Person, Bane, Faerie Fire…"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            className={cn(control, 'min-w-0 flex-1')}
          />
          <label className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm">
            <span>Save DC</span>
            <input
              aria-label="Its spell save DC"
              type="number"
              min={1}
              value={dc}
              onChange={(event) => setDc(Math.max(1, event.currentTarget.valueAsNumber || 1))}
              className={cn(control, 'text-foreground w-16 text-center font-semibold')}
            />
          </label>
        </div>
        <p id="spell-effect-results" aria-live="polite" className="text-muted-foreground text-xs">
          {picked?.state === 'loading'
            ? `Loading ${picked.name}…`
            : picked?.state === 'missing'
              ? `${picked.name} could not be loaded from the library.`
              : query.trim()
                ? `${matches.length === 0 ? 'No' : matches.length} matching spells`
                : ''}
        </p>
        {matches.length ? (
          <ul aria-label="Matching spells" className="grid gap-0.5">
            {matches.map((spell) => (
              <li key={spell.key}>
                <button
                  type="button"
                  onClick={() => pick(spell)}
                  className={cn(
                    'hover:bg-muted w-full rounded-md text-left italic',
                    focus ? 'h-11 px-3 text-base' : 'px-2 py-1 text-sm',
                  )}
                >
                  {spell.name}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

type ItemRef = EntityRef<'magicItem'> | EntityRef<'equipment'>

/**
 * One entry per item name, preferring the SRD 5.2.1 printing where several books have it: magic
 * items, then plain equipment such as Antitoxin or a Net.
 */
const itemChoices = (() => {
  const byName = new Map<string, { item: ItemRef; book: string }>()
  const add = (
    ref: ItemRef['ref'],
    names: Readonly<Record<string, string>>,
    books: Readonly<Record<string, string>>,
  ) => {
    for (const [key, name] of Object.entries(names)) {
      const current = byName.get(name)
      if (!current || (books[key] === 'srd-5-2-1' && current.book !== 'srd-5-2-1'))
        byName.set(name, { item: { ref, key } as ItemRef, book: books[key]! })
    }
  }
  add('magicItem', magicItemNames, magicItemBooks)
  add('equipment', equipmentNames, equipmentBooks)
  return [...byName]
    .map(([name, choice]) => ({ name, ...choice }))
    .toSorted((a, b) => a.name.localeCompare(b.name))
})()

/**
 * A magic item's effect on this combatant: a potion it drinks, a weapon that hit it, a wand used
 * on it. Find the item and who used it, then check and apply one of the effects it defines.
 */
export function ItemEffectPicker({
  target,
  user: fixedUser,
  actions,
  onDone,
}: {
  /** Who it lands on to start with; the DM picks in the form when not given. */
  target?: string
  /** Who uses it, when it is used from their own panel. */
  user?: string
  actions: ApplyEffectActions
  onDone: () => void
}) {
  const focus = useDensity() === 'focus'
  const [query, setQuery] = useState('')
  // Opened to search: the cursor starts in the search box.
  const search = useRef<HTMLInputElement>(null)
  useEffect(() => search.current?.focus(), [])
  const [user, setUser] = useState(fixedUser ?? target ?? '')
  const [picked, setPicked] = useState<
    | { state: 'loading' | 'missing' | 'none'; name: string }
    | {
        state: 'ready'
        name: string
        item: ItemRef
        options: { key: string; label: string; suggestion: EffectSuggestion }[]
        chosen?: string
      }
  >()

  const pick = ({ item, book, name }: (typeof itemChoices)[number]) => {
    setPicked({ state: 'loading', name })
    const publication = { ref: 'publication', key: book.replaceAll('-', '_') } as const
    void (
      item.ref === 'equipment' ? loadEquipment(item, publication) : loadMagicItem(item, publication)
    ).then((loaded) =>
      setPicked((current) =>
        current?.name !== name
          ? current
          : !loaded
            ? { state: 'missing', name }
            : !loaded.effects?.length
              ? { state: 'none', name }
              : {
                  state: 'ready',
                  name,
                  item,
                  options: withStages(loaded.effects).map(({ effect }) => ({
                    key: effect.key,
                    label: effect.name,
                    suggestion: suggestFromItemEffect(effect, { user: user || undefined }),
                  })),
                  ...(loaded.effects.length === 1 ? { chosen: loaded.effects[0]!.key } : {}),
                },
      ),
    )
  }

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const starts = itemChoices.filter((item) => item.name.toLowerCase().startsWith(q))
    const contains = itemChoices.filter(
      (item) => !item.name.toLowerCase().startsWith(q) && item.name.toLowerCase().includes(q),
    )
    return [...starts, ...contains].slice(0, 8)
  }, [query])

  const control = cn(
    'border-input bg-background rounded-lg border px-2',
    focus ? 'h-11 text-base' : 'h-8 text-sm',
  )
  const userName = actions.combatants.find(({ id }) => id === user)?.name
  const option =
    picked?.state === 'ready'
      ? picked.options.find((candidate) => candidate.key === picked.chosen)
      : undefined

  if (picked?.state === 'ready' && !option)
    return (
      <div className="grid gap-2">
        <p className="text-sm">{picked.name} can leave one of these. Which one?</p>
        <div className="flex flex-wrap gap-2">
          {picked.options.map((candidate) => (
            <ActionButton
              key={candidate.key}
              onClick={() => setPicked({ ...picked, chosen: candidate.key })}
            >
              <Sparkles aria-hidden /> {candidate.label}
            </ActionButton>
          ))}
          <ActionButton type="button" onClick={() => setPicked(undefined)}>
            Choose another item
          </ActionButton>
        </div>
      </div>
    )
  if (picked?.state === 'ready' && option)
    return (
      <div className="grid gap-2">
        <div>
          <ActionButton type="button" onClick={() => setPicked(undefined)}>
            Choose another item
          </ActionButton>
        </div>
        <EffectForm
          key={option.key}
          title={[
            option.label !== picked.name ? `${option.label}, from ${picked.name}` : picked.name,
            userName ? `used by ${userName}` : '',
          ]
            .filter(Boolean)
            .join(', ')}
          origin={{
            kind: 'item',
            item: picked.item,
            ...(user ? { user } : {}),
            effect: option.key,
          }}
          suggestion={option.suggestion}
          known
          actions={actions}
          initialTargets={target ? [target] : undefined}
          onDone={onDone}
        />
      </div>
    )

  return (
    <div className="border-border bg-muted/30 grid gap-3 rounded-xl border p-3">
      {fixedUser ? null : (
        <label className="flex flex-wrap items-center gap-2 text-sm">
          <span>Used by</span>
          <select
            value={user}
            onChange={(event) => setUser(event.currentTarget.value)}
            className={control}
          >
            <option value="">Someone outside the fight</option>
            {actions.combatants.map((combatant) => (
              <option key={combatant.id} value={combatant.id}>
                {combatant.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="grid gap-1">
        <input
          ref={search}
          aria-label="Find a magic item"
          aria-describedby="item-effect-results"
          placeholder="Find an item: Potion of Heroism, Oil of Etherealness…"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          className={control}
        />
        <p id="item-effect-results" aria-live="polite" className="text-muted-foreground text-xs">
          {picked?.state === 'loading'
            ? `Loading ${picked.name}…`
            : picked?.state === 'missing'
              ? `${picked.name} could not be loaded from the library.`
              : picked?.state === 'none'
                ? `${picked.name} leaves no effect on a creature in the library's data.`
                : query.trim()
                  ? `${matches.length === 0 ? 'No' : matches.length} matching items`
                  : ''}
        </p>
        {matches.length ? (
          <ul aria-label="Matching items" className="grid gap-0.5">
            {matches.map((item) => (
              <li key={`${item.item.ref}:${item.item.key}`}>
                <button
                  type="button"
                  onClick={() => pick(item)}
                  className={cn(
                    'hover:bg-muted w-full rounded-md text-left',
                    focus ? 'h-11 px-3 text-base' : 'px-2 py-1 text-sm',
                  )}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
