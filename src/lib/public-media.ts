import { DEFAULT_AVATAR } from '#/definitions/media'
import { GENERATED_PUBLIC_ASSET_PATHS } from '#/generated/public-asset-paths'
import { GENERATED_RESPONSIVE_IMAGES } from '#/generated/responsive-images'

const PUBLIC_ASSET_PATHS = new Set<string>(GENERATED_PUBLIC_ASSET_PATHS)
const RESPONSIVE_IMAGES = GENERATED_RESPONSIVE_IMAGES as Readonly<
  Record<
    string,
    {
      width: number
      height: number
      candidates: ReadonlyArray<{ src: string; width: number; height: number; bytes: number }>
    }
  >
>

export function responsiveImageFor(source: string) {
  return RESPONSIVE_IMAGES[source]
}

export function hasPublicAsset(source: string): boolean {
  if (responsiveImageFor(source)) return true
  if (!source.startsWith('/')) return true
  const path = source.split(/[?#]/u, 1)[0]
  return path ? PUBLIC_ASSET_PATHS.has(path) : false
}

export function publicAssetUrl(source: string, fallback = DEFAULT_AVATAR): string {
  const responsiveSource = responsiveImageFor(source)?.candidates[0]?.src
  if (responsiveSource) return responsiveSource
  return hasPublicAsset(source) ? source : fallback
}
