import { createContext, useContext } from 'react'

/**
 * DM mode shows DM-only fields on the campaign pages. A cookie cannot keep players out, so only
 * local dev offers it; the public build never shows the switch or the DM-only fields.
 */
export const DM_MODE_AVAILABLE = import.meta.env.DEV

export const DmModeContext = createContext(false)

export function useDmMode(): boolean {
  return useContext(DmModeContext)
}
