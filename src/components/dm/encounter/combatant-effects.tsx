import { EffectText } from '#/components/effect-text'
import { EntityReference } from '#/components/entity-reference'
import { EFFECT_TRIGGERS } from '#/definitions/effect'
import type { LiveEffect } from '#/lib/effect-reminders'
import { cn } from '#/lib/utils'

/** The lasting campaign effects a combatant carries into the fight, read-only. */
export function CombatantEffects({
  effects,
  down,
}: {
  effects: readonly LiveEffect[]
  /** At 0 HP, "would die" reminders are what matter now. */
  down: boolean
}) {
  if (effects.length === 0) return null
  return (
    <section aria-label="Lasting effects" className="grid gap-2">
      <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        Lasting effects
      </h3>
      <ul className="grid gap-2">
        {effects.map((effect) => (
          <li key={effect.slug} className="border-border grid gap-1 rounded-lg border p-3">
            <p className="flex items-center gap-2 font-semibold">
              <EntityReference kind="effect" slug={effect.slug} label={effect.name} />
            </p>
            <EffectText text={effect.data.rules} />
            {(effect.data.triggers ?? [])
              .filter((trigger) => trigger.on === 'encounterStart' || trigger.on === 'wouldDie')
              .map((trigger) => (
                <div
                  key={trigger.on}
                  className={cn(
                    'rounded-md bg-indigo-50 px-2 py-1.5 dark:bg-indigo-950/30',
                    down && trigger.on === 'wouldDie' && 'ring-2 ring-red-500',
                  )}
                >
                  <p className="text-xs font-semibold uppercase">{EFFECT_TRIGGERS[trigger.on]}</p>
                  <EffectText text={trigger.reminder} />
                </div>
              ))}
          </li>
        ))}
      </ul>
    </section>
  )
}
