import type { EntityKind } from '#/definitions/kind'
import { GENERATED_SOCIAL_IMAGE_PATHS } from '#/generated/social-image-paths'
import {
  PUBLIC_PAGE_DESCRIPTORS,
  SITE_ORIGIN,
  publicEntityPageDescriptor,
  publicPageDescriptor,
  type PublicPageDescriptor,
} from '#/lib/public-page-descriptors'

const SOCIAL_IMAGE_PATHS = GENERATED_SOCIAL_IMAGE_PATHS as Readonly<Record<string, string>>

const SCHEMA_ENTITY_TYPES: Record<EntityKind, string> = {
  pc: 'Person',
  npc: 'Person',
  location: 'Place',
  organization: 'Organization',
  session: 'CreativeWork',
  event: 'Thing',
  quest: 'Thing',
  beast: 'Thing',
  item: 'Thing',
}

export function canonicalUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).href
}

export function socialImagePath(page: PublicPageDescriptor): string {
  const path = SOCIAL_IMAGE_PATHS[page.path]
  if (!path) throw new Error(`Missing generated social image for ${page.path}`)
  return path
}

function structuredData(page: PublicPageDescriptor): Record<string, unknown> {
  const url = canonicalUrl(page.path)
  const image = canonicalUrl(socialImagePath(page))
  if (page.pageKind === 'home') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_ORIGIN}/#website`,
          url: `${SITE_ORIGIN}/`,
          name: 'The Lost Hope',
          description: page.description,
        },
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: page.title,
          description: page.description,
          image,
          isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        },
      ],
    }
  }

  const pageType =
    page.pageKind === 'intro'
      ? 'AboutPage'
      : page.pageKind === 'collection' ||
          page.pageKind === 'locations' ||
          page.pageKind === 'questions'
        ? 'CollectionPage'
        : 'WebPage'
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    image,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
  }

  if (page.pageKind === 'collection' || page.pageKind === 'locations') {
    const itemPages =
      page.pageKind === 'locations'
        ? PUBLIC_PAGE_DESCRIPTORS.filter((candidate) => candidate.entity?.kind === 'location')
        : PUBLIC_PAGE_DESCRIPTORS.filter(
            (candidate) => candidate.entity && page.path === `/${candidate.path.split('/')[1]}`,
          )
    data.mainEntity = {
      '@type': 'ItemList',
      itemListElement: itemPages.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: canonicalUrl(item.path),
        name: item.title,
      })),
    }
  }

  if (page.entity) {
    data.mainEntity = {
      '@type': SCHEMA_ENTITY_TYPES[page.entity.kind],
      '@id': `${url}#entity`,
      url,
      name: page.title,
      description: page.description,
      image,
    }
  }

  return data
}

export function publicPageHead(page: PublicPageDescriptor) {
  const title = page.path === '/' ? page.title : `${page.title} | The Lost Hope`
  const url = canonicalUrl(page.path)
  const image = canonicalUrl(socialImagePath(page))
  return {
    meta: [
      { title },
      { name: 'description', content: page.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'The Lost Hope' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: page.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${page.title} — The Lost Hope` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: `${page.title} — The Lost Hope` },
      { 'script:ld+json': structuredData(page) },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

export function publicPageHeadForPath(path: string) {
  const page = publicPageDescriptor(path)
  return page ? publicPageHead(page) : {}
}

export function publicEntityPageHead(kind: EntityKind, slug: string) {
  const page = publicEntityPageDescriptor(kind, slug)
  return page ? publicPageHead(page) : {}
}
