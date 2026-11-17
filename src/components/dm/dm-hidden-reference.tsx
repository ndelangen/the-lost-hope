import { Link } from '@tanstack/react-router'
import { EyeOff, Swords } from 'lucide-react'

import type { HiddenReference } from '#/components/content-renderer'
import { resolveScene, resolveSourceRef } from '#/lib/dm-campaign'

const className = 'inline-flex items-baseline gap-1 font-medium'
const linkClassName = `${className} text-primary underline-offset-4 hover:underline`

/**
 * A reference, on a DM page, to a record players cannot see: a prepared scene, linked to its page,
 * or a record players have not met, named and marked as hidden and linked to its DM view where one
 * exists.
 */
export function DmHiddenReference({ reference }: { reference: HiddenReference }) {
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

  const record = resolveSourceRef(reference)
  if (!record) return null
  const content = (
    <>
      <EyeOff aria-hidden className="size-3.5 self-center opacity-70" />
      {record.name}
      <span className="sr-only"> (players have not met yet)</span>
    </>
  )
  return reference.ref === 'npc' ? (
    <Link
      to="/dm/npcs/$key"
      params={{ key: reference.key }}
      title="Players have not met this NPC yet"
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
