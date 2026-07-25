import { describe, expect, it } from 'vitest'

import { allEntities, COLLECTIONS, type Entity } from '#/lib/campaign'

import { buildEntrySnapshot } from './entry-snapshot'

const location = {
  kind: 'location',
  slug: 'fairhaven',
  data: { slug: 'fairhaven', name: 'Fairhaven' },
} as Entity

describe('buildEntrySnapshot', () => {
  it('preserves canonical data while deterministically encoding dates and references', () => {
    const entity = {
      kind: 'npc',
      slug: 'roberto',
      data: {
        slug: 'roberto',
        name: 'Roberto',
        notes: ['First', { ref: 'location', key: 'fairhaven' }, 'Last'],
        appeared: new Date('2025-01-02T03:04:05.000Z'),
        empty: '',
        omitted: undefined,
      },
    } as unknown as Entity

    const snapshot = buildEntrySnapshot(entity, (reference) =>
      reference.ref === 'location' && reference.key === 'fairhaven' ? location : undefined,
    )

    expect(snapshot).toEqual({
      snapshotVersion: 1,
      entity: {
        kind: 'npc',
        slug: 'roberto',
        name: 'Roberto',
        path: '/npcs/detail/roberto',
      },
      data: {
        appeared: { $date: '2025-01-02T03:04:05.000Z' },
        empty: '',
        notes: [
          'First',
          {
            $ref: {
              kind: 'location',
              key: 'fairhaven',
              slug: 'fairhaven',
              name: 'Fairhaven',
            },
          },
          'Last',
        ],
      },
    })
    expect(Object.keys(snapshot.data)).toEqual(['appeared', 'empty', 'notes'])
  })

  it('retains unresolved reference identity without inventing a target', () => {
    const entity = {
      kind: 'item',
      slug: 'lost-map',
      data: {
        slug: 'lost-map',
        name: 'Lost Map',
        currentOwner: { ref: 'npc', key: 'missing-npc' },
      },
    } as unknown as Entity

    expect(buildEntrySnapshot(entity, () => undefined).data).toEqual({
      currentOwner: {
        $ref: {
          kind: 'npc',
          key: 'missing-npc',
          unresolved: true,
        },
      },
    })
  })

  it('encodes every current canonical entity within the transport limit', () => {
    for (const kind of COLLECTIONS) {
      for (const entity of allEntities(kind)) {
        const snapshot = buildEntrySnapshot(entity)
        expect(snapshot.entity.kind).toBe(kind)
        expect(new TextEncoder().encode(JSON.stringify(snapshot)).byteLength).toBeLessThanOrEqual(
          32_768,
        )
      }
    }
  })
})
