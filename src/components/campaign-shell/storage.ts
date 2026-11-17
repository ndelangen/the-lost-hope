import { useCallback, useEffect, useState } from 'react'

function readStoredSet(key: string): Set<string> | null {
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

function writeStoredSet(key: string, value: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...value]))
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
