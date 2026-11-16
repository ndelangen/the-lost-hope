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
