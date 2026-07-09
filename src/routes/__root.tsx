import { createRootRoute } from '@tanstack/react-router'

import { CampaignShell } from '@/components/campaign-shell'

import '../styles.css'

export const Route = createRootRoute({
  component: CampaignShell,
})
