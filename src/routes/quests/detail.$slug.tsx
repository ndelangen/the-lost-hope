import { createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { Badge } from '#/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { contentToText, getEntity } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'

export const Route = createFileRoute('/quests/detail/$slug')({
  component: QuestPage,
})

function QuestPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('quest', slug)
  if (!entity) return <EntityNotFound kind="quest" />

  const quest = entity.data

  return (
    <EntityDetail kind="quest" referencedBy={referencedByItems('quest', slug)}>
      <header className="space-y-3">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Quest
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{quest.name}</h1>
        <Badge variant={quest.status === 'open' ? 'warning' : 'success'}>{quest.status}</Badge>
        <p className="text-muted-foreground">{contentToText(quest.notes)}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
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
      </div>
    </EntityDetail>
  )
}
