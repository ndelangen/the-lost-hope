import { useCallback, useEffect, useState } from 'react'

import { DM_MODE_AVAILABLE } from '#/components/dm-mode'
import { parseUiPreferences, uiPreferenceCookie, type UiPreferences } from '#/lib/ui-preferences'

/**
 * Cookie-backed shell preferences. The server render starts from the request's cookies; static
 * pages, prerendered without cookies, catch up from `document.cookie` after hydration.
 */
export function useUiPreferences(initial: UiPreferences) {
  const [preferences, setPreferences] = useState(initial)

  useEffect(() => {
    const stored = parseUiPreferences(document.cookie, DM_MODE_AVAILABLE)
    setPreferences((current) =>
      current.dmMode === stored.dmMode && current.navigationCollapsed === stored.navigationCollapsed
        ? current
        : stored,
    )
  }, [])

  const setPreference = useCallback((preference: keyof UiPreferences, value: boolean) => {
    document.cookie = uiPreferenceCookie(preference, value)
    setPreferences((current) => ({ ...current, [preference]: value }))
  }, [])

  return [preferences, setPreference] as const
}
