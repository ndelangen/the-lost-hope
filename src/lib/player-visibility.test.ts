import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import type { EntityKind } from '#/definitions/kind'
import { getEntity, resolveRef, searchEntities } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'

import { DM_FIELDS, playerVisibleKeys, stripDmFields } from './player-visibility'

const EMPTY = {
  beast: {},
  pc: {},
  npc: {},
  location: {},
  event: {},
  session: {},
  quest: {},
  organization: {},
  item: {},
} satisfies Record<EntityKind, Record<string, object>>

const ref = <K extends EntityKind>(kind: K, key: string) => ({ ref: kind, key })

describe('player visibility', () => {
  const registries = {
    ...EMPTY,
    pc: { jim: { name: 'Jim' } },
    quest: { jims_past: { name: "Jim's past" } },
    session: { s1: { name: 'Session 1', events: [ref('event', 'played')] } },
    event: {
      played: {
        name: 'Played',
        location: ref('location', 'tavern'),
        notes: [['Met ', ref('npc', 'met'), ' after ', ref('event', 'offscreen')]],
        background: [['Secretly watched by ', ref('npc', 'watcher')]],
      },
      offscreen: { name: 'Off-screen', notes: [['', ref('npc', 'villain'), ' moves.']] },
    },
    npc: { met: {}, watcher: {}, villain: {}, unmet: {} },
    location: {
      world: {},
      city: { parent: ref('location', 'world') },
      tavern: { parent: ref('location', 'city') },
      elsewhere: { parent: ref('location', 'world') },
    },
  }
  const visible = playerVisibleKeys(registries)

  it('always shows PCs, sessions and quests', () => {
    expect([...visible.pc]).toEqual(['jim'])
    expect([...visible.session]).toEqual(['s1'])
    expect([...visible.quest]).toEqual(['jims_past'])
  })

  it('shows events listed in a session and keeps off-screen events hidden', () => {
    expect([...visible.event]).toEqual(['played'])
  })

  it('introduces records through played events only, never through background or other events', () => {
    expect([...visible.npc]).toEqual(['met'])
  })

  it('shows the parents of a visible location', () => {
    expect([...visible.location].toSorted()).toEqual(['city', 'tavern', 'world'])
  })

  it('removes the DM fields of each kind', () => {
    expect(stripDmFields('npc', { name: 'X', motivations: [], background: [], notes: [] })).toEqual(
      {
        name: 'X',
        notes: [],
      },
    )
    expect(DM_FIELDS.session).toEqual([])
  })
})

describe('player campaign', () => {
  it('keeps background out of player records while the source keeps it', () => {
    expect(SOURCE_REGISTRIES.pc.fix.background).toBeDefined()
    expect(getEntity('pc', 'fix')?.data).not.toHaveProperty('background')
    expect(resolveRef(refs.events.n2_e059)?.data).not.toHaveProperty('background')
  })

  it('keeps undiscovered memberships out of player records', () => {
    expect(SOURCE_REGISTRIES.pc.fix.secretMemberships).toHaveLength(1)
    expect(getEntity('pc', 'fix')?.data).not.toHaveProperty('secretMemberships')
  })

  it('hides records the party has not met yet', () => {
    expect(SOURCE_REGISTRIES.npc.knukkles).toBeDefined()
    expect(getEntity('npc', 'knukkles')).toBeUndefined()
    expect(getEntity('location', 'night-mothers-church')).toBeUndefined()
    expect(getEntity('location', 'temple-of-the-watchers')).toBeUndefined()
    expect(searchEntities('knukkles')).toEqual([])
  })

  it('does not find DM-only text through search', () => {
    expect(searchEntities('actively hunting him')).toEqual([])
  })
})
