/** A point on a map, in map pixels. */
export type MapPoint = readonly [number, number]

export type Scorch = { x: number; y: number; r: number }
export type Crack = { points: MapPoint[]; width: number }
export type Ember = { x: number; y: number; r: number }

/** The marks drawn over one compartment of a deck map. */
export type CompartmentDecals = {
  scorches: Scorch[]
  cracks: Crack[]
  embers: Ember[]
  /** Where the compartment's label sits: the middle of its outline. */
  centre: MapPoint
}

/** A small seeded generator (mulberry32), so a compartment always shows the same marks. */
function seeded(seed: number) {
  let state = seed | 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function insidePolygon([x, y]: MapPoint, polygon: readonly MapPoint[]) {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i]!
    const [xj, yj] = polygon[j]!
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

function bounds(polygon: readonly MapPoint[]) {
  const xs = polygon.map(([x]) => x)
  const ys = polygon.map(([, y]) => y)
  const left = Math.min(...xs)
  const top = Math.min(...ys)
  return { left, top, width: Math.max(...xs) - left, height: Math.max(...ys) - top }
}

/** How many marks of each kind a compartment shows at full wear. */
const MOST_SCORCHES = 6
const MOST_CRACKS = 5
const MOST_EMBERS = 7

/**
 * The damage marks for one compartment outline at a wear from 0 (none) to 1 (destroyed). Marks
 * only ever add up: a compartment at higher wear shows every mark it showed at lower wear, so
 * damage on the screen grows instead of jumping around.
 */
export function compartmentDecals(
  polygon: readonly MapPoint[],
  wear: number,
  seed: number,
): CompartmentDecals {
  const box = bounds(polygon)
  const size = Math.min(box.width, box.height)
  const random = seeded(seed * 7919 + 17)
  const pointInside = (): MapPoint => {
    for (let tries = 0; tries < 30; tries += 1) {
      const point: MapPoint = [
        box.left + box.width * (0.1 + 0.8 * random()),
        box.top + box.height * (0.1 + 0.8 * random()),
      ]
      if (insidePolygon(point, polygon)) return point
    }
    return [box.left + box.width / 2, box.top + box.height / 2]
  }

  // Every mark is generated, then only the first ones for this wear are kept.
  const scorches = Array.from({ length: MOST_SCORCHES }, (): Scorch => {
    const [x, y] = pointInside()
    return { x, y, r: size * (0.22 + 0.22 * random()) }
  })
  const cracks = Array.from({ length: MOST_CRACKS }, (): Crack => {
    let [x, y] = pointInside()
    let angle = random() * Math.PI * 2
    const points: MapPoint[] = [[x, y]]
    const steps = 4 + Math.floor(random() * 4)
    for (let step = 0; step < steps; step += 1) {
      angle += (random() - 0.5) * 1.4
      const length = size * (0.06 + 0.08 * random())
      x += Math.cos(angle) * length
      y += Math.sin(angle) * length
      points.push([x, y])
    }
    return { points, width: 2.5 + random() * 3 }
  })
  const embers = Array.from({ length: MOST_EMBERS }, (): Ember => {
    const [x, y] = pointInside()
    return { x, y, r: size * (0.05 + 0.07 * random()) }
  })

  const amount = (most: number, from: number) =>
    wear <= from ? 0 : Math.ceil(most * Math.min(1, (wear - from) / (1 - from)))
  return {
    scorches: scorches.slice(0, amount(MOST_SCORCHES, 0)),
    cracks: cracks.slice(0, amount(MOST_CRACKS, 0.15)),
    embers: embers.slice(0, amount(MOST_EMBERS, 0.5)),
    centre: [box.left + box.width / 2, box.top + box.height / 2],
  }
}
