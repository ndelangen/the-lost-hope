import { z } from 'zod'

import { makeCreate } from './create'
import { entityRefOf } from './kind'
import { MediaUrl } from './media'

/**
 * A panel's shape inside its row: a convex polygon whose points are fractions of the row's width
 * (x) and height (y), listed clockwise from the top left. Panels that share an edge are kept
 * apart by an even gutter when the page is drawn, whatever the edge's angle.
 */
export type NovelCell = {
  points: readonly (readonly [number, number])[]
  /** Drawn on top of the panels before it, inside a white margin, like a manga inset. */
  inset?: true
  /** Runs past the page margin to the paper's edge on the sides it touches. */
  bleed?: true
}

/** A rectangle on a 12 by 2 grid of the row: columns across, halves of the height down. */
const rect = (x: number, y: number, w: number, h: number): NovelCell => ({
  points: [
    [x / 12, y / 2],
    [(x + w) / 12, y / 2],
    [(x + w) / 12, (y + h) / 2],
    [x / 12, (y + h) / 2],
  ],
})
const quad = (...points: [number, number][]): NovelCell => ({ points })
const whole = rect(0, 0, 12, 2)

/**
 * Row layouts. Every layout's panels tile its row with no holes (insets sit on top), so a page
 * never has gaps. `aspect` is the row's width over height: 3, 2 or 1.5, so rows are a third, a
 * half or two thirds of the page width tall. Panels are listed in reading order.
 */
