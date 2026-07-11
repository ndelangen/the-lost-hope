import { EntityReference } from '#/components/entity-reference'
import { Stack } from '#/components/ui/layout'
import type { Content } from '#/definitions/content.ts'
import { isEntityRef } from '#/definitions/kind.ts'
import type { Reference } from '#/definitions/reference.ts'
import { refLink } from '#/lib/campaign'
import { cn } from '#/lib/utils'

type ContentParagraph = Content[number]
type ContentAtom = ContentParagraph[number]
type Media = Extract<ContentAtom, { url: string }>

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
        return null
      })}
    </p>
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
  return items.every((item) => typeof item === 'string' || isReference(item))
}

function isMedia(value: unknown): value is Media {
  return !!value && typeof value === 'object' && 'type' in value && 'url' in value
}
