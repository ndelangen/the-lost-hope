import { icons as LucideIcons } from 'lucide-react?icon-gallery'
import { useEffect, useState, type ComponentType } from 'react'

import type { IconCatalogEntry } from '#/icon-catalog/types'
import { CUSTOM_ICONS } from '#/lib/custom-icons'
import { cn } from '#/lib/utils'

type GameIconSet = {
  icons: Record<string, { body: string }>
}

type LegacyGameIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>

const GAME_ICON_SLUG_OVERRIDES: Readonly<Record<string, string>> = {
  Gi3dGlasses: '3d-glasses',
  Gi3dHammer: '3d-hammer',
  Gi3dMeeple: '3d-meeple',
  Gi3dStairs: '3d-stairs',
  GiAk47: 'ak47',
  GiAk47U: 'ak47u',
  GiBottomRight3dArrow: 'bottom-right-3d-arrow',
  GiC96: 'c96',
  GiColtM1911: 'colt-m1911',
  GiD10: 'd10',
  GiD12: 'd12',
  GiD4: 'd4',
  GiDna1: 'dna1',
  GiDna2: 'dna2',
  GiF1Car: 'f1-car',
  GiH2O: 'h2o',
  GiM3GreaseGun: 'm3-grease-gun',
  GiMp5: 'mp5',
  GiMp5K: 'mp5k',
  GiP90: 'p90',
  GiSattelite: 'satellite',
  GiSpectreM4: 'spectre-m4',
  GiStarSattelites: 'star-satellites',
  GiThompsonM1: 'thompson-m1',
  GiThompsonM1928: 'thompson-m1928',
}

let gameIconSet: GameIconSet | undefined
let gameIconSetPromise: Promise<GameIconSet> | undefined
let legacyEskimoIconPromise: Promise<LegacyGameIcon> | undefined

function gameIconSlug(entry: IconCatalogEntry): string {
  const sourceSlug = entry.sourceUrl
    ?.split('/')
    .at(-1)
    ?.replace(/\.html$/u, '')
  if (sourceSlug) return sourceSlug
  const overridden = GAME_ICON_SLUG_OVERRIDES[entry.componentName]
  if (overridden) return overridden

  return entry.componentName
    .replace(/^Gi/u, '')
    .replace(/([a-z\d])([A-Z])/gu, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/gu, '$1-$2')
    .toLocaleLowerCase()
}

function loadGameIconSet(): Promise<GameIconSet> {
  gameIconSetPromise ??= import('@iconify-json/game-icons/icons.json').then(
    (module) => module.default as GameIconSet,
  )
  return gameIconSetPromise
}

function useGameIconBody(entry: IconCatalogEntry): string | undefined {
  const enabled = entry.source === 'gi' && entry.componentName !== 'GiEskimo'
  const slug = enabled ? gameIconSlug(entry) : ''
  const [body, setBody] = useState(() => gameIconSet?.icons[slug]?.body)

  useEffect(() => {
    if (!enabled || body) return
    let active = true
    void loadGameIconSet().then((loaded) => {
      gameIconSet = loaded
      if (active) setBody(loaded.icons[slug]?.body)
    })
    return () => {
      active = false
    }
  }, [body, enabled, slug])

  return body
}

function useLegacyEskimoIcon(enabled: boolean): LegacyGameIcon | undefined {
  const [Icon, setIcon] = useState<LegacyGameIcon>()

  useEffect(() => {
    if (!enabled || Icon) return
    legacyEskimoIconPromise ??= import('react-icons/gi').then((module) => module.GiEskimo)
    let active = true
    void legacyEskimoIconPromise.then((loaded) => {
      if (active) setIcon(() => loaded)
    })
    return () => {
      active = false
    }
  }, [enabled, Icon])

  return Icon
}

function fontAwesomeSprite(entry: IconCatalogEntry): string {
  if (entry.sourceCategories.includes('brand/logo')) return 'brands'
  if (entry.sourceCategories.includes('style/regular')) return 'regular'
  return 'solid'
}

export function IconCatalogGlyph({
  entry,
  className,
}: {
  entry: IconCatalogEntry
  className?: string
}) {
  const gameBody = useGameIconBody(entry)
  const LegacyEskimoIcon = useLegacyEskimoIcon(
    entry.source === 'gi' && entry.componentName === 'GiEskimo',
  )

  if (entry.source === 'lucide') {
    const Icon = LucideIcons[entry.componentName as keyof typeof LucideIcons] as
      | LegacyGameIcon
      | undefined
    return Icon ? <Icon className={className} aria-hidden /> : null
  }

  if (entry.source === 'custom') {
    const Icon = CUSTOM_ICONS[entry.id as keyof typeof CUSTOM_ICONS] as LegacyGameIcon | undefined
    return Icon ? <Icon className={className} aria-hidden /> : null
  }

  if (entry.source === 'fa') {
    const slug = entry.sourceUrl?.split('/').at(-1) ?? 'tripadvisor'
    const sprite = fontAwesomeSprite(entry)
    return (
      <svg className={className} fill="currentColor" aria-hidden focusable="false">
        <use href={`/assets/icon-catalog/font-awesome-${sprite}.svg#${slug}`} fill="currentColor" />
      </svg>
    )
  }

  if (LegacyEskimoIcon) return <LegacyEskimoIcon className={className} aria-hidden />

  return gameBody ? (
    <svg
      className={className}
      viewBox="0 0 512 512"
      aria-hidden
      focusable="false"
      dangerouslySetInnerHTML={{ __html: gameBody }}
    />
  ) : (
    <span className={cn('bg-muted animate-pulse rounded', className)} aria-hidden />
  )
}
