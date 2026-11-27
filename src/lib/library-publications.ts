import publications from '#/data/library/publications'
import type { EntityRef } from '#/definitions/kind'
import type { Publication } from '#/definitions/library'

export function publicationOf(ref: EntityRef<'publication'>): Publication {
  const publication = publications[ref.key]
  if (!publication) throw new Error(`Unknown publication: ${ref.key}`)
  return publication
}
