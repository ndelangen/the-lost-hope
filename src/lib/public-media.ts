import { DEFAULT_AVATAR } from '#/definitions/media'
import { GENERATED_PUBLIC_ASSET_PATHS } from '#/generated/public-asset-paths'

const PUBLIC_ASSET_PATHS = new Set<string>(GENERATED_PUBLIC_ASSET_PATHS)

export function hasPublicAsset(source: string): boolean {
  if (!source.startsWith('/')) return true
  const path = source.split(/[?#]/u, 1)[0]
  return path ? PUBLIC_ASSET_PATHS.has(path) : false
}

export function publicAssetUrl(source: string, fallback = DEFAULT_AVATAR): string {
  return hasPublicAsset(source) ? source : fallback
}
