import { createFileRoute, notFound } from '@tanstack/react-router'

import {
  parseJournalPrototypeVariant,
  SessionJournalPrototype,
  type JournalPrototypeVariant,
} from '#/components/session-journal-prototype'
import { getEntity } from '#/lib/campaign'
import { publicEntityPageHead } from '#/lib/public-page-metadata'
import { sessionJournalPrototypeModel } from '#/lib/session-journal-prototype-data'

export const Route = createFileRoute('/sessions/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('session', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('session', params.slug),
  validateSearch: (search: Record<string, unknown>): { variant: JournalPrototypeVariant } => ({
    variant: parseJournalPrototypeVariant(search.variant),
  }),
  component: SessionPage,
})

function SessionPage() {
  const entity = Route.useLoaderData()
  const { variant } = Route.useSearch()
  const navigate = Route.useNavigate()
  const model = sessionJournalPrototypeModel(entity.data)

  return (
    <SessionJournalPrototype
      model={model}
      variant={variant}
      onVariantChange={(nextVariant) => {
        void navigate({
          search: { variant: nextVariant },
          replace: true,
          resetScroll: false,
        })
      }}
    />
  )
}
