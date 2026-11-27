import { describe, expect, it } from 'vitest'

import type { SceneBeat } from '#/definitions/scene'

import { buildSceneScript, currentBeat, parseScriptProgress, setBeatStatus } from './scene-script'

const beat = (title: string, extra: Partial<SceneBeat> = {}): SceneBeat => ({
  title,
  lines: [{ do: [[title]] }],
  illustrations: [],
  outcomes: [],
  ...extra,
})

const script = buildSceneScript([
  beat('Arrival'),
  beat('The jukebox', { onlyIf: [['Someone looks at it.']] }),
  beat('The offer', {
    outcomes: [
      { icon: 'gi/GiConversation', when: [['They accept.']], response: [['…']], followUps: [] },
    ],
  }),
])

describe('buildSceneScript', () => {
  it('numbers the beats in playing order and keeps which ones are optional', () => {
    expect(script.map(({ number, title }) => [number, title])).toEqual([
      [1, 'Arrival'],
      [2, 'The jukebox'],
      [3, 'The offer'],
    ])
    expect(script.map(({ onlyIf }) => onlyIf !== undefined)).toEqual([false, true, false])
  })

  it('gives each beat its own branches, with ids that cannot clash across beats', () => {
    expect(script[0]?.branches).toEqual([])
    expect(script[2]?.branches.map(({ id }) => id)).toEqual(['3.1'])
  })
})

describe('progress through a script', () => {
  it('plays the first beat that is neither played nor skipped', () => {
    expect(currentBeat(script, {})).toBe(1)
    expect(currentBeat(script, { 1: 'done', 2: 'skipped' })).toBe(3)
    expect(currentBeat(script, { 2: 'skipped' })).toBe(1)
    expect(currentBeat(script, { 1: 'done', 2: 'done', 3: 'done' })).toBeUndefined()
  })

  it('marks a beat and puts it back to play', () => {
    const played = setBeatStatus({}, 2, 'skipped')
    expect(played).toEqual({ 2: 'skipped' })
    expect(setBeatStatus(played, 2, undefined)).toEqual({})
  })

  it('reads stored progress back, dropping what the script no longer has', () => {
    const raw = JSON.stringify({ 1: 'done', 2: 'skipped', 3: 'maybe', 9: 'done', x: 'done' })
    expect(parseScriptProgress(raw, 3)).toEqual({ 1: 'done', 2: 'skipped' })
    expect(parseScriptProgress('not json', 3)).toEqual({})
    expect(parseScriptProgress(null, 3)).toEqual({})
  })
})

describe('beat pictures', () => {
  it('places each picture by its position in the scene illustrations', () => {
    const [first] = buildSceneScript(
      [beat('Arrival', { illustrations: ['/b.png'] })],
      ['/a.png', '/b.png'],
    )
    expect(first?.pictures).toEqual([{ src: '/b.png', index: 1 }])
  })
})
