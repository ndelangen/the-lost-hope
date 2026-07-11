import { createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { Badge } from '#/components/ui/badge'
import { Stack } from '#/components/ui/layout'
import { campaign } from '#/lib/campaign'

export const Route = createFileRoute('/intro')({
  component: CampaignIntroPage,
})

function CampaignIntroPage() {
  return (
    <Stack gap="3xl">
      <Stack as="section" gap="lg">
        <Badge variant="secondary">D&amp;D 5e · Homebrew</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Welcome to {campaign.name}
        </h1>
        <ContentRenderer
          content={campaign.notes}
          className="text-muted-foreground max-w-3xl text-lg"
        />
      </Stack>

      {campaign.pitch ? (
        <Stack as="section" gap="lg" className="border-border bg-card rounded-xl border p-6 sm:p-8">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            Call to adventure
          </h2>
          <ContentRenderer content={campaign.pitch} />
        </Stack>
      ) : null}

      {campaign.houseRules ? (
        <Stack as="section" gap="lg" className="border-border bg-card rounded-xl border p-6 sm:p-8">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            House rules
          </h2>
          <ContentRenderer content={campaign.houseRules} />
        </Stack>
      ) : null}
    </Stack>
  )
}
