import { describe, expect, it } from 'vitest'

import type { SceneOutcome } from '#/definitions/scene'

import { buildSceneBranches } from './scene-branches'

const branch = (text: string, followUps: SceneOutcome[] = []): SceneOutcome => ({
  when: [[text]],
  response: [['…']],
  followUps,
})

describe('buildSceneBranches', () => {
  it('gives nested branches outline ids and counts everything a skipped branch hides', () => {
    const [a, e] = buildSceneBranches(
      [branch('A', [branch('B', [branch('C')]), branch('D')]), branch('E')],
      () => false,
    )

    expect(a?.id).toBe('1')
    expect(a?.descendantCount).toBe(3)
    expect(a?.followUps.map((child) => child.id)).toEqual(['1.1', '1.2'])
    expect(a?.followUps[0]?.followUps[0]?.id).toBe('1.1.1')
    expect(a?.followUps[0]?.descendantCount).toBe(1)
    expect(e?.id).toBe('2')
    expect(e?.descendantCount).toBe(0)
  })
})

describe('who and what a branch names', () => {
  const npc = (key: string) => ({ ref: 'npc', key }) as const
  const item = (key: string) => ({ ref: 'item', key }) as const

  it('lists the NPCs a branch names once each, in order of first mention', () => {
    const [only] = buildSceneBranches(
      [
        {
          when: [['They help ', npc('maren'), ' or ', npc('pell'), '.']],
          response: [[npc('pell'), ' points them on, past ', { ref: 'location', key: 'docks' }]],
          followUps: [],
        },
      ],
      () => false,
    )

    expect(only?.npcs).toEqual([npc('maren'), npc('pell')])
  })

  it('lists only the items that hold a secret, in follow-ups too', () => {
    const [only] = buildSceneBranches(
      [
        {
          when: [['They take the ', item('draught'), ' and the ', item('rope'), '.']],
          response: [['The ', item('draught'), ' works.']],
          followUps: [
            { when: [['They drink the ', item('draught'), '.']], response: [['…']], followUps: [] },
          ],
        },
      ],
      (named) => named.key === 'draught',
    )

    expect(only?.items).toEqual([item('draught')])
    expect(only?.followUps[0]?.items).toEqual([item('draught')])
  })
})
