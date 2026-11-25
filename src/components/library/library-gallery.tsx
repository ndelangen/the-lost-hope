import { useState } from 'react'

import { LibraryImage } from '#/components/library/library-image'
import { cn } from '#/lib/utils'

export function LibraryGallery({
  images,
  name,
}: {
  images: readonly { file: string; credit: string }[]
  name: string
}) {
  const [chosen, setChosen] = useState('')
  const current = images.find(({ file }) => file === chosen) ?? images[0]
  if (!current) return null

  return (
    <figure className="grid min-w-0 content-start gap-2">
      <LibraryImage
        src={current.file}
        alt={name}
        sizes="(min-width: 1024px) 332px, (min-width: 640px) 33vw, 88vw"
        className="border-border bg-muted aspect-square w-full rounded-lg border object-contain"
      />
      <figcaption className="text-muted-foreground text-xs">{current.credit}</figcaption>
      {images.length > 1 && (
        <fieldset className="flex min-w-0 flex-wrap gap-2" aria-label="Alternate images">
          {images.map(({ file }, index) => (
            <button
              type="button"
              key={file}
              aria-label={`Image ${index + 1} of ${images.length}`}
              aria-pressed={current.file === file}
              onClick={() => setChosen(file)}
              className={cn(
                'border-border size-12 overflow-hidden rounded-md border-2',
                current.file === file && 'border-primary',
              )}
            >
              <LibraryImage
                src={file}
                sizes="48px"
                maxWidth={128}
                alt=""
                className="size-full object-cover"
              />
            </button>
          ))}
        </fieldset>
      )}
    </figure>
  )
}
