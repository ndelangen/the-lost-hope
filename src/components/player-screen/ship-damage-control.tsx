import { DifficultTerrainBadge } from '#/components/ship/difficult-terrain-badge'
import { useHullDamage } from '#/components/ship/use-hull-damage'
import { setSectorDamage, setSectorDestroyed, shipSectors } from '#/lib/ship-damage'
import type { ShipDeckMap } from '#/lib/ship-decks'
import { cn } from '#/lib/utils'

const SIDES = [
  { side: 'starboard', label: 'Starboard' },
  { side: 'port', label: 'Port' },
] as const

/**
 * Each sector's damage and whether it is destroyed, set from the DM's dock while a deck map of the
 * vessel is on the player screen. The map shows the damage live, and the scene's ship-damage clock
 * works on the same numbers.
 */
export function ShipDamageControl({ deck }: { deck: ShipDeckMap }) {
  const [hull, update] = useHullDamage(deck.vesselKey, deck.hull)
  const hitPoints = deck.hull.sectorHitPoints
  const sectors = shipSectors(deck.hull, hull)

  return (
    <section aria-label={`Damage to ${deck.vesselName}`} className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Ship damage
        </h3>
        <span className="text-muted-foreground text-xs">{hitPoints} damage destroys a sector</span>
      </div>
      {SIDES.map(({ side, label }) => (
        <div key={side} className="flex flex-col gap-1">
          <h4 className="text-muted-foreground text-[11px] font-semibold uppercase">
            {label}, bow to stern
          </h4>
          {sectors
            .filter((sector) => sector.side === side)
            .map((sector) => (
              <div
                key={sector.index}
                className={cn(
                  'flex h-11 items-center gap-2 rounded-md px-1',
                  sector.destroyed && 'bg-red-500/10',
                )}
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">{sector.name}</span>
                  {sector.destroyed ? <DifficultTerrainBadge className="self-start" /> : null}
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={hitPoints}
                  value={sector.damage}
                  aria-label={`${sector.name} damage`}
                  onFocus={(event) => event.target.select()}
                  onChange={(event) =>
                    update((current) =>
                      setSectorDamage(
                        current,
                        deck.hull,
                        sector.index,
                        Number(event.target.value) || 0,
                      ),
                    )
                  }
                  className={cn(
                    'border-border bg-background h-10 w-14 shrink-0 rounded-md border px-1 text-center text-base font-semibold tabular-nums outline-none focus-visible:ring-2',
                    sector.destroyed && 'border-red-500',
                  )}
                />
                <label className="hover:bg-muted flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={sector.destroyed}
                    onChange={(event) =>
                      update((current) =>
                        setSectorDestroyed(current, deck.hull, sector.index, event.target.checked),
                      )
                    }
                    className="size-5 accent-red-600"
                  />
                  Destroyed
                </label>
              </div>
            ))}
        </div>
      ))}
    </section>
  )
}
