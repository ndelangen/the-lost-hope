import { EffectText } from '#/components/effect-text'
import { EntityReference } from '#/components/entity-reference'
import { Inline, Stack } from '#/components/ui/layout'
import type { EffectEntry } from '#/lib/campaign'
import { EffectIcon } from '#/lib/effect-icons'
import { EFFECT_STATUS_LABELS } from '#/lib/effects'
import { cn } from '#/lib/utils'

/** The lasting effects carried by one PC, NPC, or beast, active first. */
export function EffectList({ entries }: { entries: readonly EffectEntry[] }) {
  if (entries.length === 0) return null
  return (
    <Stack as="section" gap="sm" aria-labelledby="effects-heading">
      <h2 id="effects-heading" className="text-lg font-semibold">
        Effects
      </h2>
      <ul className="divide-border border-border divide-y rounded-lg border">
        {entries.map(({ effect, status }) => (
          <li
            key={effect.slug}
            className={cn('flex gap-3 p-3', status !== 'active' && 'opacity-60')}
          >
            <EffectIcon
              icon={effect.data.icon}
              className="mt-0.5 size-6 text-indigo-600 dark:text-indigo-300"
            />
            <Stack gap="xs" className="min-w-0">
              <Inline gap="sm" className="items-baseline">
                <EntityReference kind="effect" slug={effect.slug} label={effect.data.name} />
                <EffectStatusPill status={status} />
              </Inline>
              <EffectText text={effect.data.rules.slice(0, 1)} className="text-muted-foreground" />
            </Stack>
          </li>
        ))}
      </ul>
    </Stack>
  )
}

export function EffectStatusPill({ status }: { status: EffectEntry['status'] }) {
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-xs font-semibold',
        status === 'active'
          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
          : 'bg-muted text-muted-foreground',
      )}
    >
      {EFFECT_STATUS_LABELS[status]}
    </span>
  )
}
