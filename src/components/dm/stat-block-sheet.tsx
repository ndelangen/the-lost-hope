import { Castle, Crown, Sparkles } from 'lucide-react'

import { AbilityDetail } from '#/components/dm/encounter/ability-controls'
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
import { abilityKind, type AbilityKind, type DerivedStats } from '#/lib/stat-block'
import { cn } from '#/lib/utils'

type AbilityGroup = {
  key: string
  label: string
  Icon: typeof Crown
  note?: string
  abilities: readonly Ability[]
}

const RED = 'text-red-600 dark:text-red-400 border-red-500/40 bg-red-500/10'
const AMBER = 'text-amber-700 dark:text-amber-400 border-amber-500/40 bg-amber-500/10'

/** Each kind of ability's label, icon-and-badge colour, and card edge, so attacks stand out. */
const KIND = {
  melee: { label: 'Melee attack', tone: RED, edge: 'border-l-red-500' },
  ranged: { label: 'Ranged attack', tone: RED, edge: 'border-l-red-500' },
  attack: { label: 'Attack', tone: RED, edge: 'border-l-red-500' },
  save: { label: 'Saving throw', tone: AMBER, edge: 'border-l-amber-500' },
  healing: {
    label: 'Healing',
    tone: 'text-emerald-700 dark:text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    edge: 'border-l-emerald-500',
  },
  other: {
    label: 'Ability',
    tone: 'text-sky-700 dark:text-sky-400 border-sky-500/40 bg-sky-500/10',
    edge: 'border-l-sky-500',
  },
} satisfies Record<AbilityKind, { label: string; tone: string; edge: string }>

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

/** A creature's full stat block for reading outside a fight: numbers, saves, and every ability written out. */
export function StatBlockSheet({ stats, block }: { stats: StatBlock; block: DerivedStats }) {
  const describe = describeReferences(stats, block, {}, () => undefined)

  return (
    <div className="grid gap-4">
      <StatBlockHeadline stats={stats} block={block} />
      <StatFacts stats={stats} block={block} />
      <SavingThrows stats={stats} block={block} />
      {abilityGroups(stats).map(({ key, label, Icon, note, abilities }) => (
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
              className={cn('border-l-4', KIND[abilityKind(ability)].edge)}
            />
          ))}
        </section>
      ))}
      <StatSource stats={stats} />
    </div>
  )
}

/** An ability's icon in its kind's colour, its name, its kind, and how often it can be used. */
function AbilityTitle({ ability }: { ability: Ability }) {
  const Icon = ABILITY_ICONS[ability.icon] ?? Sparkles
  const kind = KIND[abilityKind(ability)]
  return (
    <span className="flex flex-wrap items-center gap-2">
      <span
        aria-hidden
        className={cn(
          'flex size-8 items-center justify-center rounded-lg border [&_svg]:size-5',
          kind.tone,
        )}
      >
        <Icon />
      </span>
      {ability.name}
      <span className={cn('rounded-full border px-2 py-0.5 text-xs font-semibold', kind.tone)}>
        {kind.label}
      </span>
      {ability.uses ? (
        <span className="text-muted-foreground text-sm font-normal">
          {ability.uses === 1 ? 'once' : `${ability.uses} uses`}
        </span>
      ) : null}
    </span>
  )
}
