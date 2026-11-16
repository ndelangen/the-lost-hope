import { describe, expect, it } from 'vitest'

import { parseUiPreferences, uiPreferenceCookie } from './ui-preferences'

describe('UI preferences', () => {
  it('defaults to the full navigation without DM mode', () => {
    expect(parseUiPreferences('', true)).toEqual({ dmMode: false, navigationCollapsed: false })
  })

  it('reads both preferences from a cookie header', () => {
    expect(parseUiPreferences('other=x; tlh-dm-mode=1; tlh-navigation-collapsed=1', true)).toEqual({
      dmMode: true,
      navigationCollapsed: true,
    })
  })

  it('never turns DM mode on where it is unavailable', () => {
    expect(parseUiPreferences('tlh-dm-mode=1', false).dmMode).toBe(false)
  })

  it('round-trips a stored preference', () => {
    const [pair] = uiPreferenceCookie('navigationCollapsed', true).split(';')
    expect(parseUiPreferences(pair!, true).navigationCollapsed).toBe(true)
    const [off] = uiPreferenceCookie('dmMode', false).split(';')
    expect(parseUiPreferences(off!, true).dmMode).toBe(false)
  })
})
