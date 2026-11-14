import { PawPrint, RotateCcw, Shield, Swords, Zap } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'

import { RuleTerm } from '#/components/rule-term'
import { refs } from '#/data/generated/refs'
import { ABILITY_TIMINGS, type AbilityTiming } from '#/definitions/stat-block'
import type { CombatantView } from '#/lib/dm-encounter'
import { ABILITY_ORDER, abilityKey, type LiveStats, type UseCount } from '#/lib/encounter'
import { ruleOf, type RuleRef } from '#/lib/rules'
import { formatSpeed, signed, sourceName, sourceUrl } from '#/lib/stat-block'
import { cn } from '#/lib/utils'

import { AbilityButton, AbilityDetail } from './ability-controls'
import { describeReferences } from './ability-text'
import { useDensity } from './density'
import { EditableNumber, HpControl } from './hp-control'
import { IconButton } from './icon-button'

const TIMING = {
  action: { label: 'Actions', Icon: Swords },
  'bonus action': { label: 'Bonus actions', Icon: Zap },
  reaction: { label: 'Reactions', Icon: Shield },
  trait: { label: 'Traits', Icon: PawPrint },
} satisfies Record<AbilityTiming, unknown>

const ABILITY_NAMES = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma',
} as const

type Fact = { key: string; label: ReactNode; value: ReactNode }

export type UseActions = {
  use: (key: string, count: UseCount) => void
  recharge: (key: string, count: UseCount) => void
  setUses: (key: string, field: 'uses' | 'maxUses', value: number) => void
}

export type CombatantActions = UseActions & {
  setStat: (field: 'hp' | 'maxHp' | 'ac', value: number) => void
  adjustHp: (delta: number) => void
  reset: () => void
  toggleAbility: (key: string) => void
}

