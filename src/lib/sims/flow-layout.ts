import { type FlowLink, type SimSide, isParty } from './fight-sims'

export type FlowNode = { name: string; side: SimSide; total: number; y: number; h: number }

export type FlowPath = FlowLink & { y0: number; y1: number; w: number }

export type FlowLayout = {
  width: number
  height: number
  left: FlowNode[]
  right: FlowNode[]
  paths: FlowPath[]
  /** x of the left and right node bars. */
  x0: number
  x1: number
}

const GAP = 8
const MIN_NODE = 3
const BAR = 8

/**
 * Lays out a two-column who-hits-whom diagram. Attackers stand left with the party on top; targets
 * stand right with the enemies on top, so the party's blows run across the top and the enemies'
 * across the bottom. Bar heights and link widths are proportional to damage.
 */
export function flowLayout(
  links: readonly FlowLink[],
  { width = 640, labelWidth = 150 }: { width?: number; labelWidth?: number } = {},
): FlowLayout {
  const sum = (pick: (l: FlowLink) => string) => {
    const totals = new Map<string, { side: SimSide; total: number }>()
    for (const link of links) {
      const name = pick(link)
      const side = name === link.from ? link.fromSide : link.toSide
      const node = totals.get(name) ?? { side, total: 0 }
      node.total += link.value
      totals.set(name, node)
    }
    return [...totals.entries()].map(([name, node]) => ({ name, ...node }))
  }
  const order = (partyFirst: boolean) => (a: { side: SimSide; total: number }, b: typeof a) =>
    Number(isParty(b.side) === partyFirst) - Number(isParty(a.side) === partyFirst) ||
    b.total - a.total
  const from = sum((l) => l.from).toSorted(order(true))
  const to = sum((l) => l.to).toSorted(order(false))

  const count = Math.max(from.length, to.length)
  const height = Math.min(440, Math.max(120, count * 30))
  const total = Math.max(
    from.reduce((n, x) => n + x.total, 0),
    to.reduce((n, x) => n + x.total, 0),
    1,
  )
  const scale = (height - GAP * Math.max(count - 1, 0)) / total

  const place = (nodes: { name: string; side: SimSide; total: number }[]): FlowNode[] => {
    let y = 0
    return nodes.map((node) => {
      const h = Math.max(MIN_NODE, node.total * scale)
      const placed = { ...node, y, h }
      y += h + GAP
      return placed
    })
  }
  const left = place(from)
  const right = place(to)
  const fullHeight = Math.max(height, ...left.map((n) => n.y + n.h), ...right.map((n) => n.y + n.h))

  const leftAt = new Map(left.map((n, i) => [n.name, { node: n, i, used: 0 }]))
  const rightAt = new Map(right.map((n, i) => [n.name, { node: n, i, used: 0 }]))
  const sorted = links.toSorted(
    (a, b) =>
      leftAt.get(a.from)!.i - leftAt.get(b.from)!.i || rightAt.get(a.to)!.i - rightAt.get(b.to)!.i,
  )
  const paths = sorted.map((link) => {
    const source = leftAt.get(link.from)!
    const target = rightAt.get(link.to)!
    const w = Math.max(1, link.value * scale)
    const y0 = source.node.y + source.used + w / 2
    const y1 = target.node.y + target.used + w / 2
    source.used += w
    target.used += w
    return { ...link, y0, y1, w }
  })

  return {
    width,
    height: fullHeight,
    left,
    right,
    paths,
    x0: labelWidth,
    x1: width - labelWidth - BAR,
  }
}

export const FLOW_BAR = BAR
