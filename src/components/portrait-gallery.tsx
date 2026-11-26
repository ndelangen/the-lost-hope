import { useId } from 'react'

import { ImageViewer } from '#/components/image-viewer'
import type { EntityRef } from '#/definitions/kind'
import { DEFAULT_AVATAR, type Portrait } from '#/definitions/media'
import { portraitOnPlayerScreen } from '#/lib/player-screen-state'

export function PortraitGallery({
  owner,
  subject,
  kind,
  portraits,
}: {
  /** The record the portraits belong to, so each can go on the player screen. */
  owner: EntityRef<'pc' | 'npc' | 'beast' | 'location'> | undefined
  subject: string
  kind: 'previous' | 'additional'
  portraits: Portrait[]
}) {
  const headingId = useId()
  const label = kind === 'previous' ? 'Previous' : 'Additional'
  if (portraits.length === 0) return null

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
      >
        {label} portraits
      </h2>
      <div className="mt-2 flex flex-wrap gap-3">
        {portraits.map((portrait, index) => (
          <figure key={portrait.url} className="w-24">
            <div className="size-16 overflow-hidden rounded-xl">
              <ImageViewer
                src={portrait.url}
                fallbackSrc={DEFAULT_AVATAR}
                alt={portrait.description}
                title={portrait.description}
                eyebrow={
                  kind === 'previous' ? `Previous portrait of ${subject}` : 'Additional portrait'
                }
                accessibleLabel={`portrait of ${portrait.description}`}
                previewSizes="64px"
                previewMaxWidth={128}
                playerScreen={owner ? portraitOnPlayerScreen(owner, kind, index) : undefined}
              />
            </div>
            <figcaption className="text-muted-foreground mt-1.5 text-xs leading-snug">
              {portrait.description}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
