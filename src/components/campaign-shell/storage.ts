import { useCallback, useEffect, useState } from 'react'

import {
  collectionKindFromPath,
  entitySlugFromPath,
  sessionSlugForEvent,
  type Entity,
} from '#/lib/campaign'

import { SIDEBAR_COLLECTIONS, STORAGE_KEYS, type SidebarCollection } from './constants'

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

export function defaultExpandedSessions(pathname: string, sessions: Entity[]): Set<string> {
  const stored = readStoredSet(STORAGE_KEYS.expandedSessions)
  if (stored) return stored

  const slugs = new Set<string>()
  const latest = sessions[0]
  if (latest) slugs.add(latest.slug)

  const kind = collectionKindFromPath(pathname)
  const slug = entitySlugFromPath(pathname)
  if (kind === 'event' && slug) {
    const sessionSlug = sessionSlugForEvent(slug)
    if (sessionSlug) slugs.add(sessionSlug)
  } else if (kind === 'session' && slug) {
    slugs.add(slug)
  }

  return slugs
}

export function defaultExpandedCollections(pathname: string): Set<string> {
  const stored = readStoredSet(STORAGE_KEYS.expandedCollections)
  if (stored) return stored

  const kind = collectionKindFromPath(pathname)
  if (kind && SIDEBAR_COLLECTIONS.includes(kind as SidebarCollection)) {
    return new Set([kind])
  }
  return new Set()
}

export function usePersistedSet(
  key: string,
  initial: () => Set<string>,
): [Set<string>, (slug: string) => void, (slug: string) => void] {
  const [set, setSet] = useState<Set<string>>(initial)

  useEffect(() => {
    writeStoredSet(key, set)
  }, [key, set])

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
