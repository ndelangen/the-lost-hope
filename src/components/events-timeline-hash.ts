import { useLayoutEffect, type RefObject } from 'react'

const SESSION_HASH_PREFIX = 'session-'
const SESSION_ANCHOR_ATTRIBUTE = 'data-events-session'

export function sessionAnchorId(slug: string): string {
  return slug.startsWith(SESSION_HASH_PREFIX) ? slug : `${SESSION_HASH_PREFIX}${slug}`
}

export function sessionHash(slug: string): string {
  return `#${sessionAnchorId(slug)}`
}

export function sessionSlugFromHash(hash: string, sessionSlugs: readonly string[]): string | null {
  const anchor = hash.startsWith('#') ? hash.slice(1) : hash
  return sessionSlugs.find((slug) => sessionAnchorId(slug) === anchor) ?? null
}

export function currentSessionSlug(
  anchors: readonly { slug: string; top: number }[],
  readingLine: number,
): string | null {
  if (anchors.length === 0) return null

  let current = anchors[0].slug
  for (const anchor of anchors) {
    if (anchor.top > readingLine) break
    current = anchor.slug
  }
  return current
}

function replaceSessionHash(hash: string) {
  // TanStack Router wraps the history instance methods and treats calls as navigations. Use the
  // native prototype method so scroll tracking only updates the address bar.
  History.prototype.replaceState.call(
    window.history,
    {
      ...window.history.state,
      __hashScrollIntoViewOptions: false,
    },
    '',
    hash,
  )
}

export function useEventsSessionHash(
  containerRef: RefObject<HTMLElement | null>,
  sessionSlugs: readonly string[],
) {
  const sessionSlugKey = sessionSlugs.join('\n')

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container || !sessionSlugKey) return

    const currentSessionSlugs = sessionSlugKey.split('\n')

    const anchors = Array.from(
      container.querySelectorAll<HTMLElement>(`[${SESSION_ANCHOR_ATTRIBUTE}]`),
    )
    let animationFrame: number | null = null

    const syncHash = () => {
      animationFrame = null
      const slug = currentSessionSlug(
        anchors.flatMap((anchor) => {
          const anchorSlug = anchor.dataset.eventsSession
          return anchorSlug ? [{ slug: anchorSlug, top: anchor.getBoundingClientRect().top }] : []
        }),
        window.innerHeight * 0.25,
      )
      if (!slug) return

      const hash = sessionHash(slug)
      if (window.location.hash !== hash) {
        replaceSessionHash(hash)
      }
    }

    const scheduleSync = () => {
      if (animationFrame !== null) return
      animationFrame = window.requestAnimationFrame(syncHash)
    }

    const restoreInitialHash = () => {
      const slug = sessionSlugFromHash(window.location.hash, currentSessionSlugs)
      if (!slug) return false

      document.getElementById(sessionAnchorId(slug))?.scrollIntoView({ block: 'start' })
      scheduleSync()
      return true
    }

    if (!restoreInitialHash()) syncHash()

    window.addEventListener('scroll', scheduleSync, { passive: true })
    window.addEventListener('resize', scheduleSync)

    return () => {
      window.removeEventListener('scroll', scheduleSync)
      window.removeEventListener('resize', scheduleSync)
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
    }
  }, [containerRef, sessionSlugKey])
}
