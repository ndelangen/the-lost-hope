import { useId } from 'react'
import { GiStonePile } from 'react-icons/gi'

import { useHullDamage } from '#/components/ship/use-hull-damage'
import { sectorWear, shipSectors } from '#/lib/ship-damage'
import { compartmentDecals } from '#/lib/ship-decals'
import type { ShipDeckMap } from '#/lib/ship-decks'
import { cn } from '#/lib/utils'

/**
 * Damage drawn over a deck map: scorch marks and cracks that grow with each sector's damage, and
 * a destroyed sector hatched, burning and labelled as difficult terrain. It fills its box,
 * which must have the map's shape.
 */
export function ShipDamageDecals({
  deck,
  width,
  height,
  className,
}: {
  deck: ShipDeckMap
  width: number
  height: number
  className?: string
}) {
  const [hull] = useHullDamage(deck.vesselKey, deck.hull)
  const id = useId().replaceAll(':', '')
  const compartments = shipSectors(deck.hull, hull).map((sector) => {
    const area = deck.areas[sector.index] ?? []
    const wear = sectorWear(sector, deck.hull.sectorHitPoints)
    return { ...sector, area, decals: compartmentDecals(area, wear, sector.index + 1) }
  })

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0', className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        <defs>
          <radialGradient id={`${id}-scorch`}>
            <stop offset="0%" stopColor="rgb(6 3 1)" stopOpacity="0.92" />
            <stop offset="50%" stopColor="rgb(28 12 4)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="rgb(40 20 8)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-ember`}>
            <stop offset="0%" stopColor="rgb(255 236 170)" stopOpacity="0.95" />
            <stop offset="35%" stopColor="rgb(255 140 30)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="rgb(200 40 0)" stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`${id}-hatch`}
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="56" height="56" fill="rgb(20 6 2 / 0.35)" />
            <rect width="18" height="56" fill="rgb(220 38 38 / 0.45)" />
          </pattern>
          {compartments.map((compartment) => (
            <clipPath key={compartment.index} id={`${id}-clip-${compartment.index}`}>
              <polygon points={compartment.area.map((point) => point.join(',')).join(' ')} />
            </clipPath>
          ))}
        </defs>
        {compartments.map(({ index, area, decals, destroyed }) => (
          <g key={index} clipPath={`url(#${id}-clip-${index})`}>
            {destroyed ? (
              <polygon
                points={area.map((point) => point.join(',')).join(' ')}
                fill={`url(#${id}-hatch)`}
              />
            ) : null}
            {decals.scorches.map((scorch, at) => (
              <circle
                key={`s${at}`}
                cx={scorch.x}
                cy={scorch.y}
                r={scorch.r}
                fill={`url(#${id}-scorch)`}
              />
            ))}
            {decals.cracks.map((crack, at) => {
              const points = crack.points.map((point) => point.join(',')).join(' ')
              return (
                <g key={`c${at}`} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline
                    points={points}
                    stroke="rgb(255 170 80 / 0.35)"
                    strokeWidth={crack.width + 5}
                  />
                  <polyline points={points} stroke="rgb(6 2 0 / 0.95)" strokeWidth={crack.width} />
                </g>
              )
            })}
            <g className="animate-pulse">
              {decals.embers.map((ember, at) => (
                <circle
                  key={`e${at}`}
                  cx={ember.x}
                  cy={ember.y}
                  r={ember.r}
                  fill={`url(#${id}-ember)`}
                  style={{ animationDelay: `${(at * 370) % 1500}ms` }}
                />
              ))}
            </g>
            {destroyed ? (
              <polygon
                points={area.map((point) => point.join(',')).join(' ')}
                fill="none"
                stroke="rgb(239 68 68)"
                strokeWidth="10"
                strokeDasharray="28 18"
              />
            ) : null}
          </g>
        ))}
      </svg>
      {compartments
        .filter((compartment) => compartment.destroyed)
        .map(({ index, decals }) => (
          <span
            key={index}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.4cqw] rounded-full bg-red-700/85 px-[0.8cqw] py-[0.3cqw] text-[1.05cqw] font-bold whitespace-nowrap text-white shadow-lg ring-2 ring-white/70"
            style={{
              left: `${(decals.centre[0] / width) * 100}%`,
              top: `${(decals.centre[1] / height) * 100}%`,
            }}
          >
            <GiStonePile className="size-[1.3cqw]" />
            Difficult terrain
          </span>
        ))}
    </div>
  )
}
