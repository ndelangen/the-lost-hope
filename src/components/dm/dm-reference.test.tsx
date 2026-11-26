// @vitest-environment jsdom
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ContentRenderer } from '#/components/content-renderer'
import { DmReferenceContext } from '#/components/dm-reference-context'
import type { Content } from '#/definitions/content'
import { arcs, resolveSourceRef, scenes } from '#/lib/dm-campaign'

import { DmReference } from './dm-reference'

type CreatureRef = { ref: 'npc' | 'beast'; key: string }

/** Every NPC and beast reference anywhere in the DM's arcs and scenes, once each. */
function creatureRefs(): CreatureRef[] {
  const found = new Map<string, CreatureRef>()
  const walk = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(walk)
    if (!value || typeof value !== 'object') return
    const record = value as Record<string, unknown>
    if ((record.ref === 'npc' || record.ref === 'beast') && typeof record.key === 'string') {
      found.set(`${record.ref}:${record.key}`, { ref: record.ref, key: record.key })
      return
    }
    Object.values(record).forEach(walk)
  }
  walk(Object.values(scenes))
  walk(Object.values(arcs))
  return [...found.values()]
}

/** Renders content as a DM page does, inside a router so links can resolve. */
async function renderOnDmPage(content: Content) {
  const root = createRootRoute({
    component: () => (
      <DmReferenceContext value={DmReference}>
        <div data-testid="content">
          <ContentRenderer content={content} />
        </div>
      </DmReferenceContext>
    ),
  })
  const router = createRouter({
    routeTree: root,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  render(<RouterProvider router={router} />)
  return screen.findByTestId('content')
}

describe('DM references', () => {
  afterEach(cleanup)

  it('names every NPC and beast the DM’s scenes and arcs mention, met or not', async () => {
    const refs = creatureRefs()
    expect(refs.length).toBeGreaterThan(10)
    const content: Content = [refs.flatMap((ref) => ['[', ref, ']'])]
    const text = (await renderOnDmPage(content)).textContent ?? ''
    for (const ref of refs) {
      const name = resolveSourceRef(ref)?.name
      expect(name, `${ref.ref}:${ref.key}`).toBeTruthy()
      expect(text, `${ref.ref}:${ref.key}`).toContain(`${name}`)
    }
    expect(text).not.toContain('[]')
  })

  it('marks a record the party has not met, and keeps the name', async () => {
    const text = (
      await renderOnDmPage([['The ', { ref: 'npc', key: 'tempest_soldier' }, 's lie tied up.']])
    ).textContent
    expect(text).toBe('The Tempest Soldier (players have not met yet)s lie tied up.')
  })
})
