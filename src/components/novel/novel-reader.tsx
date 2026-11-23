import { Link } from '@tanstack/react-router'
import { ChevronDown, ChevronLeft, ChevronRight, Scroll } from 'lucide-react'
import { type CSSProperties, useEffect, useRef, useSyncExternalStore } from 'react'

import { NovelPageSheet } from '#/components/novel/novel-page'
import type { NovelChapter, NovelPage } from '#/lib/novel-data'

const turnButtonClass =
  'text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring/50 inline-flex size-9 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40'

const SPREAD_QUERY = '(min-width: 768px) and (min-aspect-ratio: 1/1)'

/** Two facing pages on a wide screen, one page on a phone or a tall window. */
function usePagesPerSpread(): 1 | 2 {
  const wide = useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(SPREAD_QUERY)
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia(SPREAD_QUERY).matches,
    () => true,
  )
  return wide ? 2 : 1
}

/** The first page of the spread that shows `page`: spreads pair pages 1–2, 3–4, and so on. */
export function spreadStart(page: number, perSpread: 1 | 2): number {
  return perSpread === 2 ? page - ((page - 1) % 2) : page
}

/** Reads the novel one page, or one two-page spread, at a time. */
export function NovelReader({
  chapters,
  pages,
  page,
  onPageChange,
  status,
}: {
  chapters: readonly NovelChapter[]
  pages: readonly NovelPage[]
  page: number
  onPageChange: (page: number) => void
  status?: string
}) {
  const perSpread = usePagesPerSpread()
  const last = pages.length
  const selected = Math.min(Math.max(page, 1), last)
  const start = spreadStart(selected, perSpread)
  const shown = pages.slice(start - 1, start - 1 + perSpread)
  const range = shown.length > 1 ? `${start}–${start + 1}` : String(start)
  const currentChapter = pages[selected - 1]!.chapter
  const previous = start > 1 ? spreadStart(start - 1, perSpread) : undefined
  const next = start + perSpread <= last ? start + perSpread : undefined

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('input, select, textarea'))
        return
      if (event.key === 'ArrowRight' && next) onPageChange(next)
      if (event.key === 'ArrowLeft' && previous) onPageChange(previous)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, previous, onPageChange])

  const swipeFrom = useRef<number | undefined>(undefined)

  return (
    <div className="fixed inset-0 flex flex-col bg-neutral-900 text-neutral-100">
      <header className="border-border bg-background text-foreground z-10 shrink-0 border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-3 py-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:px-6">
          <div className="col-span-2 flex min-w-0 items-center gap-3 sm:col-span-1">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 inline-flex min-h-9 shrink-0 items-center gap-2 rounded-md text-sm font-semibold tracking-tight transition-colors focus-visible:ring-2 focus-visible:outline-none"
              aria-label="Back to The Lost Hope"
            >
              <Scroll className="text-primary size-5" aria-hidden />
              <span>The Lost Hope</span>
            </Link>
            <span className="border-border border-l pl-3 text-sm font-semibold">Novel</span>
          </div>

          <div className="relative min-w-0 sm:mx-auto sm:w-full sm:max-w-sm">
            <select
              value={currentChapter.sessionKey}
              onChange={(event) => {
                const chapter = chapters.find((entry) => entry.sessionKey === event.target.value)
                if (chapter) onPageChange(chapter.startPage)
              }}
              className="border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/30 h-9 w-full min-w-0 cursor-pointer appearance-none truncate rounded-lg border pr-8 pl-3 text-sm font-medium outline-none focus-visible:ring-2"
              aria-label="Chapter"
            >
              {chapters.map((chapter) => (
                <option key={chapter.sessionKey} value={chapter.sessionKey}>
                  {chapter.number}. {chapter.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2"
              aria-hidden
            />
          </div>

          <nav
            aria-label="Page navigation"
            className="border-border bg-background inline-flex items-center gap-0.5 rounded-lg border"
          >
            <button
              type="button"
              className={turnButtonClass}
              disabled={previous === undefined}
              onClick={() => previous && onPageChange(previous)}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <div className="focus-within:ring-ring/50 hover:bg-muted relative flex h-9 items-center gap-1.5 rounded-md px-2 focus-within:ring-2">
              <span
                className="text-foreground text-xs font-medium whitespace-nowrap tabular-nums sm:text-sm"
                aria-hidden
              >
                {range} / {last}
              </span>
              <ChevronDown className="text-muted-foreground size-3.5" aria-hidden />
              <select
                aria-label="Page"
                value={selected}
                onChange={(event) => onPageChange(Number(event.target.value))}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              >
                {pages.map(({ number }) => (
                  <option key={number} value={number}>
                    Page {number}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className={turnButtonClass}
              disabled={next === undefined}
              onClick={() => next && onPageChange(next)}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </nav>
          <output className="sr-only">
            {shown.length > 1 ? 'Pages' : 'Page'} {range} of {last}
          </output>
          {status ? <p className="text-muted-foreground col-span-full text-xs">{status}</p> : null}
        </div>
      </header>

      <main
        style={{ '--per-spread': perSpread } as CSSProperties}
        className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center gap-[0.6vmin] px-2 pb-3"
        onPointerDown={(event) => {
          if (event.pointerType === 'touch') swipeFrom.current = event.clientX
        }}
        onPointerUp={(event) => {
          if (swipeFrom.current === undefined) return
          const distance = event.clientX - swipeFrom.current
          swipeFrom.current = undefined
          if (distance < -50 && next) onPageChange(next)
          if (distance > 50 && previous) onPageChange(previous)
        }}
      >
        {shown.map((entry) => (
          <NovelPageSheet
            key={entry.number}
            page={entry}
            className="h-[min(100%,calc((100vw-1rem)/var(--per-spread)*1.5))] w-auto"
          />
        ))}
      </main>
    </div>
  )
}
