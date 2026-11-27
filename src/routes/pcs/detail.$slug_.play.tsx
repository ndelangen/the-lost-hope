import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ArrowLeft,
  BedDouble,
  Brain,
  Check,
  ChevronDown,
  Coffee,
  Dices,
  HeartPlus,
  ListRestart,
  Plus,
  Shield,
  Sparkles,
  Star,
  Sword,
  Undo2,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'

import { AbilityQuickList } from '#/components/dm/ability-quick-list'
import { AbilityDetail } from '#/components/dm/encounter/ability-controls'
import { describeReferences } from '#/components/dm/encounter/ability-text'
import {
  ConditionMarkers,
  EffectMarkers,
  WouldDie,
} from '#/components/dm/encounter/condition-markers'
import { EncounterDensity } from '#/components/dm/encounter/density'
import { HpBar } from '#/components/dm/encounter/hp-bar'
import { EditableNumber } from '#/components/dm/encounter/hp-control'
import { ActionButton } from '#/components/dm/encounter/icon-button'
import { newConditionId, useEncounterAt } from '#/components/dm/encounter/use-encounter-store'
import { ConditionPanel } from '#/components/play/condition-panel'
import { DyingBanner, type DeathRoll } from '#/components/play/dying-banner'
import { HpPad } from '#/components/play/hp-pad'
import { TrackRow } from '#/components/play/track-row'
import { RuleTerm } from '#/components/rule-term'
import { Avatar } from '#/components/ui/avatar'
import { refs } from '#/data/generated/refs'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { ABILITY_ICONS } from '#/lib/ability-icons'
import { abilityIndex } from '#/lib/ability-index'
import { combatantView } from '#/lib/dm-encounter'
import {
  abilityKey,
  addCondition,
  addPc,
  deathSave,
  liveStats,
  markDead,
  remainingUses,
  removeCondition,
  resetCombatant,
  setConcentration,
  setExhaustion,
  setInspiration,
  setTemp,
  type Encounter,
  type UseCount,
} from '#/lib/encounter'
import { concentrationDc } from '#/lib/encounter-combat'
import { hpFraction } from '#/lib/encounter-focus'
import {
  heal,
  longRest,
  playTracks,
  setPlayStat,
  shortRest,
  spendHitDie,
  spendTrack,
  takeDamage,
  trackCount,
  type Track,
} from '#/lib/play-sheet'
import { ABILITY_KEYS, ruleOf, ruleRef, rules, SKILL_KEYS, skillAbility } from '#/lib/rules'
import { formatSpeed, signed, type PlayablePcStats } from '#/lib/stat-block'
import { cn } from '#/lib/utils'

/**
 * A player's play sheet: their character at the table, on a phone or tablet. It keeps the same
 * live values as the DM's encounter tracker, in this browser only, and adds what a player counts
 * between fights: Spell Slots, Hit Point Dice and rests.
 */
