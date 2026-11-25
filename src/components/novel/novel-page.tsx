import { Link } from '@tanstack/react-router'

import { artTargetSize, formatAspect, type NovelPage, type NovelPanel } from '#/lib/novel-data'
import { PAGE, type PanelShape, svgPoints } from '#/lib/novel-geometry'
import { publicAssetUrl, responsiveImageFor } from '#/lib/public-media'
import { cn } from '#/lib/utils'

/** One printed comic page, drawn as a single picture so panels can take any shape. */
export function NovelPageSheet({ page, className }: { page: NovelPage; className?: string }) {
  const missingPatternId = `novel-missing-${page.number}`
  const panels = page.panels.map((panel) => ({ panel, shape: panel.shape }))
  // Insets are drawn after the panels they sit on.
  const drawOrder = [
    ...panels.filter(({ panel }) => !panel.cell.inset),
    ...panels.filter(({ panel }) => panel.cell.inset),
  ]

  return (
    <svg
      viewBox={`0 0 ${PAGE.width} ${PAGE.height}`}
      aria-label={`Page ${page.number}`}
      className={cn('aspect-[2/3] bg-white shadow-[0_20px_50px_rgb(0_0_0/0.5)]', className)}
    >
      <defs>
        {panels.map(({ panel, shape }) => (
          <clipPath key={panel.id} id={clipId(panel)}>
            <polygon points={svgPoints(shape.inner)} />
          </clipPath>
        ))}
        <pattern
          id={missingPatternId}
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="28" height="28" fill="#fee2e2" />
          <rect width="14" height="28" fill="#fecaca" />
        </pattern>
      </defs>
      <rect width={PAGE.width} height={PAGE.height} fill="white" />
      {drawOrder.map(({ panel, shape }) => (
        <ComicPanel
          key={panel.id}
          panel={panel}
          shape={shape}
          missingPatternId={missingPatternId}
        />
      ))}
    </svg>
  )
}

const clipId = (panel: NovelPanel) => `novel-panel-${panel.id}`

function ComicPanel({
  panel,
  shape,
  missingPatternId,
}: {
  panel: NovelPanel
  shape: PanelShape
  missingPatternId: string
}) {
  const { box } = shape
  const { status } = panel
  const corner = shape.inner.reduce((best, point) =>
    point[0] + point[1] < best[0] + best[1] ? point : best,
  )

  return (
    <Link to="/events/detail/$slug" params={{ slug: panel.eventSlug }} className="group">
      <title>{panel.eventName}</title>
      {shape.halo ? <polygon points={svgPoints(shape.halo)} fill="white" /> : null}
      <polygon points={svgPoints(shape.outer)} fill="black" />
      <g clipPath={`url(#${clipId(panel)})`}>
        {panel.src ? (
          <image
            href={pictureFor(panel.src, box.width)}
            x={box.x}
            y={box.y}
            width={box.width}
            height={box.height}
            preserveAspectRatio="xMidYMid slice"
          />
        ) : (
          <MissingArt panel={panel} shape={shape} patternId={missingPatternId} />
        )}
        <rect
          x={box.x}
          y={box.y}
          width={box.width}
          height={box.height}
          className="fill-white opacity-0 transition-opacity group-hover:opacity-10"
        />
        {panel.opensChapter ? (
          <ChapterCaption
            panel={panel}
            corner={corner}
            width={Math.min(560, box.x + box.width - corner[0])}
          />
        ) : panel.dayStart ? (
          <g>
            <rect
              x={corner[0] - 2}
              y={corner[1] - 2}
              width={58 + String(panel.day).length * 11}
              height={28}
              fill="white"
              stroke="black"
              strokeWidth={4}
            />
            <text
              x={corner[0] + 9}
              y={corner[1] + 19}
              fontSize={15}
              fontWeight={900}
              letterSpacing={2}
              fill="black"
            >
              DAY {panel.day}
            </text>
          </g>
        ) : null}
        {status.type === 'regenerate' || status.type === 'extend' ? (
          <foreignObject x={box.x} y={box.y} width={box.width} height={box.height}>
            <div className="flex h-full flex-col justify-end">
              <p
                className={cn(
                  'line-clamp-3 border-t-4 border-black px-2.5 py-1 text-[15px] leading-snug text-black',
                  status.type === 'regenerate' ? 'bg-amber-300' : 'bg-sky-300',
                )}
              >
                <strong>
                  {status.type === 'regenerate'
                    ? 'Regenerate:'
                    : `Extend to ${formatAspect(panel.aspect)}:`}
                </strong>{' '}
                {status.note}
              </p>
            </div>
          </foreignObject>
        ) : null}
      </g>
    </Link>
  )
}

/** The smallest prepared size of a picture that is still sharp at this panel width. */
function pictureFor(src: string, width: number): string {
  const candidates = responsiveImageFor(src)?.candidates ?? []
  const sharp = candidates.find((candidate) => candidate.width >= width * 1.3)
  return (sharp ?? candidates.at(-1))?.src ?? publicAssetUrl(src, src)
}

function MissingArt({
  panel,
  shape,
  patternId,
}: {
  panel: NovelPanel
  shape: PanelShape
  patternId: string
}) {
  const { box } = shape
  const size = artTargetSize(panel.aspect)
  return (
    <>
      <rect x={box.x} y={box.y} width={box.width} height={box.height} fill={`url(#${patternId})`} />
      <foreignObject x={box.x} y={box.y} width={box.width} height={box.height}>
        <div className="flex h-full flex-col items-center justify-center gap-1.5 px-[12%] text-center text-[17px] text-red-900">
          <p className="text-[14px] font-black tracking-[0.2em] uppercase">Missing art</p>
          <p className="line-clamp-3 leading-snug font-semibold">{panel.eventName}</p>
          <code className="rounded bg-white/70 px-1.5 text-[13px]">
            {panel.eventKey} · {formatAspect(panel.aspect)} · {size.width}×{size.height}
          </code>
        </div>
      </foreignObject>
    </>
  )
}

/** A chapter's title, set into the corner of its first panel like a caption box. */
function ChapterCaption({
  panel,
  corner,
  width,
}: {
  panel: NovelPanel
  corner: readonly [number, number]
  width: number
}) {
  return (
    <foreignObject
      x={corner[0]}
      y={corner[1]}
      width={width}
      height={240}
      className="pointer-events-none"
    >
      <div className="flex">
        <header className="max-w-full border-r-[5px] border-b-[5px] border-black bg-black px-4 py-2 text-white">
          <p className="text-[15px] tracking-[0.3em] text-amber-300 uppercase">
            Chapter {panel.chapter.number} · Day {panel.day}
          </p>
          <h2 className="text-[32px] leading-tight font-black uppercase">{panel.chapter.name}</h2>
        </header>
      </div>
    </foreignObject>
  )
}
