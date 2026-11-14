import { describe, expect, it } from 'vitest'

import { focusShortcut, hpBand, hpFraction, parseAmount } from './encounter-focus'

const key = (
  name: string,
  modifiers: Partial<Record<'altKey' | 'ctrlKey' | 'metaKey', boolean>> = {},
) => ({
  key: name,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  ...modifiers,
})

describe('focus shortcuts', () => {
  it('toggles focus with F and leaves it with Escape', () => {
    expect(focusShortcut(key('f'), { typing: false, focused: false })).toBe('toggle')
    expect(focusShortcut(key('F'), { typing: false, focused: true })).toBe('toggle')
    expect(focusShortcut(key('Escape'), { typing: false, focused: true })).toBe('exit')
  })

  it('opens and closes the DM screen in focus', () => {
    expect(focusShortcut(key('?'), { typing: false, focused: true })).toBe('screen')
    expect(focusShortcut(key('?'), { typing: false, focused: true, screenOpen: true })).toBe(
      'close-screen',
    )
    expect(focusShortcut(key('?'), { typing: false, focused: false })).toBeUndefined()
  })

  it('closes the DM screen before leaving focus', () => {
    expect(focusShortcut(key('Escape'), { typing: false, focused: true, screenOpen: true })).toBe(
      'close-screen',
    )
  })

  it('leaves Escape alone outside focus', () => {
    expect(focusShortcut(key('Escape'), { typing: false, focused: false })).toBeUndefined()
  })

  it('ignores keys typed into fields or pressed with modifiers', () => {
    expect(focusShortcut(key('f'), { typing: true, focused: false })).toBeUndefined()
    expect(
      focusShortcut(key('f', { metaKey: true }), { typing: false, focused: false }),
    ).toBeUndefined()
    expect(
      focusShortcut(key('f', { ctrlKey: true }), { typing: false, focused: false }),
    ).toBeUndefined()
  })
})

describe('HP bars', () => {
  it('measures HP against the maximum', () => {
    expect(hpFraction({ hp: 12, maxHp: 24 })).toBe(0.5)
    expect(hpFraction({ hp: 30, maxHp: 24 })).toBe(1)
    expect(hpFraction({ hp: undefined, maxHp: 24 })).toBeUndefined()
    expect(hpFraction({ hp: 5, maxHp: undefined })).toBeUndefined()
  })

  it('marks bloodied and downed combatants', () => {
    expect(hpBand(1)).toBe('healthy')
    expect(hpBand(0.5)).toBe('bloodied')
    expect(hpBand(0)).toBe('down')
  })
})

describe('damage and healing entry', () => {
  it('accepts whole positive amounts', () => {
    expect(parseAmount(' 12 ')).toBe(12)
  })

  it('rejects empty, zero, negative, and fractional amounts', () => {
    for (const text of ['', '0', '-3', '2.5', 'ten']) expect(parseAmount(text)).toBeUndefined()
  })
})
