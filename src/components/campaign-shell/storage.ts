import { useCallback, useEffect, useState } from 'react'

export function readStoredSet(key: string): Set<string> | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return new Set(parsed.filter((item): item is string => typeof item === 'string'))
  } catch {
    return null
  }
}

export function writeStoredSet(key: string, value: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...value]))
}

export function readStoredBoolean(key: string): boolean | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return null
    return raw === 'true'
  } catch {
    return null
  }
}

export function writeStoredBoolean(key: string, value: boolean) {
  localStorage.setItem(key, String(value))
}

export function usePersistedSet(
  key: string,
  fallback: () => Set<string>,
): [Set<string>, (slug: string) => void, (slug: string) => void] {
  const [set, setSet] = useState<Set<string>>(fallback)
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    const stored = readStoredSet(key)
    if (stored) setSet(stored)
    setRestored(true)
  }, [key])

  useEffect(() => {
    if (restored) writeStoredSet(key, set)
  }, [key, restored, set])

  const toggle = useCallback((slug: string) => {
    setSet((current) => {
      const next = new Set(current)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }, [])

  const expand = useCallback((slug: string) => {
    setSet((current) => {
      if (current.has(slug)) return current
      const next = new Set(current)
      next.add(slug)
      return next
    })
  }, [])

  return [set, toggle, expand]
}

export function usePersistedBoolean(key: string, fallback: boolean) {
  const [value, setValue] = useState(fallback)
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    const stored = readStoredBoolean(key)
    if (stored !== null) setValue(stored)
    setRestored(true)
  }, [key])

  useEffect(() => {
    if (restored) writeStoredBoolean(key, value)
  }, [key, restored, value])

  return [value, setValue] as const
}
