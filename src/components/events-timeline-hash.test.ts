// @vitest-environment jsdom

import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  currentSessionSlug,
  sessionAnchorId,
  sessionHash,
  sessionSlugFromHash,
  useEventsSessionHash,
} from './events-timeline-hash'

afterEach(() => {
  document.body.replaceChildren()
  vi.unstubAllGlobals()
})

beforeEach(() => {
  History.prototype.replaceState.call(window.history, null, '', '/events')
})

describe('events timeline session hashes', () => {
  const slugs = ['arrival-in-fajanet', 'the-fajanet-festival', 'fairhaven-fallout']

  it('uses stable session anchors and hashes', () => {
    expect(sessionAnchorId(slugs[0])).toBe('session-arrival-in-fajanet')
    expect(sessionHash(slugs[0])).toBe('#session-arrival-in-fajanet')
    expect(sessionHash('session-9')).toBe('#session-9')
  })

  it('only restores hashes belonging to timeline sessions', () => {
    expect(sessionSlugFromHash('#session-the-fajanet-festival', slugs)).toBe('the-fajanet-festival')
    expect(sessionSlugFromHash('#session-unknown', slugs)).toBeNull()
    expect(sessionSlugFromHash('#something-else', slugs)).toBeNull()
  })

  it('selects the last session header that has crossed the reading line', () => {
    const anchors = [
      { slug: slugs[0], top: -800 },
      { slug: slugs[1], top: 120 },
      { slug: slugs[2], top: 900 },
    ]

    expect(currentSessionSlug(anchors, 200)).toBe(slugs[1])
    expect(currentSessionSlug(anchors, 80)).toBe(slugs[0])
    expect(currentSessionSlug(anchors, -1_000)).toBe(slugs[0])
  })

  it('only restores scroll position when the timeline mounts', () => {
    const container = document.createElement('div')
    for (const slug of slugs) {
      const anchor = document.createElement('div')
      anchor.id = sessionAnchorId(slug)
      anchor.dataset.eventsSession = slug
      container.append(anchor)
    }
    document.body.append(container)

    const scrollIntoView = vi.fn<() => void>()
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    })
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn<(callback: FrameRequestCallback) => number>(() => 1),
    )
    vi.stubGlobal('cancelAnimationFrame', vi.fn<(handle: number) => void>())
    window.history.replaceState(null, '', sessionHash(slugs[0]))

    renderHook(() => useEventsSessionHash({ current: container }, slugs))
    expect(scrollIntoView).toHaveBeenCalledTimes(1)

    window.history.replaceState(null, '', sessionHash(slugs[1]))
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })

  it('syncs the hash without notifying patched history listeners', () => {
    const container = document.createElement('div')
    const anchor = document.createElement('div')
    anchor.id = sessionAnchorId(slugs[0])
    anchor.dataset.eventsSession = slugs[0]
    container.append(anchor)
    document.body.append(container)

    const patchedReplaceState = vi.spyOn(window.history, 'replaceState')
    renderHook(() => useEventsSessionHash({ current: container }, [slugs[0]]))

    expect(window.location.hash).toBe(sessionHash(slugs[0]))
    expect(window.history.state).toEqual(
      expect.objectContaining({ __hashScrollIntoViewOptions: false }),
    )
    expect(patchedReplaceState).not.toHaveBeenCalled()
  })
})
