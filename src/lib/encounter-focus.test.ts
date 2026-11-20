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

describe('encounter shortcuts', () => {
  it('opens each drawer with its key', () => {
    expect(focusShortcut(key('a'), { typing: false, open: undefined })).toBe('add')
    expect(focusShortcut(key('A'), { typing: false, open: 'screen' })).toBe('add')
    expect(focusShortcut(key('n'), { typing: false, open: undefined })).toBe('notes')
    expect(focusShortcut(key('?'), { typing: false, open: undefined })).toBe('screen')
  })

  it('closes a drawer with its own key or Escape', () => {
    expect(focusShortcut(key('?'), { typing: false, open: 'screen' })).toBe('close')
    expect(focusShortcut(key('Escape'), { typing: false, open: 'add' })).toBe('close')
    expect(focusShortcut(key('Escape'), { typing: false, open: undefined })).toBeUndefined()
  })

  it('leaves typing and browser shortcuts alone', () => {
    expect(focusShortcut(key('a'), { typing: true, open: undefined })).toBeUndefined()
    expect(
      focusShortcut(key('a', { metaKey: true }), { typing: false, open: undefined }),
    ).toBeUndefined()
    expect(focusShortcut(key('f'), { typing: false, open: undefined })).toBeUndefined()
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
