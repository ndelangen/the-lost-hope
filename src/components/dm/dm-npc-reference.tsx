import { EyeOff } from 'lucide-react'

import { ReferenceOverrideContext } from '#/components/content-renderer'
import { DmNpcBrief } from '#/components/dm/dm-npc-brief'
import { Avatar } from '#/components/ui/avatar'
import { HoverPreview } from '#/components/ui/hover-preview'
import type { EntityRef } from '#/definitions/kind'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { refLink } from '#/lib/campaign'
import { resolveSourceRef } from '#/lib/dm-campaign'

/** An NPC named in DM text that opens their brief in place: on hover, or pinned with a click or tap. */
export function DmNpcReference({ npc }: { npc: EntityRef<'npc'> }) {
  const record = resolveSourceRef(npc)
  if (!record) return null
  const met = refLink(npc) !== undefined

  return (
    <HoverPreview
      interactive
      previewClassName="max-w-[min(26rem,calc(100vw-1rem))] p-4 text-sm"
      content={
        <ReferenceOverrideContext value={undefined}>
          <DmNpcBrief npc={npc} />
        </ReferenceOverrideContext>
      }
    >
      <button
        type="button"
        // Inside a branch's summary line, a click opens the brief instead of folding the branch.
        onClick={(event) => event.preventDefault()}
        className="text-primary decoration-primary/40 inline cursor-pointer font-medium underline decoration-dotted underline-offset-4"
      >
        {met ? (
          <Avatar
            src={record.avatar ?? DEFAULT_AVATAR}
            sizes="14px"
            maxWidth={32}
            className="relative -top-px mr-0.5 inline size-3.5 align-middle"
          />
        ) : (
          <EyeOff
            aria-hidden
            className="relative -top-px mr-1 inline size-3.5 align-middle opacity-70"
          />
        )}
        {record.name}
        {met ? null : <span className="sr-only"> (players have not met yet)</span>}
      </button>
    </HoverPreview>
  )
}

/** Renders every NPC reference in the content below as a {@link DmNpcReference}. */
export function npcReferenceOverride(reference: { ref: string; key: string }) {
  return reference.ref === 'npc' ? (
    <DmNpcReference npc={reference as EntityRef<'npc'>} />
  ) : undefined
}