/** The selected combatant's live values, abilities, and saving throws. */
export function CombatantPanel({
  combatant,
  isActive,
  live,
  counts,
  openAbility,
  actions,
  status,
}: {
  combatant: CombatantView
  isActive: boolean
  live: LiveStats
  counts: Readonly<Record<string, UseCount | undefined>>
  openAbility: string | undefined
  actions: CombatantActions
  /** Conditions, concentration, and 0 HP for this combatant. */
  status?: ReactNode
}) {
  const focus = useDensity() === 'focus'
  const { stats, derived: block } = combatant
  const abilities = stats?.abilities ?? []
  const open = abilities.find((ability) => abilityKey(ability.timing, ability.name) === openAbility)
  const immune = [...(stats?.damageImmunities ?? []), ...(stats?.conditionImmunities ?? [])]
  const facts: readonly Fact[] =
    stats && block
      ? [
          {
            key: 'hp',
            label: <RuleTerm rule={refs.rules.hit_points}>Hit points</RuleTerm>,
            value: block.hitPoints,
          },
          {
            key: 'ac',
            label: <RuleTerm rule={refs.rules.armor_class}>Armor</RuleTerm>,
            value: stats.armor ? `${stats.ac}, ${stats.armor}` : String(stats.ac),
          },
          {
            key: 'initiative',
            label: <RuleTerm rule={refs.rules.initiative} />,
            value: signed(block.initiative),
          },
          {
            key: 'speed',
            label: <RuleTerm rule={refs.rules.speed} />,
            value: formatSpeed(stats.speed),
          },
          {
            key: 'skills',
            label: 'Skills',
            value: block.skills.map(({ label, bonus }) => `${label} ${signed(bonus)}`).join(', '),
          },
          { key: 'senses', label: 'Senses', value: block.senses },
          {
            key: 'vulnerable',
            label: <RuleTerm rule={refs.rules.vulnerability}>Vulnerable</RuleTerm>,
            value: termList(stats.damageVulnerabilities),
          },
          {
            key: 'resistant',
            label: <RuleTerm rule={refs.rules.resistance}>Resistant</RuleTerm>,
            value: termList(stats.damageResistances),
          },
          {
            key: 'immune',
            label: <RuleTerm rule={refs.rules.immunity}>Immune</RuleTerm>,
            value: termList(immune),
          },
        ]
      : []

  return (
    <section
      aria-labelledby="combatant-heading"
      className="border-border bg-card grid content-start gap-4 rounded-xl border p-4"
    >
      <header className="flex items-start justify-between gap-2">
        <div>
          <p className="text-muted-foreground text-xs font-semibold uppercase">{combatant.kind}</p>
          <h2
            id="combatant-heading"
            className={cn('font-bold tracking-tight', focus ? 'text-2xl' : 'text-xl')}
          >
            {combatant.name}
          </h2>
          {stats && block ? (
            <p className="text-muted-foreground text-sm">
              {stats.size} {stats.type} · <RuleTerm rule={refs.rules.challenge_rating} /> {stats.cr}{' '}
              ({block.experience} XP) · <RuleTerm rule={refs.rules.proficiency_bonus} />{' '}
              {signed(block.proficiencyBonus)}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {combatant.tracked ? (
            <IconButton
              label="Reset to starting HP and uses"
              size="sm"
              tone="ghost"
              onClick={actions.reset}
            >
              <RotateCcw aria-hidden />
            </IconButton>
          ) : null}
          {isActive ? (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
              Current turn
            </span>
          ) : null}
        </div>
      </header>

      {combatant.tracked ? (
        <div className="grid gap-3">
          <HpControl
            name={combatant.name}
            live={live}
            onAdjust={actions.adjustHp}
            onSet={actions.setStat}
          />
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={cn(
                'border-border bg-card flex items-center gap-2 pr-1 pl-3',
                focus ? 'h-12 rounded-xl border-2' : 'h-10 rounded-lg border',
              )}
            >
              <Shield aria-hidden className="text-muted-foreground size-5" />
              <span className="text-muted-foreground text-sm font-medium">
                <RuleTerm rule={refs.rules.armor_class} />
              </span>
              <EditableNumber
                label={`Armor class of ${combatant.name}`}
                value={live.ac}
                min={0}
                onCommit={(value) => actions.setStat('ac', value)}
                className={cn(
                  'font-bold tabular-nums',
                  focus ? 'h-9 w-12 text-xl' : 'h-8 w-10 text-lg',
                )}
              />
            </div>
          </div>
        </div>
      ) : null}

      {status}

      {abilities.length > 0 ? (
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Abilities">
            {ABILITY_TIMINGS.map((timing) => {
              const members = abilities.filter((ability) => ability.timing === timing)
              if (members.length === 0) return null
              const { label, Icon } = TIMING[timing]
              return (
                <fieldset
                  key={timing}
                  aria-label={label}
                  className="m-0 flex min-w-0 flex-wrap items-center gap-2 border-0 p-0"
                >
                  <span className="text-muted-foreground flex w-full items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
                    <Icon aria-hidden className="size-4" /> {label}
                  </span>
                  {members.map((ability) => {
                    const key = abilityKey(timing, ability.name)
                    return (
                      <AbilityButton
                        key={key}
                        ability={ability}
                        context={label}
                        count={counts[key]}
                        expanded={openAbility === key}
                        onToggle={() => actions.toggleAbility(key)}
                        block={block!}
                      />
                    )
                  })}
                </fieldset>
              )
            })}
          </div>
          {open
            ? (() => {
                const key = abilityKey(open.timing, open.name)
                const count = counts[key]
                return (
                  <AbilityDetail
                    title={open.name}
                    ability={open}
                    count={count}
                    onUse={() => count && actions.use(key, count)}
                    onRecharge={() => count && actions.recharge(key, count)}
                    onSetUses={(value) => actions.setUses(key, 'uses', value)}
                    onSetMaxUses={(value) => actions.setUses(key, 'maxUses', value)}
                    block={block!}
                    describe={describeReferences(stats!, block!, counts, actions.use)}
                  />
                )
              })()
            : null}
        </div>
      ) : null}

      {stats && block ? (
        <section aria-labelledby="saves-heading" className="grid gap-1">
          <h3 id="saves-heading" className="text-muted-foreground text-xs font-semibold uppercase">
            <RuleTerm rule={refs.rules.saving_throw}>Saving throws</RuleTerm>
          </h3>
          <dl className="grid grid-cols-3 gap-2">
            {ABILITY_ORDER.map((ability) => (
              <div
                key={ability}
                className={cn(
                  'bg-muted/50 rounded-md px-2 py-1',
                  stats.saves?.[ability] && 'ring-foreground/30 ring-1',
                )}
              >
                <dt className="text-muted-foreground text-xs">
                  {ABILITY_NAMES[ability]}
                  {stats.saves?.[ability] ? ' · proficient' : ''}
                </dt>
                <dd className="font-semibold tabular-nums">d20 {signed(block.saves[ability])}</dd>
                <dd className="text-muted-foreground text-xs tabular-nums">
                  {stats.scores[ability]} ({signed(block.modifier[ability])})
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {facts.some(({ value }) => value) ? (
        <dl className="grid gap-1 text-sm">
          {facts.map(({ key, label, value }) =>
            value ? (
              <div key={key} className="flex gap-2">
                <dt className="text-muted-foreground w-20 shrink-0">{label}</dt>
                <dd className="min-w-0">{value}</dd>
              </div>
            ) : null,
          )}
        </dl>
      ) : null}

      {stats ? (
        <p className="text-muted-foreground border-border border-t pt-2 text-xs">
          {stats.source.adaptedFrom.length > 0 ? (
            <>
              Adapted from SRD 5.2.1{' '}
              {stats.source.adaptedFrom.map((key, index) => (
                <span key={key}>
                  {index > 0 ? ' + ' : ''}
                  <a
                    href={sourceUrl(key)}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2"
                  >
                    {sourceName(key)}
                  </a>
                </span>
              ))}
              {stats.source.changes ? '. ' : '.'}
            </>
          ) : (
            'Homebrew. '
          )}
          {stats.source.changes}
        </p>
      ) : null}
    </section>
  )
}

/** Rules terms as a comma-separated list, each explained in place. */
function termList(terms: readonly RuleRef[] | undefined) {
  if (!terms?.length) return undefined
  return terms.map((term, index) => (
    <Fragment key={term.key}>
      {index > 0 ? ', ' : ''}
      <RuleTerm rule={term}>{ruleOf(term).name.toLowerCase()}</RuleTerm>
    </Fragment>
  ))
}
