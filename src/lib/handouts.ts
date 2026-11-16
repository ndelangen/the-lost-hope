/**
 * Handouts that can be shown to the players: pages that are not campaign records. Selections name
 * a handout by key, never by URL.
 */
export const HANDOUTS = {
  jims_letter: { name: 'Jim’s letter', kind: 'letter', path: '/letters/jim' },
  book_of_gruumsh_page_4: {
    name: 'The Book of Gruumsh, page 4',
    kind: 'image',
    path: '/letters/book-of-gruumsh',
    image: '/assets/handouts/book-of-gruumsh-page-4.jpg',
  },
} as const

export type HandoutKey = keyof typeof HANDOUTS

/** Where each handout lives; these pages are prerendered but left out of the sitemap. */
export const HANDOUT_PATHS: readonly string[] = Object.values(HANDOUTS).map(({ path }) => path)
