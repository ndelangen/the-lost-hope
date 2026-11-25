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
import type { Ability, PrintedStatBlock, StatBlock } from '#/definitions/stat-block'
import { ABILITY_ICONS } from '#/lib/ability-icons'
import { abilityAnchor, abilityGroups, type AbilityGroupKey } from '#/lib/ability-index'
import { ABILITY_KIND } from '#/lib/ability-kind-presentation'
import { abilityKind, type DerivedStats } from '#/lib/stat-block'
import { cn } from '#/lib/utils'

const GROUP_ICON = {
  action: TIMING.action.Icon,
  'bonus action': TIMING['bonus action'].Icon,
  reaction: TIMING.reaction.Icon,
  trait: TIMING.trait.Icon,
  legendary: Crown,
  lair: Castle,
} satisfies Record<AbilityGroupKey, typeof Crown>

/** A creature's full stat block for reading outside a fight: numbers, saves, and every ability written out. */
export function StatBlockSheet({
  stats,
  block,
}: {
  stats: StatBlock | PrintedStatBlock
  block: DerivedStats
}) {
  const describe = describeReferences(stats, block, {}, () => undefined)

  return (
    <div className="grid gap-4">
      <StatBlockHeadline stats={stats} block={block} />
      <StatFacts stats={stats} block={block} />
      <SavingThrows stats={stats} block={block} />
      {abilityGroups(stats).map(({ key, label, note, abilities }) => {
        const Icon = GROUP_ICON[key]
        return (
          <section key={key} aria-label={label} className="grid gap-2">
            <h3 className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
              <Icon aria-hidden className="size-4" /> {label}
            </h3>
            {note ? <p className="text-muted-foreground text-sm">{note}</p> : null}
            {abilities.map((ability) => (
              // The quick list at the top of the page jumps here; the ring shows where it landed.
              <div
                key={ability.key}
                id={abilityAnchor(ability.key)}
                className="target:ring-ring/60 scroll-mt-20 rounded-xl target:ring-4"
              >
                <AbilityDetail
                  title={<AbilityTitle ability={ability} />}
                  ability={ability}
                  block={block}
                  describe={describe}
                  className={cn('border-l-4', ABILITY_KIND[abilityKind(ability)].edge)}
                />
              </div>
            ))}
          </section>
        )
      })}
      <StatSource stats={stats} />
    </div>
  )
}

/** An ability's icon in its kind's colour, its name, its kind, and how often it can be used. */
function AbilityTitle({ ability }: { ability: Ability }) {
  const Icon = ABILITY_ICONS[ability.icon] ?? Sparkles
  const kind = ABILITY_KIND[abilityKind(ability)]
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
