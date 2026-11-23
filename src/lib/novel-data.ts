import novel from '#/data/novel/_index.ts'
import {
  pagePanels,
  type NovelCell,
  type NovelPage as NovelPageData,
  type NovelPanel as NovelPanelData,
} from '#/definitions/novel'
import {
  campaignSessions,
  getEntity,
  resolveRef,
  sessionDays,
  sessionNumber,
  sessionSlugForEvent,
} from '#/lib/campaign'
import { layoutPage, type PanelShape } from '#/lib/novel-geometry'
import { responsiveImageFor } from '#/lib/public-media'

/** Generated art is made at this many pixels along its long side. */
const ART_LONG_SIDE = 1536
/** How far a picture's shape may stray from its panel's before it needs extending. */
const ASPECT_TOLERANCE = 0.15

export type NovelArtStatus =
  | { type: 'ok' }
  | { type: 'missing' }
  | { type: 'regenerate'; note: string }
  | { type: 'extend'; note: string }

export type NovelPanel = {
  /** Unique within the novel: page and position. */
  id: string
  eventKey: string
  eventSlug: string
  eventName: string
  day: number
  /** True on the first panel of a campaign day within a chapter. */
  dayStart: boolean
  chapter: NovelChapterInfo
  /** True on the chapter's first panel, where its title goes. */
  opensChapter: boolean
  /** The panel's shape in its row. */
  cell: NovelCell
  /** Where the panel is drawn on the page. */
  shape: PanelShape
  /** Width over height of the panel as drawn. */
  aspect: number
  src?: string
  status: NovelArtStatus
}

export type NovelChapterInfo = {
  sessionKey: string
  sessionSlug: string
  number: number
  name: string
  date: Date
}

export type NovelPage = {
  /** 1-based position in the whole novel. */
  number: number
  /** The chapter the page begins in. */
  chapter: NovelChapterInfo
  /** In reading order. */
  panels: NovelPanel[]
}

export type NovelChapter = NovelChapterInfo & {
  /** The page holding the chapter's first panel. */
  startPage: number
}

export type Novel = { pages: NovelPage[]; chapters: NovelChapter[] }

/** The chapter an event belongs to: the session it was played in. */
function chapterFor(eventSlug: string): NovelChapterInfo | undefined {
  const slug = sessionSlugForEvent(eventSlug)
  const session = slug ? getEntity('session', slug) : undefined
  if (!session) return undefined
  return {
    sessionKey: session.slug,
    sessionSlug: session.slug,
    number: sessionNumber(session.slug) ?? 0,
    name: session.data.name,
    date: session.data.date,
  }
}

/**
 * The novel resolved against campaign data: titles, days and pictures from events, and chapters
 * from the sessions those events belong to. A chapter opens on the first panel of a new session.
 */
export function buildNovel(pages: readonly NovelPageData[] = novel): Novel {
  const chapters: NovelChapter[] = []
  let current: NovelChapterInfo | undefined
  let previousDay: number | undefined

  const resolved = pages.map((page, pageIndex): NovelPage => {
    const number = pageIndex + 1
    const placed = layoutPage(page.blocks)
    const panels = pagePanels(page).flatMap((panel, panelIndex): NovelPanel[] => {
      const event = resolveRef(panel.event)
      const { cell, shape } = placed[panelIndex]!
      if (event?.kind !== 'event') return []
      const chapter = chapterFor(event.slug)
      if (!chapter) return []
      const opensChapter = chapter.sessionSlug !== current?.sessionSlug
      if (opensChapter) {
        current = chapter
        previousDay = undefined
        chapters.push({ ...chapter, startPage: number })
      }
      const aspect = shape.box.width / shape.box.height
      const src = artSource(panel, event.data.illustrations)
      const dayStart = event.data.day !== previousDay
      previousDay = event.data.day
      return [
        {
          id: `${number}-${panelIndex}`,
          eventKey: panel.event.key,
          eventSlug: event.slug,
          eventName: event.data.name,
          day: event.data.day,
          dayStart,
          chapter,
          opensChapter,
          cell,
          shape,
          aspect,
          src,
          status: artStatus(panel, src, aspect),
        },
      ]
    })
    return { number, chapter: panels[0]?.chapter ?? current!, panels }
  })

  return { pages: resolved, chapters }
}

