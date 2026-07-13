import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

export const THEME_STORAGE_KEY = 'dag:theme'

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

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return resolveTheme(readStoredTheme(), prefersDark)
  })

  useLayoutEffect(() => applyTheme(theme), [theme])

  useEffect(() => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
    const followSystemPreference = (event: MediaQueryListEvent) => {
      if (readStoredTheme() === null) setTheme(event.matches ? 'dark' : 'light')
    }

    systemPreference.addEventListener('change', followSystemPreference)
    return () => systemPreference.removeEventListener('change', followSystemPreference)
  }, [])

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    writeStoredTheme(nextTheme)
    setTheme(nextTheme)
  }, [theme])

  return { theme, toggleTheme }
}
