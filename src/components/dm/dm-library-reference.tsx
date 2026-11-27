import { Link } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { EntityRef, LinkedLibraryKind } from '#/definitions/kind'
import { type LibraryLink, loadLibraryLink } from '#/lib/library-links'

const className =
  'text-primary inline-flex items-baseline gap-1 font-medium underline-offset-4 hover:underline'

/** A library entry named in DM prose, linked to its library page once the catalog has loaded. */
export function DmLibraryReference({ reference }: { reference: EntityRef<LinkedLibraryKind> }) {
  const [link, setLink] = useState<LibraryLink | null>()
  useEffect(() => {
    let current = true
    void loadLibraryLink(reference).then((found) => {
      if (current) setLink(found ?? null)
    })
    return () => {
      current = false
    }
  }, [reference])

  const icon = <BookOpen aria-hidden className="size-3.5 self-center opacity-70" />
  if (!link) {
    return (
      <span className="inline-flex items-baseline gap-1 font-medium">
        {icon}
        {link === null ? reference.key : '…'}
      </span>
    )
  }
  return 'spell' in link ? (
    <Link to="/library/spells/$key" params={{ key: link.spell }} className={className}>
      {icon}
      {link.name}
    </Link>
  ) : (
    <Link
      to="/library/$type/$slug"
      params={{ type: link.type, slug: link.slug }}
      className={className}
    >
      {icon}
      {link.name}
    </Link>
  )
}
