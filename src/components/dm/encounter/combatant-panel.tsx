import { ExternalLink, RotateCcw, ScrollText, Shield, UserMinus } from 'lucide-react'
import type { ReactNode } from 'react'

import { RuleTerm } from '#/components/rule-term'
import { refs } from '#/data/generated/refs'
import type { Ability } from '#/definitions/stat-block'
import { abilityIndex } from '#/lib/ability-index'
import type { CombatantView } from '#/lib/dm-encounter'
import { abilityKey, type LiveStats, type UseCount } from '#/lib/encounter'
import type { AbilityId } from '#/lib/encounter-combat'
import { cn } from '#/lib/utils'

import { AbilityQuickList } from '../ability-quick-list'
import { AbilityDetail } from './ability-controls'
import { describeReferences } from './ability-text'
import { AbilityEffect, type ApplyEffectActions } from './apply-effect'
import type { CombatStatusActions } from './combat-status'
import { ActionBar, type CombatantActsProps } from './combatant-acts'
import { CombatantPlan } from './combatant-plan'
import { useDensity } from './density'
import { EditableNumber, HpControl } from './hp-control'
import { IconButton } from './icon-button'
import { SavingThrows, StatBlockHeadline, StatFacts, StatSource } from './stat-block-sections'

export type UseActions = {
  use: (key: string, count: UseCount) => void
  recharge: (key: string, count: UseCount) => void
  setUses: (key: string, field: 'uses' | 'maxUses', value: number) => void
}

export type CombatantActions = UseActions & {
  setStat: (field: 'hp' | 'maxHp' | 'ac', value: number) => void
  adjustHp: (delta: number) => void
  reset: () => void
  /** Take this combatant out of the fight altogether. */
  remove: () => void
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
  applyEffects,
  addStatus,
}: {
  combatant: CombatantView
  isActive: boolean
  live: LiveStats
  counts: Readonly<Record<string, UseCount | undefined>>
  openAbility: string | undefined
  actions: CombatantActions
  /** Conditions, concentration, and 0 HP for this combatant. */
  status?: ReactNode
  /** Applying an open ability's effect to whoever it hits. */
  applyEffects?: ApplyEffectActions
  /** Starting a condition or concentration by hand, from the panel's actions. */
  addStatus?: Pick<CombatStatusActions, 'addCondition' | 'setConcentration'>
}) {
  const focus = useDensity() === 'focus'
  const { stats, derived: block } = combatant
  const abilities = stats?.abilities ?? []
  const open = abilities.find((ability) => abilityKey(ability.timing, ability.name) === openAbility)
  // Legendary and lair actions have a row of their own above the roster.
  const quickGroups = stats
    ? abilityIndex(stats).filter((group) => group.key !== 'legendary' && group.key !== 'lair')
    : []
  const usesLeft = Object.fromEntries(
    abilities.map((ability) => [
      ability.key,
      counts[abilityKey(ability.timing, ability.name)]?.uses,
    ]),
  )
  const openKey = open ? abilityKey(open.timing, open.name) : undefined
  const openCount = openKey ? counts[openKey] : undefined
  const detail =
    open && openKey ? (
      <AbilityDetail
        title={open.name}
        ability={open}
        uses={
          openCount && {
            count: openCount,
            onUse: () => actions.use(openKey, openCount),
            onRecharge: () => actions.recharge(openKey, openCount),
            onSetUses: (value) => actions.setUses(openKey, 'uses', value),
            onSetMaxUses: (value) => actions.setUses(openKey, 'maxUses', value),
          }
        }
        block={block!}
        describe={describeReferences(stats!, block!, counts, actions.use)}
      >
        {applyEffects ? (
          <AbilityEffect
            key={open.key}
            ability={open}
            block={block!}
            source={combatant.id}
            sourceName={combatant.name}
            actions={applyEffects}
          />
        ) : null}
      </AbilityDetail>
    ) : null
  const acts: CombatantActsProps = {
    combatant,
    onAdjustHp: combatant.tracked && live.hp !== undefined ? actions.adjustHp : undefined,
    status: addStatus,
    casterDc: spellSaveDc(abilities, block),
    effects: applyEffects,
  }
  return (
    <section
      aria-labelledby="combatant-heading"
      className="border-border bg-card grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-4 rounded-xl border p-4"
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
          {stats && block ? <StatBlockHeadline stats={stats} block={block} /> : null}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {combatant.sheetUrl ? (
            <a
              href={combatant.sheetUrl}
              target="_blank"
              rel="noreferrer"
              className="border-border hover:bg-muted flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-semibold"
            >
              <ScrollText aria-hidden className="size-4" />
              Character sheet
              <ExternalLink aria-hidden className="text-muted-foreground size-3.5" />
            </a>
          ) : null}
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
          <IconButton
            label={`Remove ${combatant.name} from the fight`}
            size="sm"
            tone="ghost"
            onClick={actions.remove}
          >
            <UserMinus aria-hidden />
          </IconButton>
          {isActive ? (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
              Current turn
            </span>
          ) : null}
        </div>
      </header>

      {combatant.source ? <CombatantPlan source={combatant.source} /> : null}

      {combatant.tracked ? (
        <div className="flex flex-wrap items-start gap-3">
          <HpControl
            name={combatant.name}
            live={live}
            onAdjust={actions.adjustHp}
            onSet={actions.setStat}
            // The action bar holds damage and healing with everything else.
            quickEntry={false}
          />
          <div className="flex flex-wrap items-center gap-3">
            <div
              // As tall as the HP counter beside it, so both read at a glance.
              className={cn(
                'border-border bg-card flex items-center gap-2 pr-1 pl-3',
                focus ? 'h-14 rounded-xl border-2' : 'h-10 rounded-lg border',
              )}
            >
              <Shield
                aria-hidden
                className={cn('text-muted-foreground', focus ? 'size-7' : 'size-5')}
              />
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
                  focus ? 'h-11 w-16 text-3xl' : 'h-8 w-10 text-lg',
                )}
              />
            </div>
          </div>
        </div>
      ) : null}

      {status}

      {/* Keyed by combatant, so an open picker never follows the DM to another creature. */}
      <ActionBar key={combatant.id} {...acts} />

      {abilities.length > 0 ? (
        <div className="grid gap-2">
          <AbilityQuickList
            groups={quickGroups}
            current={open?.key}
            usesLeft={usesLeft}
            onSelect={(entry) => {
              const ability = abilities.find((candidate) => candidate.key === entry.key)
              if (ability) actions.toggleAbility(abilityKey(ability.timing, ability.name))
            }}
            detail={detail}
          />
        </div>
      ) : null}

      {stats && block ? (
        <>
          <SavingThrows block={block} />
          <StatFacts stats={stats} block={block} />
          <StatSource stats={stats} />
        </>
      ) : null}
    </section>
  )
}

/** The caster's spell save DC: the DC its spellcasting trait names, when it has one. */
function spellSaveDc(
  abilities: readonly Ability[],
  block: CombatantView['derived'],
): number | undefined {
  const casting = abilities.find(
    (ability) => ability.key === 'spellcasting' || /spellcasting|pact magic/i.test(ability.name),
  )
  const token = casting?.text.find(
    (candidate): candidate is { dc: AbilityId; printed?: number } =>
      typeof candidate === 'object' && 'dc' in candidate,
  )
  if (!token) return undefined
  return token.printed ?? block?.saveDc[token.dc]
}
