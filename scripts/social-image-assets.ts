import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { DEFAULT_AVATAR, DEFAULT_LOCATION_ILLUSTRATION } from '../src/definitions/media'
import type { PublicPageDescriptor } from '../src/lib/public-page-descriptors'

export function localSocialImagePath(
  root: string,
  page: Pick<PublicPageDescriptor, 'path' | 'entity' | 'imageCandidate'>,
): string | undefined {
  const candidate = page.imageCandidate
  if (
    !candidate?.startsWith('/') ||
    candidate === DEFAULT_AVATAR ||
    candidate === DEFAULT_LOCATION_ILLUSTRATION
  ) {
    return undefined
  }

  const path = join(root, 'public', candidate.slice(1))
  if (existsSync(path)) return path

  if (page.entity?.kind === 'location') {
    throw new Error(`${page.path} references missing location illustration: ${candidate}`)
  }

  return undefined
}
