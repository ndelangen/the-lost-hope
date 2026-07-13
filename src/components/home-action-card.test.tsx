import { BookOpen, ScrollText } from 'lucide-react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  Link({
    to,
    params,
    children,
    ...props
  }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    to: string
    params?: { slug: string }
    children?: ReactNode
  }) {
    const href = params ? to.replace('$slug', params.slug) : to
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

import { HomeActionCard } from './home-action-card'

describe('HomeActionCard', () => {
  it('uses the same root and content layout for direct and entity destinations', () => {
    const intro = renderToStaticMarkup(
      <HomeActionCard
        destination={{ to: '/intro' }}
        eyebrow="New to the story?"
        icon={BookOpen}
        title="Start with the intro"
        variant="primary"
      />,
    )
    const session = renderToStaticMarkup(
      <HomeActionCard
        destination={{ entity: { kind: 'session', slug: 'escape-from-shadowpeak' } }}
        eyebrow="Pick up where you left off"
        icon={ScrollText}
        title="Continue session 10"
        variant="secondary"
      />,
    )

    expect(intro).toMatch(/^<a /)
    expect(session).toMatch(/^<a /)
    expect(intro).toContain('href="/intro"')
    expect(session).toContain('href="/sessions/detail/escape-from-shadowpeak"')

    for (const markup of [intro, session]) {
      expect(markup).toContain('group relative block min-h-24')
      expect(markup).toContain('relative z-10 h-full')
      expect(markup).toContain('flex gap-3 items-center justify-between')
      expect(markup).not.toContain('align-baseline block')
    }
  })
})
