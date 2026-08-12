import { EntityReference } from '#/components/entity-reference'
import { Stack } from '#/components/ui/layout'
import type { Content } from '#/definitions/content.ts'
import { isEntityRef } from '#/definitions/kind.ts'
import type { Reference } from '#/definitions/reference.ts'
import { refLink } from '#/lib/campaign'
import { publicAssetUrl } from '#/lib/public-media'
import { cn } from '#/lib/utils'

type ContentParagraph = Content[number]
type ContentAtom = ContentParagraph[number]
type ExternalLink = Extract<ContentAtom, { type: 'link' }>
type Media = Extract<ContentAtom, { type: 'image' | 'video' | 'audio' | 'map' }>

export function ContentRenderer({ content, className }: { content: Content; className?: string }) {
  return (
    <Stack gap="md" className={cn('text-sm leading-relaxed', className)}>
      {content.map((item, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- content parts lack stable ids
        <ContentPart key={index} part={item} />
      ))}
    </Stack>
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

  if (isExternalLink(part)) {
    return <ContentExternalLink link={part} />
  }

  if (isMedia(part)) {
    if (part.type === 'image' || part.type === 'map') {
      return (
        <img
          src={publicAssetUrl(part.url)}
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
    return <ContentReference reference={part} />
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
          return (
            // oxlint-disable-next-line react/no-array-index-key -- content runs lack stable ids
            <ContentReference key={index} reference={item} />
          )
        }
        if (isExternalLink(item)) {
          return (
            // oxlint-disable-next-line react/no-array-index-key -- content runs lack stable ids
            <ContentExternalLink key={index} link={item} />
          )
        }
        return null
      })}
    </p>
  )
}

function ContentExternalLink({ link }: { link: ExternalLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="text-primary font-medium underline-offset-4 hover:underline"
    >
      {link.label}
    </a>
  )
}

function ContentReference({ reference }: { reference: Reference }) {
  const link = refLink(reference)
  if (!link) return null
  return <EntityReference kind={link.kind} slug={link.slug} label={link.name} />
}

function isReference(value: unknown): value is Reference {
  return isEntityRef(value)
}

/** True when every element is a plain-text/ref atom, i.e. the array is one paragraph. */
function isInlineRun(items: ContentParagraph): boolean {
  return items.every(
    (item) => typeof item === 'string' || isReference(item) || isExternalLink(item),
  )
}

function isMedia(value: unknown): value is Media {
  return (
    !!value &&
    typeof value === 'object' &&
    'type' in value &&
    ['image', 'video', 'audio', 'map'].includes(String(value.type)) &&
    'url' in value
  )
}

function isExternalLink(value: unknown): value is ExternalLink {
  return (
    !!value &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'link' &&
    'label' in value &&
    'url' in value
  )
}
