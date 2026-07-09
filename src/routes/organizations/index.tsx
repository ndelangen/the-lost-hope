import { createFileRoute } from '@tanstack/react-router'

import { CollectionPage } from '@/components/entity-pages'

export const Route = createFileRoute('/organizations/')({
  component: () => <CollectionPage kind="organization" />,
})
