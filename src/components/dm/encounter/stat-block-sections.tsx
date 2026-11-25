import { PawPrint, Shield, Swords, Zap } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'

import { RuleTerm } from '#/components/rule-term'
import { refs } from '#/data/generated/refs'
import type { AbilityTiming } from '#/definitions/stat-block'
import { ABILITY_GROUP_LABEL } from '#/lib/ability-index'
import { ABILITY_KEYS, ruleOf, ruleRef, type RuleRef } from '#/lib/rules'
import {
  formatSpeed,
  signed,
  sourceName,
  sourceUrl,
  type AnyStatBlock,
  type DerivedStats,
} from '#/lib/stat-block'
import { cn } from '#/lib/utils'

/** How each ability timing is labelled and drawn. */
export const TIMING = {
  action: { label: ABILITY_GROUP_LABEL.action, Icon: Swords },
  'bonus action': { label: ABILITY_GROUP_LABEL['bonus action'], Icon: Zap },
  reaction: { label: ABILITY_GROUP_LABEL.reaction, Icon: Shield },
  trait: { label: ABILITY_GROUP_LABEL.trait, Icon: PawPrint },
} satisfies Record<AbilityTiming, unknown>

/** "beasts", "monstrosities": a creature type as a swarm names its members. */
function plural(type: string) {
  return type.endsWith('y') ? type.slice(0, -1) + 'ies' : type + 's'
}

/** Size, creature type, challenge with its experience (a PC's level), and proficiency bonus. */
export function StatBlockHeadline({ stats, block }: { stats: AnyStatBlock; block: DerivedStats }) {
  return (
    <p className="text-muted-foreground text-sm">
      <RuleTerm rule={ruleRef(stats.size)} />{' '}
      {stats.swarmOf ? (
        <>
          swarm of <RuleTerm rule={ruleRef(stats.swarmOf)} />{' '}
          <RuleTerm rule={ruleRef(stats.type)}>
            {plural(ruleOf(ruleRef(stats.type)).name.toLowerCase())}
          </RuleTerm>
        </>
      ) : (
        <RuleTerm rule={ruleRef(stats.type)}>
          {ruleOf(ruleRef(stats.type)).name.toLowerCase()}
        </RuleTerm>
      )}{' '}
      ·{' '}
      {'cr' in stats ? (
        <>
          <RuleTerm rule={refs.rules.challenge_rating} /> {stats.cr} ({block.experience} XP)
        </>
      ) : (
        <>level {stats.level}</>
      )}{' '}
      · <RuleTerm rule={refs.rules.proficiency_bonus} /> {signed(block.proficiencyBonus)}
    </p>
  )
}

/** Every saving throw with its ability score, proficient saves outlined. */
export function SavingThrows({ stats, block }: { stats: AnyStatBlock; block: DerivedStats }) {
  return (
    <section aria-labelledby="saves-heading" className="grid gap-1">
      <h3 id="saves-heading" className="text-muted-foreground text-xs font-semibold uppercase">
        <RuleTerm rule={refs.rules.saving_throw}>Saving throws</RuleTerm>
      </h3>
      <dl className="grid grid-cols-3 gap-2">
        {ABILITY_KEYS.map((ability) => (
          <div
            key={ability}
            className={cn(
              'bg-muted/50 rounded-md px-2 py-1',
              stats.saves?.[ability] && 'ring-foreground/30 ring-1',
            )}
          >
            <dt className="text-muted-foreground text-xs">
              <RuleTerm rule={ruleRef(ability)}>{ruleOf(ruleRef(ability)).name}</RuleTerm>
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
  )
}

type Fact = { key: string; label: ReactNode; value: ReactNode }

/** Hit points, armor, initiative, speed, skills, senses, and damage defences as a short list. */
export function StatFacts({ stats, block }: { stats: AnyStatBlock; block: DerivedStats }) {
  const immune = [...(stats.damageImmunities ?? []), ...(stats.conditionImmunities ?? [])]
  const facts: readonly Fact[] = [
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
      value: joined(
        block.skills.map(({ skill, bonus }) => (
          <Fragment key={skill}>
            <RuleTerm rule={ruleRef(skill)} /> {signed(bonus)}
          </Fragment>
        )),
      ),
    },
    {
      key: 'senses',
      label: 'Senses',
      value: joined([
        ...block.senses.map(({ sense, feet }) => (
          <Fragment key={sense}>
            <RuleTerm rule={ruleRef(sense)} /> {feet} ft.
          </Fragment>
        )),
        <Fragment key="passive">
          <RuleTerm rule={refs.rules.passive_perception} /> {block.passivePerception}
        </Fragment>,
      ]),
    },
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

  return (
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
  )
}

/** Which SRD creatures the block adapts, and what changed, or that it is homebrew. */
export function StatSource({ stats }: { stats: AnyStatBlock }) {
  if (!('cr' in stats))
    return (
      <p className="text-muted-foreground border-border border-t pt-2 text-xs">
        From the player’s character sheet.
      </p>
    )
  // A library printing names its publication itself.
  if (!('source' in stats)) return null
  return (
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

/** Items separated by commas. */
function joined(items: readonly ReactNode[]) {
  if (items.length === 0) return undefined
  return items.map((item, index) => (
    // oxlint-disable-next-line react/no-array-index-key -- separators follow their item
    <Fragment key={index}>
      {index > 0 ? ', ' : ''}
      {item}
    </Fragment>
  ))
}
