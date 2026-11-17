import { createContext, useContext } from 'react'

/**
 * How large encounter controls render. Prep pages use the app's normal sizing; combat focus doubles
 * the hit targets and icons so the DM finds them at a glance.
 */
type Density = 'normal' | 'focus'

const DensityContext = createContext<Density>('normal')

export const EncounterDensity = DensityContext.Provider

export function useDensity() {
  return useContext(DensityContext)
}
