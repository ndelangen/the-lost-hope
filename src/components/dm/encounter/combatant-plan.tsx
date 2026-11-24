import { Crosshair } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { combatantPlans } from '#/lib/dm-encounter'
import type { CreatureRef } from '#/lib/encounter'

import { useDensity } from './density'
import { useEncounter } from './use-encounter-store'

/** Who this creature goes for and how, from the plan its group brings into the running fight. */
export function CombatantPlan({ source }: { source: CreatureRef }) {
  const [encounter] = useEncounter()
  const focus = useDensity() === 'focus'
  const plans = encounter ? combatantPlans(encounter, source) : []
  if (plans.length === 0) return null
  return (
    <section
      aria-label="Plan"
      className="grid gap-2 rounded-xl border-2 border-amber-500/40 bg-amber-500/10 p-3"
    >
      <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-amber-800 uppercase dark:text-amber-300">
        <Crosshair aria-hidden className="size-4" /> Plan
      </p>
      {plans.map(({ fight, plan }) => (
        <div key={fight} className="grid gap-0.5">
          {plans.length > 1 ? (
            <p className="text-muted-foreground text-xs font-semibold">{fight}</p>
          ) : null}
          <ContentRenderer content={plan} className={focus ? 'text-lg' : 'text-base'} />
        </div>
      ))}
    </section>
  )
}
