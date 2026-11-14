import { Link } from '@tanstack/react-router'
import { EyeOff } from 'lucide-react'

import type { Reference } from '#/definitions/reference'
import { resolveSourceRef } from '#/lib/dm-campaign'

const className = 'inline-flex items-baseline gap-1 font-medium'

/**
 * A reference, on a DM page, to a record players have not met: named and marked as hidden, and
 * linked to its DM view where one exists.
 */
export function DmHiddenReference({ reference }: { reference: Reference }) {
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
      className={`${className} text-primary underline-offset-4 hover:underline`}
    >
      {content}
    </Link>
  ) : (
    <span title="Players have not met this yet" className={className}>
      {content}
    </span>
  )
}