export const Route = createFileRoute('/pcs/detail/$slug_/play')({
  loader: async ({ params }) => {
    // Imported here so DM data stays out of the route tree every page carries.
    const { sourceRecordBySlug } = await import('#/lib/dm-campaign')
    const found = sourceRecordBySlug('pc', params.slug)
    const pc = found?.record as { name: string; level?: number; stats?: unknown } | undefined
    if (!found || !pc?.stats || !pc.level) throw notFound()
    return { key: found.key, name: pc.name }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? 'Character'} · play sheet | The Lost Hope` },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: PlayPage,
})

/** What just changed, said once, with the state from before it so the player can take it back. */
type Notice = { message: string; previous: Encounter }

function PlayPage() {
  const { slug } = Route.useParams()
  const { key } = Route.useLoaderData()
  const id = `pc:${key}`
  const [stored, updateStored] = useEncounterAt(`lost-hope:play:${key}`)
  const [openAbility, setOpenAbility] = useState<string>()
  const [padOpen, setPadOpen] = useState(false)
  const [pickingConditions, setPickingConditions] = useState(false)
  const [concentrationCheck, setConcentrationCheck] = useState<number>()
  const [notice, setNotice] = useState<Notice>()
  // The sheet is the encounter of this one character.
  const seat = useMemo(() => {
    const source = { ref: 'pc' as const, key }
    const withPc = (encounter: Encounter) => addPc(encounter, source)
    const roster = withPc({ roster: [], round: 1, values: {}, joined: {} }).roster
    const view = combatantView(roster[0]!, roster)
    return { withPc, view, tracks: playTracks(view.stats as PlayablePcStats) }
  }, [key])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(undefined), 8000)
    return () => clearTimeout(timer)
  }, [notice])

  if (!stored) return <p className="text-muted-foreground p-6">Loading your sheet…</p>

  const { view, tracks } = seat
  const stats = view.stats as PlayablePcStats
  const block = view.derived!
  const start = view.start!
  const encounter = seat.withPc(stored)
  const update = (change: (current: Encounter) => Encounter) =>
    updateStored((current) => change(seat.withPc(current)))
  /** A change worth saying out loud, which the player can undo. */
  const act = (message: string, change: (current: Encounter) => Encounter) => {
    setNotice({ message, previous: encounter })
    update(change)
  }
  const values = encounter.values[id]
  const live = liveStats(start, values)
  const hp = live.hp ?? 0
  const conditions = values?.conditions ?? []
  const exhaustion = values?.exhaustion ?? 0
  const down = Boolean(values?.dying || values?.stable || values?.dead)

  const counts: Record<string, UseCount | undefined> = Object.fromEntries(
    stats.abilities.map((ability) => {
      const useKey = abilityKey(ability.timing, ability.name)
      return [useKey, remainingUses(ability.pool ?? ability.uses, values, useKey)]
    }),
  )
  const trackOf = (useKey: string) => tracks.find((track) => track.key === useKey)
  const spend = (track: Track) => (amount: number) =>
    update((current) => spendTrack(current, id, track, amount))
  const open = stats.abilities.find(
    (ability) => abilityKey(ability.timing, ability.name) === openAbility,
  )
  const openTrack = open ? trackOf(abilityKey(open.timing, open.name)) : undefined

  const damage = (amount: number) => {
    const after = liveStats(start, takeDamage(encounter, id, start, amount).values[id])
    act(
      values?.dying
        ? 'Hit while dying: one failed death save'
        : `Took ${amount} damage · ${hp} → ${after.hp} HP`,
      (current) => takeDamage(current, id, start, amount),
    )
    // Still standing and concentrating: the damage calls for a save.
    setConcentrationCheck(values?.concentration && after.hp ? concentrationDc(amount) : undefined)
    // Dropping to 0 HP is the one thing that can't wait: bring the death saves into view.
    if (hp > 0 && after.hp === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const rollDeathSave = (roll: DeathRoll) => {
    if (roll === 'twenty')
      return act('Rolled a 20: back up with 1 HP', (current) => heal(current, id, start, 1))
    update((current) =>
      deathSave(current, id, roll === 'success' ? 'success' : 'failure', roll === 'one' ? 2 : 1),
    )
  }
  const restored = tracks
    .filter((track) => {
      const { uses, maxUses } = trackCount(track, values)
      return track.shortRest !== 'none' && uses < maxUses
    })
    .map((track) => track.name)

  const features = tracks.filter((track) => track.group === 'features')
  const slots = tracks.filter((track) => track.group === 'slots')
  const hitDice = tracks.filter((track) => track.group === 'hit-dice')

  return (
    <EncounterDensity value="focus">
      <div className="bg-background text-foreground min-h-dvh">
        <header className="bg-background/95 sticky top-0 z-20 border-b backdrop-blur">
          <div className="mx-auto flex max-w-xl items-center gap-3 px-4 py-2 md:max-w-5xl">
            <Link
              to="/pcs/detail/$slug"
              params={{ slug }}
              aria-label={`Back to ${view.name}`}
              className="text-muted-foreground -ml-2 grid size-10 shrink-0 place-items-center rounded-full"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <Avatar
              src={view.avatar ?? DEFAULT_AVATAR}
              sizes="40px"
              maxWidth={64}
              className="size-10"
              loading="eager"
            />
            <button
              type="button"
              onClick={() => setPadOpen(true)}
              aria-label={`Hit Points: ${hp} of ${live.maxHp}. Change them.`}
              className="hover:bg-muted/60 -my-1 grid min-w-0 flex-1 gap-1 rounded-xl px-2 py-1 text-left"
            >
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate font-bold">{view.name}</span>
                <span className="shrink-0 tabular-nums">
                  <span className="text-2xl font-bold">{hp}</span>
                  <span className="text-muted-foreground text-sm"> / {live.maxHp} HP</span>
                  {live.temp ? (
                    <span className="ml-1.5 rounded-md bg-sky-500/15 px-1.5 py-0.5 text-sm font-semibold text-sky-700 dark:text-sky-300">
                      +{live.temp}
                    </span>
                  ) : null}
                </span>
              </span>
              <HpBar fraction={hpFraction(live) ?? 0} className="h-2" />
            </button>
            <Fact
              icon={<Shield aria-hidden />}
              label={<RuleTerm rule={refs.rules.armor_class} />}
              value={live.ac}
            />
            <div className="hidden gap-2 md:flex">
              <ActionButton tone="danger" onClick={() => setPadOpen(true)}>
                <Sword aria-hidden /> Damage
              </ActionButton>
              <ActionButton tone="heal" onClick={() => setPadOpen(true)}>
                <HeartPlus aria-hidden /> Heal
              </ActionButton>
            </div>
          </div>
        </header>

        {/* One column on a phone. From tablet width: what changes on the left, what is read on the right. */}
        <main className="mx-auto grid max-w-xl grid-cols-[minmax(0,1fr)] items-start gap-5 p-4 pb-28 md:max-w-5xl md:grid-cols-2 md:gap-x-8 md:pb-10">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
            <DyingBanner
              dying={values?.dying}
              stable={values?.stable}
              dead={values?.dead}
              onRoll={rollDeathSave}
              onUndoDeath={() => update((current) => markDead(current, id, false))}
            />
            {down ? <WouldDie effects={view.effects} /> : null}

            {concentrationCheck !== undefined && values?.concentration ? (
              <div
                role="alert"
                className="grid gap-3 rounded-2xl border-2 border-violet-500/60 bg-violet-500/10 p-4"
              >
                <p className="flex items-start gap-2">
                  <Brain aria-hidden className="mt-0.5 size-6 shrink-0 text-violet-600" />
                  <span>
                    You took damage while concentrating. Roll a{' '}
                    <strong>
                      DC {concentrationCheck} {rules.con.name}
                    </strong>{' '}
                    <RuleTerm rule={refs.rules.saving_throw}>saving throw</RuleTerm>: d20{' '}
                    {signed(block.saves.con)}.
                  </span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <ActionButton tone="heal" onClick={() => setConcentrationCheck(undefined)}>
                    <Check aria-hidden /> I kept it
                  </ActionButton>
                  <ActionButton
                    tone="danger"
                    onClick={() => {
                      update((current) => setConcentration(current, id, undefined))
                      setConcentrationCheck(undefined)
                    }}
                  >
                    <X aria-hidden /> I lost it
                  </ActionButton>
                </div>
              </div>
            ) : null}

            <Section title="Conditions">
              <div className="flex flex-wrap items-center gap-2 empty:hidden">
                <EffectMarkers effects={view.effects} />
                <ConditionMarkers
                  conditions={conditions}
                  concentration={values?.concentration}
                  nameOf={() => 'your'}
                  onRemove={(conditionId) =>
                    update((current) => removeCondition(current, id, conditionId))
                  }
                />
                {exhaustion ? (
                  <span className="inline-flex h-8 items-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/10 px-2 text-sm font-medium text-amber-800 dark:text-amber-300">
                    <RuleTerm rule={refs.rules.exhaustion} /> {exhaustion}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <ActionButton
                  aria-expanded={pickingConditions}
                  className={cn(pickingConditions && 'bg-muted')}
                  onClick={() => setPickingConditions((value) => !value)}
                >
                  <Plus aria-hidden /> Conditions
                </ActionButton>
                <ActionButton
                  aria-pressed={Boolean(values?.concentration)}
                  className={cn(
                    values?.concentration &&
                      'border-violet-500/60 bg-violet-500/15 text-violet-800 dark:text-violet-200',
                  )}
                  onClick={() => {
                    update((current) =>
                      setConcentration(current, id, values?.concentration ? undefined : ''),
                    )
                    setConcentrationCheck(undefined)
                  }}
                >
                  <Brain aria-hidden />
                  {values?.concentration ? 'Stop concentrating' : 'Start concentrating'}
                </ActionButton>
              </div>
              {pickingConditions ? (
                <ConditionPanel
                  active={new Set(conditions.map((held) => held.condition))}
                  onToggle={(condition) => {
                    const held = conditions.find((candidate) => candidate.condition === condition)
                    update((current) =>
                      held
                        ? removeCondition(current, id, held.id)
                        : addCondition(
                            current,
                            id,
                            condition,
                            { kind: 'until-removed' },
                            newConditionId(),
                          ),
                    )
                  }}
                  exhaustion={exhaustion}
                  onExhaustion={(level) => update((current) => setExhaustion(current, id, level))}
                />
              ) : null}
            </Section>

            <Section title={<RuleTerm rule={refs.rules.saving_throw}>Saving throws</RuleTerm>}>
              <dl className="grid grid-cols-6 gap-1.5">
                {ABILITY_KEYS.map((ability) => {
                  const proficient = Boolean(stats.saves?.[ability])
                  return (
                    <div
                      key={ability}
                      className={cn(
                        'grid justify-items-center rounded-xl border py-1.5',
                        proficient
                          ? 'border-foreground/40 bg-card'
                          : 'bg-muted/50 border-transparent',
                      )}
                    >
                      <dt className="text-muted-foreground text-xs font-semibold uppercase">
                        <RuleTerm rule={ruleRef(ability)}>
                          {ruleOf(ruleRef(ability)).name.slice(0, 3)}
                        </RuleTerm>
                      </dt>
                      <dd className="text-lg font-bold tabular-nums">
                        {signed(block.saves[ability])}
                      </dd>
                    </div>
                  )
                })}
              </dl>
              <p className="text-muted-foreground text-xs">
                Roll a d20 and add the number. Outlined ones include your{' '}
                <RuleTerm rule={refs.rules.proficiency_bonus} />.
              </p>
            </Section>

            {slots.length > 0 ? (
              <Section
                title={
                  <RuleTerm rule={stats.pactSlots ? refs.rules.pact_magic : refs.rules.spell_slot}>
                    Spell Slots
                  </RuleTerm>
                }
              >
                <Card>
                  {slots.map((track) => (
                    <TrackRow
                      key={track.key}
                      track={track}
                      count={trackCount(track, values)}
                      onSpend={spend(track)}
                    />
                  ))}
                </Card>
              </Section>
            ) : null}

            <Section title="Features you can run out of">
              <Card>
                {features.map((track) => {
                  const ability = stats.abilities.find(
                    (candidate) => abilityKey(candidate.timing, candidate.name) === track.key,
                  )
                  const Icon = ability ? (ABILITY_ICONS[ability.icon] ?? Sparkles) : Sparkles
                  return (
                    <TrackRow
                      key={track.key}
                      track={track}
                      icon={<Icon />}
                      count={trackCount(track, values)}
                      onSpend={spend(track)}
                    />
                  )
                })}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Star aria-hidden className="size-5 shrink-0 text-fuchsia-600" />
                    <div>
                      <p className="leading-tight font-semibold">
                        <RuleTerm rule={refs.rules.heroic_inspiration} />
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {values?.inspiration
                          ? 'You have it. Spend it to reroll a die.'
                          : 'Not held'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-pressed={Boolean(values?.inspiration)}
                    aria-label={
                      values?.inspiration ? 'Spend Heroic Inspiration' : 'Gain Heroic Inspiration'
                    }
                    onClick={() =>
                      update((current) => setInspiration(current, id, !values?.inspiration))
                    }
                    className="grid size-11 place-items-center rounded-full"
                  >
                    <Star
                      aria-hidden
                      className={cn(
                        'size-8',
                        values?.inspiration
                          ? 'fill-fuchsia-500 text-fuchsia-600'
                          : 'text-muted-foreground/50',
                      )}
                    />
                  </button>
                </div>
              </Card>
            </Section>

            <Fold title="Rest" icon={<BedDouble aria-hidden />}>
              <p className="text-muted-foreground text-sm">
                On a <RuleTerm rule={refs.rules.short_rest} /> you can spend{' '}
                <RuleTerm rule={refs.rules.hit_point_dice} /> to heal: roll one, add{' '}
                {signed(block.modifier.con)}, and enter the total.
              </p>
              {hitDice.map((track) => (
                <HitDieRow
                  key={track.key}
                  track={track}
                  count={trackCount(track, values)}
                  con={block.modifier.con}
                  onSpend={(healed) =>
                    act(`Spent a ${track.name}: healed ${healed}`, (current) =>
                      spendHitDie(current, id, start, track, healed),
                    )
                  }
                />
              ))}
              <div className="grid grid-cols-2 gap-2">
                <ConfirmButton
                  icon={<Coffee aria-hidden />}
                  label="Short Rest"
                  onConfirm={() =>
                    act(
                      restored.length > 0
                        ? `Short Rest: ${restored.join(', ')} back`
                        : 'Short Rest: nothing to get back',
                      (current) => shortRest(current, id, tracks),
                    )
                  }
                />
                <ConfirmButton
                  icon={<BedDouble aria-hidden />}
                  label="Long Rest"
                  onConfirm={() =>
                    act(
                      'Long Rest: Hit Points, slots, features and Hit Point Dice are full',
                      (current) => longRest(current, id),
                    )
                  }
                />
              </div>
            </Fold>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
            <Section title="What you can do">
              <AbilityQuickList
                stacked
                groups={abilityIndex(stats)}
                current={open?.key}
                usesLeft={Object.fromEntries(
                  stats.abilities.map((ability) => [
                    ability.key,
                    counts[abilityKey(ability.timing, ability.name)]?.uses,
                  ]),
                )}
                numbers={Object.fromEntries(
                  stats.abilities.map((ability) => [
                    ability.key,
                    block.abilities[ability.key]?.summary,
                  ]),
                )}
                onSelect={(entry) => {
                  const ability = stats.abilities.find((candidate) => candidate.key === entry.key)
                  if (!ability) return
                  const useKey = abilityKey(ability.timing, ability.name)
                  setOpenAbility((current) => (current === useKey ? undefined : useKey))
                }}
                detail={
                  open ? (
                    <AbilityDetail
                      title={open.name}
                      ability={open}
                      block={block}
                      describe={describeReferences(stats, block, counts, (useKey) => {
                        const track = trackOf(useKey)
                        if (track) spend(track)(1)
                      })}
                    >
                      {openTrack ? (
                        <div className="border-border border-t pt-3">
                          <TrackRow
                            track={openTrack}
                            label="Uses"
                            count={trackCount(openTrack, values)}
                            onSpend={spend(openTrack)}
                          />
                        </div>
                      ) : null}
                    </AbilityDetail>
                  ) : null
                }
              />
            </Section>

            <Fold title="Skills and senses" icon={<Dices aria-hidden />}>
              <dl className="grid grid-cols-2 gap-x-5 gap-y-1.5">
                {SKILL_KEYS.map((skill) => {
                  const level = stats.skills?.[skill]
                  const bonus =
                    block.modifier[skillAbility(skill)] +
                    (level === 'expert' ? 2 : level ? 1 : 0) * block.proficiencyBonus
                  return (
                    <div key={skill} className="flex items-baseline justify-between gap-2">
                      <dt className={cn(level ? 'font-semibold' : 'text-muted-foreground')}>
                        <RuleTerm rule={ruleRef(skill)} />
                        {level === 'expert' ? (
                          <>
                            {' '}
                            <RuleTerm rule={refs.rules.expertise} className="text-xs font-normal">
                              ×2
                            </RuleTerm>
                          </>
                        ) : null}
                      </dt>
                      <dd className="font-semibold tabular-nums">{signed(bonus)}</dd>
                    </div>
                  )
                })}
              </dl>
              <dl className="grid gap-1 text-sm">
                <Line label={<RuleTerm rule={refs.rules.initiative} />}>
                  {signed(block.initiative)}
                </Line>
                <Line label={<RuleTerm rule={refs.rules.speed} />}>{formatSpeed(stats.speed)}</Line>
                <Line label={<RuleTerm rule={refs.rules.passive_perception} />}>
                  {block.passivePerception}
                </Line>
                {block.senses.map(({ sense, feet }) => (
                  <Line key={sense} label={<RuleTerm rule={ruleRef(sense)} />}>
                    {feet} ft.
                  </Line>
                ))}
                {stats.damageResistances?.length ? (
                  <Line label={<RuleTerm rule={refs.rules.resistance} />}>
                    {stats.damageResistances.map((type) => (
                      <RuleTerm key={type.key} rule={type} className="mr-2" />
                    ))}
                  </Line>
                ) : null}
              </dl>
            </Fold>

            <Fold title="Fix a number or start over" icon={<ListRestart aria-hidden />}>
              <p className="text-muted-foreground text-sm">
                If the sheet is wrong, type the right number. It saves as you type.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    ['hp', 'Hit Points', live.hp, 0],
                    ['maxHp', 'Maximum', live.maxHp, 1],
                    ['ac', 'Armor Class', live.ac, 0],
                  ] as const
                ).map(([field, label, value, min]) => (
                  <label
                    key={field}
                    className="border-border bg-card grid gap-0.5 rounded-xl border p-2"
                  >
                    <span className="text-muted-foreground text-xs">{label}</span>
                    <EditableNumber
                      label={label}
                      value={value}
                      min={min}
                      onCommit={(next) =>
                        update((current) => setPlayStat(current, id, field, next))
                      }
                      className="h-9 w-full text-left text-xl font-bold tabular-nums"
                    />
                  </label>
                ))}
              </div>
              <ConfirmButton
                icon={<ListRestart aria-hidden />}
                label="Start over: full Hit Points, nothing spent"
                onConfirm={() =>
                  act('Started over with a fresh sheet', (current) => resetCombatant(current, id))
                }
              />
              <p className="text-muted-foreground text-xs">
                Your sheet is kept in this browser on this device only.
              </p>
            </Fold>
          </div>
        </main>

        {/* On a phone the two things done most sit under the thumb. */}
        <div className="bg-background/95 fixed inset-x-0 bottom-0 z-20 grid grid-cols-2 gap-2 border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
          <ActionButton tone="danger" size="lg" onClick={() => setPadOpen(true)}>
            <Sword aria-hidden /> Damage
          </ActionButton>
          <ActionButton tone="heal" size="lg" onClick={() => setPadOpen(true)}>
            <HeartPlus aria-hidden /> Heal
          </ActionButton>
        </div>

        {notice ? (
          <div className="pointer-events-none fixed inset-x-0 bottom-24 z-30 flex justify-center px-4 md:bottom-6">
            <output className="bg-foreground text-background pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl py-2 pr-2 pl-4 text-sm font-medium shadow-xl">
              <span className="min-w-0">{notice.message}</span>
              <button
                type="button"
                onClick={() => {
                  update(() => notice.previous)
                  setNotice(undefined)
                  setConcentrationCheck(undefined)
                }}
                className="bg-background/15 flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 font-semibold"
              >
                <Undo2 aria-hidden className="size-4" /> Undo
              </button>
            </output>
          </div>
        ) : null}

        {padOpen ? (
          <HpPad
            live={live}
            onClose={() => setPadOpen(false)}
            onDamage={damage}
            onHeal={(amount) =>
              act(
                `Healed ${amount} · ${hp} → ${Math.min(live.maxHp ?? hp + amount, hp + amount)} HP`,
                (current) => heal(current, id, start, amount),
              )
            }
            onTemp={(amount) =>
              act(
                amount ? `${amount} Temporary Hit Points` : 'Removed Temporary Hit Points',
                (current) => setTemp(current, id, amount),
              )
            }
          />
        ) : null}
      </div>
    </EncounterDensity>
  )
}

function Section({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section className="grid grid-cols-[minmax(0,1fr)] gap-2">
      <h2 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="border-border bg-card grid gap-3 rounded-2xl border p-3 [&>*+*]:border-t [&>*+*]:pt-3">
      {children}
    </div>
  )
}

/** A part of the sheet that stays folded until the player wants it. */
function Fold({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <details className="group border-border bg-card rounded-2xl border">
      <summary className="flex h-14 cursor-pointer list-none items-center gap-2.5 px-4 font-semibold [&_svg]:size-5 [&::-webkit-details-marker]:hidden">
        <span className="text-muted-foreground">{icon}</span>
        <span className="flex-1">{title}</span>
        <ChevronDown
          aria-hidden
          className="text-muted-foreground transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="grid gap-3 px-4 pb-4">{children}</div>
    </details>
  )
}

function Fact({ icon, label, value }: { icon: ReactNode; label: ReactNode; value: ReactNode }) {
  return (
    <div className="border-border flex h-12 shrink-0 items-center gap-1.5 rounded-xl border-2 px-2.5 [&_svg]:size-4">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span className="text-lg font-bold tabular-nums">{value}</span>
    </div>
  )
}

function Line({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="flex gap-2">
      <dt className="text-muted-foreground w-36 shrink-0">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  )
}

/** Spend one Hit Point Die: roll it, add Constitution, and enter what it healed. */
function HitDieRow({
  track,
  count,
  con,
  onSpend,
}: {
  track: Track
  count: UseCount
  con: number
  onSpend: (healed: number) => void
}) {
  const [rolled, setRolled] = useState('')
  const healed = /^\d+$/.test(rolled.trim()) ? Number(rolled) : undefined
  return (
    <form
      className="flex flex-wrap items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault()
        if (healed === undefined) return
        onSpend(healed)
        setRolled('')
      }}
    >
      <span className="flex-1 font-semibold tabular-nums">
        {track.name}: {count.uses} of {count.maxUses} left
      </span>
      <input
        aria-label={`Total of one ${track.name} ${signed(con)}`}
        inputMode="numeric"
        placeholder={`${track.name} ${signed(con)}`}
        value={rolled}
        onChange={(event) => setRolled(event.currentTarget.value)}
        className="border-input bg-background h-12 w-24 rounded-xl border-2 px-2 text-center font-semibold tabular-nums"
      />
      <ActionButton type="submit" tone="heal" disabled={count.uses === 0 || healed === undefined}>
        <HeartPlus aria-hidden /> Heal
      </ActionButton>
    </form>
  )
}

/** Asks for a second tap, for things that change a lot at once. It lets go after a few seconds. */
function ConfirmButton({
  icon,
  label,
  onConfirm,
}: {
  icon: ReactNode
  label: string
  onConfirm: () => void
}) {
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (!armed) return
    const timer = setTimeout(() => setArmed(false), 3000)
    return () => clearTimeout(timer)
  }, [armed])
  return (
    <ActionButton
      tone={armed ? 'primary' : 'outline'}
      className="h-auto min-h-12 py-2 whitespace-normal"
      onClick={() => {
        if (armed) onConfirm()
        setArmed(!armed)
      }}
    >
      {icon} {armed ? 'Tap again to confirm' : label}
    </ActionButton>
  )
}
