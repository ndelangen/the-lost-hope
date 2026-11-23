import { type FlowLink, type SimSide } from '#/lib/sims/fight-sims'
import { FLOW_BAR, flowLayout } from '#/lib/sims/flow-layout'
import { cn } from '#/lib/utils'

const SIDE_FILL: Record<SimSide, string> = {
  pc: 'fill-[#2a78d6] dark:fill-[#3987e5]',
  ally: 'fill-[#1baf7a] dark:fill-[#199e70]',
  foe: 'fill-[#eb6834] dark:fill-[#d95926]',
}

const SIDE_STROKE: Record<SimSide, string> = {
  pc: 'stroke-[#2a78d6] dark:stroke-[#3987e5]',
  ally: 'stroke-[#1baf7a] dark:stroke-[#199e70]',
  foe: 'stroke-[#eb6834] dark:stroke-[#d95926]',
}

function linkTitle(link: FlowLink, unit: string) {
  const parts = [`${link.from} → ${link.to}: ${link.value} ${unit}`]
  if (link.hits) parts.push(`${link.hits} ${link.hits === 1 ? 'hit' : 'hits'}`)
  if (link.crits) parts.push(`${link.crits} ${link.crits === 1 ? 'crit' : 'crits'}`)
  return parts.join(', ')
}

/** Who hit whom: attackers on the left, targets on the right, band width by damage. */
export function FlowDiagram({
  links,
  unit = 'damage',
  label,
  width,
}: {
  links: readonly FlowLink[]
  unit?: string
  label: string
  /** Narrower drawings scale their labels up in a narrow column. */
  width?: number
}) {
  if (links.length === 0) {
    return <p className="text-muted-foreground text-sm">Nobody took damage.</p>
  }
  const layout = flowLayout(links, width ? { width, labelWidth: 120 } : undefined)
  const pad = 10
  return (
    <svg viewBox={`0 ${-pad} ${layout.width} ${layout.height + pad * 2}`} className="h-auto w-full">
      <title>{label}</title>
      <g className="opacity-60 [&>path:hover]:opacity-100">
        {layout.paths.map((path) => {
          const xa = layout.x0 + FLOW_BAR
          const xb = layout.x1
          const mid = (xa + xb) / 2
          return (
            <path
              key={`${path.from}>${path.to}`}
              d={`M${xa},${path.y0} C${mid},${path.y0} ${mid},${path.y1} ${xb},${path.y1}`}
              className={cn('fill-none transition-opacity', SIDE_STROKE[path.fromSide])}
              strokeWidth={path.w}
            >
              <title>{linkTitle(path, unit)}</title>
            </path>
          )
        })}
      </g>
      {layout.left.map((node) => (
        <g key={`l-${node.name}`}>
          <rect
            x={layout.x0}
            y={node.y}
            width={FLOW_BAR}
            height={node.h}
            rx={2}
            className={SIDE_FILL[node.side]}
          />
          <text
            x={layout.x0 - 6}
            y={node.y + node.h / 2}
            textAnchor="end"
            dominantBaseline="middle"
            className="fill-foreground text-[13px]"
          >
            {node.name}{' '}
            <tspan className="fill-muted-foreground tabular-nums">{Math.round(node.total)}</tspan>
          </text>
        </g>
      ))}
      {layout.right.map((node) => (
        <g key={`r-${node.name}`}>
          <rect
            x={layout.x1}
            y={node.y}
            width={FLOW_BAR}
            height={node.h}
            rx={2}
            className={SIDE_FILL[node.side]}
          />
          <text
            x={layout.x1 + FLOW_BAR + 6}
            y={node.y + node.h / 2}
            dominantBaseline="middle"
            className="fill-foreground text-[13px]"
          >
            {node.name}{' '}
            <tspan className="fill-muted-foreground tabular-nums">{Math.round(node.total)}</tspan>
          </text>
        </g>
      ))}
    </svg>
  )
}
