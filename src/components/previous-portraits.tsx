import { ImageViewer } from '#/components/image-viewer'
import { DEFAULT_AVATAR } from '#/definitions/media'
import type { PreviousPortrait } from '#/definitions/pc'

export function PreviousPortraits({
  characterName,
  portraits,
}: {
  characterName: string
  portraits: PreviousPortrait[]
}) {
  if (portraits.length === 0) return null

  return (
    <section aria-labelledby="previous-portraits-heading">
      <h2
        id="previous-portraits-heading"
        className="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
      >
        Previous portraits
      </h2>
      <div className="mt-2 flex flex-wrap gap-3">
        {portraits.map((portrait) => (
          <figure key={portrait.url} className="w-24">
            <div className="size-16 overflow-hidden rounded-xl">
              <ImageViewer
                src={portrait.url}
                fallbackSrc={DEFAULT_AVATAR}
                alt={portrait.description}
                title={portrait.description}
                eyebrow={`Previous portrait of ${characterName}`}
                accessibleLabel={`portrait of ${portrait.description}`}
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
