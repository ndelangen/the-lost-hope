import { useNavigate, useRouterState } from '@tanstack/react-router'

import { loadPreset, type Preset } from '#/lib/encounter'

import { updateEncounter } from './encounter/use-encounter-store'

/**
 * Load what a scene prepared into the one encounter, adding it to the running fight or replacing
 * that fight, and take the DM to the Now screen, where the fight runs.
 */
export function useLoadPreset() {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  return (preset: Preset, mode: 'add' | 'replace') => {
    updateEncounter((current) => loadPreset(current, preset, mode))
    if (pathname !== '/dm/now') void navigate({ to: '/dm/now' })
  }
}