export const NOVEL_ROW_LAYOUTS = {
  /** One 2:1 panel. */
  full: { aspect: 2, cells: [whole] },
  /** One 3:1 widescreen panel, for travel, skies and establishing shots. */
  cinema: { aspect: 3, cells: [whole] },
  /** One big 3:2 panel, for a chapter's biggest moment. */
  splash: { aspect: 1.5, cells: [whole] },
  /** A widescreen panel that runs off the sides of the page. */
  bleedCinema: { aspect: 3, cells: [{ ...whole, bleed: true }] },
  /** A big panel that runs off the page, for the moment that stops the reader. */
  bleedSplash: { aspect: 1.5, cells: [{ ...whole, bleed: true }] },
  /** Two 3:2 panels. */
  halves: { aspect: 3, cells: [rect(0, 0, 6, 2), rect(6, 0, 6, 2)] },
  /** Three 2:3 portrait panels. */
  thirds: { aspect: 2, cells: [rect(0, 0, 4, 2), rect(4, 0, 4, 2), rect(8, 0, 4, 2)] },
  /** Four 3:4 portrait panels: a quick run of beats. */
  quarters: {
    aspect: 3,
    cells: [rect(0, 0, 3, 2), rect(3, 0, 3, 2), rect(6, 0, 3, 2), rect(9, 0, 3, 2)],
  },
  /** A 4:3 panel beside a 2:3 one. */
  wideLeft: { aspect: 2, cells: [rect(0, 0, 8, 2), rect(8, 0, 4, 2)] },
  /** A 2:3 panel beside a 4:3 one. */
  wideRight: { aspect: 2, cells: [rect(0, 0, 4, 2), rect(4, 0, 8, 2)] },
  /** A big panel, then two stacked on its right. */
  stackRight: { aspect: 2, cells: [rect(0, 0, 8, 2), rect(8, 0, 4, 1), rect(8, 1, 4, 1)] },
  /** Two panels stacked on the left, then a big panel. */
  stackLeft: { aspect: 2, cells: [rect(0, 0, 4, 1), rect(0, 1, 4, 1), rect(4, 0, 8, 2)] },
  /** A strip across the top, then two panels below it. */
  stripAbove: { aspect: 1.5, cells: [rect(0, 0, 12, 1), rect(0, 1, 6, 1), rect(6, 1, 6, 1)] },
  /** Two panels, then a strip across the bottom. */
  stripBelow: { aspect: 1.5, cells: [rect(0, 0, 6, 1), rect(6, 0, 6, 1), rect(0, 1, 12, 1)] },
  /** Two small panels, a big square, two more small ones. */
  triptych: {
    aspect: 2,
    cells: [
      rect(0, 0, 3, 1),
      rect(0, 1, 3, 1),
      rect(3, 0, 6, 2),
      rect(9, 0, 3, 1),
      rect(9, 1, 3, 1),
    ],
  },
  /** Two panels split by a gently slanted gutter, for a sudden turn. */
  slash: {
    aspect: 3,
    cells: [
      quad([0, 0], [7 / 12, 0], [5 / 12, 1], [0, 1]),
      quad([7 / 12, 0], [1, 0], [1, 1], [5 / 12, 1]),
    ],
  },
  /** Two panels split by a steep diagonal, for a clash between two sides. */
  cut: {
    aspect: 2,
    cells: [quad([0, 0], [0.7, 0], [0.3, 1], [0, 1]), quad([0.7, 0], [1, 0], [1, 1], [0.3, 1])],
  },
  /** Three panels between gutters that lean apart, like shattered glass. */
  shards: {
    aspect: 3,
    cells: [
      quad([0, 0], [0.37, 0], [0.29, 1], [0, 1]),
      quad([0.37, 0], [0.64, 0], [0.73, 1], [0.29, 1]),
      quad([0.64, 0], [1, 0], [1, 1], [0.73, 1]),
    ],
  },
  /** Three panels between parallel slanted gutters, for fast motion. */
  zigzag: {
    aspect: 3,
    cells: [
      quad([0, 0], [0.4, 0], [0.3, 1], [0, 1]),
      quad([0.4, 0], [0.73, 0], [0.63, 1], [0.3, 1]),
      quad([0.73, 0], [1, 0], [1, 1], [0.63, 1]),
    ],
  },
  /** Two panels stacked over a tilted gutter. */
  tiltStack: {
    aspect: 1.5,
    cells: [quad([0, 0], [1, 0], [1, 0.4], [0, 0.6]), quad([0, 0.6], [1, 0.4], [1, 1], [0, 1])],
  },
  /** A wide panel over a tilted gutter, then two panels split by a slant. */
  tiltSplit: {
    aspect: 1.5,
    cells: [
      quad([0, 0], [1, 0], [1, 0.4], [0, 0.56]),
      quad([0, 0.56], [0.56, 0.4704], [0.46, 1], [0, 1]),
      quad([0.56, 0.4704], [1, 0.4], [1, 1], [0.46, 1]),
    ],
  },
  /** Two columns split at different heights, so the panels step down like stairs. */
  steps: {
    aspect: 2,
    cells: [
      quad([0, 0], [0.5, 0], [0.5, 0.65], [0, 0.65]),
      quad([0.5, 0], [1, 0], [1, 0.35], [0.5, 0.35]),
      quad([0.5, 0.35], [1, 0.35], [1, 1], [0.5, 1]),
      quad([0, 0.65], [0.5, 0.65], [0.5, 1], [0, 1]),
    ],
  },
  /** A tall panel on the left, then a short and a tall panel stacked on the right. */
  tallLeft: {
    aspect: 1.5,
    cells: [
      quad([0, 0], [0.42, 0], [0.42, 1], [0, 1]),
      quad([0.42, 0], [1, 0], [1, 0.38], [0.42, 0.38]),
      quad([0.42, 0.38], [1, 0.38], [1, 1], [0.42, 1]),
    ],
  },
  /** Two panels stacked on the left, then a tall panel leaning into them. */
  leanStack: {
    aspect: 1.5,
    cells: [
      quad([0, 0], [0.62, 0], [0.59, 0.6], [0, 0.6]),
      quad([0, 0.6], [0.59, 0.6], [0.57, 1], [0, 1]),
      quad([0.62, 0], [1, 0], [1, 1], [0.57, 1]),
    ],
  },
  /** A big panel with a small one set into its lower right corner. */
  insetRight: {
    aspect: 1.5,
    cells: [whole, { ...quad([0.6, 0.52], [0.96, 0.52], [0.96, 0.95], [0.6, 0.95]), inset: true }],
  },
  /** A small panel set into the upper left corner of a big one. */
  insetLeft: {
    aspect: 2,
    cells: [{ ...quad([0.03, 0.06], [0.33, 0.06], [0.33, 0.6], [0.03, 0.6]), inset: true }, whole],
  },
} as const satisfies Record<string, { aspect: number; cells: readonly NovelCell[] }>

export type NovelRowLayout = keyof typeof NOVEL_ROW_LAYOUTS

const NovelArt = z.discriminatedUnion('from', [
  z.strictObject({
    from: z.literal('event'),
    index: z
      .number()
      .int()
      .nonnegative()
      .default(0)
      .describe('Which of the event’s illustrations to show'),
  }),
  z.strictObject({
    from: z.literal('novel'),
    url: MediaUrl.describe('Art made for this panel, under /assets/novel/'),
  }),
])

