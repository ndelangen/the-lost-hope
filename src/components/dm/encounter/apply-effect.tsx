import { Sparkles, Wand2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import { magicItemBooks, magicItemNames } from '#/data/generated/magic-item-names'
import { spellBooks, spellNames } from '#/data/generated/spell-names'
import type { EntityRef } from '#/definitions/kind'
import type { Ability } from '#/definitions/stat-block'
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
import type { EffectApplication, EffectOrigin } from '#/lib/encounter-combat'
import { loadMagicItem } from '#/lib/library-magic-items'
import { loadSpell } from '#/lib/load-spell'
import { CONDITION_KEYS, plainRuleText, rules, type Condition } from '#/lib/rules'
import { cn } from '#/lib/utils'

import { useDurationDraft } from './condition-picker'
import { useDensity } from './density'
import { ActionButton } from './icon-button'

type Combatant = { id: string; name: string }

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
}

const toggle = <T,>(list: readonly T[], value: T) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value]

const noTargets: readonly string[] = []

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
function EffectForm({
  title,
  origin,
  suggestion,
  actions,
  initialTargets = noTargets,
  caster,
  spell,
  onDone,
}: {
  title: string
  origin: EffectOrigin
  suggestion: EffectSuggestion
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

  return (
    <form
      aria-label={`Apply ${title}`}
      className="border-border bg-card grid gap-3 rounded-xl border p-3"
      onSubmit={(event) => {
        event.preventDefault()
        if (targets.length === 0) return
        actions.apply(
          targets,
          { origin, conditions, text: text.trim() || undefined, duration: duration.choice() },
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
        <legend className={legend}>On whom</legend>
        <div className="flex flex-wrap gap-1">
          {actions.combatants.map((combatant) => (
            <button
              key={combatant.id}
              type="button"
              aria-pressed={targets.includes(combatant.id)}
              onClick={() => setTargets((current) => toggle(current, combatant.id))}
              className={cn(chip(focus, targets.includes(combatant.id)), 'normal-case')}
            >
              {combatant.name}
            </button>
          ))}
        </div>
      </fieldset>

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
      ability.effects
        ? ability.effects.map((effect) => ({
            key: effect.key,
            label: effect.name,
            suggestion: suggestFromAbilityEffect(effect, ability, block, source),
          }))
        : [{ key: '', label: 'effect', suggestion: suggestFromAbility(ability, block, source) }],
    [ability, block, source],
  )
  if (!ability.effects && !abilityLeavesEffect(ability)) return null
  const chosen = choices.find((choice) => choice.key === open)
  if (!chosen)
    return (
      <div className="flex flex-wrap gap-2">
        {choices.map((choice) => (
          <ActionButton key={choice.key} onClick={() => setOpen(choice.key)}>
            <Sparkles aria-hidden /> Apply {choice.label}
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
  actions,
  onDone,
}: {
  target: string
  actions: ApplyEffectActions
  onDone: () => void
}) {
  const focus = useDensity() === 'focus'
  const [query, setQuery] = useState('')
  const [caster, setCaster] = useState(actions.activeId ?? '')
  const [dc, setDc] = useState(13)
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
                options: loaded.effects
                  ? loaded.effects.map((effect) => ({
                      key: effect.key,
                      label: effect.name,
                      suggestion: suggestFromSpellEffect(effect, loaded, {
                        caster: caster || undefined,
                        dc,
                      }),
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
          actions={actions}
          initialTargets={[target]}
          caster={caster || undefined}
          spell={{ ref: picked.spell, name: picked.name }}
          onDone={onDone}
        />
      </div>
    )

  return (
    <div className="border-border bg-muted/30 grid gap-3 rounded-xl border p-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <label className="flex items-center gap-2">
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
        <label className="flex items-center gap-2">
          <span>Its spell save DC</span>
          <input
            type="number"
            min={1}
            value={dc}
            onChange={(event) => setDc(Math.max(1, event.currentTarget.valueAsNumber || 1))}
            className={cn(control, 'w-16 text-center')}
          />
        </label>
      </div>
      <div className="grid gap-1">
        <input
          aria-label="Find a spell"
          aria-describedby="spell-effect-results"
          placeholder="Find a spell: Hold Person, Bane, Faerie Fire…"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          className={control}
        />
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
                  className="hover:bg-muted w-full rounded-md px-2 py-1 text-left text-sm italic"
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

/** One entry per magic-item name, preferring the SRD 5.2.1 printing where several books have it. */
const itemChoices = (() => {
  const byName = new Map<string, string>()
  for (const [key, name] of Object.entries(magicItemNames)) {
    const current = byName.get(name)
    if (
      !current ||
      (magicItemBooks[key] === 'srd-5-2-1' && magicItemBooks[current] !== 'srd-5-2-1')
    )
      byName.set(name, key)
  }
  return [...byName]
    .map(([name, key]) => ({ name, key }))
    .toSorted((a, b) => a.name.localeCompare(b.name))
})()

/**
 * A magic item's effect on this combatant: a potion it drinks, a weapon that hit it, a wand used
 * on it. Find the item and who used it, then check and apply one of the effects it defines.
 */
export function ItemEffectPicker({
  target,
  actions,
  onDone,
}: {
  target: string
  actions: ApplyEffectActions
  onDone: () => void
}) {
  const focus = useDensity() === 'focus'
  const [query, setQuery] = useState('')
  const [user, setUser] = useState(target)
  const [picked, setPicked] = useState<
    | { state: 'loading' | 'missing' | 'none'; name: string }
    | {
        state: 'ready'
        name: string
        item: EntityRef<'magicItem'>
        options: { key: string; label: string; suggestion: EffectSuggestion }[]
        chosen?: string
      }
  >()

  const pick = (choice: { key: string; name: string }) => {
    const item: EntityRef<'magicItem'> = { ref: 'magicItem', key: choice.key }
    const book = magicItemBooks[choice.key]
    setPicked({ state: 'loading', name: choice.name })
    void (
      book
        ? loadMagicItem(item, { ref: 'publication', key: book.replaceAll('-', '_') })
        : Promise.resolve(undefined)
    ).then((loaded) =>
      setPicked((current) =>
        current?.name !== choice.name
          ? current
          : !loaded
            ? { state: 'missing', name: choice.name }
            : !loaded.effects
              ? { state: 'none', name: choice.name }
              : {
                  state: 'ready',
                  name: choice.name,
                  item,
                  options: loaded.effects.map((effect) => ({
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
          actions={actions}
          initialTargets={[target]}
          onDone={onDone}
        />
      </div>
    )

  return (
    <div className="border-border bg-muted/30 grid gap-3 rounded-xl border p-3">
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
      <div className="grid gap-1">
        <input
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
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => pick(item)}
                  className="hover:bg-muted w-full rounded-md px-2 py-1 text-left text-sm"
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
