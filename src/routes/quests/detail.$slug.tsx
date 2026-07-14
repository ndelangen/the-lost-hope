import { createFileRoute } from '@tanstack/react-router'

import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { QuestInvestigation } from '#/components/quest-investigation'
import { Pill } from '#/components/ui/pill'
import { getEntity } from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { questDetailData } from '#/lib/quest-detail-data'
import { QuestIcon } from '#/lib/quest-icons'

export const Route = createFileRoute('/quests/detail/$slug')({
  component: QuestPage,
})

function QuestPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('quest', slug)
  if (!entity) return <EntityNotFound kind="quest" />

  const quest = entity.data
  const detail = questDetailData(quest)

  return (
    <EntityDetail
      kind="quest"
      title={quest.name}
      visual={{
        variant: 'icon',
        content: <QuestIcon icon={quest.icon} className="size-10" />,
      }}
      headerAside={
        <Pill variant={quest.status === 'open' ? 'warning' : 'success'}>{quest.status}</Pill>
      }
      referencedBy={referencedByItems('quest', slug)}
    >
      <QuestInvestigation detail={detail} conclusion={quest.conclusion} status={quest.status} />
    </EntityDetail>
  )
}
