/**
 * Traces the three sky islands on the Three Sky Kingdoms map into simplified outlines, for the
 * schematic radar on the player screen. Writes them as JSON; copy them into
 * src/components/player-screen/sky-island-outlines.ts.
 */
import { writeFile } from 'node:fs/promises'

import sharp from 'sharp'
const SCALE = 4
const W = 384,
  H = 256
const { data } = await sharp('assets/images/maps/three-sky-kingdoms.png')
  .resize(W, H)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
let mask = new Float32Array(W * H)
for (let i = 0; i < W * H; i++) {
  const r = data[i * 3]!,
    b = data[i * 3 + 2]!
  mask[i] = b >= r - 4 && b > 120 ? 0 : 1
}
// Box blur twice to melt cloud speckle, then threshold.
for (let pass = 0; pass < 2; pass++) {
  const next = new Float32Array(W * H)
  const R = 3
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      let sum = 0,
        n = 0
      for (let dy = -R; dy <= R; dy++)
        for (let dx = -R; dx <= R; dx++) {
          const xx = x + dx,
            yy = y + dy
          if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue
          sum += mask[yy * W + xx]!
          n++
        }
      next[y * W + x] = sum / n
    }
  mask = next
}
const solid = new Uint8Array(W * H)
for (let i = 0; i < W * H; i++) solid[i] = mask[i]! > 0.55 ? 1 : 0
// Label components, keep the three largest.
const label = new Int32Array(W * H).fill(-1)
const sizes: number[] = []
for (let i = 0; i < W * H; i++) {
  if (!solid[i] || label[i] !== -1) continue
  const id = sizes.length
  let size = 0
  const stack = [i]
  label[i] = id
  while (stack.length) {
    const p = stack.pop()!
    size++
    const x = p % W,
      y = (p / W) | 0
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const xx = x + dx!,
        yy = y + dy!
      if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue
      const q = yy * W + xx
      if (solid[q] && label[q] === -1) {
        label[q] = id
        stack.push(q)
      }
    }
  }
  sizes.push(size)
}
const keep = sizes
  .map((s, id) => [s, id] as const)
  .sort((a, b) => b[0] - a[0])
  .slice(0, 3)
  .map(([, id]) => id)
const outlines: { x: number; y: number }[][] = []
for (const id of keep) {
  const inside = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < W && y < H && label[y * W + x] === id
  // Start at the top-left boundary pixel and walk the boundary with Moore tracing.
  let start = -1
  for (let i = 0; i < W * H && start < 0; i++) if (label[i] === id) start = i
  const sx = start % W,
    sy = (start / W) | 0
  const dirs = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ]
  const path: [number, number][] = [[sx, sy]]
  let cx = sx,
    cy = sy,
    back = 4
  for (let steps = 0; steps < 20000; steps++) {
    let found = false
    for (let k = 1; k <= 8; k++) {
      const d = (back + k) % 8
      const nx = cx + dirs[d]![0]!,
        ny = cy + dirs[d]![1]!
      if (inside(nx, ny)) {
        back = (d + 4) % 8
        cx = nx
        cy = ny
        found = true
        break
      }
    }
    if (!found || (cx === sx && cy === sy)) break
    path.push([cx, cy])
  }
  // Douglas-Peucker simplification.
  const rdp = (pts: [number, number][], eps: number): [number, number][] => {
    if (pts.length < 3) return pts
    const [a, b] = [pts[0]!, pts[pts.length - 1]!]
    let max = 0,
      at = 0
    for (let i = 1; i < pts.length - 1; i++) {
      const p = pts[i]!
      const dx = b[0] - a[0],
        dy = b[1] - a[1]
      const d =
        Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / (Math.hypot(dx, dy) || 1)
      if (d > max) {
        max = d
        at = i
      }
    }
    if (max <= eps) return [a, b]
    return [...rdp(pts.slice(0, at + 1), eps).slice(0, -1), ...rdp(pts.slice(at), eps)]
  }
  const simple = rdp(path, 0.9)
  outlines.push(
    simple.map(([x, y]) => ({
      x: Math.round((x + 0.5) * SCALE),
      y: Math.round((y + 0.5) * SCALE),
    })),
  )
}
console.log(JSON.stringify(outlines.map((o) => o.length)))
await writeFile(process.argv[2] ?? 'output/island-outlines.json', JSON.stringify(outlines))
