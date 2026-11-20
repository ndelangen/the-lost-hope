import { describe, expect, it } from 'vitest'

import type { SceneOutcome } from '#/definitions/scene'

import { buildSceneBranches, pickBranch, walkBranchPath } from './scene-branches'

const branch = (text: string, followUps: SceneOutcome[] = []): SceneOutcome => ({
  icon: 'gi/GiConversation',
  when: [[text]],
  response: [['…']],
  followUps,
})

describe('buildSceneBranches', () => {
  it('gives nested branches outline ids and counts everything a skipped branch hides', () => {
    const [a, e] = buildSceneBranches([
      branch('A', [branch('B', [branch('C')]), branch('D')]),
      branch('E'),
    ])

    expect(a?.id).toBe('1')
    expect(a?.descendantCount).toBe(3)
    expect(a?.followUps.map((child) => child.id)).toEqual(['1.1', '1.2'])
    expect(a?.followUps[0]?.followUps[0]?.id).toBe('1.1.1')
    expect(a?.followUps[0]?.descendantCount).toBe(1)
    expect(e?.id).toBe('2')
    expect(e?.descendantCount).toBe(0)
  })
})

describe('walkBranchPath', () => {
  const branches = buildSceneBranches([
    branch('A', [branch('B', [branch('C')]), branch('D')]),
    branch('E'),
  ])
  const ids = (picks: Record<string, string>) =>
    walkBranchPath(branches, picks).map((fork) => [fork.key, fork.picked?.id])

  it('stops at the first undecided fork', () => {
    expect(ids({})).toEqual([['', undefined]])
    expect(ids({ '': '1' })).toEqual([
      ['', '1'],
      ['1', undefined],
    ])
  })

  it('follows picks down to an outcome with no follow-ups', () => {
    expect(ids({ '': '1', '1': '1.1', '1.1': '1.1.1' })).toEqual([
      ['', '1'],
      ['1', '1.1'],
      ['1.1', '1.1.1'],
    ])
    expect(ids({ '': '2' })).toEqual([['', '2']])
  })

  it('keeps picks off the path, so going back restores what was under an outcome', () => {
    const deep = { '': '1', '1': '1.2' }
    const away = pickBranch(deep, '', '2')
    expect(walkBranchPath(branches, away)).toHaveLength(1)
    expect(ids(pickBranch(away, '', '1'))).toEqual([
      ['', '1'],
      ['1', '1.2'],
    ])
  })

  it('leaves a fork undecided again', () => {
    expect(pickBranch({ '': '1', '1': '1.2' }, '')).toEqual({ '1': '1.2' })
  })
})
