import { describe, expect, it } from 'vitest'

import novel from '#/data/novel/_index.ts'
import { NOVEL_ROW_LAYOUTS, pagePanels } from '#/definitions/novel'
import { resolveRef } from '#/lib/campaign'
import { buildNovel, formatAspect } from '#/lib/novel-data'
import { PAGE, boundingBox, panelShape } from '#/lib/novel-geometry'
import { hasPublicAsset } from '#/lib/public-media'

describe('novel data', () => {
  it('tells the story in session order', () => {
    const sessions = buildNovel().pages.flatMap((page) =>
      page.panels.map((panel) => panel.chapter.number),
    )
    const backwards = sessions.filter((number, index) => index > 0 && number < sessions[index - 1]!)
    expect(backwards).toEqual([])
  })

  it('puts 6 to 9 panels on a page, unless its chapter is too short to fill two', () => {
    const { pages } = buildNovel()
    const chapterSize = new Map<string, number>()
    for (const panel of pages.flatMap((page) => page.panels))
      chapterSize.set(
        panel.chapter.sessionSlug,
        (chapterSize.get(panel.chapter.sessionSlug) ?? 0) + 1,
      )
    const offPages = pages.flatMap((page) => {
      const count = page.panels.length
      const short = (chapterSize.get(page.chapter.sessionSlug) ?? 0) < 12
      return count > 9 || (count < 6 && !short) ? [`page ${page.number}: ${count}`] : []
    })
    expect(offPages).toEqual([])
  })

  it('opens every chapter on a new page with a large first panel', () => {
    const inner = (PAGE.width - 2 * PAGE.margin) * (PAGE.height - 2 * PAGE.margin)
    const faults = buildNovel().pages.flatMap((page) =>
      page.panels.flatMap((panel, index) => {
        if (!panel.opensChapter) return []
        if (index > 0) return [`chapter ${panel.chapter.number} starts mid-page ${page.number}`]
        const { width, height } = panel.shape.box
        return width * height < inner * 0.15
          ? [`chapter ${panel.chapter.number} opens with a small panel`]
          : []
      }),
    )
    expect(faults).toEqual([])
  })

  it('points every panel at art that exists', () => {
    const broken = novel
      .flatMap((page) => pagePanels(page))
      .filter(({ art, event }) => {
        if (!art) return false
        if (art.from === 'novel') return !hasPublicAsset(art.url)
        const entity = resolveRef(event)
        return entity?.kind !== 'event' || entity.data.illustrations[art.index] === undefined
      })
      .map((panel) => panel.event.key)
    expect(broken).toEqual([])
  })

  it('tiles every row layout with no holes or overlaps', () => {
    const area = (points: readonly (readonly [number, number])[]) =>
      Math.abs(
        points.reduce((sum, [x, y], index) => {
          const [nextX, nextY] = points[(index + 1) % points.length]!
          return sum + x * nextY - nextX * y
        }, 0),
      ) / 2
    const faults = Object.entries(NOVEL_ROW_LAYOUTS).flatMap(([name, layout]) => {
      const covered = layout.cells
        .filter((cell) => !('inset' in cell))
        .reduce((sum, cell) => sum + area(cell.points), 0)
      return Math.abs(covered - 1) > 1e-6 ? [`${name} covers ${covered}`] : []
    })
    expect(faults).toEqual([])
  })

  it('lists every panel’s points clockwise, so gutters move inward', () => {
    const counterClockwise = Object.entries(NOVEL_ROW_LAYOUTS).flatMap(([name, layout]) =>
      layout.cells.flatMap((cell, index) => {
        const signed = cell.points.reduce((sum, [x, y], at) => {
          const [nextX, nextY] = cell.points[(at + 1) % cell.points.length]!
          return sum + x * nextY - nextX * y
        }, 0)
        return signed > 0 ? [] : [`${name}[${index}]`]
      }),
    )
    expect(counterClockwise).toEqual([])
  })

  it('keeps a slanted gutter as wide as a straight one', () => {
    const [left, right] = NOVEL_ROW_LAYOUTS.cut.cells.map((cell) =>
      panelShape(cell, { x: 0, y: 0, width: 900, height: 450 }, { first: false, last: false }),
    )
    // Distance between the two slanted edges, measured square to them.
    const [a, b] = [left!.outer[1]!, left!.outer[2]!]
    const point = right!.outer[3]!
    const distance =
      Math.abs((b[0] - a[0]) * (a[1] - point[1]) - (a[0] - point[0]) * (b[1] - a[1])) /
      Math.hypot(b[0] - a[0], b[1] - a[1])
    expect(distance).toBeCloseTo(PAGE.gutter, 6)
  })

  it('fills every page between its margins, spanning blocks included', () => {
    const outOfBounds = buildNovel().pages.flatMap((page) =>
      page.panels
        .filter(({ shape, cell }) => {
          if (cell.bleed) return false
          const { x, y, width, height } = boundingBox(shape.outer)
          const inside = (value: number, low: number, high: number) =>
            value >= low - 0.01 && value <= high + 0.01
          return !(
            inside(x, PAGE.margin, PAGE.width - PAGE.margin) &&
            inside(x + width, PAGE.margin, PAGE.width - PAGE.margin) &&
            inside(y, PAGE.margin, PAGE.height - PAGE.margin) &&
            inside(y + height, PAGE.margin, PAGE.height - PAGE.margin)
          )
        })
        .map((panel) => `page ${page.number}: ${panel.eventKey}`),
    )
    expect(outOfBounds).toEqual([])
  })

  it('names panel shapes as simple ratios', () => {
    expect([2, 1.5, 4 / 3, 2 / 3].map(formatAspect)).toEqual(['2:1', '3:2', '4:3', '2:3'])
  })
})
