import { Link } from '@tanstack/react-router'

import { LocationReference } from '#/components/location-reference'
import { OrganizationReference } from '#/components/organization-reference'
import { Avatar } from '#/components/ui/avatar'
import type { Content } from '#/definitions/content.ts'
import { isEntityRef } from '#/definitions/kind.ts'
import type { Reference } from '#/definitions/reference.ts'
import { entityLink, refLink, type EntityKind } from '#/lib/campaign'
import { cn } from '#/lib/utils'

type ContentParagraph = Content[number]
type ContentAtom = ContentParagraph[number]
type Media = Extract<ContentAtom, { url: string }>

export function ContentRenderer({ content, className }: { content: Content; className?: string }) {
  return (
    <div className={cn('space-y-3 text-sm leading-relaxed', className)}>
      {content.map((item, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- content parts lack stable ids
        <ContentPart key={index} part={item} />
      ))}
    </div>
  )
}

function ContentPart({ part }: { part: ContentParagraph | ContentAtom }) {
  if (typeof part === 'string') {
    return <p>{part}</p>
  }

  if (Array.isArray(part)) {
    if (isInlineRun(part)) {
      return <InlineRun items={part} />
    }
    return (
      <>
        {part.map((child, index) => (
          // oxlint-disable-next-line react/no-array-index-key -- content parts lack stable ids
          <ContentPart key={index} part={child} />
        ))}
      </>
    )
  }

  if (isMedia(part)) {
    if (part.type === 'image' || part.type === 'map') {
      return (
        <img
          src={part.url}
          alt=""
          className="border-border max-w-full rounded-lg border"
          loading="lazy"
        />
      )
    }
    if (part.type === 'video') {
      return (
        <video src={part.url} controls className="border-border max-w-full rounded-lg border" />
      )
    }
    if (part.type === 'audio') {
      return <audio src={part.url} controls className="w-full" />
    }
  }

  if (isReference(part)) {
    const link = refLink(part)
    if (!link) return null
    if (link.kind === 'location') {
      return <LocationReference slug={link.slug} label={link.name} />
    }
    if (link.kind === 'organization') {
      return <OrganizationReference slug={link.slug} label={link.name} />
    }
    return (
      <Link
        {...entityLink(link.kind, link.slug)}
        className="text-primary font-medium underline-offset-4 hover:underline"
      >
        {link.name}
      </Link>
    )
  }

  return null
}

/**
 * Renders a flat array of plain-text segments and entity references as one
 * paragraph — text flows together with references as inline links.
 */
function InlineRun({ items }: { items: ContentParagraph }) {
  return (
    <p className="leading-relaxed">
      {items.map((item, index) => {
        if (typeof item === 'string') {
          // oxlint-disable-next-line react/no-array-index-key -- content runs lack stable ids
          return <span key={index}>{item}</span>
        }
        if (isReference(item)) {
          const link = refLink(item)
          if (!link) return null
          if (link.kind === 'location') {
            // oxlint-disable-next-line react/no-array-index-key -- content runs lack stable ids
            return <LocationReference key={index} slug={link.slug} label={link.name} />
          }
          if (link.kind === 'organization') {
            // oxlint-disable-next-line react/no-array-index-key -- content runs lack stable ids
            return <OrganizationReference key={index} slug={link.slug} label={link.name} />
          }
          return (
            <Link
              // oxlint-disable-next-line react/no-array-index-key -- content runs lack stable ids
              key={index}
              {...entityLink(link.kind, link.slug)}
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              {link.name}
            </Link>
          )
        }
        return null
      })}
    </p>
  )
}

/**
 * Renders a single Content value as block-level prose: an inline run becomes one
 * paragraph and a paragraph list becomes stacked paragraphs. Use for fields that
 * hold a single Content value (e.g. `notes`), as opposed to a list of blocks.
 */
export function ContentBlocks({ content, className }: { content: Content; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {content.map((part, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- content parts lack stable ids
        <ContentPart key={index} part={part} />
      ))}
    </div>
  )
}

function isReference(value: unknown): value is Reference {
  return isEntityRef(value)
}

/** True when every element is a plain-text/ref atom, i.e. the array is one paragraph. */
function isInlineRun(items: ContentParagraph): boolean {
  return items.every((item) => typeof item === 'string' || isReference(item))
}

function isMedia(value: unknown): value is Media {
  return !!value && typeof value === 'object' && 'type' in value && 'url' in value
}

/** Rounded avatar + name pill linking to an entity's detail page. */
export function EntityChip({
  kind,
  slug,
  name,
  avatar,
}: {
  kind: EntityKind
  slug: string
  name: string
  avatar: string
}) {
  return (
    <Link
      {...entityLink(kind, slug)}
      className="border-border bg-card hover:border-primary/40 hover:bg-accent/20 flex items-center gap-2 rounded-full border py-1 pr-4 pl-1 transition-colors"
    >
      <Avatar src={avatar} alt={name} loading="lazy" className="border-border size-9 border" />
      <span className="text-sm font-medium">{name}</span>
    </Link>
  )
}

export function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <Avatar
      src={src}
      alt={alt}
      loading="lazy"
      className="border-border size-24 border shadow-sm sm:size-28"
    />
  )
}
