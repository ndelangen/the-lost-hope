import { useNavigate, useRouterState } from '@tanstack/react-router'

import { loadPreset, type Preset } from '#/lib/encounter'

import { updateEncounter } from './encounter/use-encounter-store'

/**
 * Load what a scene prepared into the one encounter, adding it to the running fight or replacing
 * that fight, and take the DM to the encounter in combat focus.
 */
export function useLoadPreset() {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  return (preset: Preset, mode: 'add' | 'replace') => {
    updateEncounter((current) => loadPreset(current, preset, mode))
    if (pathname !== '/dm/encounter')
      void navigate({ to: '/dm/encounter', search: { combat: true } })
  }
}