function novelPanels(novelBook: Novel) {
  return novelBook.pages.flatMap((page) => page.panels.map((panel) => ({ page, panel })))
}

function artSource(panel: NovelPanelData, illustrations: readonly string[]): string | undefined {
  if (!panel.art) return undefined
  return panel.art.from === 'event' ? illustrations[panel.art.index] : panel.art.url
}

function artStatus(panel: NovelPanelData, src: string | undefined, aspect: number): NovelArtStatus {
  if (!src) return { type: 'missing' }
  if (panel.review) return { type: panel.review.fix, note: panel.review.note }
  const image = responsiveImageFor(src)
  if (!image) return { type: 'ok' }
  const imageAspect = image.width / image.height
  if (Math.abs(imageAspect - aspect) / aspect <= ASPECT_TOLERANCE) return { type: 'ok' }
  return {
    type: 'extend',
    note: `The picture is ${formatAspect(imageAspect)} but the panel is ${formatAspect(aspect)}.`,
  }
}

/** A ratio as a readable shape, such as `3:2` or `1:1`. */
export function formatAspect(aspect: number): string {
  for (const height of [1, 2, 3, 4, 5, 6, 9]) {
    const width = aspect * height
    if (Math.abs(width - Math.round(width)) < 0.02) return `${Math.round(width)}:${height}`
  }
  return `${aspect.toFixed(2)}:1`
}

/** The pixel size to generate art at for a panel shape. */
export function artTargetSize(aspect: number): { width: number; height: number } {
  return aspect >= 1
    ? { width: ART_LONG_SIDE, height: Math.round(ART_LONG_SIDE / aspect) }
    : { width: Math.round(ART_LONG_SIDE * aspect), height: ART_LONG_SIDE }
}

export type NovelArtTask = {
  chapter: number
  page: number
  eventKey: string
  eventName: string
  status: Exclude<NovelArtStatus['type'], 'ok'>
  note?: string
  current?: string
  shape: string
  size: { width: number; height: number }
}

/** Everything the novel still needs from image generation, in reading order. */
export function novelArtWork(novelBook: Novel = buildNovel()): NovelArtTask[] {
  return novelPanels(novelBook).flatMap(({ page, panel }): NovelArtTask[] =>
    panel.status.type === 'ok'
      ? []
      : [
          {
            chapter: panel.chapter.number,
            page: page.number,
            eventKey: panel.eventKey,
            eventName: panel.eventName,
            status: panel.status.type,
            note: 'note' in panel.status ? panel.status.note : undefined,
            current: panel.src,
            shape: formatAspect(panel.aspect),
            size: artTargetSize(panel.aspect),
          },
        ],
  )
}

/** Played events the novel does not show yet, so the story has no silent holes. */
export function novelUnplacedEvents(novelBook: Novel = buildNovel()) {
  const placed = new Set(novelPanels(novelBook).map(({ panel }) => panel.eventSlug))
  return campaignSessions().flatMap((session) =>
    sessionDays(session.data).flatMap(({ events }) =>
      events
        .filter((event) => !placed.has(event.slug))
        .map((event) => ({ session: session.data.name, event: event.name })),
    ),
  )
}

export function novelArtCoverage(novelBook: Novel) {
  const panels = novelPanels(novelBook).map(({ panel }) => panel)
  const count = (type: NovelArtStatus['type']) =>
    panels.filter((panel) => panel.status.type === type).length
  return {
    ok: count('ok'),
    missing: count('missing'),
    regenerate: count('regenerate'),
    extend: count('extend'),
  }
}
