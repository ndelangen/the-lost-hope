import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'

import { IconCatalogCard } from '#/components/icon-catalog-card'
import type { IconCatalogEntry, IconClassification } from '#/icon-catalog/types'

export const ICON_CARD_HEIGHT = 140
export const ICON_GRID_GAP = 12
export const ICON_GRID_ROW_HEIGHT = ICON_CARD_HEIGHT + ICON_GRID_GAP
export const ICON_GRID_OVERSCAN_ROWS = 3

type Viewport = {
  scrollY: number
  height: number
  width: number
  containerTop: number
}

export type IconGridRowRange = {
  start: number
  end: number
}

export function iconGridColumnCount(viewportWidth: number): number {
  if (viewportWidth >= 1024) return 6
  if (viewportWidth >= 640) return 3
  return 2
}

export function visibleIconGridRows({
  rowCount,
  scrollY,
  viewportHeight,
  containerTop,
  totalHeight,
}: {
  rowCount: number
  scrollY: number
  viewportHeight: number
  containerTop: number
  totalHeight: number
}): IconGridRowRange {
  const viewportStart = scrollY - containerTop
  const viewportEnd = viewportStart + viewportHeight
  if (viewportEnd < 0 || viewportStart > totalHeight) return { start: 0, end: 0 }

  return {
    start: Math.max(0, Math.floor(viewportStart / ICON_GRID_ROW_HEIGHT) - ICON_GRID_OVERSCAN_ROWS),
    end: Math.min(
      rowCount,
      Math.ceil(viewportEnd / ICON_GRID_ROW_HEIGHT) + ICON_GRID_OVERSCAN_ROWS,
    ),
  }
}

function initialViewport(): Viewport {
  if (typeof window === 'undefined') {
    return { scrollY: 0, height: 800, width: 1280, containerTop: 0 }
  }
  return {
    scrollY: window.scrollY,
    height: window.innerHeight,
    width: window.innerWidth,
    containerTop: 0,
  }
}

export const IconCatalogVirtualGrid = memo(function IconCatalogVirtualGrid({
  entries,
  label,
  copiedId,
  pendingById,
  onCopy,
  onClassify,
}: {
  entries: ReadonlyArray<IconCatalogEntry>
  label: string
  copiedId?: string
  pendingById: ReadonlyMap<string, IconClassification>
  onCopy: (id: string) => void
  onClassify: (id: string, classification: IconClassification) => void
}) {
  const containerRef = useRef<HTMLUListElement>(null)
  const [viewport, setViewport] = useState(initialViewport)
  const columns = iconGridColumnCount(viewport.width)
  const rowCount = Math.ceil(entries.length / columns)
  const totalHeight = rowCount === 0 ? 0 : (rowCount - 1) * ICON_GRID_ROW_HEIGHT + ICON_CARD_HEIGHT

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const scrollY = window.scrollY
    const next: Viewport = {
      scrollY,
      height: window.innerHeight,
      width: window.innerWidth,
      containerTop: container.getBoundingClientRect().top + scrollY,
    }
    setViewport((current) =>
      current.scrollY === next.scrollY &&
      current.height === next.height &&
      current.width === next.width &&
      current.containerTop === next.containerTop
        ? current
        : next,
    )
  }, [])

  useLayoutEffect(measure, [columns, entries.length, measure])

  useEffect(() => {
    let frame: number | undefined
    const scheduleMeasure = () => {
      if (frame !== undefined) return
      frame = window.requestAnimationFrame(() => {
        frame = undefined
        measure()
      })
    }

    window.addEventListener('scroll', scheduleMeasure, { passive: true })
    window.addEventListener('resize', scheduleMeasure)
    return () => {
      window.removeEventListener('scroll', scheduleMeasure)
      window.removeEventListener('resize', scheduleMeasure)
      if (frame !== undefined) window.cancelAnimationFrame(frame)
    }
  }, [measure])

  const visibleRows = visibleIconGridRows({
    rowCount,
    scrollY: viewport.scrollY,
    viewportHeight: viewport.height,
    containerTop: viewport.containerTop,
    totalHeight,
  })
  const firstIndex = visibleRows.start * columns
  const lastIndex = Math.min(entries.length, visibleRows.end * columns)
  const cardWidth = `calc(${100 / columns}% - ${(ICON_GRID_GAP * (columns - 1)) / columns}px)`
  const visibleCards = []

  for (let index = firstIndex; index < lastIndex; index += 1) {
    const entry = entries[index]
    if (!entry) continue
    const row = Math.floor(index / columns)
    const column = index % columns
    const style: CSSProperties = {
      position: 'absolute',
      top: 0,
      left: `calc(${(column * 100) / columns}% + ${(column * ICON_GRID_GAP) / columns}px)`,
      width: cardWidth,
      height: ICON_CARD_HEIGHT,
      transform: `translate3d(0, ${row * ICON_GRID_ROW_HEIGHT}px, 0)`,
    }

    visibleCards.push(
      <li key={entry.id} style={style}>
        <IconCatalogCard
          entry={entry}
          copied={copiedId === entry.id}
          onCopy={onCopy}
          pendingClassification={pendingById.get(entry.id)}
          onClassify={onClassify}
        />
      </li>,
    )
  }

  return (
    <ul
      ref={containerRef}
      className="relative m-0 list-none p-0 [contain:layout_style]"
      style={{ height: totalHeight }}
      aria-label={`${label}, ${entries.length} icons`}
      data-total-icon-count={entries.length}
      data-rendered-icon-count={visibleCards.length}
    >
      {visibleCards}
    </ul>
  )
})
