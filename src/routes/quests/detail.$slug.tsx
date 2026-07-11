import { createFileRoute } from '@tanstack/react-router'
import { Clock3 } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { EventReference } from '#/components/event-reference'
import { Badge } from '#/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Grid, Inline, Stack } from '#/components/ui/layout'
import { contentToText, getEntity, questProgress } from '#/lib/campaign'
import { questProgressText, referencedByItems } from '#/lib/entity-page-data'

export const Route = createFileRoute('/quests/detail/$slug')({
  component: QuestPage,
})

function QuestPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('quest', slug)
  if (!entity) return <EntityNotFound kind="quest" />

  const quest = entity.data
  const progress = questProgress(quest)

  return (
    <EntityDetail kind="quest" referencedBy={referencedByItems('quest', slug)}>
      <Stack as="header" gap="md">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Quest
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{quest.name}</h1>
        <Badge variant={quest.status === 'open' ? 'warning' : 'success'}>{quest.status}</Badge>
        <p className="text-muted-foreground">{contentToText(quest.notes)}</p>
        <Inline
          gap="md"
          align="start"
          className="border-border bg-card max-w-xl rounded-lg border p-4"
        >
          <Clock3 className="text-primary size-5 shrink-0" />
          <Stack gap="2xs">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              Last progress
            </p>
            {progress ? (
              <>
                <EventReference slug={progress.event.slug} wrapperClassName="block" />
                <p className="text-muted-foreground text-sm">{questProgressText(progress)}</p>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">No linked event progress yet.</p>
            )}
          </Stack>
        </Inline>
      </Stack>

      <Grid gap="xl" lgColumns={2}>
        <Card>
          <CardHeader>
            <CardTitle>Clues</CardTitle>
            <CardDescription>What the party has picked up so far.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentRenderer content={quest.clues} />
          </CardContent>
        </Card>
        {quest.conclusion.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Conclusion</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentRenderer content={quest.conclusion} />
            </CardContent>
          </Card>
        ) : null}
      </Grid>
    </EntityDetail>
  )
}
