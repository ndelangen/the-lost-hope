import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  Link({
    to,
    params: _params,
    children,
    ...props
  }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    to: string
    params?: unknown
    children?: ReactNode
  }) {
    return (
      <a href={to} {...props}>
        {children}
      </a>
    )
  },
}))

const { SidebarRail } = await import('./sidebar-rail')
const { sidebarCollections } = await import('./sidebar-data')
const { COLLECTION_LABELS } = await import('#/lib/campaign')

describe('SidebarRail', () => {
  it('names every entry, so an icon alone is never the only clue', () => {
    const markup = renderToStaticMarkup(<SidebarRail pathname="/" />)

    expect(markup).toContain('aria-label="Campaign"')
    for (const label of [
      'Overview',
      'Campaign intro',
      COLLECTION_LABELS.session,
      ...sidebarCollections.map(({ kind }) => COLLECTION_LABELS[kind]),
    ])
      expect(markup).toContain(`aria-label="${label}"`)
    expect(markup).toContain('Now: ')
  })

  it('gives every entry the same square, so the icons line up in one column', () => {
    const markup = renderToStaticMarkup(<SidebarRail pathname="/" />)
    const links = markup.match(/<a [^>]*>/g) ?? []

    expect(links).toHaveLength(4 + sidebarCollections.length)
    expect(links.every((link) => link.includes('size-12'))).toBe(true)
  })

  it('marks where you are: a page, a collection, or the sessions for an event', () => {
    expect(renderToStaticMarkup(<SidebarRail pathname="/" />)).toMatch(
      /aria-label="Overview" aria-current="page"/,
    )
    expect(renderToStaticMarkup(<SidebarRail pathname="/npcs" activeKind="npc" />)).toMatch(
      new RegExp(`aria-label="${COLLECTION_LABELS.npc}" aria-current="page"`),
    )
    expect(renderToStaticMarkup(<SidebarRail pathname="/events/x" activeKind="event" />)).toMatch(
      new RegExp(`aria-label="${COLLECTION_LABELS.session}" aria-current="page"`),
    )
  })
})
