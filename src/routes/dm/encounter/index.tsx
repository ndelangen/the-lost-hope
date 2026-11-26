import { createFileRoute } from '@tanstack/react-router'

import { LiveFight } from '#/components/dm/encounter/live-fight'

export const Route = createFileRoute('/dm/encounter/')({
  head: () => ({
    meta: [{ title: 'Encounter | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: LiveFight,
})
