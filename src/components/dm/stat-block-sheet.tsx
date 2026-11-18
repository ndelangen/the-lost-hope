import { Crown, Castle, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { AbilityButton, AbilityDetail } from '#/components/dm/encounter/ability-controls'
import { describeReferences } from '#/components/dm/encounter/ability-text'
import {
  SavingThrows,
  StatBlockHeadline,
  StatFacts,
  StatSource,
  TIMING,
} from '#/components/dm/encounter/stat-block-sections'
import { ABILITY_TIMINGS, type Ability, type StatBlock } from '#/definitions/stat-block'
import { ABILITY_ICONS } from '#/lib/ability-icons'
import type { DerivedStats } from '#/lib/stat-block'

/** How the abilities are laid out: every rule written out, or icons that open one at a time. */
export type StatBlockLayout = 'written' | 'icons'

type AbilityGroup = {
  key: string
  label: string
  Icon: typeof Crown
  note?: string
  abilities: readonly Ability[]
}

/** Traits first, then what it does on its turn, then what it does on others' turns. */
const ORDER = ['trait', ...ABILITY_TIMINGS.filter((timing) => timing !== 'trait')] as const

function abilityGroups(stats: StatBlock): AbilityGroup[] {
  const groups: AbilityGroup[] = ORDER.map((timing) => ({
    key: timing,
    ...TIMING[timing],
    abilities: stats.abilities.filter((ability) => ability.timing === timing),
  }))
  if (stats.legendary)
    groups.push({
      key: 'legendary',
      label: 'Legendary actions',
      Icon: Crown,
      note: `${stats.legendary.uses} per round, at the end of another creature's turn; spent uses come back at the start of its turn.`,
      abilities: stats.legendary.actions,
    })
  if (stats.lairActions)
    groups.push({
      key: 'lair',
      label: 'Lair actions',
      Icon: Castle,
      note: 'In its lair, one of these on initiative 20 each round; not the same one twice in a row.',
      abilities: stats.lairActions,
    })
  return groups.filter((group) => group.abilities.length > 0)
}

/** A creature's full stat block for reading outside a fight: numbers, saves, and every ability. */
export function StatBlockSheet({
  stats,
  block,
  layout,
}: {
  stats: StatBlock
  block: DerivedStats
  layout: StatBlockLayout
}) {
  const groups = abilityGroups(stats)
  const describe = describeReferences(stats, block, {}, () => undefined)

  return (
    <div className="grid gap-4">
      <StatBlockHeadline stats={stats} block={block} />
      <StatFacts stats={stats} block={block} />
      <SavingThrows stats={stats} block={block} />
      {layout === 'written' ? (
        groups.map(({ key, label, Icon, note, abilities }) => (
          <section key={key} aria-label={label} className="grid gap-2">
            <h3 className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
              <Icon aria-hidden className="size-4" /> {label}
            </h3>
            {note ? <p className="text-muted-foreground text-sm">{note}</p> : null}
            {abilities.map((ability) => (
              <AbilityDetail
                key={ability.key}
                title={<AbilityTitle ability={ability} />}
                ability={ability}
                block={block}
                describe={describe}
              />
            ))}
          </section>
        ))
      ) : (
        <AbilityIcons groups={groups} block={block} describe={describe} />
      )}
      <StatSource stats={stats} />
    </div>
  )
}

/** An ability's name with its icon and how often it can be used. */
function AbilityTitle({ ability }: { ability: Ability }) {
  const Icon = ABILITY_ICONS[ability.icon] ?? Sparkles
  return (
    <span className="flex items-center gap-2">
      <Icon aria-hidden className="text-muted-foreground size-4" />
      {ability.name}
      {ability.uses ? (
        <span className="text-muted-foreground text-sm font-normal">
          {ability.uses === 1 ? 'once' : `${ability.uses} uses`}
        </span>
      ) : null}
    </span>
  )
}

/** The encounter's icon row: one icon per ability, opening its rules below. */
function AbilityIcons({
  groups,
  block,
  describe,
}: {
  groups: readonly AbilityGroup[]
  block: DerivedStats
  describe: ReturnType<typeof describeReferences>
}) {
  const [open, setOpen] = useState<string>()
  const opened = groups.flatMap((group) => group.abilities).find((ability) => ability.key === open)
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Abilities">
        {groups.map(({ key, label, Icon, abilities }) => (
          <fieldset
            key={key}
            aria-label={label}
            className="m-0 flex min-w-0 flex-wrap items-center gap-2 border-0 p-0"
          >
            <span className="text-muted-foreground flex w-full items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
              <Icon aria-hidden className="size-4" /> {label}
            </span>
            {abilities.map((ability) => (
              <AbilityButton
                key={ability.key}
                ability={ability}
                context={label}
                expanded={open === ability.key}
                onToggle={() =>
                  setOpen((current) => (current === ability.key ? undefined : ability.key))
                }
                block={block}
              />
            ))}
          </fieldset>
        ))}
      </div>
      {opened ? (
        <AbilityDetail title={opened.name} ability={opened} block={block} describe={describe} />
      ) : null}
    </div>
  )
}
