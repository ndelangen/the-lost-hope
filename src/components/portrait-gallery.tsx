import { useId } from 'react'

import { ImageViewer } from '#/components/image-viewer'
import { ShowToPlayersButton } from '#/components/player-screen/show-to-players-button'
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
        {portraits.map((portrait, index) => {
          // In local dev, each portrait gets its show button under the thumbnail, clear of the face.
          const castable =
            owner && import.meta.env.DEV ? portraitOnPlayerScreen(owner, kind, index) : undefined
          return (
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
                />
              </div>
              {castable ? (
                <ShowToPlayersButton
                  selection={castable}
                  tone="card"
                  compact
                  className="mt-1.5 h-9 w-9 [&_svg]:size-4"
                />
              ) : null}
              <figcaption className="text-muted-foreground mt-1.5 text-xs leading-snug">
                {portrait.description}
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
