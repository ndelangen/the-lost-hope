import { createFileRoute } from '@tanstack/react-router'

import { ResponsiveImage } from '#/components/responsive-image'
import { HANDOUTS } from '#/lib/handouts'

const PAGE = HANDOUTS.book_of_gruumsh_page_4

export const Route = createFileRoute('/letters/book-of-gruumsh')({
  head: () => ({
    meta: [
      { title: `${PAGE.name} | The Lost Hope` },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: BookOfGruumshPage,
})

/** Page 4 of the Book of Gruumsh, which explains how to read Jim's letter. */
function BookOfGruumshPage() {
  return (
    <div className="mx-auto max-w-3xl py-6">
      <ResponsiveImage
        src={PAGE.image}
        alt="Page 4 of the Book of Gruumsh: three panels of a giant and the instructions for reading Jim’s letter"
        sizes="(min-width: 768px) 768px, 100vw"
        className="h-auto w-full rounded-sm shadow-2xl"
      />
    </div>
  )
}
