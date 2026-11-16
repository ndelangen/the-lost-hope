import { describe, expect, it } from 'vitest'

import { inkDuration, inkFrame, sealedScrawl } from '#/lib/ink-reveal'

const timing = { stagger: 10, flicker: 50 }

describe('ink reveal', () => {
  it('reveals letters in order, flickering before they settle', () => {
    const frame = inkFrame('ab', 15, () => 0, timing)
    expect(frame.map(({ state }) => state)).toEqual(['flickering', 'flickering'])
    expect(frame[0]?.shown).toBe('a')
    expect(inkFrame('ab', 5, () => 0.5, timing)[1]?.state).toBe('hidden')
  })

  it('settles every letter by the end of the reveal', () => {
    const text = 'Take the ship.'
    const frame = inkFrame(text, inkDuration(text, timing), Math.random, timing)
    expect(frame.every(({ state }) => state === 'settled')).toBe(true)
    expect(frame.map(({ shown }) => shown).join('')).toBe(text)
  })

  it('never flickers spaces or punctuation into letters', () => {
    const frame = inkFrame('a. b', 30, () => 0.3, timing)
    expect(frame[1]?.shown).toBe('.')
    expect(frame[2]?.state).toBe('settled')
  })

  it('draws the same scrawl for the same sealed length', () => {
    expect(sealedScrawl(40)).toBe(sealedScrawl(40))
    expect(sealedScrawl(40).length).toBeLessThanOrEqual(40)
  })
})
