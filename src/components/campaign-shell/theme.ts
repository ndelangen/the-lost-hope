import { useCallback, useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'dag:theme'

export type Theme = 'light' | 'dark'

export function resolveTheme(storedTheme: string | null, prefersDark: boolean): Theme {
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
  return prefersDark ? 'dark' : 'light'
}

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStoredTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // The in-memory preference still applies when storage is unavailable.
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

/**
 * The root document's inline script sets the theme class before the first paint, so the page never
 * shows the wrong theme. This hook only mirrors that class in state and changes it on request: it
 * must not apply the initial server-rendered state, which would flash the light theme at hydration.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  const changeTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme)
    setTheme(nextTheme)
  }, [])

  useEffect(() => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
    changeTheme(resolveTheme(readStoredTheme(), systemPreference.matches))
    const followSystemPreference = (event: MediaQueryListEvent) => {
      if (readStoredTheme() === null) changeTheme(event.matches ? 'dark' : 'light')
    }

    systemPreference.addEventListener('change', followSystemPreference)
    return () => systemPreference.removeEventListener('change', followSystemPreference)
  }, [changeTheme])

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    writeStoredTheme(nextTheme)
    changeTheme(nextTheme)
  }, [changeTheme, theme])

  return { theme, toggleTheme }
}
