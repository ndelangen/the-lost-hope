/** Browser preferences the server can read from the request, so the first render matches them. */
export type UiPreferences = {
  /** Show DM-only fields on the campaign pages. Only local dev offers DM mode. */
  dmMode: boolean
  /** Shrink the desktop navigation to its icon rail. */
  navigationCollapsed: boolean
}

const UI_PREFERENCE_COOKIES = {
  dmMode: 'tlh-dm-mode',
  navigationCollapsed: 'tlh-navigation-collapsed',
} as const satisfies Record<keyof UiPreferences, string>

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

function cookieValues(cookieHeader: string): Map<string, string> {
  return new Map(
    cookieHeader
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf('=')
        return separator === -1
          ? [part, '']
          : [part.slice(0, separator), decodeURIComponent(part.slice(separator + 1))]
      }),
  )
}

/** Read the preferences from a `Cookie` header or `document.cookie`. */
export function parseUiPreferences(cookieHeader: string, dmModeAvailable: boolean): UiPreferences {
  const values = cookieValues(cookieHeader)
  return {
    dmMode: dmModeAvailable && values.get(UI_PREFERENCE_COOKIES.dmMode) === '1',
    navigationCollapsed: values.get(UI_PREFERENCE_COOKIES.navigationCollapsed) === '1',
  }
}

/** The `document.cookie` assignment that stores one preference for a year. */
export function uiPreferenceCookie(preference: keyof UiPreferences, value: boolean): string {
  return `${UI_PREFERENCE_COOKIES[preference]}=${value ? '1' : '0'}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`
}
