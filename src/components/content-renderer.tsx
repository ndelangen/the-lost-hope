import { Link } from '@tanstack/react-router'

import { isEntityRef } from '#/definitions/kind.ts'
import type { Reference } from '#/definitions/reference.ts'
import { Avatar } from '@/components/ui/avatar'
import { entityHref, refLink, type EntityKind } from '@/lib/campaign'
import { cn } from '@/lib/utils'

type Content = string | Reference | Content[] | { type: string; url: string }

export function ContentRenderer({
  content,
  className,
}: {
  content: Content | Content[]
  className?: string
}) {
  const items =
    Array.isArray(content) && !isReference(content) && !isMedia(content)
      ? content
      : [content as Content]

  return (
    <div className={cn('space-y-3 text-sm leading-relaxed', className)}>
      {items.map((item, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- content parts lack stable ids
        <ContentPart key={index} part={item} />
      ))}
    </div>
  )
}

function ContentPart({ part }: { part: Content }) {
  if (typeof part === 'string') {
    return <p>{part}</p>
  }

  if (Array.isArray(part)) {
    return <InlineRun items={part} />
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
    return (
      <Link
        to={entityHref(link.kind, link.slug)}
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
function InlineRun({ items }: { items: Content[] }) {
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
          return (
            <Link
              // oxlint-disable-next-line react/no-array-index-key -- content runs lack stable ids
              key={index}
              to={entityHref(link.kind, link.slug)}
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
 * Renders a single Content value inline (no block wrapper): plain strings become
 * text, entity refs become links, and arrays flatten into a run of both. Media is
 * ignored. Use for one-line fields like `summary` inside an existing element.
 */
export function InlineContent({ content }: { content: Content }) {
  if (typeof content === 'string') return content
  if (isReference(content)) {
    const link = refLink(content)
    if (!link) return null
    return (
      <Link
        to={entityHref(link.kind, link.slug)}
        className="text-primary font-medium underline-offset-4 hover:underline"
      >
        {link.name}
      </Link>
    )
  }
  if (Array.isArray(content)) {
    return (
      <>
        {content.map((item, index) => (
          // oxlint-disable-next-line react/no-array-index-key -- content runs lack stable ids
          <InlineContent key={index} content={item} />
        ))}
      </>
    )
  }
  return null
}

function isReference(value: unknown): value is Reference {
  return isEntityRef(value)
}

function isMedia(value: unknown): value is { type: string; url: string } {
  return !!value && typeof value === 'object' && 'type' in value && 'url' in value
}

export function EntityLink({
  kind,
  slug,
  label,
}: {
  kind: EntityKind
  slug: string
  label?: string
}) {
  return (
    <Link
      to={entityHref(kind, slug)}
      className="border-border bg-card hover:border-primary/40 hover:bg-accent rounded-md border px-2 py-0.5 text-xs transition-colors"
    >
      {label ?? slug}
    </Link>
  )
}

export function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <Avatar
      src={src}
      alt={alt}
      loading="lazy"
      className="border-border size-24 shadow-sm sm:size-28 border"
    />
  )
}

export function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <img src={src} alt={alt} loading="lazy" className="aspect-[3/1] w-full object-cover" />
    </div>
  )
}
