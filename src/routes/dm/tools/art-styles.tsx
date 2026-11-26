import { createFileRoute } from '@tanstack/react-router'

import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { ImageViewer } from '#/components/image-viewer'
import { LibraryImage } from '#/components/library/library-image'
import artStyles from '#/data/dm/art-styles'
import type { ArtStyle } from '#/definitions/art-style'
import { type ArtReference, artStyleReferences } from '#/lib/art-styles'
import { publishedLibrary } from '#/lib/published-library-data'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/dm/tools/art-styles')({
  head: () => ({
    meta: [{ title: 'Art styles | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: ArtStylesPage,
})

function ArtStylesPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-8">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold">Art styles</h1>
          <p className="text-muted-foreground max-w-3xl text-sm">
            The house style for each kind of campaign art, and the existing pictures that show it
            best. New art is generated with these pictures as references and follows the guide.
            Print a style for a prompt with <code>bun run art:style &lt;style&gt;</code>.
          </p>
          <nav aria-label="Styles" className="flex flex-wrap gap-1.5 pt-2">
            {Object.entries(artStyles).map(([key, style]) => (
              <a
                key={key}
                href={`#${key}`}
                className="border-border hover:bg-muted rounded-md border px-2.5 py-1 text-sm"
              >
                {style.name}
              </a>
            ))}
          </nav>
        </div>
        {Object.entries(artStyles).map(([key, style]) => (
          <StyleSection key={key} id={key} style={style} />
        ))}
      </div>
      <aside className="order-first grid min-w-0 content-start gap-4 xl:sticky xl:top-20 xl:order-none">
        <DmQuickLinks stackAt="xl" />
      </aside>
    </div>
  )
}

function StyleSection({ id, style }: { id: string; style: ArtStyle }) {
  const square = style.canvas.width === style.canvas.height
  const pictures = artStyleReferences(style, publishedLibrary)
  return (
    <section id={id} className="grid scroll-mt-4 gap-3">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">
          {style.name}{' '}
          <span className="text-muted-foreground text-sm font-normal">
            <code>{id}</code> · {style.canvas.width}×{style.canvas.height}
          </span>
        </h2>
        <p className="text-muted-foreground text-sm">{style.use}</p>
        <ul className="list-disc pl-5 text-sm">
          {style.guide.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <ol
        className={cn(
          'grid gap-3',
          square
            ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {pictures.map((picture, index) =>
          picture ? (
            <ReferenceCard
              key={picture.src}
              number={index + 1}
              picture={picture}
              square={square}
              eyebrow={style.name}
            />
          ) : null,
        )}
      </ol>
    </section>
  )
}

function ReferenceCard({
  number,
  picture,
  square,
  eyebrow,
}: {
  number: number
  picture: ArtReference
  square: boolean
  eyebrow: string
}) {
  const sizes = square ? '(min-width: 1024px) 220px, 50vw' : '(min-width: 1024px) 380px, 100vw'
  return (
    <li className="grid content-start gap-1.5">
      {picture.origin === 'library' ? (
        <a href={picture.href} className="bg-muted block overflow-hidden rounded-lg">
          <LibraryImage
            src={picture.src}
            alt={picture.name}
            sizes={sizes}
            className="aspect-square w-full object-cover"
          />
        </a>
      ) : (
        <ImageViewer
          src={picture.src}
          alt={picture.name}
          title={picture.name}
          eyebrow={eyebrow}
          accessibleLabel={`${eyebrow} of ${picture.name}`}
          previewSizes={sizes}
          previewMaxWidth={square ? 384 : 768}
          className={cn('w-full', square ? 'aspect-square' : 'aspect-[3/2]')}
        />
      )}
      <p className="flex items-baseline gap-2 text-sm">
        <span className="bg-foreground text-background inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
          {number}
        </span>
        <a href={picture.href} className="hover:underline">
          {picture.name}
        </a>
      </p>
    </li>
  )
}
