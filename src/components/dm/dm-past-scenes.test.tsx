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
    return (
      <a href={params ? to.replace('$slug', params.slug) : to} {...props}>
        {children}
      </a>
    )
  },
}))

import { refs } from '#/data/generated/refs'
import { create as createScene } from '#/definitions/scene'
import { create as createTable } from '#/definitions/table'
import { sourceLocationParent } from '#/lib/dm-campaign'
import { scenesInRunningOrder } from '#/lib/dm-scenes-overview'

import { DmPastScenes } from './dm-past-scenes'

const scene = (name: string) =>
  createScene({ name, location: refs.locations.skynet, setup: [['Setup.']] })

const scenes = { casino: scene('The casino closes'), docks: scene('Chaos at the docks') }
const table = createTable({
  past: [{ ref: 'scene', key: 'casino' }],
  likely: [{ ref: 'scene', key: 'docks' }],
})
const all = scenesInRunningOrder({ table, scenes, arcs: {}, parentOf: sourceLocationParent })

describe('DmPastScenes', () => {
  it('folds the past scenes away under a count, each a link to its scene page', () => {
    const markup = renderToStaticMarkup(<DmPastScenes scenes={all.filter((item) => item.past)} />)
    expect(markup).toContain('<details')
    expect(markup).not.toContain('<details open')
    expect(markup).toContain('Past scenes')
    expect(markup).toContain('href="/dm/scenes/the-casino-closes"')
    expect(markup).not.toContain('Chaos at the docks')
  })

  it('shows nothing when no scene is past', () => {
    expect(renderToStaticMarkup(<DmPastScenes scenes={[]} />)).toBe('')
  })
})
