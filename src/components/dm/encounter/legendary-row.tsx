import { Crown } from 'lucide-react'

import type { Ability, PrintedStatBlock, StatBlock } from '#/definitions/stat-block'
import type { DerivedStatBlock } from '#/lib/dm-ability-text'
import { LEGENDARY_POOL, type UseCount } from '#/lib/encounter'
import { cn } from '#/lib/utils'

import { AbilityButton, AbilityDetail } from './ability-controls'
import { describeReferences } from './ability-text'
import type { UseActions } from './combatant-panel'
import { useDensity } from './density'

export type LegendaryGroup = {
  id: string
  name: string
  actions: readonly Ability[]
  pool: UseCount
  stats: StatBlock | PrintedStatBlock
  block: DerivedStatBlock
}

/** Every creature's legendary actions, within reach between initiative and the roster. */
export function LegendaryRow({
  groups,
  open,
  onToggle,
  actionsFor,
}: {
  groups: readonly LegendaryGroup[]
  open: { id: string; name: string } | undefined
  onToggle: (id: string, name: string) => void
  actionsFor: (id: string) => UseActions
}) {
  const density = useDensity()
  if (groups.length === 0) return null
  const openGroup = groups.find((group) => group.id === open?.id)
  const openAction = openGroup?.actions.find((action) => action.name === open?.name)

  return (
    <section
      aria-label="Legendary actions"
      className={cn(
        'border-border bg-card grid gap-3 p-3',
        density === 'focus' ? 'rounded-2xl border-2' : 'rounded-xl border',
      )}
    >
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {groups.map((group) => (
          <fieldset
            key={group.id}
            aria-label={`${group.name} legendary actions, ${group.pool.uses} shared uses left`}
            className="m-0 flex min-w-0 items-center gap-1.5 border-0 p-0"
          >
            <span className="relative inline-flex text-amber-600">
              <Crown aria-hidden className={density === 'focus' ? 'size-6' : 'size-5'} />
              <span
                aria-hidden
                className="bg-foreground text-background absolute -top-2 -right-2 min-w-4 rounded-full px-1 text-center text-[10px] leading-4 font-semibold"
              >
                {group.pool.uses}
              </span>
            </span>
            <span className="mr-1 ml-2 font-semibold">{group.name}</span>
            {group.actions.map((action) => (
              <AbilityButton
                key={action.name}
                ability={action}
                context="Legendary action"
                count={group.pool}
                showCount={false}
                expanded={open?.id === group.id && open.name === action.name}
                onToggle={() => onToggle(group.id, action.name)}
                block={group.block}
              />
            ))}
          </fieldset>
        ))}
      </div>
      {openGroup && openAction ? (
        <AbilityDetail
          title={`${openGroup.name} · ${openAction.name}`}
          ability={openAction}
          uses={{
            count: openGroup.pool,
            onUse: () =>
              openAction.cost
                ? actionsFor(openGroup.id).setUses(
                    LEGENDARY_POOL,
                    'uses',
                    Math.max(0, openGroup.pool.uses - openAction.cost),
                  )
                : actionsFor(openGroup.id).use(LEGENDARY_POOL, openGroup.pool),
            onRecharge: () => actionsFor(openGroup.id).recharge(LEGENDARY_POOL, openGroup.pool),
            onSetUses: (value) => actionsFor(openGroup.id).setUses(LEGENDARY_POOL, 'uses', value),
            onSetMaxUses: (value) =>
              actionsFor(openGroup.id).setUses(LEGENDARY_POOL, 'maxUses', value),
          }}
          block={openGroup.block}
          describe={describeReferences(openGroup.stats, openGroup.block, {}, () => undefined)}
        />
      ) : null}
    </section>
  )
}
