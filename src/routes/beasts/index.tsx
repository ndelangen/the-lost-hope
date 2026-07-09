import { createFileRoute } from '@tanstack/react-router'

import { CollectionPage } from '#/components/entity-pages'

export const Route = createFileRoute('/beasts/')({
  component: () => <CollectionPage kind="beast" />,
})
