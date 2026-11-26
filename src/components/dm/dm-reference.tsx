import { Link } from '@tanstack/react-router'
import { EyeOff, Swords } from 'lucide-react'

import type { DmReferenceTarget } from '#/components/content-renderer'
import { DmCreatureGlance } from '#/components/dm/dm-creature-glance'
import { ReferenceAvatar } from '#/components/entity-reference'
import { HoverPreview } from '#/components/ui/hover-preview'
import type { Content } from '#/definitions/content'
import type { OwnOrSharedStatBlock } from '#/definitions/stat-block'
import { contentToText, refLink } from '#/lib/campaign'
import { creatureGlance } from '#/lib/creature-glance'
import { resolveScene, resolveSourceRef } from '#/lib/dm-campaign'

const className = 'inline-flex items-baseline gap-1 font-medium'
const linkClassName = `${className} text-primary underline-offset-4 hover:underline`
const unmetIcon = <EyeOff aria-hidden className="size-3.5 self-center opacity-70" />
const unmetNote = <span className="sr-only"> (players have not met yet)</span>

/**
 * A reference on a DM page. Characters and creatures, met or not, show their face and open a
 * glance at their numbers on hover or focus; a prepared scene links to its page; any other record
 * players have not met is named, marked as hidden, and linked to its DM view where one exists.
 */
export function DmReference({ reference }: { reference: DmReferenceTarget }) {
  if (reference.ref === 'scene') {
    const scene = resolveScene({ ref: 'scene', key: reference.key })
    if (!scene) return null
    return (
      <Link to="/dm/scenes/$slug" params={{ slug: scene.slug }} className={linkClassName}>
        <Swords aria-hidden className="size-3.5 self-center opacity-70" />
        {scene.name}
      </Link>
    )
  }
  if (reference.ref === 'npc' || reference.ref === 'beast') {
    return <DmCreatureReference reference={{ ref: reference.ref, key: reference.key }} />
  }

  const record = resolveSourceRef(reference)
  if (!record) return null
  const content = (
    <>
      {unmetIcon}
      {record.name}
      {unmetNote}
    </>
  )
  return reference.ref === 'item' ? (
    <Link
      to="/dm/items/$slug"
      params={{ slug: record.slug }}
      title="Players have not found this item yet"
      className={linkClassName}
    >
      {content}
    </Link>
  ) : (
    <span title="Players have not met this yet" className={className}>
      {content}
    </span>
  )
}

type CreatureRecord = {
  slug: string
  name: string
  avatar?: string
  stats?: OwnOrSharedStatBlock
  motivations?: Content
}

/** An NPC or beast: face, the eye when unmet, the name, and its glance card. */
function DmCreatureReference({ reference }: { reference: { ref: 'npc' | 'beast'; key: string } }) {
  const record = resolveSourceRef(reference) as CreatureRecord | undefined
  if (!record) return null
  const met = refLink(reference) !== undefined
  const glance = creatureGlance(record.stats)
  const content = (
    <>
      <span className="shrink-0 self-center">
        <ReferenceAvatar src={record.avatar} />
      </span>
      {met ? null : unmetIcon}
      {record.name}
      {met ? null : unmetNote}
    </>
  )
  const trigger =
    reference.ref === 'npc' ? (
      <Link to="/dm/npcs/$slug" params={{ slug: record.slug }} className={linkClassName}>
        {content}
      </Link>
    ) : met ? (
      <Link to="/beasts/detail/$slug" params={{ slug: record.slug }} className={linkClassName}>
        {content}
      </Link>
    ) : (
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- focus opens the glance card
      <span tabIndex={glance ? 0 : undefined} className={className}>
        {content}
      </span>
    )
  if (!glance) return trigger
  return (
    <HoverPreview
      interactive
      previewClassName="w-96 max-w-[min(24rem,calc(100vw-1rem))]"
      content={
        <DmCreatureGlance
          name={record.name}
          avatar={record.avatar}
          glance={glance}
          met={met}
          wants={firstSentence(record.motivations)}
          npcSlug={reference.ref === 'npc' ? record.slug : undefined}
        />
      }
    >
      {trigger}
    </HoverPreview>
  )
}

function firstSentence(content: Content | undefined) {
  const text = content ? contentToText(content).trim() : ''
  if (!text) return undefined
  const end = text.search(/[.!?](\s|$)/u)
  return end === -1 ? text : text.slice(0, end + 1)
}