const NovelReview = z.strictObject({
  fix: z
    .enum(['regenerate', 'extend'])
    .describe(
      '`regenerate`: the picture shows the wrong thing. `extend`: the content is right but the framing is not, so extend or recrop it to the panel shape',
    ),
  note: z.string().trim().min(1).describe('What is wrong, for whoever makes the new picture'),
})

export const NovelPanel = z.strictObject({
  event: entityRefOf('event').describe('The event this panel shows; its title comes from there'),
  art: NovelArt.optional().describe('The picture; leave it out while the art is still missing'),
  review: NovelReview.optional(),
})

export type NovelPanel = z.output<typeof NovelPanel>

const NovelRow = z
  .strictObject({
    layout: z.enum(Object.keys(NOVEL_ROW_LAYOUTS) as [NovelRowLayout, ...NovelRowLayout[]]),
    panels: z.array(NovelPanel).min(1),
  })
  .superRefine(({ layout, panels }, ctx) => {
    const expected = NOVEL_ROW_LAYOUTS[layout].cells.length
    if (panels.length !== expected)
      ctx.addIssue({
        code: 'custom',
        path: ['panels'],
        message: `A ${layout} row holds exactly ${expected} panel${expected === 1 ? '' : 's'}`,
      })
  })

export type NovelRow = z.output<typeof NovelRow>

/**
 * A tall panel beside a stack of rows, spanning their combined height, so the page breaks out of
 * its row grid. `width` is the tall panel's share of the page width; the rows fill the rest.
 */
const NovelSpan = z.strictObject({
  span: z.strictObject({
    side: z.enum(['left', 'right']).describe('Which side of the page the tall panel takes'),
    width: z.number().min(0.25).max(0.55),
    panel: NovelPanel,
    rows: z.array(NovelRow).min(2).describe('The rows stacked beside the tall panel'),
  }),
})

export type NovelSpan = z.output<typeof NovelSpan>

export const NovelBlock = z.union([NovelRow, NovelSpan])

export type NovelBlock = z.output<typeof NovelBlock>

export const isSpan = (block: NovelBlock): block is NovelSpan => 'span' in block

/** A page's height over its width: a portrait comic page. */
export const NOVEL_PAGE_HEIGHT = 1.5

/** How far a page's blocks may stray from its height; drawing stretches them to fit exactly. */
export const NOVEL_PAGE_SLACK = 0.12

/** How much of the page width a block's height takes, at its natural shape. */
export function blockHeight(block: NovelBlock): number {
  if (!isSpan(block)) return 1 / NOVEL_ROW_LAYOUTS[block.layout].aspect
  const width = 1 - block.span.width
  return block.span.rows.reduce((sum, row) => sum + width / NOVEL_ROW_LAYOUTS[row.layout].aspect, 0)
}

/**
 * One printed page of the novel: blocks stacked top to bottom that fill a 2:3 portrait page. A
 * block is a full-width row, or a tall panel spanning a stack of rows beside it. Pages are read
 * in the order of `src/data/novel/_index.ts`; a chapter is not stored but begins wherever the
 * first event of a new session appears, even halfway down a page.
 */
export const NovelPage = z
  .strictObject({ blocks: z.array(NovelBlock).min(1) })
  .superRefine(({ blocks }, ctx) => {
    const height = blocks.reduce((sum, block) => sum + blockHeight(block), 0)
    if (Math.abs(height - NOVEL_PAGE_HEIGHT) / NOVEL_PAGE_HEIGHT > NOVEL_PAGE_SLACK)
      ctx.addIssue({
        code: 'custom',
        path: ['blocks'],
        message: `The blocks must fill the page: they are ${height.toFixed(2)} page widths tall, not about ${NOVEL_PAGE_HEIGHT}`,
      })
  })

export type NovelPage = z.output<typeof NovelPage>

/** Every panel on a page, in reading order: a tall panel on the left before its rows. */
export function pagePanels(page: NovelPage): NovelPanel[] {
  return page.blocks.flatMap((block) => {
    if (!isSpan(block)) return block.panels
    const rows = block.span.rows.flatMap((row) => row.panels)
    return block.span.side === 'left' ? [block.span.panel, ...rows] : [...rows, block.span.panel]
  })
}

export const create = makeCreate(NovelPage)
