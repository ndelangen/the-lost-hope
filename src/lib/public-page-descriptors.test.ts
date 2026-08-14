import { describe, expect, it } from 'vitest'

import { COLLECTIONS, allEntities, getEntity } from '#/lib/campaign'
import {
  PUBLIC_PAGE_DESCRIPTORS,
  publicEntityPageDescriptor,
  validatePublicPageDescriptors,
} from '#/lib/public-page-descriptors'
import { canonicalUrl, publicPageHead, socialImagePath } from '#/lib/public-page-metadata'

describe('public page descriptors', () => {
  it('exhaustively projects 13 static pages and every registry entity', () => {
    const detailCount = COLLECTIONS.reduce((count, kind) => count + allEntities(kind).length, 0)
    expect(detailCount).toBe(336)
    expect(PUBLIC_PAGE_DESCRIPTORS).toHaveLength(13 + detailCount)
    expect(validatePublicPageDescriptors()).toEqual([])
  })

  it('round-trips every detail page to its canonical entity', () => {
    for (const page of PUBLIC_PAGE_DESCRIPTORS) {
      if (!page.entity) continue
      expect(getEntity(page.entity.kind, page.entity.slug)?.data.name).toBe(page.title)
      expect(publicEntityPageDescriptor(page.entity.kind, page.entity.slug)).toBe(page)
    }
  })

  it('aligns canonical, social and structured metadata', () => {
    for (const page of PUBLIC_PAGE_DESCRIPTORS) {
      const head = publicPageHead(page)
      const canonical = canonicalUrl(page.path)
      const image = canonicalUrl(socialImagePath(page))
      expect(head.links).toEqual([{ rel: 'canonical', href: canonical }])
      expect(head.meta).toContainEqual({ property: 'og:url', content: canonical })
      expect(head.meta).toContainEqual({ property: 'og:image', content: image })
      expect(head.meta).toContainEqual({ name: 'twitter:image', content: image })
    }
  })
})
